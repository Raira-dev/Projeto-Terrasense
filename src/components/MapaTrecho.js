import React, { useEffect, useRef } from 'react';
import { Platform, View } from 'react-native';
import { WebView } from 'react-native-webview';

const HTML = `
<!DOCTYPE html><html><head>
<meta name="viewport" content="width=device-width,initial-scale=1"/>
<link href="https://unpkg.com/maplibre-gl@4.7.1/dist/maplibre-gl.css" rel="stylesheet"/>
<script src="https://unpkg.com/maplibre-gl@4.7.1/dist/maplibre-gl.js"></script>
<style>html,body,#map{margin:0;height:100%;width:100%}</style>
</head><body><div id="map"></div>
<script>
var COR = {'1':'#2e9e4f','2':'#f2c744','3':'#f28c28','4':'#d92d20','X':'#111111'};
var NOME = {'1':'baixa','2':'média','3':'alta','4':'urgente','X':'sem leitura'};
var ALTURA = {'1':6,'2':18,'3':35,'4':60,'X':1};
var LARG = {grama:8, pista:12}; // largura de cada faixa, em metros

var map = new maplibregl.Map({
  container:'map', center:[-46.79682,-23.46104], zoom:16,
  style:{version:8,
    sources:{osm:{type:'raster',tileSize:256,
      tiles:['https://tile.openstreetmap.org/{z}/{x}/{y}.png'],
      attribution:'© OpenStreetMap contributors'}},
    layers:[{id:'osm',type:'raster',source:'osm'}]}
});

function gerar(grade){
  var ini=grade.inicio, fim=grade.fim, layout=grade.layout;
  var mLat=111320, mLng=111320*Math.cos(ini.lat*Math.PI/180);
  var dx=(fim.lng-ini.lng)*mLng, dy=(fim.lat-ini.lat)*mLat;
  var L=Math.sqrt(dx*dx+dy*dy), ux=dx/L, uy=dy/L, nx=-uy, ny=ux;
  var cols=0; layout.forEach(function(r){ if(r.celulas) cols=Math.max(cols,r.celulas.length); });
  var cl=L/cols;
  var total=0; layout.forEach(function(r){ total+=LARG[r.tipo]; });
  var off=total/2, feats=[];
  function pt(along,perp){
    var x=along*ux+perp*nx, y=along*uy+perp*ny;
    return [ini.lng+x/mLng, ini.lat+y/mLat];
  }
  layout.forEach(function(row,ri){
    var o1=off, o2=off-LARG[row.tipo]; off=o2;
    if(row.tipo!=='grama') return;
    row.celulas.forEach(function(v,ci){
      var k=String(v).toUpperCase();
      var a=ci*cl+0.3, b=(ci+1)*cl-0.3, p1=o1-0.3, p2=o2+0.3;
      feats.push({type:'Feature',
        properties:{cor:COR[k]||'#999', altura:ALTURA[k]||1,
          info:'Linha '+(ri+1)+', coluna '+(ci+1)+' — '+(NOME[k]||k)},
        geometry:{type:'Polygon',coordinates:[[pt(a,p1),pt(b,p1),pt(b,p2),pt(a,p2),pt(a,p1)]]}});
    });
  });
  return {type:'FeatureCollection',features:feats};
}

var dados=null, pronto=false, enquadrou=false;
function aplicar(){
  if(!pronto||!dados||!dados.grade) return;
  map.getSource('grade').setData(gerar(dados.grade));
  var is3d=dados.modo==='3d';
  map.setLayoutProperty('g2d','visibility',is3d?'none':'visible');
  map.setLayoutProperty('g3d','visibility',is3d?'visible':'none');
  if(!enquadrou){
    var i=dados.grade.inicio,f=dados.grade.fim;
    map.fitBounds([[Math.min(i.lng,f.lng),Math.min(i.lat,f.lat)],[Math.max(i.lng,f.lng),Math.max(i.lat,f.lat)]],{padding:40,duration:0});
    enquadrou=true;
  }
  map.easeTo({pitch:is3d?60:0,bearing:is3d?-20:0,duration:600});
}

map.on('load',function(){
  map.addSource('grade',{type:'geojson',data:{type:'FeatureCollection',features:[]}});
  map.addLayer({id:'g2d',type:'fill',source:'grade',paint:{'fill-color':['get','cor'],'fill-opacity':0.85}});
  map.addLayer({id:'g3d',type:'fill-extrusion',source:'grade',layout:{visibility:'none'},
    paint:{'fill-extrusion-color':['get','cor'],'fill-extrusion-height':['get','altura'],'fill-extrusion-opacity':0.9}});
  ['g2d','g3d'].forEach(function(l){
    map.on('click',l,function(e){
      new maplibregl.Popup().setLngLat(e.lngLat).setText(e.features[0].properties.info).addTo(map);
    });
  });
  pronto=true; aplicar();
});

window.setDados=function(d){dados=d;aplicar();};
window.addEventListener('message',function(e){
  try{window.setDados(typeof e.data==='string'?JSON.parse(e.data):e.data);}catch(_){}
});
</script></body></html>`;

export default function MapaTrecho({ grade, modo = '2d', style }) {
  const ref = useRef(null);
  const payload = { grade, modo };

  const enviar = () => {
    if (Platform.OS === 'web') {
      ref.current?.contentWindow?.postMessage(JSON.stringify(payload), '*');
    } else {
      ref.current?.injectJavaScript(`window.setDados(${JSON.stringify(payload)}); true;`);
    }
  };

  useEffect(enviar, [grade, modo]);

  if (Platform.OS === 'web') {
    return (
      <View style={style}>
        <iframe ref={ref} srcDoc={HTML} style={{ border: 0, width: '100%', height: '100%' }}
          onLoad={() => setTimeout(enviar, 500)} />
      </View>
    );
  }
  return (
    <View style={style}>
      <WebView ref={ref} originWhitelist={['*']} source={{ html: HTML }}
        javaScriptEnabled domStorageEnabled onLoadEnd={enviar} />
    </View>
  );
}