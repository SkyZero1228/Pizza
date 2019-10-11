import React, {Component} from 'react';
import {View,  Image,Text,Dimensions,TouchableOpacity,ImageBackground} from 'react-native';

var {height, width} = Dimensions.get('window');

export default class ProductRecord extends Component { 
    constructor () {
        super()
        this.state = {
            showButton:true,
            count:0,
        }
    }

    setCount = (num)=>{
        this.setState({count:num});
        this.props.onCountChange(num);
    }
    render () {
    console.log(this.props.data);
return (
    <ImageBackground source={require('../assets/images/sign/bg.png')} style={{flex:1, paddingTop:0, resizeMode:'repeat'}}>
    <View style={{flex:1, backgroundColor:'rgba(0,0,0,0)', flexDirection:'row', padding:5, borderBottomWidth:1, borderBottomColor:'grey'}}>
        <View style={{flex:3, flexDirection:'row'}}>            
            {/* <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                <Image style={{width:'90%',height:width/6}} resizeMode={'contain'} source={{uri:this.props.data.img}}/>
            </View> */}
            <View style={{flex:2, flexDirection:'column',paddingLeft:10, backgroundColor:'rgba(0,0,0,0)',justifyContent:'flex-start'}}>
                <Text style={[{fontFamily:'Gotham-Book',  fontSize:16, fontWeight:'bold'},this.state.count!=0?{color:'#0a0',}:{color:'#a00'}]}>{this.props.data.name}</Text>
                {/* <Text style={[{fontFamily:'Gotham-Book',fontSize:14, fontWeight:'bold'},this.state.count!=0?{color:'#0a0',}:{color:'#a00'}]}>  {this.props.data.description}
                </Text>                 */}
                <Text style={[{fontFamily:'Gotham-Book', fontSize:14, fontWeight:'bold'},this.state.count!=0?{color:'#0a0',}:{color:'#a00'}]}>Cost:${this.props.data.cost}    X{this.state.count.toString()}
                </Text>
            </View>
        </View>
         <View style={{flex:1.5, marginRight:10,}}>
             {this.state.showButton&&
             <View style={{flex:1, justifyContent:'center', alignItems:'center', flexDirection:'row'}}>
            <TouchableOpacity style={{backgroundColor:'#008c62', padding:5, borderBottomLeftRadius:10,borderTopLeftRadius:10}}><Text style={{color:'#fff', fontFamily:'Gotham-Bold'}} onPress={()=>this.setCount(1)}>Yes</Text></TouchableOpacity>
            <TouchableOpacity style={{backgroundColor:'#4d4d4d', padding:5,}} onPress={()=>this.setCount(0)}><Text style={{color:'#fff', fontFamily:'Gotham-Bold'}}>No</Text></TouchableOpacity>
            <TouchableOpacity style={{backgroundColor:'#8a0400', padding:5, borderBottomRightRadius:10,borderTopRightRadius:10}} onPress={()=>this.setCount(this.state.count+1)}><Text style={{color:'#fff', fontFamily:'Gotham-Bold'}}>Extra</Text></TouchableOpacity>
            </View>
             }
         </View>
    </View>
    </ImageBackground>
)}
}