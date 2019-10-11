import React, {Component} from 'react';
import {View,  ImageBackground,StatusBar,Image,TextInput,Text,TouchableOpacity,SafeAreaView, BackHandler} from 'react-native';
import {StyleSheet, Linking} from 'react-native'
import NavigationService from '../../NavigationService'
import { Header, Left, Title, Right, Content, Icon } from 'native-base';

import Toast from 'react-native-root-toast'


const styles = StyleSheet.create({
  btnStyle:{
    width:'70%', height:60, backgroundColor:'#f11', borderWidth:5, borderColor:'white', alignItems:'center', justifyContent:'center',
  },
  btnTextStyle:{
    fontFamily:'Raleway-Bold', fontSize:25, color:'white'
  },
  inputBoxView:{
    flex:1, flexDirection:'column', alignItems:'center', alignContent:'center', justifyContent:'center', paddingHorizontal:10
  },
  inputBoxView1:{
    flex:1, flexDirection:'row', alignItems:'center', alignContent:'center', justifyContent:'center', paddingHorizontal:10
  }
});


export default class DeliverySign extends Component { 
constructor (props){
  super(props);
  this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
}

componentWillUnmount() {
  BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
}

handleBackButtonClick() {
  this.props.navigation.goBack();
  return true;
}

componentDidMount = ()=>{
  BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
}
  deliverysignup = () => {

    var street=this._street._lastNativeText;
    var address="";
    var city=this._city._lastNativeText;
    var state=this._state._lastNativeText;
    var zipcode=this._zipcode._lastNativeText;

    if(street==undefined||city==undefined||state==undefined||zipcode==undefined)
    {
      Toast.show('Input information', {
        position:Toast.positions.CENTER,
        shadow: true,
        animation: true,
        hideOnPress: true,
        delay: 0,
      });
      return;
    }
    global.signup={
      type:'delivery',
      data:{
        street:street,
        address:address,
        city:city,
        state:state,
        zipcode:zipcode,
      }
    };
    NavigationService.navigate('Menu')
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
          
        <ImageBackground source={require('../assets/images/sign/bg.png')} style={{ width: '100%', height: '100%' }}>
              <SafeAreaView style={{width:'100%', height:100, alignItems:'center', paddingTop:0}}>
                <Image source={require('../assets/images/menu/menu_header.png')} style={{height:'100%', width:'70%',}} resizeMode={"contain"}></Image>
              </SafeAreaView>
            <View style={{flex:1, flexDirection:'column', paddingVertical:10}}>
              <View style={{flex:1, alignContent:'center', alignItems:'center', flexDirection:'row'}}>
                <View style={{flex:1, padding:10}}>                  
                  <Image source={require('../assets/images/sign/marker.png')} style={{height:'70%',}} resizeMode={'contain'}></Image>
                </View>
                <View style={{flex:5, borderLeftColor:'#808285', borderLeftWidth:1 , paddingHorizontal:20,}}>
                <Text style={{color:'#000', fontSize:15, fontFamily:'Gotham-Medium', alignSelf:'center', }}>
                  WE NEED A LITTLE MORE INFO BEFORE WE START
                </Text>
                </View>
              </View>
              <View style={{flex:4.3, alignItems:'center', justifyContent:'center', flexDirection:'column',}}>
                <View style={{width:'90%', height:'100%', backgroundColor:'#fff', borderRadius:10,flexDirection:'column',
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 3,
                },
                shadowOpacity: 0.27,
                shadowRadius: 4.65,
                
                elevation: 6}}>
                  <View style={{flex:1, flexDirection:'row', alignItems:'center', alignContent:'center', justifyContent:'center'}}>
                    <Image source={require('../assets/images/sign/car.png')} style={{height:'70%',}} resizeMode={'contain'}></Image>
                    <Text style={{color:'#f00', fontSize:20, fontFamily:'Gotham-Medium'}}>DELIVERY</Text>
                  </View>
                  <View style={styles.inputBoxView}>
                    <View style={styles.inputBoxView1}>
                      <View style={{flex:3,flexDirection:'column'}}>
                        <Text style={{ fontSize:12, fontFamily:'Gotham-Medium', color:'#000'}}>Street addess</Text>
                      </View>
                      <View style={{flex:2,flexDirection:'column'}}>
                      </View>
                    </View>
                    <View style={[styles.inputBoxView1, {flex:1}]}>
                      <View style={{flex:3,flexDirection:'column', alignItems:'flex-start', alignContent:'center', justifyContent:'center'}}>
                        <TextInput ref={(c)=>this._street=c}
                           style={{borderWidth:1, borderColor:'#000', borderRadius:7, width:'100%', height:'100%', paddingVertical:5, paddingLeft:10, fontFamily:'Gotham-Book'}}
                          placeholder="Street addess" placeholderTextColor={'#a7a9ac'}
                        ></TextInput>
                      </View>
                      {/* <View style={{flex:2,flexDirection:'column',alignItems:'center', alignContent:'center', justifyContent:'center'}}>
                        <TextInput  ref={(c)=>this._address=c}
                          style={{borderWidth:1, borderColor:'#000', borderRadius:7, width:'95%', height:'100%', paddingVertical:5, paddingLeft:10, fontFamily:'Gotham-Book'}}
                          placeholder="Apt/Ste/Rm" placeholderTextColor={'#a7a9ac'}></TextInput>
                      </View> */}
                    </View>
                  </View>
                  <View style={styles.inputBoxView}>
                    <View style={styles.inputBoxView1}>
                      <View style={{flex:3,flexDirection:'column'}}>
                        <Text style={{ fontSize:12, fontFamily:'Gotham-Medium', color:'#000'}}>City</Text>
                      </View>
                      <View style={{flex:2,flexDirection:'column'}}>
                        <Text style={{ fontSize:12, fontFamily:'Gotham-Medium', color:'#000'}}>State</Text>
                      </View>
                    </View>
                    <View style={[styles.inputBoxView1, {flex:1}]}>
                      <View style={{flex:3,flexDirection:'column', alignItems:'flex-start', alignContent:'center', justifyContent:'center'}}>
                        <TextInput ref={(c)=>this._city=c} 
                           style={{borderWidth:1, borderColor:'#000', borderRadius:7, width:'95%', height:'100%', paddingVertical:5, paddingLeft:10, fontFamily:'Gotham-Book'}}
                          placeholder="City" placeholderTextColor={'#a7a9ac'}
                        ></TextInput>
                      </View>
                      <View style={{flex:2,flexDirection:'column',alignItems:'center', alignContent:'center', justifyContent:'center'}}>
                        <TextInput  ref={(c)=>this._state=c}
                          style={{borderWidth:1, borderColor:'#000', borderRadius:7, width:'95%', height:'100%', paddingVertical:5, paddingLeft:10, fontFamily:'Gotham-Book'}}
                          placeholder="XX" placeholderTextColor={'#a7a9ac'}></TextInput>
                      </View>
                    </View>
                  </View>
                  <View style={styles.inputBoxView}>
                    <View style={[styles.inputBoxView1]}>                      
                      <Text style={{ fontSize:12, fontFamily:'Gotham-Medium', color:'#000',textAlign:'left', width:'100%'}}>Zip code</Text>
                    </View>
                    <View style={[styles.inputBoxView1, {flex:1}]}>
                      <TextInput ref={(c)=>this._zipcode=c} 
                          style={{borderWidth:1, borderColor:'#000', borderRadius:7, width:'100%', height:'100%', paddingVertical:5, paddingLeft:10, fontFamily:'Gotham-Book'}}
                        placeholder="xxxxx" placeholderTextColor={'#a7a9ac'}
                      ></TextInput>
                    </View>
                  </View>
                  <View style={[styles.inputBoxView, {alignItems:'flex-end', paddingRight:'10%'}]}>
                      <TouchableOpacity onPress={()=>this.deliverysignup()}>
                        <View style={{flexDirection:'row'}}>
                          <Text style={{fontFamily:'Gotham-Medium', color:'#f00'}}>NEXT</Text>
                          <Text style={{fontFamily:'Gotham-Medium', color:'#939598', marginLeft:3}}>></Text>
                        </View>
                      </TouchableOpacity>
                  </View>
                </View>
              </View>
              <View style={{flex:4, alignItems:'center', paddingTop:20}}>
                <TouchableOpacity onPress={()=>this.dialCall()}>
                <Image source={require('../assets/images/sign/delivery_phonenum.png')} style={{height:'80%'}} resizeMode={'contain'}></Image>
                </TouchableOpacity>
              </View>
            </View>
          </ImageBackground>
        </View>
      );
    }
  }
  
