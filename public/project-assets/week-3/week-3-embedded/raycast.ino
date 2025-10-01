#include <Wire.h>
#include <Adafruit_GFX.h>
#include <Adafruit_SSD1306.h>
#include <math.h>

// Display Constants
#define SCREEN_WIDTH 128
#define SCREEN_HEIGHT 64
#define SCREEN_ADDRESS 0x3C

// Touch Constants
#define N_TOUCH 6
#define TOUCH_THRESHOLD 30
#define TOUCH_TIMEOUT 200
#define TOUCH_DELAY_US 25

// Game Constants  
#define MAP_WIDTH 10
#define MAP_HEIGHT 10
#define MOVE_SPEED 0.1f
#define ROTATION_SPEED 0.1f
#define FRAME_DELAY 20

// Touch pin indices
#define PIN_LEFT 4
#define PIN_RIGHT 3
#define PIN_UP 2
#define PIN_DOWN 5 
#define PIN_A 0
#define PIN_B 1

// Struct
struct Player {
    float posX, posY;
    float dirX, dirY;
    float planeX, planeY;
};

Player player = {5.0f, 2.0f, 1.0f, 1.0f, 0.0f, 0.66f};

struct RaycastHit {
    float distance;
    int side; // 0 = NS wall, 1 = EW wall
};

// Global variables
Adafruit_SSD1306 display(SCREEN_WIDTH, SCREEN_HEIGHT, &Wire, -1, 1700000UL, 1700000UL);

int touch_pins[N_TOUCH] = {3, 4, 2, 27, 1, 26};
bool pin_touched_now[N_TOUCH] = {false, false, false, false, false, false};

int worldMap[MAP_WIDTH][MAP_HEIGHT] = {
  {1,1,1,1,1,1,1,1,1,1},
  {1,0,0,0,0,0,0,0,0,1},
  {1,0,0,0,0,0,0,0,0,0},
  {1,0,1,1,1,1,1,1,0,1},
  {1,0,0,1,0,0,1,0,0,1},
  {1,0,0,1,0,0,1,0,0,1},
  {1,0,0,0,0,0,0,0,0,1},
  {1,0,0,0,0,0,0,0,0,1},
  {1,0,0,0,0,0,0,0,0,1},
  {1,1,1,1,1,1,1,1,1,1}
};


// Touch sensor functions
void update_touch() {
    for (int i = 0; i < N_TOUCH; i++) {
        int p = touch_pins[i];
        pinMode(p, OUTPUT);
        digitalWriteFast(p, LOW);
        delayMicroseconds(TOUCH_DELAY_US);
        pinMode(p, INPUT_PULLUP);
        
        int t = 0;
        while (!digitalReadFast(p) && t < TOUCH_TIMEOUT) t++;
        
        pin_touched_now[i] = t > TOUCH_THRESHOLD;
    }
}

// Map functions
bool is_wall(int x, int y) {
    if (x < 0 || x >= MAP_WIDTH || y < 0 || y >= MAP_HEIGHT) {
        return true;
    }
    return worldMap[x][y] > 0;
}

bool can_move_to(float x, float y) {
    return !is_wall((int)x, (int)y);
}

// Player movement functions
void move_player(float deltaX, float deltaY) {
    if (can_move_to(player.posX + deltaX, player.posY)) {
        player.posX += deltaX;
    }
    if (can_move_to(player.posX, player.posY + deltaY)) {
        player.posY += deltaY;
    }
}

void rotate_player(float angle) {
    float cosAngle = cos(angle);
    float sinAngle = sin(angle);
    
    // Rotate direction vector
    float oldDirX = player.dirX;
    player.dirX = player.dirX * cosAngle - player.dirY * sinAngle;
    player.dirY = oldDirX * sinAngle + player.dirY * cosAngle;
    
    // Rotate camera plane
    float oldPlaneX = player.planeX;
    player.planeX = player.planeX * cosAngle - player.planeY * sinAngle;
    player.planeY = oldPlaneX * sinAngle + player.planeY * cosAngle;
}

