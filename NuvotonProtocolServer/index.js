//const express = require('express');
//llmar udp 
const dgram = require('dgram');
//llamar tcp socket
const readSocket = require('net');
const deviceSocket = require('net');

//llamar body parser
//const bodyParser = require('body-parser');

//call nuvoton protocol
const NuvotonProtocol = require('./NuvotonProtocol');

//crear app
//const app = express();


//create nuvoton protocol object
const nuvotonProtocol = new NuvotonProtocol();


//create array buffer
let arrayBuffer = [10,10,101,0];

//simple test
var comandoSum = nuvotonProtocol.comand(0x02,arrayBuffer);

//simple test
var decode = nuvotonProtocol.decodeComand(comandoSum);



//implementar body parser
//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: true }));





//readsocket listen
var server = readSocket.createServer(function(socket) {

    //data encapsulation
    var encapsuleSocketData = {ip:socket.remoteAddress,port:socket.remotePort};
    
    //add client connected to controller
    nuvotonProtocol.addItemLisstDevices(encapsuleSocketData,socket);

    console.log("Client");

    //received data
    socket.on('data', function(data) {
        console.log('data received: ' + data);
        
        //determines if there is at least one client connected
        var idDevice = nuvotonProtocol.resumeId(encapsuleSocketData);

        //
        if(nuvotonProtocol.getListDevicesMaster()[0] != undefined){

            //check if the master is connected
            var socketMaster = nuvotonProtocol.getListDevicesMaster()[0].socket;


            //By receiving this command the server understands that it must send a string of data to master client
            if(data[0] == 0x16){
                       
                //create Uint8Array
                var arrayBuffer = [0x16,idDevice];

                //after the control commands the rest is various data
                for(var i = 2; i < data.length; i++){
                    arrayBuffer.push(data[i]);
                }
                //added to buffer

                //send the data to the master
                arrayBuffer = new Uint8Array(arrayBuffer);
                
                socketMaster.write(data);

            }
         
        }

    });

    socket.on("error", function(err) {

        console.log("error: " + err);

        socket.end();
    });

    socket.on('close', function() {
        nuvotonProtocol.removeDevice(socket._peername.address,socket._peername.port);
        //console.log(nuvotonProtocol.getListDevices());
        console.log('server disconnected');
    });


   
}).listen(3000,  
    function() {
        console.log('server bound');
    }
);


//readsocket 2 listen Master
var server2 = readSocket.createServer(function(socket) {

    var encapsuleSocketData = {ip:socket.remoteAddress,port:socket.remotePort};

    nuvotonProtocol.addItemLisstDevicesMaster(encapsuleSocketData,socket);


    console.log("Master conected");


    socket.on('data', function(data) {

        console.log(data);

        //data array unit16arry
        var d = new Uint16Array(data);

        console.log(d);
        
       // we process command and verify how many clients are connected

        var decode = nuvotonProtocol.decodeComand(data);

          // 03 01 number connected devices
        if(decode.comand == 0x02){
            
            console.log("Dispositives conecteds: " + nuvotonProtocol.getListNumDevices());  
            
        }
        
        //list connected devices
        if(decode.comand == 0x03){

           //list connected devices
           var listDevices = nuvotonProtocol.getListDevices();
    
            //optner byte of the first parameter of the buffer
     
            var id = decode.data[0];
            
             //represents the ip
            var device =nuvotonProtocol.getDevice(id);

            //device != null
            if(device != null){
                //enviar comando a dispositiv
                
                //decode client data
                var  ip = device.ip.split(":")[3].split(".");
                
                //register in the manager
                ip.push(device.ip);

                //encode device ip in array buffer 0x01 ip responce data
                var arrayBuffer = nuvotonProtocol.arrayBuffer({comand:0x01,data:ip});

                console.log("enviando a: "+  ip);
                socket.write(arrayBuffer);

            }else{

                console.log("No found device");

                //create Uint8Array
                var arrayBuffer = [00,00,00,0];
                //convert array to array buffer
                arrayBuffer = new Uint8Array(arrayBuffer);
                //enviar comando a dispositivo
                socket.write(arrayBuffer);

            }
           //console.log(listDevices[i]);

           
        
        }

        //send a command to the device
        if(decode.comand == 0x04){

            //optner id of the first parameter of the decode data
            var id = decode.data[0]-1;

           // console.log(id);
            //command type
            var typeComand = decode.data[1];
            //command value
            var valueComand = decode.data[2];

            try{
                //check if there are connected clients
                if(nuvotonProtocol.getListDevices().length > 0){

                    //Envci
                    var device = nuvotonProtocol.getDevice(id);

                    if(device != null){
                        
                        //get the socket of the client according to the command of the master client
                        var socketDevice = device.socket;
    
                        //var arrayBuffer = nuvotonProtocol.comand(typeComand,valueComand);
                       
                        //send command to the device with the resident id of the master client
                        socketDevice.write(data);

                    }else{

                        console.log("No found device");

                        //create Uint8Array
                        var arrayBuffer = [00,00,00,0];
                        
                        //convert array to array buffer
                        arrayBuffer = new Uint8Array(arrayBuffer);
                        
                        //send command to device
                        socket.write(arrayBuffer);

                    }


                }
      
                

            }catch(e){
                //console.log(e);
            }
            
        }

        socket.end();

    });

    socket.on('close', function() {
        console.log('server disconnected');
        //allows saving which client was disconnected
        nuvotonProtocol.removeMasterDevice(socket._peername.address,socket._peername.port);
    });


}).listen(3001,function(){
    console.log('server bound master');
});
