//create class NuvotonProtocol
class NuvotonProtocol{

    constructor(){
        
        this.listDevices = [];
        this.listDevicesMaster = [];


    }

    //list master controls
    addItemLisstDevicesMaster(item,socket){

        let port = item.port;
        let ip = item.ip;
        item.socket = socket;

        //si esta basio agregarlo
        if(this.listDevicesMaster.length == 0){
            this.listDevicesMaster.push(item);
        }

        //recorrer lista de dispositivos
        for(var i = 0; i < this.listDevices.length; i++){
            //verificar si exite el dispositivo
            if(this.listDevicesMaster[i].port == port && this.listDevicesMaster[i].ip == ip){
                //si existe el dispositivo no se agrega
                return;
            }else{
                //si no existe se agrega
                this.listDevicesMaster.push(item);
            }
        }

    }

    //remove master device controls
    removeMasterDevice(ip,port){

        //recorrer lista de dispositivos
        for(var i = 0; i < this.listDevicesMaster.length; i++){
            //verificar si exite el dispositivo
            if(this.listDevicesMaster[i].port == port && this.listDevicesMaster[i].ip == ip){
                //si existe el dispositivo se elimina
                this.listDevicesMaster.splice(i,1);
            }
        }
    }

    //return list devices conected
    getListDevicesMaster(){
        return this.listDevicesMaster;
    }
    
    //list controls
    addItemLisstDevices(item,socket){

        let port = item.port;
        let ip = item.ip;
        item.socket = socket;

        //si esta basio agregarlo
        if(this.listDevices.length == 0){
            this.listDevices.push(item);
        }


        //recorrer lista de dispositivos
        for(var i = 0; i < this.listDevices.length; i++){


            //verificar si exite el dispositivo
            if(this.listDevices[i].port == port && this.listDevices[i].ip == ip){
                //si existe el dispositivo no se agrega
                return;
            }else{
                //si no existe se agrega
                this.listDevices.push(item);
            }
        }

        
    }
    //resume id 
    resumeId(item){
        //bucar id y port y resilver el id
        var id;
        for(var i = 0; i < this.listDevices.length; i++){
            //verificar si exite el dispositivo
            if(this.listDevices[i].port == item.port && this.listDevices[i].ip == item.ip){
                //si existe el dispositivo se elimina
                id = i;
            }
        }

        return id;

    }


    //remove device disconected
    removeDevice(ip,port){

        //recorrer lista de dispositivos
        for(var i = 0; i < this.listDevices.length; i++){
            //verificar si exite el dispositivo
            if(this.listDevices[i].port == port && this.listDevices[i].ip == ip){
                //si existe el dispositivo se elimina
                this.listDevices.splice(i,1);
            }
        }

    }


    //return list devices conected
    getListNumDevices(){
        return this.listDevices.length;
    }
    //return list devices conected
    getListDevices(){
        return this.listDevices;
    }
    
    //retornar device con id   
    getDevice(id){
        //verificar si el id 
        if(id == undefined){

            //verificar si exiter this.listDevices[0]
            if(this.listDevices[id] != undefined){

                return this.listDevices[id];
            }else{
                return null;
            }
            
        }
        return this.listDevices[id];
    }

    //create array buffer
    arrayBuffer(comando){
        
        var arrayBuffer = [];

        var com = comando.comand;
        var data = comando.data;

        arrayBuffer.push(com);
        for(var i = 0; i < data.length; i++){
            arrayBuffer.push(data[i]);
        }

        //conver array to array buffer
        var arrayBuffer = new Uint8Array(arrayBuffer);

        return arrayBuffer
    }
        //processComand 
    processComand(decodeComand) {

        var com = decodeComand.comand;
        var data = decodeComand.data;

        var DecodeObjet = {};

        //si el comando es 0x02 returnar conexicon establecida
        if(com == 0x02){
            
            DecodeObjet.comand = com;
            DecodeObjet.des = "Status Network";
            DecodeObjet.data = data;
        }else{
            DecodeObjet.comand = com;
            DecodeObjet.des = "Error Comand not found";
            DecodeObjet.data = data;
        }

        return DecodeObjet;

    }
    //decode comand
    decodeComand(arrayBuffer){
        var com = arrayBuffer[0];

        var data = arrayBuffer.slice(1);
        var comando = {
            comand: com,
            data: data
        }

    

        return  this.processComand(comando);;
    }

    
    //create comand
    comand(command,data){
        //crear objeto comando
        let comando ={
            comand:0x00,
            data:0x00,
        }

        //validar si data es un array
        if(Array.isArray(data)){
            comando.data = data;
        }
        else{
            
            comando.data = [data];
        }


        comando.comand = command;
    
        
        //retornar comando
        return this.arrayBuffer(comando);
    }

}


// exportar libreria de noedejs
module.exports = NuvotonProtocol;