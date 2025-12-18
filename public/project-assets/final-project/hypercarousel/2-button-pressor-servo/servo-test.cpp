#include <Arduino.h>
#include <WiFi.h>
#include <WebServer.h>
#include <ESP32Servo.h>
#include "credentials.h"

const char* ssid = WIFI_SSID;
const char* password = WIFI_PASSWORD;


// Servo on GPIO4 (A2/D2 on XIAO ESP32-S3)
#define SERVO_PIN 4

// Servo positions and speed
#define RESTING_POSITION 120    // Resting position (degrees)
#define ACTIVATION_POSITION 0   // Activation position (degrees)
#define SERVO_SPEED_MS 800      // Time to move from 0 to 120 degrees (ms)
#define SERVO_MS_PER_DEGREE (SERVO_SPEED_MS / 120.0)  // ~6.67ms per degree

Servo myServo;
WebServer server(80);

// Current angle
int currentAngle = RESTING_POSITION;

// Sequence handling
bool sequenceRunning = false;
String sequenceData = "";
int sequenceIndex = 0;
unsigned long lastSequenceTime = 0;

// HTML page
const char* htmlPage = R"rawliteral(
<!DOCTYPE html>
<html>
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Servo Control</title>
  <style>
    body { font-family: Arial, sans-serif; max-width: 600px; margin: 20px auto; padding: 20px; background: #1a1a2e; color: #eee; }
    h1 { color: #00d4ff; text-align: center; }
    .card { background: #16213e; border-radius: 10px; padding: 20px; margin: 15px 0; }
    label { display: block; margin-bottom: 8px; font-weight: bold; }
    input[type="number"], input[type="text"], textarea { 
      width: 100%; padding: 12px; border: none; border-radius: 5px; 
      background: #0f3460; color: #fff; font-size: 16px; box-sizing: border-box;
    }
    button { 
      width: 100%; padding: 15px; margin-top: 10px; border: none; border-radius: 5px; 
      background: #00d4ff; color: #1a1a2e; font-size: 16px; font-weight: bold; cursor: pointer;
    }
    button:hover { background: #00b8e6; }
    button.stop { background: #e94560; color: #fff; }
    button.stop:hover { background: #c73e54; }
    .slider-container { margin: 20px 0; }
    input[type="range"] { width: 100%; height: 20px; }
    .angle-display { text-align: center; font-size: 48px; color: #00d4ff; margin: 10px 0; }
    .info { font-size: 12px; color: #888; margin-top: 10px; }
    .status { text-align: center; padding: 10px; background: #0f3460; border-radius: 5px; margin-top: 10px; }
  </style>
</head>
<body>
  <h1>🎛️ Servo Control</h1>
  
  <div class="card">
    <label>Set Angle (0-180)</label>
    <div class="angle-display" id="angleDisplay">0°</div>
    <div class="slider-container">
      <input type="range" id="angleSlider" min="0" max="180" value="0" oninput="updateAngle(this.value)">
    </div>
    <input type="number" id="angleInput" min="0" max="180" value="0" placeholder="Enter angle">
    <button onclick="setAngle()">Set Angle</button>
  </div>

  <div class="card">
    <label>Angle Sequence</label>
    <textarea id="sequence" rows="4" placeholder="Format: angle,delay_ms
Example:
0,500
90,1000
180,500
45,800"></textarea>
    <button onclick="runSequence()">▶️ Run Sequence</button>
    <button class="stop" onclick="stopSequence()">⏹️ Stop Sequence</button>
    <div class="info">Each line: angle (0-180), delay in milliseconds before next move</div>
    <div class="status" id="status">Ready</div>
  </div>

  <script>
    function updateAngle(val) {
      document.getElementById('angleDisplay').innerText = val + '°';
      document.getElementById('angleInput').value = val;
    }

    function setAngle() {
      const angle = document.getElementById('angleInput').value;
      document.getElementById('angleSlider').value = angle;
      document.getElementById('angleDisplay').innerText = angle + '°';
      fetch('/angle?value=' + angle)
        .then(r => r.text())
        .then(t => document.getElementById('status').innerText = t);
    }

    document.getElementById('angleSlider').oninput = function() {
      updateAngle(this.value);
      fetch('/angle?value=' + this.value);
    };

    function runSequence() {
      const seq = document.getElementById('sequence').value;
      document.getElementById('status').innerText = 'Running sequence...';
      fetch('/sequence', {
        method: 'POST',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        body: 'data=' + encodeURIComponent(seq)
      }).then(r => r.text())
        .then(t => document.getElementById('status').innerText = t);
    }

    function stopSequence() {
      fetch('/stop')
        .then(r => r.text())
        .then(t => document.getElementById('status').innerText = t);
    }

    // Poll status periodically
    setInterval(() => {
      fetch('/status').then(r => r.json()).then(data => {
        document.getElementById('angleSlider').value = data.angle;
        document.getElementById('angleDisplay').innerText = data.angle + '°';
        if (data.running) {
          document.getElementById('status').innerText = 'Sequence running: step ' + data.step;
        }
      });
    }, 500);
  </script>
</body>
</html>
)rawliteral";

// Sequence parsing
struct SequenceStep {
  int angle;
  unsigned long delayMs;
};
SequenceStep steps[100];
int stepCount = 0;

void parseSequence(String data) {
  stepCount = 0;
  int start = 0;
  while (start < data.length() && stepCount < 100) {
    int lineEnd = data.indexOf('\n', start);
    if (lineEnd == -1) lineEnd = data.length();
    
    String line = data.substring(start, lineEnd);
    line.trim();
    
    if (line.length() > 0) {
      int comma = line.indexOf(',');
      if (comma > 0) {
        steps[stepCount].angle = line.substring(0, comma).toInt();
        steps[stepCount].delayMs = line.substring(comma + 1).toInt();
        steps[stepCount].angle = constrain(steps[stepCount].angle, 0, 180);
        stepCount++;
      }
    }
    start = lineEnd + 1;
  }
}

void handleRoot() {
  server.send(200, "text/html", htmlPage);
}

void handleAngle() {
  if (server.hasArg("value")) {
    int angle = server.arg("value").toInt();
    angle = constrain(angle, 0, 180);
    myServo.write(angle);
    currentAngle = angle;
    Serial.printf("Angle set to: %d\n", angle);
    server.send(200, "text/plain", "Angle set to " + String(angle) + "°");
  } else {
    server.send(400, "text/plain", "Missing angle value");
  }
}

void handleSequence() {
  if (server.hasArg("data")) {
    sequenceData = server.arg("data");
    parseSequence(sequenceData);
    if (stepCount > 0) {
      sequenceIndex = 0;
      sequenceRunning = true;
      lastSequenceTime = millis();
      // Execute first step immediately
      myServo.write(steps[0].angle);
      currentAngle = steps[0].angle;
      Serial.printf("Sequence started with %d steps\n", stepCount);
      server.send(200, "text/plain", "Sequence started with " + String(stepCount) + " steps");
    } else {
      server.send(400, "text/plain", "Invalid sequence format");
    }
  } else {
    server.send(400, "text/plain", "Missing sequence data");
  }
}

void handleStop() {
  sequenceRunning = false;
  sequenceIndex = 0;
  server.send(200, "text/plain", "Sequence stopped");
  Serial.println("Sequence stopped");
}

void handleStatus() {
  String json = "{\"angle\":" + String(currentAngle) + 
                ",\"running\":" + (sequenceRunning ? "true" : "false") +
                ",\"step\":" + String(sequenceIndex + 1) + "}";
  server.send(200, "application/json", json);
}

void handleNotFound() {
  server.send(404, "text/plain", "Not found");
}

void setup() {
  Serial.begin(115200);
  delay(1000);
  
  // Initialize servo
  ESP32PWM::allocateTimer(0);
  ESP32PWM::allocateTimer(1);
  ESP32PWM::allocateTimer(2);
  ESP32PWM::allocateTimer(3);
  
  myServo.setPeriodHertz(50);
  myServo.attach(SERVO_PIN, 500, 2400);
  myServo.write(RESTING_POSITION);
  currentAngle = RESTING_POSITION;
  Serial.println("Servo initialized at resting position (120 degrees)");

  // Connect to WiFi
  Serial.printf("Connecting to %s\n", ssid);
  WiFi.begin(ssid, password);
  
  int attempts = 0;
  while (WiFi.status() != WL_CONNECTED && attempts < 40) {  // 20 second timeout
    delay(500);
    Serial.print(".");
    attempts++;
  }
  
  if (WiFi.status() != WL_CONNECTED) {
    Serial.println("\n\n❌ WiFi connection FAILED!");
    Serial.println("Please check:");
    Serial.println("  1. SSID and password in include/credentials.h");
    Serial.println("  2. WiFi network is 2.4GHz (ESP32 doesn't support 5GHz)");
    Serial.println("  3. WiFi network is in range");
    Serial.printf("  Attempted SSID: %s\n", ssid);
    // Continue anyway - servo will still work, just no web interface
  } else {
    Serial.println("\n✅ WiFi connected!");
    Serial.print("IP Address: ");
    Serial.println(WiFi.localIP());
  }

  // Setup web server routes
  server.on("/", handleRoot);
  server.on("/angle", HTTP_GET, handleAngle);
  server.on("/sequence", HTTP_POST, handleSequence);
  server.on("/stop", HTTP_GET, handleStop);
  server.on("/status", HTTP_GET, handleStatus);
  
  server.begin();
  Serial.println("Web server started");
}

void loop() {
  server.handleClient();
  
  // Handle sequence execution
  if (sequenceRunning && stepCount > 0) {
    unsigned long now = millis();
    if (now - lastSequenceTime >= steps[sequenceIndex].delayMs) {
      sequenceIndex++;
      if (sequenceIndex >= stepCount) {
        // Sequence complete
        sequenceRunning = false;
        sequenceIndex = 0;
        Serial.println("Sequence complete");
      } else {
        // Execute next step
        myServo.write(steps[sequenceIndex].angle);
        currentAngle = steps[sequenceIndex].angle;
        lastSequenceTime = now;
        Serial.printf("Step %d: angle=%d, delay=%lu\n", 
                      sequenceIndex + 1, steps[sequenceIndex].angle, steps[sequenceIndex].delayMs);
      }
    }
  }
  
  delay(1);
}