import React,{useState} from "react";
import {Image,Pressable,ScrollView,StyleSheet,Text,View} from "react-native";
import {colors} from "../styles/colors";
import MapaTrecho from '../components/MapaTrecho';

const cameras=[
    {
        id:'CAM-01',
        km:'KM 67',
        status:'Online',
        battery:88
    },
    {
        id:'CAM-02',
        km:'KM 74',
        status:'Online',
        battery:73
    },
    {
        id:'CAM-03',
        km:'KM 81',
        status:'Atenção',
        battery:48
    }];
    export default function SegurancaScreen({dark}){const t=dark?colors.dark:colors.light;const[mode,setMode]=useState('2D');const[selected,setSelected]=useState(cameras[0]);return <ScrollView style={{backgroundColor:t.background}} contentContainerStyle={s.content}><View style={[s.card,{backgroundColor:t.cream}]}><View style={s.head}><View><Text style={[s.title,{color:t.text}]}>Mapa de segurança</Text><Text style={{color:t.muted,fontSize:11}}>BR-116 • trecho monitorado</Text></View><Text style={{fontSize:22}}>📍</Text></View>{mode==='2D'?<View style={s.grid}>{Array.from({length:120}).map((_,i)=>{const type=i%17===0?'critical':i%9===0?'warning':i%5===0?'good':'empty';return <View key={i} style={[s.cell,s[type]]}/>})}<Text style={[s.pin,{left:'21%',top:'35%'}]}>!</Text><Text style={[s.pin,{left:'67%',top:'58%'}]}>!</Text><Text style={[s.pin,{left:'44%',top:'72%'}]}>!</Text></View>:<View style={s.map3d}><View style={s.road}/><View style={[s.marker,{top:42,left:70}]}/><View style={[s.marker,{top:115,right:55}]}/><View style={[s.marker,{bottom:45,left:90}]}/><Text style={s.roadLabel}>BR-116</Text><Text style={s.threeD}>Visualização 3D</Text></View>}<View style={s.modeRow}>{['2D','3D'].map(v=><Pressable key={v} onPress={()=>setMode(v)} style={[s.mode,{backgroundColor:mode===v?t.green:t.greenLight}]}><Text style={{color:mode===v?'#fff':t.green,fontWeight:'800'}}>{v}</Text></Pressable>)}</View><View style={s.legend}><Text style={{color:t.text}}>🟢 Normal</Text><Text style={{color:t.text}}>🟡 Atenção</Text><Text style={{color:t.text}}>🔴 Crítico</Text></View></View><View style={[s.card,{backgroundColor:t.cream}]}><View style={s.head}><View><Text style={[s.title,{color:t.text}]}>Câmeras</Text><Text style={{color:t.muted,fontSize:11}}>{cameras.length} equipamentos simulados</Text></View><Text>▣</Text></View><ScrollView horizontal showsHorizontalScrollIndicator={false}><View style={s.list}>{cameras.map(c=><Pressable key={c.id} onPress={()=>setSelected(c)} style={[s.thumb,{borderColor:selected.id===c.id?t.green:'transparent'}]}><Image source={require('../../assets/road-camera.jpg')} style={s.small}/><Text style={[s.id,{color:t.text}]}>{c.id}</Text><Text style={{color:t.muted,fontSize:10}}>{c.km}</Text></Pressable>)}</View></ScrollView><Image source={require('../../assets/road-camera.jpg')} style={s.camera}/><View style={s.info}><View><Text style={[s.selected,{color:t.text}]}>{selected.id} • {selected.km}</Text><Text style={{color:t.muted}}>Status: {selected.status}</Text></View><Text style={{color:selected.battery<50?t.red:t.green,fontWeight:'900'}}>Bateria {selected.battery}%</Text></View></View></ScrollView>}
const s=StyleSheet.create(
    {
        content:{padding:12},
        card:{borderRadius:14,padding:9,marginBottom:14},
        head:{flexDirection:'row',justifyContent:'space-between',padding:5,marginBottom:6},
        title:{fontSize:15,fontWeight:'900'},
        grid:{
            height:300,
            flexDirection:'row',
            flexWrap:'wrap',
            backgroundColor:'#ECECEC',
            overflow:'hidden',
            position:'relative'},
        cell:{width:'10.416%',height:25,borderWidth:.5,borderColor:'#AAA'},
        empty:{backgroundColor:'#111'},
        good:{backgroundColor:'#BFE6A5'},
        warning:{backgroundColor:'#F5D96B'},
        critical:{backgroundColor:'#ECA8A1'},
        pin:{position:'absolute',width:24,height:24,borderRadius:12,backgroundColor:'#E9433E',color:'#fff',fontWeight:'900',textAlign:'center',paddingTop:3,borderWidth:2,borderColor:'#fff'},
        map3d:{height:300,backgroundColor:'#DCEAD6',position:'relative',overflow:'hidden'},
        road:{position:'absolute',width:95,height:380,backgroundColor:'#737373',transform:[{rotate:'27deg'}],left:110,top:-40,borderRadius:45},
        marker:{position:'absolute',width:18,height:18,borderRadius:9,backgroundColor:'#EF4C45',borderWidth:3,borderColor:'#fff'},
        roadLabel:{position:'absolute',top:14,left:20,backgroundColor:'#fff',padding:5,borderRadius:8},
        threeD:{position:'absolute',right:10,bottom:10,backgroundColor:'rgba(255,255,255,.85)',padding:6,borderRadius:8},
        modeRow:{flexDirection:'row',gap:8,marginTop:8},
        mode:{paddingHorizontal:14,paddingVertical:7,borderRadius:14},
        legend:{flexDirection:'row',justifyContent:'space-around',marginTop:9},
        list:{flexDirection:'row',gap:8,marginBottom:9},
        thumb:{width:105,padding:5,borderWidth:2,borderRadius:10},
        small:{width:91,height:55,borderRadius:7},
        id:{fontWeight:'800',fontSize:11,marginTop:4},
        camera:{width:'100%',height:185,resizeMode:'cover',borderRadius:8},
        info:{flexDirection:'row',justifyContent:'space-between',alignItems:'center',marginTop:8},
        selected:{fontWeight:'900'}
    }
);
