const $=s=>document.querySelector(s),W=window.W,U=window.UNITS,K='hjb1';
const sh=a=>a.map(x=>[Math.random(),x]).sort((a,b)=>a[0]-b[0]).map(x=>x[1]);
const IC={home:'M3 11l9-8 9 8M5 9.5V20h5v-6h4v6h5V9.5',book:'M4 5h6a2 2 0 012 2v13a2 2 0 00-2-2H4zM20 5h-6a2 2 0 00-2 2v13a2 2 0 012-2h6z',refine:'M4 4h16l-6 8v7l-4 2v-9z',user:'M12 12a4 4 0 100-8 4 4 0 000 8zM4 21a8 8 0 0116 0',gear:'M12 15a3 3 0 100-6 3 3 0 000 6zM12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M19 5l-2 2M7 17l-2 2',star:'M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z',check:'M5 12l5 5 9-10',x:'M6 6l12 12M18 6L6 18',coin:'M12 21a9 9 0 100-18 9 9 0 000 18zM12 7v10M9.5 9.5h4a1.5 1.5 0 010 3h-3a1.5 1.5 0 000 3h4',lock:'M6 11h12v9H6zM8 11V8a4 4 0 018 0v3',gift:'M4 10h16v10H4zM3 7h18v3H3zM12 7v13M12 7c-3 0-4-4-1.5-4S12 7 12 7zM12 7c3 0 4-4 1.5-4S12 7 12 7z',flame:'M12 3c1 4 5 5 5 10a5 5 0 01-10 0c0-2 1-3 2-4 0 2 1 3 2 3 0-3-1-6 1-9z',bolt:'M13 2L4 14h7l-1 8 9-12h-7z',trophy:'M7 4h10v5a5 5 0 01-10 0zM7 6H4v2a3 3 0 003 3M17 6h3v2a3 3 0 01-3 3M12 14v4M8 21h8',retake:'M4 12a8 8 0 018-8 8 8 0 015.7 2.3L20 9M20 4v5h-5M20 12a8 8 0 01-8 8 8 8 0 01-5.7-2.3L4 15M4 20v-5h5',menu:'M4 6h16M4 12h16M4 18h16',back:'M15 5l-7 7 7 7',plate:'M12 3l8 3v6c0 5-4 8-8 9-4-1-8-4-8-9V6z',play:'M7 4l13 8-13 8z',tut:'M12 3l9 5-9 5-9-5zM7 11v5c0 1.5 2.2 3 5 3s5-1.5 5-3v-5'};
const ic=(n,c='')=>`<svg class="i ${c}" viewBox="0 0 24 24"><path d="${IC[n]}"/></svg>`;
const COL=['#e3ac1a','#e07a2d','#9ccb4a','#4fb3a5','#c8a2e8','#e8e0c8'],SHP=['M24 4a20 20 0 100 40 20 20 0 000-40z','M12 4h24a8 8 0 018 8v24a8 8 0 01-8 8H12a8 8 0 01-8-8V12a8 8 0 018-8z','M24 3l18 10v22L24 45 6 35V13z'],GL=['star','bolt','flame','book','trophy','gift'];
const TECH={vocab:'Vocabulary',article:'Articles',plural:'Plurals',nounadj:'Noun then adjective',be:'Adjective sentences',verb:'Verb order',tense:'Tenses',objects:'Objects',neg:'Negation',ques:'Questions',modal:'Could and should'};
const TI={tutorial:'tut',lesson:'play',retake:'retake',test:'trophy'},RW=[20,30,40,50,60,80,150];
let S=Object.assign({name:'Learner',av:{s:0,c:0,g:'star'},xp:0,coins:0,streak:0,last:'',cl:{},w:{},t:{},set:{nav:'bar',exp:true}},JSON.parse(localStorage.getItem(K)||'{}'));
const save=()=>localStorage.setItem(K,JSON.stringify(S)),esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const day=(o=0)=>new Date(Date.now()+o*864e5).toISOString().slice(0,10),lvl=()=>Math.floor(S.xp/200)+1,desk=()=>matchMedia('(min-width:800px)').matches;
let mx=false,R=null,dip=null;
const avatar=(z,a=S.av)=>`<svg width="${z}" height="${z}" viewBox="0 0 48 48"><path d="${SHP[a.s]}" fill="#231d0d" stroke="${COL[a.c]}" stroke-width="2"/><g transform="translate(12 12)" fill="none" stroke="${COL[a.c]}" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="${IC[a.g]}"/></g></svg>`;
function toast(m){const t=$('#toast');t.textContent=m;t.className='on';setTimeout(()=>t.className='',1800)}
function mode(){document.body.className='nav-'+S.set.nav+(desk()?(S.set.exp?' exp':''):(mx?' mx':''));$('#menu').innerHTML=ic('menu');
 const r=location.hash.slice(2)||'home';$('#nav').innerHTML=[['home','Learn'],['refine','Refinery'],['mastery','Mastery'],['profile','Profile'],['settings','Settings']].map(([k,n])=>`<a href="#/${k}" class="${r==k?'on':''}">${ic({mastery:'book',profile:'user',settings:'gear'}[k]||k)}<span>${n}</span></a>`).join('');
 $('#chips').innerHTML=`<span class="chip">${ic('flame','s')}${streak()}</span><span class="chip">${ic('bolt','s')}${S.xp}</span><span class="chip">${ic('coin','s')}${S.coins}</span>`}
