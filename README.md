# NK-N9H30 OVNI OS JEAN IMPERIAL

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

### a) Download rt thread studio
    
    use the following link
    https://www.rt-thread.io/studio.html

### b) Configure the environment to add the project

  ![NK-N9H30](https://github.com/jeancode/Ovni_NuvotonN9h30/blob/main/Nuvotonconfig.gif "NK-N9H30")
 
### c) project unpack download

  ![NK-N9H30](https://github.com/jeancode/Ovni_NuvotonN9h30/blob/main/decompressImage.gif "NK-N9H30")
 
### d) Open project in rt-thread Studio

   ![NK-N9H30](https://github.com/jeancode/Ovni_NuvotonN9h30/blob/main/OpenProject.gif "NK-N9H30")

#### Consider the build folder where you can find the binary to use nuwriter


Notice: Please install ICE driver for development and [NuMicro_ARM9_Device_Database_Keil](https://www.nuvoton.com/resource-download.jsp?tp_GUID=SW1820201207155701).

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




