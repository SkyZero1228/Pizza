import React, {Component} from 'react';
import {View,  ImageBackground,StatusBar,Image,Dimensions,Text,TouchableOpacity,FlatList,TextInput,ScrollView, BackHandler} from 'react-native';
import {StyleSheet} from 'react-native'
import NavigationService from '../../NavigationService'
import {Item, Icon, Input,Button} from 'native-base'
import Carousel,{Pagination} from 'react-native-snap-carousel';

var {height, width} = Dimensions.get('window');
import Toast from 'react-native-root-toast'
import axios from './Axios'
import Spinner from 'react-native-loading-spinner-overlay';


const styles = StyleSheet.create({
  imageStyle:{
    justifyContent: 'center',
    alignItems: 'center',
    width:'100%', height:'100%', borderRadius:10
  }
});

export default class Submenu extends Component { 
  constructor(props){
    super(props);
    this.state={
      loading:true,
      slider1ActiveSlide: 0,
      sliderimages:[],
      serviceItems:[],
      menuname:"",
      keyword:""
    }
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
    let keyword=this.props.navigation.getParam("keyword","");
    this.getList(keyword);
  }

  getList = (keyword)=>{
    this.setState({loading:true});
    this.setState({menuname:this.props.navigation.getParam("menuname","")});
    let catId=this.props.navigation.getParam("catId","");
    let url="";

    if(keyword=="")
    {
      url='?req=product-by-category&categories_id='+catId;
    }
    else
    {
      url='?req=product-search&categories_id='+catId+'&keyword='+keyword;
    }

    axios.get(url)
    .then(response => {
    let res=response.data;
    console.log(res);
    if(res.status==true)
    {
      this.setState({loading:false, sliderimages:res.sliders, serviceItems:res.products,});
      if(keyword!="")
        this.setState({menuname:"Search Results"});
    }
    else
    {
      this.setState({loading:false, sliderimages:res.sliders, serviceItems:res.products,menuname:res.category_name});
      if(keyword!="")
        this.setState({menuname:"Search Results"});
      Toast.show('No data.', {
        position:Toast.positions.CENTER,
        shadow: true,
        animation: true,
        hideOnPress: true,
        delay: 0,
      });
    }
  })
  .catch(function (error) {
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

  setActiveSlide(index) {
    this.setState({slider1ActiveSlide:index});
  }

  _renderItem ({item, index}) {
    return (
        <View style={{flex:1, backgroundColor:'#000'}}>
              <ImageBackground source={{uri:item.img_url}} imageStyle={{resizeMode:'stretch'}} style={{width:'100%', height:'100%'}}>
                {/* <LinearGradient start={{x:0, y: 1}} end={{x: 0, y: 0.6}} colors={['rgba(0,0,0,0.8)', 'rgba(0,0,0,0)']} style={{flex:1}}>
                </LinearGradient> */}
              </ImageBackground>
        </View>
    );
}

searchProduct = (keyword)=>{
  this.getList(keyword);
}
    render() {
      return (
        <View style={{flex:1, backgroundColor:'#eeffff'}}>
          <StatusBar hidden />
          <Spinner color={'#000'}
            visible={this.state.loading} 
            textContent={'Loading...'}
            textStyle={{color:'#000'}}
          />
          <View style={{width:'100%', height:100,}}>
            <ImageBackground source={require('../assets/images/sign/bg.png')} style={{width:'100%', height:'100%', alignItems:'center', paddingTop:10, resizeMode:'repeat'}}>
            <Image source={require('../assets/images/menu/menu_header.png')} style={{height:'70%', width:'70%',}} resizeMode={"stretch"}></Image>
            <Text style={{color:'#000',fontFamily:'Gotham-Black',fontSize:22, position:'absolute', bottom:10, fontWeight:'bold'}}>{this.state.menuname}</Text>
            </ImageBackground>
          </View>
          <View style={{flex:1, flexDirection:'column', alignItems:'center'}}>
            <Item rounded style={{paddingLeft:10, height:40, width:'95%', borderColor:'#aaa',fontFamily:'Gotham-Medium', borderRadius:8, marginBottom:5, }}>
              <Icon active name='search' />
              <TextInput placeholder='Search For Products' style={{paddingVertical:0,}} ref={(c)=>this._searchbox=c}  onSubmitEditing={(event) => this.searchProduct( event.nativeEvent.text)} />
            </Item>
            
            <ScrollView style={{flex:1}}>
            
            <View style={{width:'100%', aspectRatio:1,}}>
              <Carousel
                      ref={(c) => { this._carousel = c; }}
                      data={this.state.sliderimages}
                      renderItem={this._renderItem}
                      sliderWidth={width}
                      itemWidth={width} 
                      loop={true}
                      inactiveSlideScale={1}
                      inactiveSlideOpacity={1}
                      autoplay={false}
                      onSnapToItem={(index) => {this.setActiveSlide(index);}}
                  />
                  <Pagination
                    dotsLength={this.state.sliderimages.length}
                    activeDotIndex={this.state.slider1ActiveSlide}
                    containerStyle={{ paddingVertical: 8}}
                    dotColor={'rgba(150, 150, 150, 1)'}
                    dotStyle={{width: 8, height: 8, borderRadius: 4, marginHorizontal: 8}}
                    inactiveDotColor={'#777'}
                    inactiveDotOpacity={0.4}
                    inactiveDotScale={0.6}
                    carouselRef={this._slider1Ref}
                    tappableDots={!!this._slider1Ref}
                  />
            </View>
            <View style={{flex:1,width:'100%',justifyContent: 'center', alignItems:'center',}}>
              <FlatList style={{marginBottom:10,}}
                data={this.state.serviceItems}
                renderItem={({ item }) => (
                  <Button transparent onPress={()=>NavigationService.navigate("Product", {product_id:item.id})} style={{margin: 1, padding:5,paddingBottom:0, height:width/2.3, width:width/2.1, borderRadius:10, alignItems:'center', justifyContent:'center'}}>
                      <Image style={{ justifyContent: 'center',
                                        alignItems: 'center',
                                        width:'100%', height:'100%', borderRadius:10}}
                                        source={
                                          {uri:item.img} 
                                        } onError={(e) => {
                                          this.props.source = require('../assets/images/notfound.png')}}/>
                      <View style={{backgroundColor:'rgba(0,0,0,0.5)', width:'100%', height:40, position:'absolute', bottom:0,justifyContent: 'center',alignItems: 'center',alignSelf:'center', borderBottomLeftRadius:10, borderBottomRightRadius:10}}>
                        <Text style={{color:'#fff',fontFamily:'Gotham-Medium',fontSize:18,textAlign:'center'}}>{item.name}</Text>
                      </View>
                  </Button>
                )}
                //Setting the number of column
                numColumns={2}
                keyExtractor={(item, index) => index}
              />
            </View>
          
            </ScrollView>
          </View>         
          
          <View style={{height:60, width:'100%'}}>
                <ImageBackground source={require('../assets/images/intro/bg_footer.png')} style={{width:'100%', height:'100%'}}>
                  <View style={{flex:1, flexDirection:'row'}}>
                    <TouchableOpacity style={{flex:1, padding:10, alignItems:'center'}} onPress={()=>NavigationService.navigate("Menu")}>
                      <Image source={require('../assets/images/menu.png')} style={{height:'100%',}} resizeMode={'contain'}></Image>
                    </TouchableOpacity>
                    <TouchableOpacity style={{flex:1, padding:10, alignItems:'center'}} onPress={()=>NavigationService.navigate('Cart')}>
                        <Image source={require('../assets/images/cart.png')} style={{height:40,}} resizeMode={'contain'}></Image>
                      </TouchableOpacity>
                    <TouchableOpacity style={{flex:1, padding:10, alignItems:'center'}} onPress={()=>NavigationService.navigate("MyOrders")}>
                      <Image source={require('../assets/images/order-s.png')} style={{height:'100%',}} resizeMode={'contain'}></Image>
                    </TouchableOpacity>
                    <TouchableOpacity style={{flex:1, padding:10, alignItems:'center'}} onPress={()=>NavigationService.navigate("MyFavourites")}>
                      <Image source={require('../assets/images/fav.png')} style={{height:'100%',}} resizeMode={'contain'}></Image>
                    </TouchableOpacity>
                    <TouchableOpacity style={{flex:1, padding:10, alignItems:'center'}} onPress={()=>NavigationService.navigate("Location")}>
                      <Image source={require('../assets/images/direc.png')} style={{height:'100%',}} resizeMode={'contain'}></Image>
                    </TouchableOpacity>
                  </View>
                  
                </ImageBackground>
              </View>
        </View>
      );
    }
  }
  
