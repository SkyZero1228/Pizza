import React, {Component} from 'react';
import {View,  ImageBackground,StatusBar,Image,Text,BackHandler,Alert, FlatList,TouchableOpacity} from 'react-native';
import NavigationService from '../../NavigationService'
import { SafeAreaView } from 'react-navigation';
import Toast from 'react-native-root-toast'
import Cartitem from './Cartitem'


export default class Cart extends Component { 

  constructor(props){
    super(props);
    this.state={
      loading:true,
      mycart:global.mycart,
    }
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  }

  componentDidMount = ()=>{
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    
    this.focusListener = this.props.navigation.addListener('didFocus', () =>{
      let i=0;
      for(i=0;i<global.mycart.length;i++)
      {
        global.mycart[i].index=i;
      }
      this.setState({mycart:global.mycart});
    });
  }
  
  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  handleBackButtonClick() {
    NavigationService.navigate("Menu");
    return true;
  }

  setActiveTab(index) {
    this.setState({activeTab:index});
  }

  
  calculatePrice = (data)=>{
    let sum=0;
    let i=0;
    for(i=0;i<data.attributes.length;i++)
    {
        att=data.attributes[i];
        sum+=att.count*att.cost;
    }
    sum+=Number(data.price);
    return sum.toFixed(2);
  }
  
  getTotalCost = ()=>{
    let sum=0;
    let i=0;
    for(i=0;i<this.state.mycart.length;i++)
    {
      let cartitem=this.state.mycart[i];
      let ind_cost=this.calculatePrice(cartitem)*cartitem.quantity;
      sum+=ind_cost;
    }
    return sum.toFixed(2);
  }

	itemRemove = (value) => {

    let arr=this.state.mycart;
    let temp=[];

    for(let i=0;i<arr.length;i++)
    {
      if(i!=value)
        temp.push(arr[i]);
    }
    
    this.setState({mycart:temp});
    global.mycart.length=0;
    global.mycart=temp;
	 }

  onitempress = (index) =>{
    Alert.alert(
      '',
      'Do you want remove this item from Cart?',
      [
        {text: 'No', onPress: () => {}, style: 'cancel'},
        {text: 'Yes', onPress: () => {
          this.itemRemove(index);
        }},
      ],
      { cancelable: false }
    );
  }

  cartitem_change_quantity = (num, index) =>{
    let arr=this.state.mycart;

    arr[index].quantity=num;

    this.setState({mycart:arr});
 //   global.mycart.length=0;
    global.mycart=arr;
  }

  onGotoOrderDetail = () =>{
    if(global.mycart.length==0)//||global.signup==undefined)
    {
      Toast.show('Your cart is empty', {
        position:Toast.positions.CENTER,
        shadow: true,
        animation: true,
        hideOnPress: true,
        delay: 0,
      });
      return;
    }
    if(global.signup==undefined)
    {
      Toast.show('You didn\'t select delivery method', {
        position:Toast.positions.CENTER,
        shadow: true,
        animation: true,
        hideOnPress: true,
        delay: 0,
      });
      return;
    }
    if(global.signup.type=="pickup")
    {      
      NavigationService.navigate("OrderDetail_PICKUP");
    }
    else if(global.signup.type=="delivery"){
      NavigationService.navigate("OrderDetail_DELIVERY");
    }
    else if(global.signup.type=="orderin"){
      NavigationService.navigate("OrderDetail_ORDERIN");
    }
  }

    render() {
      return (
        <View style={{flex:1,}}>
          <StatusBar hidden />
          <View style={{width:'100%', height:100,}}>
            <ImageBackground source={require('../assets/images/sign/bg.png')} style={{width:'100%', height:'100%', alignItems:'center', paddingTop:0, resizeMode:'repeat'}}>
              <SafeAreaView style={{width:'100%', alignItems:'center', paddingTop:0,}}>
                <Image source={require('../assets/images/menu/menu_header.png')} style={{height:'100%', width:'70%',}} resizeMode={"contain"}></Image>
                <Text style={{color:'#000',fontFamily:'Gotham-Black',fontSize:22, position:'absolute', bottom:5, fontWeight:'bold'}}>CART</Text>
              </SafeAreaView>
            </ImageBackground>
          </View>
          <View style={{flex:1, flexDirection:'column', alignItems:'center'}}>
            <FlatList style={{width:'100%', backgroundColor:'#eeffff', marginHorizontal:10, }}
              data={this.state.mycart}
              renderItem={({ item }) => (
                  <Cartitem data={item} cost={this.calculatePrice(item)} onitempress={this.onitempress}  cartitem_change_quantity={this.cartitem_change_quantity} />
              )}
              numColumns={1}
              keyExtractor={(item, index) => index}
            />
          </View>          
          <View style={{width:'100%',height:60,padding:5,}}>
            <View style={{flex:1, backgroundColor:'#43bc55',borderRadius:8, flexDirection:'row'}}>
              <TouchableOpacity onPress={()=>this.onGotoOrderDetail()} style={{flex:1, padding:5, flexDirection:'row'}}>
                <Text style={{backgroundColor:'#44aa44', color:'#fff', fontSize:18, textAlign:'center', textAlignVertical:'center', fontFamily:'Gotham-Black', width:40,}}>{this.state.mycart.length}</Text>
                <Text style={{ color:'#fff',flex:1, fontSize:18, textAlign:'center', textAlignVertical:'center', fontFamily:'Gotham-Black', }}>Checkout</Text>
                <Text style={{backgroundColor:'#44aa44', color:'#fff', fontSize:14, textAlign:'center', textAlignVertical:'center', fontFamily:'Gotham-Black', paddingHorizontal:5 }}>${this.getTotalCost()}</Text> 
              </TouchableOpacity>
            </View>
          </View>
        </View>
      );
    }
  }
  
