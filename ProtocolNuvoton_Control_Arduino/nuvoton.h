#include <vector>

using namespace std;

struct nuvotonStruct
{
    int id;
    int  comandInter;
    vector<byte> datos;
};


//crear Una clase nuvoton
class Nuvoton {

    private:
    

    public:
    
    //inpun process information
    nuvotonStruct comnado(String dataInput){

      nuvotonStruct DataStruct;

      //process comand recnognition
      int comandServer =  (int)dataInput[0];
      int idDevice =  (int)dataInput[1];
      int comandIntern = (int)dataInput[2];
      vector<byte> VectorData;
  
      // datta comanmd
      //int value = (int)line[3];    
      //int value1 = (int)line[4];    
      //int value2 = (int)line[5];    

      DataStruct.id = idDevice;
      DataStruct.comandInter = comandIntern;

      for(int i = 3;i <= dataInput.length()-1;i++){
       
        VectorData.push_back( byte(dataInput[i]) );
     }

     DataStruct.datos = VectorData;


      return DataStruct;
    }

};
