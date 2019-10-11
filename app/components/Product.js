import React, {Component} from "react";
import {Animated, Dimensions, FlatList, Text, TouchableOpacity, View,StyleSheet, ImageBackground,SafeAreaView, StatusBar, Image,BackHandler} from "react-native";
import {Body, Icon, List, ListItem as Item, ScrollableTab, Tab, TabHeading, Tabs, Title} from "native-base";
import InputSpinner from './myspinner';
import ProductRecord from './ProductRecord';
import NavigationService from '../../NavigationService';
import Spinner from 'react-native-loading-spinner-overlay';
import Toast from 'react-native-root-toast'
import axios from './Axios'
import {Select, Option} from "react-native-chooser";

const {width: SCREEN_WIDTH} = Dimensions.get("window");
const IMAGE_HEIGHT = 320;
const HEADER_HEIGHT = 0;
const SCROLL_HEIGHT = IMAGE_HEIGHT - HEADER_HEIGHT;
const THEME_COLOR = "rgba(0,0,0,0)";
const FADED_THEME_COLOR = "rgba(0,0,0,0)";

const styles = StyleSheet.create({
  tabbarText:{
    fontFamily:'Gotham-Bold',
    fontSize:14,
    textAlign:'center'
  },
  tabbarstyle:{
    backgroundColor:'rgba(255,255,255,0)',
  }
});

