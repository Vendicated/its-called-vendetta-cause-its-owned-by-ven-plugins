(function(s,i,d){"use strict";const g=/^[A-Z][a-z']*[.,!?:;]*$/;function b(n){if(!n||n.length<2||n.toUpperCase()===n)return n;const t=[],e=n.split(" ");for(let r=0;r<e.length;r++){const o=e[r],p=function(c){const h=[o];for(let u=r+1;u<e.length;u++)if(h.push(e[u]),e[u].includes(c)){t.push(...h),r=u;return}t.push(o)};o.startsWith("https://")?t.push(o):o.startsWith("```")?p("```"):o.startsWith("`")?p("`"):t.push(o.replace(g,function(c){return c.toLowerCase()}))}return t.join(" ")}const a=[];function v(n,t,e){return function(){try{return e.apply(this,arguments)}catch(r){console.error(`Error while running ${n} callback for ${t}:`,r)}}}const f=function(n,t,e,r){a.push(d.before(n,t,v("before",n,e),r))},y=function(){return a.forEach(function(n){return n()})};function l(n){n?.content&&(n.content=b(n.content))}f("sendMessage",i.findByProps("editMessage","sendMessage"),function(n){return void l(n[1])}),f("uploadLocalFiles",i.findByProps("uploadLocalFiles"),function(n){return void l(n[0].parsedMessage)});const M=function(){return y()};return s.onUnload=M,s})({},vendetta.metro,vendetta.patcher);
