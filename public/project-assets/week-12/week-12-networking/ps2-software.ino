#include <Wire.h>
#include <PS2KeyAdvanced.h>

#define PS2_DATA_PIN 3
#define PS2_CLK_PIN 4
#define I2C_SDA_PIN 6
#define I2C_SCL_PIN 7
#define I2C_ADDR 0x08

PS2KeyAdvanced keyboard;

#define BUFFER_SIZE 32
volatile uint8_t charBuffer[BUFFER_SIZE];
volatile uint8_t head = 0;
volatile uint8_t tail = 0;

void setup()
{
  Serial.begin(115200);
  keyboard.begin(PS2_DATA_PIN, PS2_CLK_PIN);
  Wire.begin(I2C_ADDR, I2C_SDA_PIN, I2C_SCL_PIN, 100000);
  Wire.onRequest(requestEvent);
  Serial.println("=== Smart Numpad Slave Ready ===");
}

void loop()
{
  if (keyboard.available())
  {
    uint16_t code = keyboard.read();

    // DEBUG: Print the raw code to see what's happening
    Serial.printf("Raw code: 0x%04X\n", code);

    // Ignore key releases (bit 15 set)
    if (code & 0x8000)
    {
      Serial.println("  -> Ignoring (release)");
      return;
    }

    // Extract just the key code (low byte)
    uint8_t keyCode = code & 0xFF;

    // Convert to ASCII
    uint8_t ascii = mapToAscii(keyCode);

    if (ascii != 0)
    {
      uint8_t nextHead = (head + 1) % BUFFER_SIZE;
      if (nextHead != tail)
      {
        charBuffer[head] = ascii;
        head = nextHead;
        Serial.printf("  -> Buffered: '%c' (ASCII 0x%02X from keyCode 0x%02X)\n",
                      ascii, ascii, keyCode);
      }
    }
    else
    {
      Serial.printf("  -> Not mapped (keyCode 0x%02X)\n", keyCode);
    }
  }
}

// THE CORRECT MAPPING based on PS2KeyAdvanced.h
uint8_t mapToAscii(uint8_t id)
{
  switch (id)
  {
  // Numpad (CORRECT codes from library)
  case 0x20:
    return '0'; // PS2_KEY_KP0
  case 0x21:
    return '1'; // PS2_KEY_KP1
  case 0x22:
    return '2'; // PS2_KEY_KP2
  case 0x23:
    return '3'; // PS2_KEY_KP3
  case 0x24:
    return '4'; // PS2_KEY_KP4
  case 0x25:
    return '5'; // PS2_KEY_KP5
  case 0x26:
    return '6'; // PS2_KEY_KP6
  case 0x27:
    return '7'; // PS2_KEY_KP7
  case 0x28:
    return '8'; // PS2_KEY_KP8
  case 0x29:
    return '9'; // PS2_KEY_KP9
  case 0x2A:
    return '.'; // PS2_KEY_KP_DOT
  case 0x2B:
    return '\n'; // PS2_KEY_KP_ENTER
  case 0x2C:
    return '+'; // PS2_KEY_KP_PLUS
  case 0x2D:
    return '-'; // PS2_KEY_KP_MINUS
  case 0x2E:
    return '*'; // PS2_KEY_KP_TIMES
  case 0x2F:
    return '/'; // PS2_KEY_KP_DIV

  // Regular numbers (top row)
  case 0x30:
    return '0'; // PS2_KEY_0
  case 0x31:
    return '1'; // PS2_KEY_1
  case 0x32:
    return '2'; // PS2_KEY_2
  case 0x33:
    return '3'; // PS2_KEY_3
  case 0x34:
    return '4'; // PS2_KEY_4
  case 0x35:
    return '5'; // PS2_KEY_5
  case 0x36:
    return '6'; // PS2_KEY_6
  case 0x37:
    return '7'; // PS2_KEY_7
  case 0x38:
    return '8'; // PS2_KEY_8
  case 0x39:
    return '9'; // PS2_KEY_9

  // Standard keys
  case 0x1C:
    return 8; // PS2_KEY_BS (Backspace)
  case 0x1E:
    return '\n'; // PS2_KEY_ENTER
  case 0x1B:
    return 27; // PS2_KEY_ESC
  case 0x1F:
    return ' '; // PS2_KEY_SPACE

  // Ignore lock keys themselves
  case 0x01:
    return 0; // PS2_KEY_NUM (NumLock key)
  case 0x02:
    return 0; // PS2_KEY_SCROLL
  case 0x03:
    return 0; // PS2_KEY_CAPS

  default:
    return 0; // Ignore
  }
}

void requestEvent()
{
  if (head != tail)
  {
    Wire.write(charBuffer[tail]);
    tail = (tail + 1) % BUFFER_SIZE;
  }
  else
  {
    Wire.write(0x00);
  }
}
