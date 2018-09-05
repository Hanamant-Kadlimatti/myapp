// import React from 'react';
// import { StyleSheet, Text, View } from 'react-native';
// import {CreateStackNavigator, TabNavigator, createBottomTabNavigator} from 'react-navigation';
// import { FontAwesome  } from "@expo/vector-icons";


// import ListTab from './allcomponents/ListTab';
// import SearchTab from './allcomponents/SearchTab';
// import Item from './allcomponents/Item';

import React from "react";
import { createStore, applyMiddleware } from "redux";
import { Provider, connect } from "react-redux";
import AppWithNavigationState, { middleware } from "./containers/AppNavigator";
import rootReducer from "./reducers";
import createSagaMiddleware from "redux-saga";
import {productWatchers} from "./sagas/product";

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  rootReducer,
  {
    productState: { 
    products: [],
    product: {},
    isLoading: false,
    isRefreshing: false,
    page: 1,
    limit:8
 },
    storeState: { stores: [], isLoading: false }
  },
  applyMiddleware(middleware, sagaMiddleware)
);
sagaMiddleware.run(productWatchers);

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
      <AppWithNavigationState />
    </Provider>
    );
  }
}


