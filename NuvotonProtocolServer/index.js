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


//create obj nuvoton protocol
const nuvotonProtocol = new NuvotonProtocol();


//create array buffer
let arrayBuffer = [10,10,101,0];

var comandoSum = nuvotonProtocol.comand(0x02,arrayBuffer);

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

    //todos los datos enviados del dispositivo slave deben conmezar con 0x16 seguido de la data
    socket.on('data', function(data) {
        console.log('data received: ' + data);
        
        //determinar id de dispositivo
        var idDevice = nuvotonProtocol.resumeId(encapsuleSocketData);

        //verificar si exite un master conectado nuvotonProtocol.getListDevicesMaster()[0]
        if(nuvotonProtocol.getListDevicesMaster()[0] != undefined){

            var socketMaster = nuvotonProtocol.getListDevicesMaster()[0].socket;


            //resend comand to master
            if(data[0] == 0x16){
                       
                //create Uint8Array
                var arrayBuffer = [0x16,idDevice];

                //recorrerr data    y agregar al array buffer
                for(var i = 2; i < data.length; i++){
                    arrayBuffer.push(data[i]);
                }
            
                //convert array to array buffer
                arrayBuffer = new Uint8Array(arrayBuffer);
                //enviar comando a dispositivo
                
                //resend info masters
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
        
        //procesamos comando y vertificamos cuantos clientes estan contectos
        var decode = nuvotonProtocol.decodeComand(data);

        
        if(decode.comand == 0x02){
            
            console.log("Dispositives conecteds: " + nuvotonProtocol.getListNumDevices());  

 
            
        }
        // 03 01 //listar dispositivos conectados
        if(decode.comand == 0x03){

           //listar ip de dispositivos
           var listDevices = nuvotonProtocol.getListDevices();
    
            //optner id del primer parametro del decode data
            var id = decode.data[0];

            var device =nuvotonProtocol.getDevice(id);

            //device != null
            if(device != null){
                //enviar comando a dispositivo


                var  ip = device.ip.split(":")[3].split(".");
                
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

        //envia un comando al dispositivo
        if(decode.comand == 0x04){

            //optner id del primer parametro del decode data
            var id = decode.data[0]-1;

           // console.log(id);
            //tipo de comando
            var typeComand = decode.data[1];
            
            var valueComand = decode.data[2];

            try{

            

                if(nuvotonProtocol.getListDevices().length > 0){

                    //enviar comando a dispositivo
                    var device = nuvotonProtocol.getDevice(id);

                    if(device != null){

                        var socketDevice = device.socket;

                        var arrayBuffer = nuvotonProtocol.comand(typeComand,valueComand);

                       

                        socketDevice.write(data);

                    }else{

                        console.log("No found device");

                        //create Uint8Array
                        var arrayBuffer = [00,00,00,0];
                        //convert array to array buffer
                        arrayBuffer = new Uint8Array(arrayBuffer);
                        //enviar comando a dispositivo
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
        nuvotonProtocol.removeMasterDevice(socket._peername.address,socket._peername.port);
    });


}).listen(3001,function(){
    console.log('server bound master');
});
