(function(e,i,d,l){"use strict";const r=[];function c(n,o){if(n&&(o(n),!!n?.props?.children))if(Array.isArray(n.props.children))for(const s of n.props.children)c(s,o);else o(n.props.children)}for(const n of i.findByNameAll("BioText",!1)){const o=l.after("default",n,function(s,f){f?.props?.children&&c(f,function(t){if(t.props?.accessibilityRole==="link"){const p=t.props.children?.[0];if(typeof p!="string")return;t.props.onPress=function(){d.url.openURL(p),i.findByProps("hideActionSheet").hideActionSheet()}}})});r.push(o)}const u=function(){return r.forEach(function(n){return n()})};return e.onUnload=u,e})({},vendetta.metro,vendetta.metro.common,vendetta.patcher);
