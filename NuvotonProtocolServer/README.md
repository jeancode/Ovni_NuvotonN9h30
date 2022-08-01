## installation instructions

     https://nodejs.org/es/
     download a version higher than 8.0 of nodejs

### run the following commands
    
    npm install
    node index.js


## Protocol Description


### Master Comand

| Comand Server | ID clien Device | Comand Device | Data | Data | ... |
| -- | -- |-- | -- |-- | -- |
| 0 | 1 | 2 | 3 | 4 | 6 |
| 0x16  | 0x01 | 0x01  | 0x01 | 0x01  | 0x01 |


### Comand 

Basically it is the only written command, what it does is tell the server to forward the message to the device with the indicated id

### ID clien Device

They identify themselves in the way that they connect


### Comand Device

device commands range from 0x01 to 0xff

Arduino commands are structured as follows

### Neo Pixel Comand

    0, 0x16 = Comand server
    1, 0x01 = Id Device
    2, 0x01 = Rgb Comands
    3, 0x01 = Data Color Reed
    4, 0x01 = Data Color Gren
    5, 0x01 = Data Color Bluee

## Servo Motor

    0, 0x16 = Comand server
    1, 0x01 = Id Device
    2, 0x02 = Control Servo Comands
    3, 0x01 = Data position 
    
    
## Servo Motor

    0, 0x16 = Comand server
    1, 0x01 = Id Device
    2, 0x03 = Control Rele cOMAND
    3, 0x01 = Data rele 1
    4, 0x01 = Data rele 2
    5, 0x01 = Data rele 3
    
