import 'package:flutter/material.dart';
// import 'package:flutter/widgets.dart';
import '../product_manager.dart';
import './products_admin.dart';

class ProductsPage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
        drawer: Drawer(
          child: Column(
            children: <Widget>[
              AppBar(
                title: Text('Choose'),
                automaticallyImplyLeading: false,
              ),
              ListTile(
                title: Text('Manage Products'),
                onTap: () {
                  Navigator.pushReplacement(
                      context,
                      MaterialPageRoute(
                          builder: (context) => ProductsAdminPage()));
                },
              )
            ],
          ),
        ),
        appBar: AppBar(
          title: Text('Easy List'),
        ),
        body: ProductManager());
  }
}
