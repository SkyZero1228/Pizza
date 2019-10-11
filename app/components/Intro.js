import React, {Component} from 'react';
import {View,  ImageBackground,StatusBar,Image,Platform,Text,TouchableOpacity,Linking} from 'react-native';
import {StyleSheet} from 'react-native'
import NavigationService from '../../NavigationService'
import { SafeAreaView } from 'react-native';
import { Button } from 'native-base';


const styles = StyleSheet.create({
  btnStyle:{
    width:'70%', height:60, backgroundColor:'#f11', borderWidth:5, borderColor:'white', alignItems:'center', justifyContent:'center',
  },
  btnTextStyle:{
    fontFamily:'Raleway-Bold', fontSize:25, color:'white'
  }
});

dialCall = () => {
 
  let phoneNumber = '';

  if (Platform.OS === 'android') {
    phoneNumber = 'tel:${2398888881}';
  }
  else {
    phoneNumber = 'telprompt:${1234567890}';
  }

  Linking.openURL(phoneNumber);
};


export default class Intro extends Component { 
  componentDidMount = () =>{
    global.mycart=[];
  }
  dialCall = () => {
 
    let phoneNumber = '';
  
    if (Platform.OS === 'android') {
      phoneNumber = 'tel:${2398888881}';
    }
    else {
      phoneNumber = 'telprompt:${2398888881}';
    }
  
    Linking.openURL(phoneNumber);
  };
    render() {
      return (
        
        <View style={{flex:1}}>
          <StatusBar hidden />
          <ImageBackground source={require('../assets/images/intro/bg.png')} style={{width:'100%', height:'100%'}}>
            <SafeAreaView style={{flex:1}} forceInset={{bottom:'always', top:'always'}}>
              <View style={{flex:1, flexDirection:'column',paddingTop:10,}}>
                <View style={{flex:3, alignContent:'center', alignItems:'center', paddingTop:0}}>
                  <Image source={require('../assets/images/intro/car.png')} resizeMode={'contain'} style={{height:'90%', width:'90%',}} ></Image>
                </View>
                <View style={{flex:3.4, alignItems:'center', justifyContent:'space-evenly', flexDirection:'column'}}>
                  <TouchableOpacity style={styles.btnStyle} onPress={()=>{NavigationService.navigate('PickupSign')}}>
                    <Text style={styles.btnTextStyle}>PICK UP</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.btnStyle} onPress={()=>{NavigationService.navigate('DeliverySign')}}>
                    <Text style={styles.btnTextStyle}>DELIVERY</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.btnStyle}  onPress={()=>{NavigationService.navigate('OrderinSign')}}>
                    <Text style={styles.btnTextStyle}>ORDER IN, SIT IN</Text>
                  </TouchableOpacity>
                </View>
                <View style={{flex:2.5, paddingLeft:30,paddingRight:30,}}>
                  <View style={{flex:1,}}>
                    
                  <ImageBackground source={require('../assets/images/intro/table.png')} style={{height:'100%', width:'100%',flexDirection:'row'}} resizeMode={'contain'}>
                    <Button transparent style={{width:'50%',height:'30%', position:'absolute', bottom:'11%',left:0, }}  onPress={()=>{this.dialCall()}}/>
                    <Button transparent style={{width:'50%',height:'80%', position:'absolute', bottom:'11%', right:0,}} onPress={()=>{ NavigationService.navigate('Location') }}/>
                  </ImageBackground>

                  </View>
                </View>
              </View>         
            </SafeAreaView>
                  <ImageBackground source={require('../assets/images/intro/bg_footer.png')} style={{width:'100%',}}>
            <SafeAreaView style={{backgroundColor:'transparent',flex:0}}>            
               <View style={{height:60, width:'100%'}}>
                    <View style={{flex:1, flexDirection:'row'}}>
                      <TouchableOpacity style={{flex:1, padding:10, alignItems:'center'}} onPress={()=>NavigationService.navigate('Menu')}>
                        <Image source={require('../assets/images/menu.png')} style={{height:40,}} resizeMode={'contain'}></Image>
                      </TouchableOpacity>
                      <TouchableOpacity style={{flex:1, padding:10, alignItems:'center'}} onPress={()=>NavigationService.navigate('Cart')}>
                        <Image source={require('../assets/images/cart.png')} style={{height:40,}} resizeMode={'contain'}></Image>
                      </TouchableOpacity>
                      <TouchableOpacity style={{flex:1, padding:10, alignItems:'center'}} onPress={()=>NavigationService.navigate("MyOrders")}>
                        <Image source={require('../assets/images/order-s.png')} style={{height:40,}} resizeMode={'contain'}></Image>
                      </TouchableOpacity>
                      <TouchableOpacity style={{flex:1, padding:10, alignItems:'center'}} onPress={()=>NavigationService.navigate("MyFavourites")}>
                        <Image source={require('../assets/images/fav.png')} style={{height:40,}} resizeMode={'contain'}></Image>
                      </TouchableOpacity>
                      <TouchableOpacity style={{flex:1, padding:10, alignItems:'center'}} onPress={()=>NavigationService.navigate("Location")}>
                        <Image source={require('../assets/images/direc.png')} style={{height:40,}} resizeMode={'contain'}></Image>
                      </TouchableOpacity>
                    </View>
                    
                </View>
            </SafeAreaView>
                  </ImageBackground>
          </ImageBackground>
        </View>
      );
    }
  }
  