const streak=()=>S.last==day()||S.last==day(-1)?S.streak:0;
const L=id=>{for(const u of U)for(const l of u.lessons)if(l.id==id)return[u,l]};
const done=id=>S.cl[id]&&S.cl[id].done;
function open(u,i){if(U.indexOf(u)&&!done(U[U.indexOf(u)-1].lessons.at(-1).id))return 0;const ls=u.lessons,l=ls[i];if(l.type=='retake')return done(ls[0].id);return ls.slice(0,i).every(x=>x.type=='retake'||done(x.id))}
const plate=b=>b>=100?'gold':b>=90?'silver':b>=70?'bronze':'';
const bar=p=>`<div class="bar"><i style="width:${p}%"></i></div>`;
function home(){const cl=S.last==day(),st=streak(),n=cl?st:st,next=(cl?st:st)%7;let tot=0,dn=0;U.forEach(u=>u.lessons.forEach(l=>{tot++;done(l.id)&&dn++}));
 return `<div class="card"><div class="row"><h2>Daily reward</h2><span class="m sp">${st} day streak</span></div><div class="pips">${RW.map((r,i)=>`<div class="pip ${i<next||(cl&&i==next-1)?'on':''} ${i==next&&!cl?'cur':''}">Day ${i+1}<br>${r}</div>`).join('')}</div><button class="btn w" style="margin-top:12px" data-a="claim" ${cl?'disabled':''}>${cl?'Claimed today':'Claim reward'}</button></div>
 <div class="card"><div class="row"><h3>Course progress</h3><span class="m sp">${dn}/${tot} lessons</span></div>${bar(dn/tot*100)}</div>`+
 U.map((u,ui)=>{const ok=ui==0||done(U[ui-1].lessons.at(-1).id),d=u.lessons.filter(l=>done(l.id)).length;
 return `<div class="card"><div class="row"><div><div class="tag">Unit ${ui+1}</div><h2>${u.title}</h2></div>${ok?'':ic('lock')}<span class="m sp">${d}/${u.lessons.length}</span></div>${bar(d/u.lessons.length*100)}${u.lessons.map((l,i)=>{const o=ok&&open(u,i),c=S.cl[l.id]||{},p=plate(c.best||0);
 return `<button class="les ${o?'':'lock'} ${c.done?'done':''}" data-a="start" data-v="${l.id}"><span class="ico">${ic(o?TI[l.type]:'lock')}</span><span><b>${l.title}</b><br><span class="tag">${l.type}${l.type=='test'?' · pass 80%':''}${c.best?' · best '+c.best+'%':''}</span></span>${p?`<span class="sp plate ${p}">${ic('plate')}</span>`:''}</button>`}).join('')}</div>`}).join('')}
