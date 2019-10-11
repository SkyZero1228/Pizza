import React, {Component} from 'react';
import {View,  ImageBackground,StatusBar,Image,Text,BackHandler,Alert, FlatList,TouchableOpacity,ScrollView} from 'react-native';
import NavigationService from '../../NavigationService'
import { SafeAreaView } from 'react-navigation';
import {Icon} from 'native-base'
import axios from './Axios'
import Toast from 'react-native-root-toast'
import DeviceInfo from 'react-native-device-info';
import Spinner from 'react-native-loading-spinner-overlay';

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export default class MyFavourites extends Component { 

  constructor(props){
    super(props);
    this.state={
      loading:true,
      favourites:[],
    }
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  }

  componentDidMount = ()=>{
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);

    const uniqueId = DeviceInfo.getUniqueID();
    console.log(uniqueId);
    axios.get('?req=get-favourites&phoneid='+uniqueId)
    .then(response => {
    let res=response.data;
    console.log(res);
    if(res.status==true)
    {
        this.setState({loading:false, favourites:res.favourites});
    }
    else
    {
      this.setState({loading:false});
      Toast.show('Can\'t get Data from server. Try again.', {
        position:Toast.positions.CENTER,
        shadow: true,
        animation: true,
        hideOnPress: true,
        delay: 0,
        onHidden: () => {
          this.props.navigation.goBack(null);
        }
      });
    }
  })
  .catch(function (error) {
    this.setState({loading:false});
    Toast.show('Can\'t connect to server.', {
      position:Toast.positions.TOP,
      shadow: true,
      animation: true,
      hideOnPress: true,
      delay: 0,
      onHidden: () => {
        this.props.navigation.goBack(null);
      }
    });
  });

  }
  
  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  handleBackButtonClick() {
    NavigationService.navigate("Intro");
    return true;
  }

  

    render() {
      return (
        <View style={{flex:1, backgroundColor:'#fff'}}>
          <StatusBar hidden />
          <Spinner color={'#000'}
            visible={this.state.loading} 
            textContent={'Loading...'}
            textStyle={{color:'#000'}}
          />
          <ImageBackground source={require('../assets/images/sign/bg.png')} style={{width:'100%', height:'100%', resizeMode:'repeat'}}>
              <SafeAreaView style={{width:'100%', height:100, alignItems:'center', paddingTop:0, borderBottomWidth:1, borderColor:'#888'}}>
                <Image source={require('../assets/images/menu/menu_header.png')} style={{height:'100%', width:'70%',}} resizeMode={"contain"}></Image>
                <Text style={{color:'#000',fontFamily:'Gotham-Black',fontSize:22, position:'absolute', bottom:5, fontWeight:'bold'}}>MY FAVORITES</Text>
              </SafeAreaView>

              <ScrollView style={{flex:1, flexDirection:'column', paddingTop:10,}}>
                {
                  this.state.favourites.map ((item,key)=>{
                    return (
                      <TouchableOpacity 
                        style={{flex:1,flexDirection:'row', marginBottom:10,backgroundColor:'rgba(255,255,255,0.6)', borderColor:'#888', borderBottomWidth:0.5, borderTopWidth:0.5}}  key={key}
                        onPress={()=>NavigationService.navigate("Product",{product_id:item.products_id})}>
                        <Image source={{uri:item.img}} style={{width:'25%',aspectRatio:1, marginLeft:20,}}></Image>
                        <Text style={{textAlign:'left', marginLeft:10, fontSize:18,textAlignVertical:'center'}}> {item.name}</Text>
                        <Text style={{textAlign:'right',fontSize:18,marginRight:20, flex:1, textAlignVertical:'center'}}> Count:{item.count} </Text>
                      </TouchableOpacity>
                    );
                  })
                }
              </ScrollView>

          </ImageBackground>
        
        </View>
        
      );
    }
  }
  
