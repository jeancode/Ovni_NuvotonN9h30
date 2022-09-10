

![NK-N9H30](https://github.com/jeancode/Ovni_NuvotonN9h30/blob/main/RtOvAr2.png "NK-N9H30")



### Presentation

This project focuses on a protocol for lot control of different LOT devices across the network, using NuvotonHMI N9H30 and lvgl, a small graphical interface was developed that supports sliding windows and multitasking, although it lacks details it is functional


# NK-N9H30 OVNI OS JEAN IMPERIAL

You must click on the following image to see the video of the internet protocol functionalities

## Project demo (click on the image to access the video)

[![Watch the video](https://img.youtube.com/vi/mJ_wRYdByZM/maxresdefault.jpg)](https://www.youtube.com/watch?v=mJ_wRYdByZM&ab_channel=Jdecode)

## Installation tutorial of the ovniOs project (click on the image to access the video)

[![Watch the video](https://i.ytimg.com/vi/4VtRCTNaM8A/hqdefault.jpg)](https://www.youtube.com/watch?v=4VtRCTNaM8A&ab_channel=Jdecode)

## Extra time
In the extra time of the rt-read contest I developed an app that is compatible with the nuvoton protocol described below.


## 1. Introduction
Nuvoton offers HMI platforms which are embedded with Nuvoton N9H MPU.  The N9H series with ARM926EJ-S core can operate at up to 300 MHz and can drive up to 1024x768 pixels in parallel port. It integrated TFT LCD controller and 2D graphics accelerator, up to 16 million colors (24-bit) LCD screen output, and provides high resolution and high chroma to deliver gorgeous display effects. It embedded up to 64 MB DDR memory, along with ample hardware storage and computing space for excellent design flexibility.

![NK-N9H30](https://github.com/jeancode/Ovni_NuvotonN9h30/blob/main/nuvotonImage3.jpg "NK-N9H30")

![NK-N9H30](https://github.com/jeancode/Ovni_NuvotonN9h30/blob/main/nuvotonImage4.jpg "NK-N9H30")

![NK-N9H30](https://github.com/jeancode/Ovni_NuvotonN9h30/blob/main/nuvotonImage2.jpg "NK-N9H30")



### 1.1 MPU specification
|  | Features |
| -- | -- |
| Part NO. | N9H30F61IEC(or N9H30F63IEC) (LQFP216 pin MCP package with DDR (64 MB) |
| CPU ARCH. | 32-bit ARM926EJ-S |
| Operation frequency | 300 MHz |
| Embedded SDRAM size | Built-in 64MB |
| Crypto engine |  AES, DES,HMAC and SHA crypto accelerator |
| RMII interface |  10/100 Mbps x2 |
| USB 2.0 |  High Speed Host/Device x1 |
| Audio |  Mono microphone / Stereo headphone |
| Extern storage |  32MB SPI-NOR Flash |
| SD card slot |  SD |

**Notice: Please remember to select corresponding Part NO in NuWriter.**

### 1.2 Interface
| Interface |
| -- |
| Two RJ45 Ethernet |
| An USB 2.0 HS Dual role(Host/Device) port |
| A microSD slot |
| A 3.5mm Audio connector |
| An ICE connector |

### 1.3 On-board devices
| Device | Description | Driver supporting status |
| -- | -- | -- |
|Ethernet PHY | IP101GR | Supported |
|Keypad | K[1, 6] | Supported |
|LEDs |  | Supported |
|TFT-LCD panel | 7" inch 24b RGB  | Supported |
|Touch panel | 7" inch resistive | Supported |
|Audio Codec | NAU8822, Supports MIC and earphone | Supported |
|USB Device | VCOM + MStorage | Supported |
|USB Host | MStorage | Supported |
|SPI NOR flash | W25Q256JVEQ (32 MB) | Supported |

## 2. Supported compiler
Support GCC and MDK IDE/compilers. More information of these compiler version as following:
| IDE/Compiler  | Tested version            |
| ---------- | ---------------------------- |
| MDK        | uVision 5.25.2               |
| GCC        | 6-2017-q1-update             |

## 2.1 Compile and upload firmware

Notice: carefully follow the instructions

the only requirement for the system to work is an ethernet connection, the server running, the firmware loaded on the board and the nodes with the corresponding software

IP addresses must be configured manually and specified in the document


### a) Download rt thread studio
    
    use the following link
    https://www.rt-thread.io/studio.html

### b) Configure the environment to add the project

  ![NK-N9H30](https://github.com/jeancode/Ovni_NuvotonN9h30/blob/main/Nuvotonconfig.gif "NK-N9H30")
 
### c) project unpack download 
    (the compressed file is divided into 3 parts, you need all three parts to uncompress the project)

  ![NK-N9H30](https://github.com/jeancode/Ovni_NuvotonN9h30/blob/main/decompressImage.gif "NK-N9H30")
 
### d) Open project in rt-thread Studio

   ![NK-N9H30](https://github.com/jeancode/Ovni_NuvotonN9h30/blob/main/OpenProject.gif "NK-N9H30")

#### Consider the build folder where you can find the binary to use nuwriter
    
   ![NK-N9H30](https://github.com/jeancode/Ovni_NuvotonN9h30/blob/main/firmware.gif "NK-N9H30")
   
    ### In the following location you can find the server configuration

        applications>OvniOs1>OvniOs.h

    ### The TCP client points to the following address and port by default

        #define IP_SERVER "192.168.100.16"

        #define Port_Server 3001

### e) download the NuvotonProtocolServer folder

In this folder you can find the server that manages the connections, in order to run the server require the nodejs tool

    Use the link to download the software

    https://nodejs.org/es/
    
#### Consider the build folder where you can find the binary to use nuwriter

navigate with the console to the NuvotonProtocolServer folder and run the following command


    npm install && node index.js
    
This will download the necessary modules and dependencies and run the server.

    
   ![NK-N9H30](https://github.com/jeancode/Ovni_NuvotonN9h30/blob/main/console.gif "NK-N9H30")

    
## Node Control

### Probably you need to know how to make a pcb with esp32 here I leave the link to the schematics

    https://github.com/jeancode/Ovni_NuvotonN9h30/blob/main/esp32_Schematic.pdf

### For node control in this project use esp32 but you can use any device that supports tcp and udp protocols

the tcp client of the nodes must point to the following address and port

    const char* host = "192.168.100.16";
    const int httpPort = 3000;
    
    
The specific protocol for tcp has a class that contains an 8-bit buffer processor that decodes and structures the following data

    

    #include "nuvoton.h"
    
    
    Nuvoton nuvoton;
    nuvotonStruct Nstruct;
    
    
    Nstruct = nuvoton.comnado(Input raw tcp);
    
    Nstruct.id = Nstruct.id; //Contains the id assigned by the server
    Nstruct.comandInter =  Nstruct.comandInter; ///contains a value from 0 to ff that can mean different internal commands
    Nstruct.datos = Nstruct.datos; //this contains an 8-bit buffer with data that can be any value sent from the interface

    
Structured data can be processed to perform different actions within the microcontroller

### This project has an example that is contained in the ProtocolNuvoton_Control_Arduino folder

It is configured for use with an Esp32 microcontroller with the Arduino IDE.


The file explains how the protocol works and how it can be used to perform different actions.

Notice: Please install Drivers https://github.com/jeancode/Ovni_NuvotonN9h30/tree/main/NuWriter  the file name is WinUSB4NuVCOM.exe

### important fact


This is the correct configuration to upload the program to any memory

![NK-N9H30](https://github.com/jeancode/Ovni_NuvotonN9h30/blob/main/Upload%20Program.jpg "NK-N9H30")


When you finish uploading the program, set the switches to the memory where you loaded your program, usually referred to as spi memory.


## 3. Program firmware
### 3.1 SDRAM Downloading using NuWriter
You can use NuWriter to download rtthread.bin into SDRAM, then run it.
[![SDRAM Downloading using NuWriter](https://i.imgur.com/UqFvQOb.gif "SDRAM Downloading using NuWriter")](https://i.imgur.com/UqFvQOb.gif "SDRAM Downloading using NuWriter")
<br>
Choose type: DDR/SRAM<br>
<< Press Re-Connect >><br>
Choose file: Specify your rtthread.bin file.<br>
Execute Address: 0x0<br>
Option: Download and run<br>
<< Press Download >><br>
Enjoy!! <br>
<br>

### 3.2 SPI NOR flash using NuWriter
You can use NuWriter to program rtthread.bin into SPI NOR flash.
[![SPI NOR flash](https://i.imgur.com/6Fw3tc7.gif "SPI NOR flash")](https://i.imgur.com/6Fw3tc7.gif "SPI NOR flash using NuWriter")
<br>
Choose type: SPI<br>
<< Press Re-Connect >><br>
Choose file: Specify your rtthread.bin file.<br>
Image Type: Loader<br>
Execute Address: 0x0<br>
<< Press Program >><br>
<< Press OK & Wait it down >><br>
<< Set Power-on setting to SPI NOR booting >><br>
<< Press Reset button on board >><br>
Enjoy!! <br>
<br>