function words(l){return[...new Set(l.flatMap(x=>x.words||[]))]}
function gen(ls,n,weak){let ws=words(ls),ss=ls.flatMap(x=>x.sent||[]);if(weak){ws=ws.sort((a,b)=>(S.w[a]||0)-(S.w[b]||0)).slice(0,6);ss=sh(ss)}
 const pool=[...new Set([...ws,...sh(Object.keys(W)).slice(0,6)])],q=[];
 ws.forEach(h=>{const en=W[h],d=sh(pool.filter(x=>W[x]!=en)).slice(0,3);q.push(Math.random()<.5?{k:'mc',p:`How do you say “${en}”?`,a:h,o:sh([h,...d]),tag:'vocab',w:[h]}:{k:'mc',p:`What does “${h}” mean?`,a:en,o:sh([en,...d.map(x=>W[x])]),tag:'vocab',w:[h]})});
 ss.forEach(([en,hj,tag])=>{const t=hj.split(' ');q.push({k:'b',p:`Build: ${en}`,a:t,o:sh([...new Set([...t,...sh(Object.keys(W)).filter(x=>!t.includes(x)).slice(0,2)])]),tag,w:t});
  if(ss.length>3&&Math.random()<.4)q.push({k:'mc',p:hj,a:en,o:sh([en,...sh(ss.filter(x=>x[0]!=en)).slice(0,3).map(x=>x[0])]),tag,w:t,hj:1})});
 return sh(q).slice(0,n)}
function start(id){const[u,l]=L(id);if(!open(u,u.lessons.indexOf(l))||(U.indexOf(u)&&!done(U[U.indexOf(u)-1].lessons.at(-1).id)))return toast('Locked. Finish the earlier lessons first.');
 const prev=u.lessons.slice(0,u.lessons.indexOf(l)).filter(x=>x.type!='retake'&&x.type!='test'),all=u.lessons.filter(x=>x.type!='retake'&&x.type!='test');
 let qs,sl=[];if(l.type=='test')qs=gen(all,12);else if(l.type=='retake')qs=gen(all.filter(x=>done(x.id)||x==all[0]),10,1);else{qs=gen([l],l.type=='tutorial'?7:8);sl=(l.slides||[]).slice();if(l.words)sl.push({h:'New words',w:l.words})}
 R={u,l,qs,sl,si:0,i:0,ok:0,miss:0};draw()}
function refine(){const ls=U.flatMap(u=>u.lessons.filter(l=>done(l.id)&&l.type!='retake'&&l.type!='test'));if(!ls.length)return `<h1>Refinery</h1><div class="card">The refinery throws random questions from everything you have completed. Finish a lesson first.</div>`;
 return `<h1>Refinery</h1><div class="card"><p>Ten random questions from every lesson you have finished. Earns XP and trains weak words.</p><button class="btn w" style="margin-top:12px" data-a="ref">Start refining</button></div>`}
function mast(q,c){const t=S.t[q.tag]=S.t[q.tag]||[0,0];t[1]++;c&&t[0]++;q.w.filter(w=>W[w]).forEach(w=>S.w[w]=Math.max(0,Math.min(5,(S.w[w]||0)+(c?1:-1))))}
function draw(){const r=R,m=$('#main');window.scrollTo(0,0);
 if(r.si<r.sl.length){const s=r.sl[r.si];m.innerHTML=`<div class="row"><button data-a="quit">${ic('back')}</button><h3>${r.l.title}</h3></div><div class="card" style="margin-top:14px"><div class="tag">${r.l.type}</div><h1>${s.h}</h1>${s.b?`<p>${s.b}</p>`:''}${(s.ex||[]).map(e=>`<div class="ex"><b>${e[0]}</b><span>${e[1]}</span></div>`).join('')}${(s.w||[]).map(w=>`<div class="ex"><b>${w}</b><span>${W[w]}</span></div>`).join('')}</div><button class="btn w" data-a="next">${r.si==r.sl.length-1?'Start questions':'Next'}</button>`;return}
 if(r.i>=r.qs.length)return fin();const q=r.qs[r.i];pk=[];
 m.innerHTML=`<div class="row"><button data-a="quit">${ic('x')}</button><div style="flex:1">${bar(r.i/r.qs.length*100)}</div></div><div class="q ${q.hj?'':''}">${q.p}</div>`+
 (q.k=='mc'?q.o.map((o,i)=>`<button class="opt" data-a="mc" data-v="${i}">${o}</button>`).join(''):`<div class="slot" id="slot"></div><div class="wrap">${q.o.map((o,i)=>`<button class="tile" id="t${i}" data-a="tile" data-v="${i}">${o}</button>`).join('')}</div><button class="btn w" style="margin-top:18px" id="chk" data-a="chk" disabled>Check</button>`)+'<div id="fb"></div>'}
