import 'package:flutter/material.dart';

import './pages/product.dart';

void main() {}

class Products extends StatelessWidget {
  final List<Map<String, String>> products;
  final Function deleteProduct;
  Products(this.products, {this.deleteProduct}); // list can't will change

  Widget _buildProductItem(BuildContext context, int index) {
    return Card(
      child: Column(
        children: <Widget>[
          Image.asset(products[index]['image']),
          Text(products[index]['title']),
          ButtonBar(
            alignment: MainAxisAlignment.center,
            children: <Widget>[
              FlatButton(
                child: Text('Details'),
                onPressed: () => Navigator.push<bool>(
                        context,
                        MaterialPageRoute(
                            builder: (context) => ProductPage(
                                products[index]['title'],
                                products[index]['image']))).then((bool value) {
                      if (value) {
                        deleteProduct(index);
                        // print(value);
                      }
                    }),
              )
            ],
          )
        ],
      ),
    );
  }

  Widget _buildProductsList() {
    Widget productCard;
    if (products.length > 0) {
      productCard = ListView.builder(
        itemBuilder: _buildProductItem,
        itemCount: products.length,
      );
    } else {
      productCard = Center(
        child: Text('No products found, please add some'),
      );
      /* Don't render anything, empty container */
      // productCard = Container();
    }
    return productCard;
  }

  @override
  Widget build(BuildContext context) {
    return _buildProductsList();
  }
}
