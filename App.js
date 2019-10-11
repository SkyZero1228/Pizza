/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {createStackNavigator,createAppContainer } from 'react-navigation';
import NavigationService from './NavigationService';

import { YellowBox } from 'react-native';
YellowBox.ignoreWarnings(['ViewPagerAndroid']);

import Intro from './app/components/Intro'
import DeliverySign from './app/components/DeliverySign'
import PickupSign from './app/components/PickupSign'
import Menu from './app/components/Menu'
import Submenu from './app/components/Submenu'
import Cart from './app/components/Cart'
import Product from './app/components/Product'
import OrderDetail_PICKUP from './app/components/OrderDetail_PICKUP'
import OrderDetail_DELIVERY from './app/components/OrderDetail_DELIVERY'
import OrderTracking from './app/components/OrderTracking'
import Location from './app/components/Location'
import MyOrders from './app/components/MyOrders'
import OrderDetail_ORDERIN from './app/components/OrderDetail_ORDERIN'
import OrderinSign from './app/components/OrderinSign'
import MyFavourites from './app/components/MyFavourites'
console.disableYellowBox = true;
const ActivityProject = createStackNavigator(
  {
    Intro: { screen: Intro,navigationOptions: {header: null,}, },
    DeliverySign: { screen: DeliverySign,navigationOptions: {header: null,}, },
    PickupSign: { screen: PickupSign,navigationOptions: {header: null,}, },
    Menu: { screen: Menu,navigationOptions: {header: null,}, },
    Submenu: { screen: Submenu,navigationOptions: {header: null,}, },
    Cart: { screen: Cart,navigationOptions: {header: null,}, },
    Product: { screen: Product,navigationOptions: {header: null,}, },
    OrderDetail_PICKUP:{screen:OrderDetail_PICKUP, navigationOptions: {header: null,}, },
    OrderDetail_DELIVERY:{screen:OrderDetail_DELIVERY, navigationOptions: {header: null,}, },
    OrderTracking:{screen:OrderTracking, navigationOptions: {header: null,}, },
    MyOrders:{screen:MyOrders, navigationOptions: {header: null,}, },
    Location:{screen:Location, navigationOptions: {header: null,}, },
    OrderinSign:{screen:OrderinSign, navigationOptions: {header: null,}, },
    MyFavourites:{screen:MyFavourites, navigationOptions: {header: null,}, },
    OrderDetail_ORDERIN:{screen:OrderDetail_ORDERIN, navigationOptions: {header: null,}, },
  },
  {
    initialRouteName: "Intro",
    headerLayoutPreset: 'center'
  },
);

  
const AppContainer = createAppContainer(ActivityProject)

export default class App extends Component { 
  render() {
    return <AppContainer ref={navigatorRef => {
      NavigationService.setTopLevelNavigator(navigatorRef);
    }} />;
  }
}