let pk=[];
function ans(c){const r=R,q=r.qs[r.i];mast(q,c);c?r.ok++:r.miss++;const ex=q.k=='b'?q.a.join(' '):q.a;
 $('#fb').innerHTML=`<div class="fb ${c?'ok':'no'}">${c?'Correct.':'Not quite. Answer: <b>'+ex+'</b>'}</div><button class="btn w" style="margin-top:12px" data-a="cont">Continue</button>`;save()}
function fin(){const r=R,n=r.qs.length,acc=Math.round(r.ok/n*100),m=$('#main');let xp=r.ok*10+(acc==100?20:0),cn=Math.round(xp/5),msg='',pass=true;
 if(r.l.type=='test')pass=acc>=80;else if(r.l.type!='refinery')pass=acc>=70;
 if(r.u){const c=S.cl[r.l.id]=S.cl[r.l.id]||{runs:0,best:0};c.runs++;c.best=Math.max(c.best,acc);if(pass)c.done=1;
  msg=pass?(r.l.type=='test'?'Test passed. Next unit unlocked.':'Lesson complete.'):(r.l.type=='test'?'You need 80% to pass. Take the retake lesson, then try again.':'You need 70% to complete this lesson. Try again, or use the retake lesson.')}
 else msg='Refinery done.';
 S.xp+=xp;S.coins+=cn;save();const p=r.u&&plate(S.cl[r.l.id].best);
 m.innerHTML=`<div class="card" style="text-align:center"><h1>${acc}%</h1><p>${msg}</p>${p?`<div class="plate ${p}">${ic('plate','l')}<div class="tag">${p} plate</div></div>`:''}<p class="m" style="margin:10px 0">${r.ok}/${n} correct · +${xp} XP · +${cn} coins</p><button class="btn w" data-a="again">${r.u?'Retry':'Refine again'}</button><button class="btn o w" style="margin-top:10px" data-a="quit">Back</button></div>`;mode()}
function mastery(){const ws=Object.keys(W);const ks=Object.keys(TECH);
 return `<h1>Mastery</h1><div class="card"><h2>Techniques</h2>${ks.map(k=>{const t=S.t[k];return `<div style="margin:10px 0"><div class="row"><span>${TECH[k]}</span><span class="m sp">${t?Math.round(t[0]/t[1]*100)+'% · '+t[1]+' answered':'Not practiced'}</span></div>${bar(t?t[0]/t[1]*100:0)}</div>`}).join('')}</div>
 <div class="card"><h2>Words</h2><p class="m">Each correct answer raises a word one level (max 5). Mistakes lower it.</p><div class="grid" style="margin-top:10px">${ws.map(w=>`<div class="wd"><b>${w}</b><br><span class="m">${W[w]}</span><div class="lv">${[1,2,3,4,5].map(i=>`<i class="${(S.w[w]||0)>=i?'on':''}"></i>`).join('')}</div></div>`).join('')}</div></div>`}
function profile(){const a=S.av,g=Object.values(S.cl).filter(c=>c.best>=100).length,d=Object.values(S.cl).filter(c=>c.done).length;
 return `<h1>Profile</h1><div class="card" style="text-align:center">${avatar(110)}<h2 style="margin-top:8px">${esc(S.name)}</h2><p class="m">Level ${lvl()} · ${S.xp} XP</p>${bar(S.xp%200/2)}</div>
 <div class="card"><h3>Name</h3><input type="text" maxlength="20" value="${esc(S.name)}" oninput="S.name=this.value||'Learner';save()"><h3 style="margin-top:14px">Shape</h3><div class="wrap">${SHP.map((s,i)=>`<button class="pk ${a.s==i?'on':''}" data-a="av" data-k="s" data-v="${i}">${avatar(40,{s:i,c:a.c,g:a.g})}</button>`).join('')}</div><h3 style="margin-top:14px">Colour</h3><div class="wrap">${COL.map((c,i)=>`<button class="sw ${a.c==i?'on':''}" style="background:${c}" data-a="av" data-k="c" data-v="${i}" aria-label="colour"></button>`).join('')}</div><h3 style="margin-top:14px">Emblem</h3><div class="wrap">${GL.map(g=>`<button class="pk ${a.g==g?'on':''}" data-a="av" data-k="g" data-v="${g}">${ic(g)}</button>`).join('')}</div></div>
 <div class="card grid"><div class="wd"><b>${d}</b><br><span class="m">Lessons done</span></div><div class="wd"><b>${g}</b><br><span class="m">Gold plates</span></div><div class="wd"><b>${S.coins}</b><br><span class="m">Coins</span></div><div class="wd"><b>${streak()}</b><br><span class="m">Day streak</span></div></div>`}
