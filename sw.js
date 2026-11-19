// No version string needed: files are served from cache instantly, then refreshed
// from the network in the background. Changes show up on the next open, with no forced reload.
const C='hjb-cache';
const F=['./','index.html','style.css','app.js','manifest.json','target.json','rcx.js','lessons/words.js','lessons/unit1.js','lessons/unit2.js','lessons/unit3.js','lessons/unit4.js','lessons/unit5.js','icons/icon-192.png','icons/icon-512.png','icons/icon.svg','icons/favicon.ico','screenshots/wide.png','screenshots/narrow.png'];
self.addEventListener('install',e=>{self.skipWaiting();e.waitUntil(caches.open(C).then(c=>Promise.all(F.map(u=>fetch(u,{cache:'no-cache'}).then(r=>r.ok&&c.put(u,r)).catch(()=>{})))))});
self.addEventListener('activate',e=>e.waitUntil(clients.claim()));
self.addEventListener('fetch',e=>{
 const r=e.request,u=new URL(r.url);
 if(r.method!='GET'||u.origin!=location.origin)return;
 e.respondWith((async()=>{
  const c=await caches.open(C),hit=await c.match(r,{ignoreSearch:true});
  const net=fetch(r,{cache:'no-cache'}).then(x=>{if(x&&x.ok)c.put(r,x.clone());return x}).catch(()=>null);
  if(hit){e.waitUntil(net);return hit}
  return (await net)||(r.mode=='navigate'?await c.match('index.html'):Response.error());
 })())});
