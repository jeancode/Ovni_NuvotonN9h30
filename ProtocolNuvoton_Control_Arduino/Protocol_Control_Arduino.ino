/*

This document was made by jeancode specifically for the RTThread_IoTOS contest to exemplify how it works

*/


#include <WiFi.h>
//we call the nuvoton bookstore
#include "nuvoton.h"//this contains the data processing of the control protocol
#include <ESP32Servo.h>//Simply control a servo motor


#include <Adafruit_NeoPixel.h>//we call the library neopixel


//nuvoton project
//node example

Servo myservo;//we call the class Servo


int servoPin = 17; //We set the control pin


Adafruit_NeoPixel pixels(NUMPIXELS, PIN, NEO_GRB + NEO_KHZ800);
  
#define PIN    26 /// ect the data pin of the neopixel

#define NUMPIXELS 5

#define DELAYVAL 100 // Time (in milliseconds) to pause between pixels

Nuvoton nuvoton; //we call the class Nuvoton

nuvotonStruct Nstruct;//we call the structure 


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

      Nstruct = nuvoton.comnado(line); //process raw data

      //This is just a play on words, does it make sense?

      Nstruct.id = Nstruct.id; //id assigned by the server

      Nstruct.comandInter =  Nstruct.comandInter; //internal command can mean anything

      Nstruct.datos = Nstruct.datos; //data
      
      
      // coamnd neopixel
      if(Nstruct.comandInter == 1){ //command 1 refers to neopixel

        //we read the first 3 bytes of data and find the rgb colors

        int value = Nstruct.datos[0];    
        int value1 = Nstruct.datos[1];
        int value2 = Nstruct.datos[2];
  
        //we make a little conversation
        
        value = map(value,1,100,0,255);
        value1 = map(value1,1,100,0,255);
        value2 = map(value2,1,100,0,255);

      
        //We write the new neopixel configuration

        pixels.clear(); 
        
        for(int i=0; i<NUMPIXELS; i++) {

          pixels.setPixelColor(i, pixels.Color(value, value1, value2));
          
        }
        
        pixels.show();   // Send the updated pixel colors to the hardware.

       
      }
      // command sevomoor
      else if(Nstruct.comandInter == 2){ //Command 2 means servo motor control


         int valueServ = (int)Nstruct.datos[0]; //Let's choose the first byte of data and execute action


         Serial.println(valueServ);
         
         valueServ = map(valueServ,0,100,500,2800);
         myservo.write(valueServ);

        
      }
      
      //command rele
      else if(Nstruct.comandInter == 3){//command 3 can control a series of relays



      //command pwm
      }else if(Nstruct.comandInter == 4){ //command 4 can control a pwm

        
      }

 
   }

}