export default class ParallaxDemo extends Component {
  nScroll = new Animated.Value(0);
  scroll = new Animated.Value(0);
  textColor = this.scroll.interpolate({
    inputRange: [0, SCROLL_HEIGHT / 5, SCROLL_HEIGHT],
    outputRange: [THEME_COLOR, FADED_THEME_COLOR, "white"],
    extrapolate: "clamp"
  });
  tabBg = this.scroll.interpolate({
    inputRange: [0, SCROLL_HEIGHT],
    outputRange: [THEME_COLOR, THEME_COLOR],
    extrapolate: "clamp"
  });
  tabY = this.nScroll.interpolate({
    inputRange: [0, SCROLL_HEIGHT, SCROLL_HEIGHT + 1],
    outputRange: [0, 0, 1]
  });
  headerBg = this.scroll.interpolate({
    inputRange: [0, SCROLL_HEIGHT, SCROLL_HEIGHT + 1],
    outputRange: ["transparent", "transparent", THEME_COLOR],
    extrapolate: "clamp"
  });
  imgScale = this.nScroll.interpolate({
    inputRange: [-25, 0],
    outputRange: [1.1, 1],
    extrapolateRight: "clamp"
  });
  imgOpacity = this.nScroll.interpolate({
    inputRange: [0, SCROLL_HEIGHT],
    outputRange: [1, 0],
  });
  tabContent = (x, i) => <View style={{height: this.state.height}}>
    <List onLayout={({nativeEvent: {layout: {height}}}) => {
      this.heights[i] = height;
      if (this.state.activeTab === i) this.setState({height})
    }}>
      {new Array(x).fill(null).map((_, i) => <Item key={i}><Text>Item {i}</Text></Item>)}
    </List></View>;
  heights = [500, 500];
  constructor(props) {
    super(props);
    this.state={
      activeTab:0,
      loading:true,
      product_info:[],
      selecttypeText : "Select Pizza Type",
      selectedtypeId:-1,
      quantity:1,
      extras:[],
      height: 500
    }
    this.nScroll.addListener(Animated.event([{value: this.scroll}], {useNativeDriver: false}));
  
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
    let product_id=this.props.navigation.getParam("product_id","4");
    let url='?req=product-one&products_id='+product_id;

    axios.get(url)
    .then(response => {
      let res=response.data;
      console.log(res);
      if(res.status==true)
      {
        let temp=[];
        this.setState({selectedtypeId:res.product.Prices[0].attributes_id});
        let item=res.product.Prices[0];
        this.setState({selecttypeText:item.sizes.replace("\\","\"")+" "+item.size.replace("\\","\"")+" - $"+item.price});
        if(res.product.extras.length!=0)
        {
          for(i=0;i<res.product.extras.length;i++)
          {
            const item={
              ...res.product.extras[i],
              count:0
            }
            temp.push(item);
          }
        } 
        this.setState({loading:false, product_info:res.product,extras:temp});
      }
      else
      {
        this.setState({loading:false,});
        Toast.show('No data.', {
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
      this.setState({loading:false,});
      Toast.show('Can\'t connect to server.', {
        position:Toast.positions.TOP,
        shadow: true,
        animation: true,
        hideOnPress: true,
        delay: 0,
        onHidden: () => {
          NavigationService.navigate("Intro");
        }
      });
    });

  }

  
  getAttributesByid(id)
  {
    let attributes=[];
    this.state.product_info.extras.forEach(function(element) {
      if(element.attribute_categories_id==id)
      {
        attributes.push(element);
      }
    });
    return attributes;
  }

  setActiveTab(index) {
    this.setState({activeTab:index});
  }
  
  onSelect(value, label) {
    this.setState({selecttypeText : label, selectedtypeId:value});
  }

  getTypefromId = (id)=>{
    let type={};
    for(i=0;i<this.state.product_info.Prices.length;i++)
    {
      const element=this.state.product_info.Prices[i];
      console.log(element.attributes_id+"---"+id);
      if(element.attributes_id==id)
      {
        type=element;
        break;
      }
    }
    return type;
  }

  addCart = () =>{

    if(this.state.selectedtypeId==-1)
    {
      Toast.show('Please select the type.', {
        position:Toast.positions.CENTER,
        shadow: true,
        animation: true,
        hideOnPress: true,
        delay: 0,
      });
      return;
    }

    const selectedType=this.getTypefromId(this.state.selectedtypeId);
    let cartitem = {
      index:0,
      product_id:this.state.product_info.id,
      name:this.state.product_info.name,
      img:this.state.product_info.img,
      description:this.state.product_info.description,
      type:this.state.selectedtypeId,
      type_name:selectedType.sizes+" "+selectedType.size,
      price:selectedType.price,
      quantity:this.state.quantity,
    };
    let attributes=[];

    let temp=this.state.extras;

    for(i=0;i<temp.length;i++)
    {
      if(temp[i].count!=0)
        attributes.push(temp[i]);
    }

    cartitem={
      ...cartitem,
      attributes:attributes,
    };

    global.mycart.push(cartitem);
    
    NavigationService.navigate('Cart');
  }

  onCountChangeAttribute = (num, id)=>{
    let temp=this.state.extras;

    for(i=0;i<temp.length;i++)
    {
      if(temp[i].extra_attributes_id==id)
      {
        temp[i].count=num;
        break;
      }
    }
    this.setState({extras:temp});
  }

  render() {
    return (
      
    <View style={{flex:1,}}>
      <ImageBackground source={require('../assets/images/sign/bg.png')} style={{width:'100%', height:'100%', paddingTop:0, resizeMode:'repeat'}}>
        <StatusBar hidden />
        <Spinner color={'#000'}
          visible={this.state.loading} 
          textContent={'Loading...'}
          textStyle={{color:'#000'}}
        />
        <View style={{width:'100%', height:100,borderBottomWidth:1}}>            
            <SafeAreaView style={{width:'100%', alignItems:'center', paddingTop:0,}}>
              <Image source={require('../assets/images/menu/menu_header.png')} style={{height:'100%', width:'70%',}} resizeMode={"contain"}></Image>
              <Text style={{color:'#000',fontFamily:'Gotham-Black',fontSize:22, position:'absolute', bottom:0, fontWeight:'bold'}}>{this.state.product_info.name}</Text>
            </SafeAreaView>
        </View>
        <View style={{flex:1}}>
          <Animated.ScrollView
            scrollEventThrottle={5}
            showsVerticalScrollIndicator={false}
            onScroll={Animated.event([{nativeEvent: {contentOffset: {y: this.nScroll}}}], {useNativeDriver: true})}
            style={{zIndex: 0}}>
            <Animated.View style={{
              transform: [{translateY: Animated.multiply(this.nScroll, 0.65)}, {scale: this.imgScale}],
              backgroundColor: 'rgba(0,0,0,0)'
            }}>
              <Animated.View
                style={{ width: "100%", opacity: this.imgOpacity,backgroundColor:'rgba(0,0,0,0)' }}>
                  <View style={{width:'100%', height:220,backgroundColor:'rgba(0,0,0,0)'}}>
                <Image source={{uri:this.state.product_info.img}} style={{width:'100%', height:'100%', alignItems:'center', paddingTop:10,}} resizeMode={"cover"}>
                  </Image>
                </View>
                {!this.state.loading&&
                  <View style={{margin:5, width:'95%', backgroundColor:'rgba(255,255,255,0.7)', borderRadius:10, flexDirection:'column', borderWidth:1, borderColor:'#000', paddingVertical:8, paddingHorizontal:20,}}>
                    <Text style={[{color:'#000', fontFamily:'Gotham-Bold', alignSelf:'flex-start'},this.state.product_info.extras_category==undefined?{fontSize:25,}:{fontSize:18,}]}>{this.state.product_info.name}</Text>
                    <Text style={[{color:'#000', fontFamily:'MyriadPro-Regular',alignSelf:'flex-start'},this.state.product_info.extras_category==undefined?{fontSize:22,}:{fontSize:14,}]}>{!this.state.loading&&this.state.product_info.description.toString().replace(/<(.|\n)*?>/g, '').replace("&nbsp;",'')}</Text>
                    
                    <Select
                        onSelect = {this.onSelect.bind(this)}
                        defaultText={this.state.selecttypeText}
                        style = {{borderWidth : 1,borderColor:'#000', width:'100%', paddingVertical:3,}}
                        transparent={true}
                        backdropStyle={{backgroundColor:'rgba(0,0,0,0.7)'}}
                        textStyle = {{fontSize:16}}
                        optionListStyle = {{backgroundColor : "#F5FCFF", width:'80%'}}
                      >
                        {
                        this.state.product_info.Prices.map((item, key) => {
                          return(
                            <Option key={key} value = {item.attributes_id}>{item.sizes.replace("\\","\"")} {item.size.replace("\\","\"")} - ${item.price}</Option>
                          )
                          })
                        }
                    </Select>
                  </View>
                    }
              </Animated.View>              
            </Animated.View>
            {!this.state.loading&&this.state.product_info.extras_category!=undefined&&
            <ImageBackground source={require('../assets/images/sign/bg.png')} style={{width:'100%', height:'100%', paddingTop:0, resizeMode:'repeat'}}>
            <Tabs tabContainerStyle={{height:40,backgroundColor:'rgba(0,0,0,0)'}}
              prerenderingSiblingsNumber={3}
              onChangeTab={({i}) => {
                this.setState({activeTab: i})
              }}
              renderTabBar={(props) => 
              <Animated.View style={{transform: [{translateY: this.tabY}], zIndex: 1, width: "100%", backgroundColor: "rgba(0,0,0,0)"}}>
                <ScrollableTab {...props} style={{backgroundColor:'rgba(0,0,0,0)'}}
                  renderTab={(name, page, active, onPress, onLayout) => (
                    <TouchableOpacity key={page}
                                      onPress={() => onPress(page)}
                                      onLayout={onLayout}
                                      activeOpacity={0.4}>
                      <Animated.View
                        style={{
                          flex: 1,
                          alignItems:'center',
                          justifyContent:'center',
                          backgroundColor: this.tabBg
                        }}>
                        <TabHeading scrollable
                                    style={styles.tabbarstyle}
                                    active={active}>
                          <Animated.Text style={[styles.tabbarText,active?{color:'#8a0400'}:{color:'#000'}]}>
                            {name}
                          </Animated.Text>
                        </TabHeading>
                      </Animated.View>
                    </TouchableOpacity>
                  )}
                  underlineStyle={{backgroundColor:'#8a0400', height:4}}/>
              </Animated.View>
              }>
              {
                this.state.product_info.extras_category.map((item, key) => {
                  return(
                    <Tab key={key.toString()} tabStyle={{backgroundColor:'rgba(0,0,0,0)'}}
                    activeTabStyle={{backgroundColor:'rgba(0,0,0,0)', }}
                      heading={item.name}
                      // {
                      //   <TabHeading style={styles.tabbarstyle}>
                      //     <Text style={[styles.tabbarText,this.state.activeTab==key?{color:'#8a0400'}:{color:'#000'}]}></Text>
                      //   </TabHeading>
                      // }
                      >
                        
                      <ImageBackground source={require('../assets/images/sign/bg.png')} style={{flex:1, paddingTop:0, resizeMode:'repeat'}}>
                        <FlatList style={{width:'100%',backgroundColor:'rgba(0,0,0,0.0)',}}
                        data={this.getAttributesByid(item.attribute_categories_id)}
                        renderItem={({ item }) => (
                            <ProductRecord data={item} onCountChange={(num)=>this.onCountChangeAttribute(num, item.extra_attributes_id)} />
                        )}
                        numColumns={1}
                        keyExtractor={(item, index) => index.toString()}
                      /> 
                      </ImageBackground>
                    </Tab>
                  )
                })
              }
            </Tabs>
            </ImageBackground>
            }
          </Animated.ScrollView>
          <SafeAreaView style={{height:50, width:'100%', flexDirection:'column',paddingHorizontal:20, backgroundColor:'rgba(0,0,0,0)'}}>
                <Text style={{fontFamily:'Gotham-Bold', fontSize:13}}>Quantity</Text>
                <View style={{flex:1, flexDirection:'row'}}>
                  <InputSpinner max={100} types={true}
                    min={1}  value={1}
                    step={1} width={100} height={30} colorLeft={'#4d4d4d'} colorRight={'#008c62'}
                    color={"white"} background={'white'}
                    textColor={"#000"} fontSize={14} inputStyle={{padding:0}}
                    showBorder={true} rounded={false} onChange={(num)=>this.setState({quantity:num})}
                    buttonTextColor={"#fff"} buttonFontSize={18}/>
                    <View style={{flex:1, paddingHorizontal:20,}}>
                    <TouchableOpacity style={{backgroundColor:'#8a0400', height:30, borderRadius:7,alignItems:'center', justifyContent:'center', flexDirection:'row'}} onPress={()=>this.addCart()}>
                      <Text  style={{fontFamily:'Gotham-Bold', fontSize:13, color:'#fff'}}>Add to Cart
                      </Text><Icon name="ios-return-right" type="Ionicons" style={{marginLeft:20, color:'#fff'}}></Icon>
                    </TouchableOpacity>
                    </View>
                </View>
            </SafeAreaView>
        </View>
      </ImageBackground>
    </View>
    )
  }
}