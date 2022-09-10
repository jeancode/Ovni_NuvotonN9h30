import 'dart:io';
import 'dart:convert';
import 'dart:async';
import 'package:tcp_client_dart/tcp_client_dart.dart';

import 'package:flutter/material.dart';

//impor tcp_client.dart

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'NuVoton Demo Chat',
      //font size
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: const MyHomePage(title: 'Nuvoton Chat'),
    );
  }
}

class MyHomePage extends StatefulWidget {
  const MyHomePage({super.key, required this.title});

  final String title;

  @override
  State<MyHomePage> createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SingleChildScrollView(
          child: Column(
        //color red
        children: [
          //container azul
          Container(
            color: Color.fromARGB(255, 235, 11, 60),
            width: double.infinity,

            height: 100,
            //padding top
            padding: const EdgeInsets.only(top: 55),
            child: Column(
              children: [
                //texto
                Text(
                  'Nuvoton Demo Chat',
                  style: TextStyle(
                    color: Colors.white,
                    fontSize: 20,
                  ),
                ),
              ],
            ),
          ),
          //Estado de la conexion
          Container(
            color: Color.fromARGB(255, 80, 80, 80),
            width: double.infinity,
            height: 50,
            //padding top
            padding: const EdgeInsets.only(top: 10),
            child: Column(
              children: [
                //texto
                Text(
                  'Disconnected',
                  style: TextStyle(
                    color: Colors.white,
                    fontSize: 20,
                  ),
                ),
              ],
            ),
          ),
          //Input
          Container(
            width: double.infinity,
            height: 100,
            color: Color.fromARGB(255, 33, 33, 33),
            child: Container(
              //text
              child: Center(
                child: Row(
                  children: [
                    Expanded(
                      flex: 2,
                      child: Container(
                        //padding left
                        padding: const EdgeInsets.only(left: 10, right: 10),
                        child: TextField(
                          keyboardType: TextInputType.number,
                          style: TextStyle(
                            color: Colors.white,
                          ),
                          decoration: InputDecoration(
                            border: OutlineInputBorder(),
                            labelText: 'IP',
                            labelStyle: TextStyle(
                              color: Colors.white,
                            ),
                          ),
                        ),
                      ),
                    ),
                    Expanded(
                      flex: 1,
                      child: Container(
                        padding: const EdgeInsets.only(left: 10, right: 10),
                        child: TextField(
                          keyboardType: TextInputType.number,
                          style: TextStyle(
                            color: Colors.white,
                          ),
                          decoration: InputDecoration(
                            border: OutlineInputBorder(),
                            labelText: 'Port',
                            labelStyle: TextStyle(
                              color: Colors.white,
                            ),
                          ),
                        ),
                      ),
                    ),
                  ],
                ),
              ),
              //input text
            ),
          ),
          //connect button
          Container(
            width: double.infinity,
            height: 80,
            color: Color.fromARGB(255, 66, 66, 66),
            //padding top
            padding: const EdgeInsets.only(top: 15),

            child: Column(
              children: [
                Center(
                  //boton connect
                  child: ElevatedButton(
                    //style width
                    style: ElevatedButton.styleFrom(
                      minimumSize: Size(300, 40),
                    ),
                    onPressed: () {
                      // Perform some action
                    },
                    child: const Text('Connect'),
                  ),
                )
              ],
            ),
          ),
          //disconnected
          Container(
            width: double.infinity,
            height: 80,
            //padding top
            color: Color.fromARGB(255, 66, 66, 66),
            padding: const EdgeInsets.only(top: 15),

            child: Column(
              children: [
                Center(
                  //boton connect
                  child: ElevatedButton(
                    //style width
                    style: ElevatedButton.styleFrom(
                      minimumSize: Size(300, 40),
                    ),
                    onPressed: () {
                      // Perform some action
                    },
                    child: const Text('Disconnect'),
                  ),
                )
              ],
            ),
          ),
          //mesage
          Container(
            width: double.infinity,
            height: 170,
            //padding top
            padding: const EdgeInsets.only(top: 15, bottom: 10),
            color: Color.fromARGB(255, 33, 33, 33),
            child: Column(
              children: [
                Container(
                  padding: const EdgeInsets.only(left: 10, right: 10),
                  child: TextField(
                    style: TextStyle(
                      color: Colors.white,
                    ),
                    maxLines: 5,
                    decoration: InputDecoration(
                      border: OutlineInputBorder(),
                      labelText: 'Message',
                      fillColor: Colors.white,
                      labelStyle: TextStyle(
                        color: Colors.white,
                      ),
                    ),
                  ),
                ),
              ],
            ),
          ),
          //send
          Container(
            width: double.infinity,
            height: 80,
            //padding top
            color: Color.fromARGB(255, 66, 66, 66),
            padding: const EdgeInsets.only(top: 15),

            child: Column(
              children: [
                Center(
                  //boton connect
                  child: ElevatedButton(
                    //style width
                    style: ElevatedButton.styleFrom(
                      minimumSize: Size(300, 40),
                    ),
                    onPressed: () {
                      // Perform some action
                    },
                    child: const Text('Send'),
                  ),
                )
              ],
            ),
          ),
          //creditos
          Container(
            //padding top
            width: double.infinity,
            padding: const EdgeInsets.only(top: 15, bottom: 10),
            color: Color.fromARGB(255, 66, 66, 66),
            child: Column(children: [
              Text(
                  //color white
                  style: TextStyle(
                    color: Colors.white,
                    fontSize: 15,
                  ),
                  'Rt-Thread Nuvoton Android'),
              Text(
                  style: TextStyle(
                    color: Colors.white,
                    fontSize: 10,
                  ),
                  'By Jean Code Imperial'),
            ]),
          )
        ],
      )),
    );
  }
}
