import React, {Component} from 'react';
import {View,  Image,Text,Dimensions,TouchableOpacity} from 'react-native';
import InputSpinner from './myspinner';
import { Icon } from 'native-base';

var {height, width} = Dimensions.get('window');

export default class Carditem extends Component { 

    cartitem_change_quantity = (num) =>{
        this.props.cartitem_change_quantity(num, this.props.data.index);
    }

render () {
    let data=this.props.data;
    console.log(data);
    return (
        <View style={{flex:1,backgroundColor:'#fff', marginVertical:5,flexDirection:'column'}}>
            <View style={{flex:1, flexDirection:'row',}}>
                <View style={{flex:1,padding:10,justifyContent:'center', alignItems:'center'}}>
                    <Image style={{width:'100%', height:120, borderWidth:1, borderColor:'#0f0'}} resizeMode={'cover'} source={{uri:data.img}}/>
                </View>
                <View style={{flex:1.3, flexDirection:'column',padding:10,justifyContent:'space-between'}}>
                    <Text style={{fontFamily:'Gotham-Book', color:'#000', fontSize:22, fontWeight:'bold',}}>{data.name}</Text>
                    <View style={{flexDirection:'row', alignItems:'stretch', }}>
                        <View style={{flexDirection:'column', flex:1}}>
                            <Text style={{fontFamily:'Gotham-Book', color:'#000', fontSize:18, fontWeight:'bold', flex:1,}}>$ {data.price} 
                            </Text>
                            <Text style={{fontFamily:'Gotham-Book', color:'#000', fontSize:12, fontWeight:'bold'}}>{data.type_name.replace("\\","\"")}
                            </Text>
                        </View>
                        <TouchableOpacity style={{alignSelf:'flex-end', marginRight:10,}} onPress={()=>this.props.onitempress(data.index)}>
                            <Icon name="trash-o" type="FontAwesome"></Icon>
                        </TouchableOpacity>
                    </View>
                    {data.attributes.length!=0&&
                    <Text style={{color:'#000', fontSize:16}}>
                        {data.attributes.map((attr,key)=>{
                            return attr.name+"  $"+attr.cost+"  X"+attr.count+"\n";
                        })}  
                    </Text> 
                    }
                    <InputSpinner max={100} style={{borderWidth:1, borderColor:'#000', alignSelf:"flex-end"}}
                        min={0} types={true}
                        step={1} width={70} height={20}
                        color={"#000"}  onChange={(num)=>this.cartitem_change_quantity(num)}
                        textColor={"#000"} fontSize={16} inputStyle={{padding:0}}
                        showBorder={true} rounded={false} colorLeft={'#fff'} colorRight={'#fff'}
                        buttonTextColor={"#000"} buttonFontSize={14}
                        value={data.quantity}/>
                </View>
            </View>
            
        </View>
    )}
}