// Very nice raycasting functions
RaycastHit cast_ray(float startX, float startY, float rayDirX, float rayDirY) {
    int mapX = (int)startX;
    int mapY = (int)startY;
    
    float deltaDistX = abs(1.0f / rayDirX);
    float deltaDistY = abs(1.0f / rayDirY);
    
    int stepX, stepY;
    float sideDistX, sideDistY;
    
    if (rayDirX < 0) {
        stepX = -1;
        sideDistX = (startX - mapX) * deltaDistX;
    } else {
        stepX = 1;
        sideDistX = (mapX + 1.0f - startX) * deltaDistX;
    }
    
    if (rayDirY < 0) {
        stepY = -1;
        sideDistY = (startY - mapY) * deltaDistY;
    } else {
        stepY = 1;
        sideDistY = (mapY + 1.0f - startY) * deltaDistY;
    }
    
    // DDA
    int hit = 0;
    int side;
    
    while (hit == 0) {
        if (sideDistX < sideDistY) {
            sideDistX += deltaDistX;
            mapX += stepX;
            side = 0;
        } else {
            sideDistY += deltaDistY;
            mapY += stepY;
            side = 1;
        }
        
        if (is_wall(mapX, mapY)) hit = 1;
    }
    
    // Calculate distance
    float perpWallDist;
    if (side == 0) {
        perpWallDist = (mapX - startX + (1 - stepX) / 2) / rayDirX;
    } else {
        perpWallDist = (mapY - startY + (1 - stepY) / 2) / rayDirY;
    }
    
    return {perpWallDist, side};
}

void draw_wall_column(int x, int wallHeight, int side) {
    int drawStart = -wallHeight / 2 + SCREEN_HEIGHT / 2;
    int drawEnd = wallHeight / 2 + SCREEN_HEIGHT / 2;
    
    drawStart = max(0, drawStart);
    drawEnd = min(SCREEN_HEIGHT - 1, drawEnd);
    
    if (side == 1) {
        // EW walls - draw every other pixel for shading
        for (int y = drawStart; y <= drawEnd; y += 2) {
            display.drawPixel(x, y, SSD1306_WHITE);
        }
    } else {
        // NS walls - draw solid line
        display.drawLine(x, drawStart, x, drawEnd, SSD1306_WHITE);
    }
}

void render() {
    display.clearDisplay();
    
    for (int x = 0; x < SCREEN_WIDTH; x++) {
        // Calculate camera X coordinate (-1 to 1)
        float cameraX = 2.0f * x / (float)SCREEN_WIDTH - 1.0f;
        
        // Ray direction
        float rayDirX = player.dirX + player.planeX * cameraX;
        float rayDirY = player.dirY + player.planeY * cameraX;
        
        // Cast ray
        RaycastHit hit = cast_ray(player.posX, player.posY, rayDirX, rayDirY);
        
        // Calculate wall height
        int wallHeight = (int)(SCREEN_HEIGHT / hit.distance);
        
        // Draw wall column
        draw_wall_column(x, wallHeight, hit.side);
    }
    
    display.display();
}

// Input handling
void handle_input() {
    // Movement
    if (pin_touched_now[PIN_DOWN]) {
        move_player(player.dirX * MOVE_SPEED, player.dirY * MOVE_SPEED);
    }
    
    if (pin_touched_now[PIN_UP]) {
        move_player(-player.dirX * MOVE_SPEED, -player.dirY * MOVE_SPEED);
    }
    
    // Rotation
    if (pin_touched_now[PIN_LEFT]) {
        rotate_player(ROTATION_SPEED);
    }
    
    if (pin_touched_now[PIN_RIGHT]) {
        rotate_player(-ROTATION_SPEED);
    }
}

void setup() {
    Serial.begin(115200);
    
    if (!display.begin(SSD1306_SWITCHCAPVCC, SCREEN_ADDRESS)) {
        Serial.println("Display init failed");
        while(1);
    }
    
    display.clearDisplay();
    display.display();
}

void loop() {
    update_touch();
    handle_input();
    render();
    delay(FRAME_DELAY);
}
