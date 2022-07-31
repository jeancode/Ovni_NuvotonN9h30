#include <Adafruit_NeoPixel.h>
#include <WiFi.h>
#include "nuvoton.h"
#include <ESP32Servo.h>


Servo myservo;

int servoPin = 17;

#define PIN        26

#define NUMPIXELS 5

Adafruit_NeoPixel pixels(NUMPIXELS, PIN, NEO_GRB + NEO_KHZ800);
  

#define DELAYVAL 100 // Time (in milliseconds) to pause between pixels

Nuvoton nuvoton;
nuvotonStruct Nstruct;

const char* ssid     = "Name  Wifi";
const char* password = "Password Wifi";

WiFiClient client;
const char* host = "192.168.100.16";
const int httpPort = 3000;
    


void setup() {


  Serial.begin(115200);

  Serial.println();
  Serial.println();
  Serial.print("Connecting to ");
  Serial.println(ssid);
  
  WiFi.begin(ssid, password);
  
  while (WiFi.status() != WL_CONNECTED) {
      delay(500);
      Serial.print(".");
  }
  
  Serial.println("");
  Serial.println("WiFi connected");
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());



  if (!client.connect(host, httpPort)) {
        Serial.println("connection failed");
        return;
  }

  ESP32PWM::allocateTimer(0);
  ESP32PWM::allocateTimer(1);
  ESP32PWM::allocateTimer(2);
  ESP32PWM::allocateTimer(3);
  myservo.setPeriodHertz(50);    // standard 50 hz servo
  myservo.attach(servoPin, 500, 2500); 
  

}



String line;


void loop() {

    if(client.available()) {
      
      line = client.readStringUntil('|');

      Nstruct = nuvoton.comnado(line);

      Nstruct.id = Nstruct.id;
      Nstruct.comandInter =  Nstruct.comandInter;
      Nstruct.datos = Nstruct.datos;
      
      //Nstruct.idDevice;
      //Nstruct.comandIntern; 

      //Serial.println(Nstruct.comandInter);

      
      // coamnd neopixel
      if(Nstruct.comandInter == 1){
        
        int value = Nstruct.datos[0];    //
        int value1 = Nstruct.datos[1];
        int value2 = Nstruct.datos[2];
  
        value = map(value,1,100,0,255);
        value1 = map(value1,1,100,0,255);
        value2 = map(value2,1,100,0,255);

      
        pixels.clear(); 
        
        for(int i=0; i<NUMPIXELS; i++) {

          pixels.setPixelColor(i, pixels.Color(value, value1, value2));
          
        }
        
        pixels.show();   // Send the updated pixel colors to the hardware.

       
      }
      // command sevomoor
      else if(Nstruct.comandInter == 2){

         int valueServ = (int)Nstruct.datos[0];

         Serial.println(valueServ);
         
         valueServ = map(valueServ,0,100,500,2800);
         myservo.write(valueServ);

        
      }
      
      //command rele
      else if(Nstruct.comandInter == 3){

      //command pwm
      }else if(Nstruct.comandInter == 4){

        
      }

 
   }

}
