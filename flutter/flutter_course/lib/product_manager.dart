import 'package:flutter/material.dart';

import './products.dart';

class ProductManager extends StatefulWidget {
  final String startingProduct;
  ProductManager(this.startingProduct); // constructor

  @override
  State<StatefulWidget> createState() {
    return _ProductManagerState();
  }
}

class _ProductManagerState extends State<ProductManager> {
  List<String> _products = [];

  @override
  void initState() { // init state
    _products.add(widget.startingProduct); // get props from 
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return Column(children: [
      Container(
        margin: EdgeInsets.all(10.0),
        child: RaisedButton(
          onPressed: () {
            setState(() {
              _products.add("Advanced Food Tester");
            });
          },
          child: Text('Add Product'),
        ),
      ),
      Products(_products)
    ]);
  }
}
