const V="hh-sync-v4";
const LOCAL=["./","./index.html","./config.js","./manifest.webmanifest","./icon-192.png","./icon-512.png"];
const CDN=["https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js","https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore-compat.js"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(V).then(async c=>{await c.addAll(LOCAL);await Promise.all(CDN.map(u=>c.add(u).catch(()=>{})))}));self.skipWaiting()});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==V).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener("fetch",e=>{
  const r=e.request,u=new URL(r.url);
  if(r.method!=="GET")return;
  if(!(u.origin===location.origin||CDN.includes(r.url)))return; // let Firestore traffic pass through untouched
  e.respondWith(caches.open(V).then(async c=>{
    const hit=await c.match(r,{ignoreSearch:true});
    const net=fetch(r).then(res=>{if(res.ok)c.put(r,res.clone());return res}).catch(()=>null);
    return hit||(await net)||(r.mode==="navigate"?c.match("./index.html"):Response.error());
  }));
});