function settings(){const n=S.set.nav;return `<h1>Settings</h1><div class="card"><h2>Navigation</h2><p class="m">Bars: top bar on desktop, bottom bar on mobile. Sidebar: expandable on both.</p><div class="row" style="margin-top:10px"><button class="btn ${n=='bar'?'':'o'}" data-a="nav" data-v="bar">Bars</button><button class="btn ${n=='side'?'':'o'}" data-a="nav" data-v="side">Sidebar</button></div>${n=='side'?`<p class="m" style="margin-top:10px">Use the menu button in the header to expand or collapse. Desktop remembers its state.</p>`:''}</div>
 <div class="card"><h2>App</h2>${dip?'<button class="btn w" data-a="inst">Install app</button>':'<p class="m">Use your browser menu to install this app, or it may already be installed.</p>'}</div>
 <div class="card"><h2>Data</h2><button class="btn o w" data-a="reset">Reset all progress</button></div>`}
const V={home,refine,mastery,profile,settings};
function render(){R=null;const r=location.hash.slice(2)||'home';$('#main').innerHTML=(V[r]||home)();mode();window.scrollTo(0,0)}
const A={menu(){desk()?(S.set.exp=!S.set.exp,save()):mx=!mx;mode()},
 claim(){if(S.last==day())return;S.streak=(S.last==day(-1)?S.streak:0)+1;const r=RW[(S.streak-1)%7];S.last=day();S.coins+=r;S.xp+=r;save();toast(`+${r} coins and XP`);render()},
 start:id=>start(id),ref(){const ls=U.flatMap(u=>u.lessons.filter(l=>done(l.id)&&l.type!='retake'&&l.type!='test'));R={u:null,l:{type:'refinery',title:'Refinery',ls},qs:gen(ls,10),sl:[],si:0,i:0,ok:0,miss:0};draw()},
 next(){R.si++;draw()},quit:render,cont(){R.i++;draw()},again(){R.u?start(R.l.id):A.ref()},
 mc(v){const q=R.qs[R.i],b=[...document.querySelectorAll('.opt')];if($('#fb').innerHTML)return;const c=q.o[v]==q.a;b.forEach((x,i)=>{if(q.o[i]==q.a)x.classList.add('ok');else if(i==v)x.classList.add('no')});ans(c)},
 tile(v){const q=R.qs[R.i];pk.push(+v);$('#t'+v).classList.add('used');rs()},
 chk(){const q=R.qs[R.i];if($('#fb').innerHTML)return;$('#chk').disabled=true;ans(pk.map(i=>q.o[i]).join(' ')==q.a.join(' '))},
 un(v){pk.splice(+v,1);rs()},
 av(v,t){S.av[t.dataset.k]=t.dataset.k=='g'?v:+v;save();render()},nav(v){S.set.nav=v;save();render()},
 reset(){if(confirm('Reset all progress?')){localStorage.removeItem(K);location.reload()}},inst(){dip.prompt()}};
function rs(){const q=R.qs[R.i];if($('#fb').innerHTML)return;$('#slot').innerHTML=pk.map((i,x)=>`<button class="tile" data-a="un" data-v="${x}">${q.o[i]}</button>`).join('');q.o.forEach((_,i)=>$('#t'+i).classList.toggle('used',pk.includes(i)));$('#chk').disabled=!pk.length}
document.addEventListener('click',e=>{const t=e.target.closest('[data-a]');if(t&&A[t.dataset.a])A[t.dataset.a](t.dataset.v,t)});
addEventListener('hashchange',render);addEventListener('resize',mode);addEventListener('beforeinstallprompt',e=>{e.preventDefault();dip=e});
if('serviceWorker'in navigator)addEventListener('load',()=>navigator.serviceWorker.register('sw.js').then(g=>{document.addEventListener('visibilitychange',()=>document.visibilityState=='visible'&&g.update())}));
render();
