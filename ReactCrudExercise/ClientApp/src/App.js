import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { ProductList } from './components/ProductList';
import { AddProduct } from './components/AddProduct';

export default class App extends Component {
  displayName = App.name

  render() {
    return (
      <Layout>
        <Route exact path='/' component={ProductList} />
        <Route path='/addproduct' component={AddProduct} />
        <Route path='/editproduct/:productid' component={AddProduct} />
      </Layout>
    );
  }
}
