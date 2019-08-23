import 'package:flutter/material.dart';

import './product_manager.dart';

void main() => runApp(MyApp());

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
          appBar: AppBar(
            title: Text('Easy List'),
          ),
          body: ProductManager('Food Tester')),
    );
  }
}

/*
  Video: 343,
  min: 6:18
 */