/* Kita · יציאת מצרים – core: helpers, boot, title, map, shared stage logic */
(function(){
const W=1280,H=720,FONT='Rubik, "Arial Hebrew", Arial, sans-serif';
const qs=new URLSearchParams(location.search);
const Store={k:'kita-yetziat-v1',d:{},
 load(){try{this.d=JSON.parse(localStorage.getItem(this.k))||{};}catch(e){this.d={};} if(!Array.isArray(this.d.stars))this.d.stars=[0,0,0,0,0,0];},
 save(){try{localStorage.setItem(this.k,JSON.stringify(this.d));}catch(e){}},
 set(i,n){if(n>(this.d.stars[i]||0)){this.d.stars[i]=n;this.save();}},
 unlocked(i){return qs.has('all')||i===0||this.d.stars[i-1]>0;},
 total(){return this.d.stars.reduce((a,b)=>a+b,0);},
 reset(){this.d={stars:[0,0,0,0,0,0]};this.save();}};
Store.load();
const K={W,H,FONT,Store,qs};
K.txt=(s,x,y,str,size=28,color='#fff',o={})=>s.add.text(x,y,str,{fontFamily:o.font||FONT,fontSize:size+'px',fontStyle:o.bold===false?'normal':'bold',color,stroke:o.stroke||'#3b2616',strokeThickness:o.st??Math.max(3,size/7),rtl:true,align:'center',
  shadow:o.shadow?{offsetX:0,offsetY:4,color:'#0008',blur:6,fill:true,stroke:true}:undefined,wordWrap:o.wrap?{width:o.wrap,useAdvancedWrap:true}:undefined}).setOrigin(o.ox??.5,o.oy??.5);
K.sky=(s,top,bot,f=0)=>{const g=s.add.graphics().setScrollFactor(f);g.fillGradientStyle(top,top,bot,bot,1);g.fillRect(0,0,W,H);return g;};
K.btn=(s,x,y,label,cb,o={})=>{const w=o.w||300,h=o.h||70,c=s.add.container(x,y);const g=s.add.graphics();
  const draw=(hover)=>{g.clear();g.fillStyle(0x3b2616,1);g.fillRoundedRect(-w/2,-h/2+6,w,h,18);g.fillStyle(o.color||(hover?0xffd768:0xf6c443),1);g.fillRoundedRect(-w/2,-h/2,w,h,18);g.lineStyle(4,0x3b2616,1);g.strokeRoundedRect(-w/2,-h/2,w,h,18);g.fillStyle(0xffffff,.25);g.fillRoundedRect(-w/2+10,-h/2+6,w-20,h/3,10);};
  draw(false);const t=K.txt(s,0,-1,label,o.size||30,'#3b2616',{st:0});c.add([g,t]);c.setSize(w,h).setInteractive({useHandCursor:true});
  c.on('pointerover',()=>{draw(true);s.tweens.add({targets:c,scale:1.05,duration:120});});c.on('pointerout',()=>{draw(false);s.tweens.add({targets:c,scale:1,duration:120});});
  c.on('pointerup',()=>{KitaAudio.init();KitaAudio.sfx('click');cb();});return c;};
K.icon=(s,x,y,key,cb,size=56)=>{const i=s.add.image(x,y,key).setDisplaySize(size,size).setScrollFactor(0).setInteractive({useHandCursor:true}).setDepth(1000);
  i.on('pointerover',()=>i.setDisplaySize(size*1.1,size*1.1));i.on('pointerout',()=>i.setDisplaySize(size,size));i.on('pointerup',(p,lx,ly,e)=>{e&&e.stopPropagation&&e.stopPropagation();cb(i);});return i;};
K.bubble=(s,x,y,str,dur=2200,o={})=>{const t=K.txt(s,0,0,str,o.size||24,'#3b2616',{st:0,wrap:o.wrap||320});const pw=t.width+30,ph=t.height+20;const g=s.add.graphics();
  g.fillStyle(0xffffff,1);g.lineStyle(3,0x3b2616,1);g.fillRoundedRect(-pw/2,-ph/2,pw,ph,14);g.strokeRoundedRect(-pw/2,-ph/2,pw,ph,14);const tx=o.tail??0;g.fillTriangle(tx-10,ph/2-2,tx+10,ph/2-2,tx,ph/2+16);g.lineBetween(tx-10,ph/2,tx,ph/2+16);g.lineBetween(tx+10,ph/2,tx,ph/2+16);
  const c=s.add.container(x,y,[g,t]).setDepth(o.depth||900).setScale(0);if(o.sf===0)c.setScrollFactor(0);
  s.tweens.add({targets:c,scale:1,duration:250,ease:'Back.Out'});if(dur>0)s.time.delayedCall(dur,()=>s.tweens.add({targets:c,scale:0,alpha:0,duration:200,onComplete:()=>c.destroy()}));return c;};
K.floatText=(s,x,y,str,color='#f6c443',size=34)=>{const t=K.txt(s,x,y,str,size,color,{}).setDepth(950);s.tweens.add({targets:t,y:y-70,alpha:0,duration:1100,ease:'Cubic.Out',onComplete:()=>t.destroy()});};
K.isTouch=()=>('ontouchstart' in window)||navigator.maxTouchPoints>0;
K.starURL=(on)=>{const a=KitaArt.list.find(x=>x.key===(on?'star':'starEmpty'));return 'data:image/svg+xml;charset=utf-8,'+encodeURIComponent(a.svg);};

/* ---------- Boot ---------- */
class Boot extends Phaser.Scene{constructor(){super('Boot');}
 create(){const imgs=window.__kitaImgs||[];imgs.forEach(a=>{if(a&&!this.textures.exists(a.key))this.textures.addImage(a.key,a.img);});
  const an=(key,frames,rate=8,repeat=-1)=>{if(!this.anims.exists(key))this.anims.create({key,frames:frames.map(k=>({key:k})),frameRate:rate,repeat});};
  an('moses-walk',['moses0','moses1','moses2','moses3'],8);an('moses-run',['moses0','moses1','moses2','moses3'],12);
  for(let i=0;i<5;i++)an(`p${i}-walk`,[0,1,2,3].map(f=>`p${i}_${f}`),8);
  an('worker-walk',['worker0','worker1','worker2','worker3'],7);an('guard-walk',['guard0','guard1','guard2','guard3'],7);
  an('miriam-dance',['miriam0','miriam1','miriam2','miriam3'],6);an('woman-dance',['woman0','woman1','woman2','woman3'],6);
  an('sheep-walk',['sheep0','sheep1'],6);an('croc-snap',['croc0','croc1'],3);an('chariot-run',['chariot0','chariot1','chariot2','chariot3'],12);
  document.getElementById('loading').style.display='none';
  const st=parseInt(qs.get('stage')||'0',10);
  if(st>=1&&st<=6){this.scene.start('Map',{auto:st-1});}else this.scene.start('Title',{});}}

/* ---------- Title ---------- */
class Title extends Phaser.Scene{constructor(){super('Title');}
 create(){K.sky(this,0x3a4f8f,0xf3a35c);
  this.sun=this.add.image(940,330,'sun').setScale(2.2).setAlpha(.95);
  this.far=this.add.tileSprite(0,300,W,320,'bgFar').setOrigin(0);
  this.palms=this.add.tileSprite(0,380,W,260,'bgPalms').setOrigin(0).setTint(0xd8b48a);
  this.ground=this.add.tileSprite(0,620,W,100,'sandTile').setOrigin(0);
  this.add.particles(0,0,'dot',{x:{min:0,max:W},y:{min:200,max:700},lifespan:6000,speedX:{min:-20,max:-6},speedY:{min:-8,max:4},scale:{start:.25,end:0},alpha:{start:.5,end:0},frequency:180,tint:0xffe2a8,blendMode:'ADD'});
  const line=[['p3-walk',380],['p1-walk',470],['p0-walk',560],['p4-walk',650],['p2-walk',740],['moses-walk',860]];
  line.forEach(([a,x],i)=>{const sp=this.add.sprite(x,632,a.replace('-walk','')==='moses'?'moses0':'p0_0').setOrigin(.5,1).setScale(i===5?1.15:.95);sp.play({key:a,startFrame:i%4});});
  this.add.image(W/2,H/2,'vignette').setAlpha(.8);
  const t=K.txt(this,W/2,150,'יציאת מצרים',112,'#f6c443',{st:12,shadow:true});
  this.tweens.add({targets:t,y:160,duration:2400,yoyo:true,repeat:-1,ease:'Sine.InOut'});
  K.txt(this,W/2,250,'משחק הרפתקה בשש תחנות · ספר שמות א–טו',32,'#fff6dc',{st:6});
  const b=K.btn(this,W/2,380,'יוצאים למסע ▸',()=>{KitaAudio.init();KitaAudio.music('calm');this.cameras.main.fadeOut(400,20,12,6);this.time.delayedCall(420,()=>this.scene.start('Map',{}));},{w:360,h:84,size:36});
  this.tweens.add({targets:b,scale:1.06,duration:900,yoyo:true,repeat:-1,ease:'Sine.InOut'});
  this.input.keyboard.once('keydown-ENTER',()=>b.emit('pointerup'));
  K.icon(this,50,50,KitaAudio.muted?'icoMute':'icoSound',i=>{const m=KitaAudio.toggle();i.setTexture(m?'icoMute':'icoSound');});
  this.cameras.main.fadeIn(500);}
 update(t,dt){this.far.tilePositionX+=dt*.012;this.palms.tilePositionX+=dt*.04;this.ground.tilePositionX+=dt*.07;}}

/* ---------- Map ---------- */
const NODES=[[430,585],[290,420],[1110,250],[470,235],[640,430],[880,490]];
class MapScene extends Phaser.Scene{constructor(){super('Map');}
 init(d){this.auto=d&&d.auto;}
 create(){this.add.image(W/2,H/2,'map');
  K.txt(this,W/2,62,'מפת המסע',52,'#3b2616',{st:0});
  K.txt(this,W/2,108,'בחרו תחנה. כל תחנה שמסיימים פותחת את הבאה',22,'#6b4a2b',{st:0,bold:false});
  // path
  const g=this.add.graphics();g.lineStyle(6,0x8a3f1f,.8);
  const pts=NODES.map(([x,y])=>new Phaser.Math.Vector2(x,y));const curve=new Phaser.Curves.Spline(pts);const sp=curve.getSpacedPoints(160);
  sp.forEach((p,i)=>{if(i%2===0&&sp[i+1])g.lineBetween(p.x,p.y,sp[i+1].x,sp[i+1].y);});
  const labels=[['מצרים',360,690],['היאור',230,300],['מדיין',1150,160],['ים סוף',880,320]];
  labels.forEach(([s,x,y])=>K.txt(this,x,y,s,22,'#6b4a2b',{st:0}).setAlpha(.8));
  const S=K.Store;let cur=0;KitaData.stages.forEach((st,i)=>{if(S.unlocked(i))cur=i;});
  KitaData.stages.forEach((st,i)=>{const [x,y]=NODES[i];const open=S.unlocked(i);const c=this.add.container(x,y);
    const m=this.add.graphics();m.fillStyle(0x3b2616,1);m.fillCircle(0,6,50);m.fillStyle(open?0xfbf1dc:0xb9ad98,1);m.fillCircle(0,0,50);m.lineStyle(5,0x3b2616);m.strokeCircle(0,0,50);
    m.lineStyle(3,open?0xf6c443:0x8a8070);m.strokeCircle(0,0,42);c.add(m);
    const icon=st.icon==='wave'?'icoWave':st.icon;const im=this.add.image(0,0,icon);const sc=Math.min(64/im.width,64/im.height);im.setScale(sc);if(!open)im.setTint(0x777777);c.add(im);
    const num=this.add.graphics();num.fillStyle(0xb4572e,1);num.fillCircle(36,-36,17);num.lineStyle(3,0x3b2616);num.strokeCircle(36,-36,17);c.add(num);c.add(K.txt(this,36,-37,String(i+1),20,'#fff',{st:0}));
    if(!open)c.add(this.add.image(0,4,'lock').setScale(.9));
    const lb=K.txt(this,0,72,st.name,22,'#3b2616',{st:5,stroke:'#fbf1dc'});c.add(lb);
    for(let k=0;k<3;k++)c.add(this.add.image(-30+k*30,104,k<S.d.stars[i]?'star':'starEmpty').setScale(.4));
    c.setSize(110,110).setInteractive({useHandCursor:open});
    if(open){c.on('pointerover',()=>this.tweens.add({targets:c,scale:1.08,duration:120}));c.on('pointerout',()=>this.tweens.add({targets:c,scale:1,duration:120}));
      c.on('pointerup',()=>{if(KitaUI.open)return;KitaAudio.init();KitaAudio.sfx('click');this.openStage(i);});
      if(i===cur&&S.d.stars[i]===0)this.tweens.add({targets:c,scale:1.1,duration:700,yoyo:true,repeat:-1,ease:'Sine.InOut'});}
  });
  const [mx,my]=NODES[cur];this.token=this.add.sprite(mx-60,my+8,'mosesIdle').setOrigin(.5,1).setScale(.55);
  this.tweens.add({targets:this.token,y:my+2,duration:600,yoyo:true,repeat:-1});
  const tot=S.total();const tt=this.add.container(1150,650);const bg=this.add.graphics();bg.fillStyle(0xfbf1dc,1);bg.lineStyle(4,0x3b2616);bg.fillRoundedRect(-90,-30,180,60,16);bg.strokeRoundedRect(-90,-30,180,60,16);
  tt.add([bg,this.add.image(52,0,'star').setScale(.6),K.txt(this,-12,0,`${tot} / 18`,28,'#3b2616',{st:0})]);
  K.icon(this,50,50,'icoMap',()=>this.scene.start('Title',{}));
  K.icon(this,120,50,KitaAudio.muted?'icoMute':'icoSound',i=>{const m=KitaAudio.toggle();i.setTexture(m?'icoMute':'icoSound');});
  const rs=K.txt(this,110,690,'איפוס התקדמות',16,'#8a5a2b',{st:0,bold:false}).setInteractive({useHandCursor:true});
  rs.on('pointerup',()=>{if(KitaUI.open)return;KitaUI.card({title:'לאפס את ההתקדמות?',text:['כל הכוכבים יימחקו והמסע יתחיל מהתחלה.'],buttons:[{t:'כן, לאפס',v:'y'},{t:'ביטול',v:'n',cls:'ghost'}]}).then(v=>{if(v==='y'){S.reset();this.scene.restart();}});});
  KitaAudio.music('calm');this.cameras.main.fadeIn(350);
  if(this.auto!=null&&this.auto!==false){const a=this.auto;this.auto=null;const [ax,ay]=NODES[a];
    this.tweens.add({targets:this.token,x:ax-60,duration:900,ease:'Sine.InOut',onComplete:()=>this.openStage(a)});}
 }
 openStage(i){const st=KitaData.stages[i];const it=st.intro;
  KitaUI.card({kicker:`תחנה ${i+1} מתוך 6`,ref:st.ref,title:it.title,text:it.text,quote:it.quote,qref:it.qref,task:it.task,buttons:[{t:'יאללה, מתחילים ▸',v:'go'},{t:'חזרה למפה',v:'map',cls:'ghost'}]})
   .then(v=>{if(v==='go'){this.cameras.main.fadeOut(300,20,12,6);this.time.delayedCall(320,()=>this.scene.start(st.scene,{i}));}});}
}

/* ---------- shared stage ---------- */
class BaseStage extends Phaser.Scene{
 init(d){this.idx=d.i;this.st=KitaData.stages[this.idx];this.data0=d;this.ended=false;this.hearts=3;}
 hud(title,hearts=true){const g=this.add.graphics().setScrollFactor(0).setDepth(990);g.fillStyle(0x1c130d,.55);g.fillRect(0,0,W,64);g.fillStyle(0xf6c443,1);g.fillRect(0,64,W,3);
  K.txt(this,W-24,32,`תחנה ${this.idx+1} · ${title}`,26,'#fff6dc',{ox:1,st:4}).setScrollFactor(0).setDepth(991);
  K.icon(this,40,32,'icoMap',()=>{if(KitaUI.open)return;this.scene.start('Map',{});},48);
  K.icon(this,100,32,KitaAudio.muted?'icoMute':'icoSound',i=>{const m=KitaAudio.toggle();i.setTexture(m?'icoMute':'icoSound');},48);
  this.scoreT=K.txt(this,W/2+40,32,'',24,'#f6c443',{st:4}).setScrollFactor(0).setDepth(991);
  if(hearts){this.heartImgs=[0,1,2].map(k=>this.add.image(170+k*40,32,'heart').setScrollFactor(0).setDepth(991));}
  this.cameras.main.fadeIn(350);}
 setHearts(n){this.hearts=n;(this.heartImgs||[]).forEach((h,k)=>{h.setTexture(k<n?'heart':'heartEmpty');});}
 loseHeart(){this.setHearts(this.hearts-1);const h=this.heartImgs&&this.heartImgs[this.hearts];if(h)this.tweens.add({targets:h,scale:1.6,duration:120,yoyo:true});return this.hearts<=0;}
 setScore(s){this.scoreT&&this.scoreT.setText(s);}
 touchBtn(x,y,key,down,up,size=110){const b=this.add.image(x,y,key).setDisplaySize(size,size).setScrollFactor(0).setDepth(995).setAlpha(.85).setInteractive();
  b.on('pointerdown',(p)=>{b.setAlpha(1).setDisplaySize(size*.92,size*.92);down&&down();});const rel=()=>{b.setAlpha(.85).setDisplaySize(size,size);up&&up();};b.on('pointerup',rel);b.on('pointerout',rel);return b;}
 stopPlay(){this.ended=true;if(this.physics&&this.physics.world)this.physics.world.pause();}
 finish(perf,lines=[]){if(this.done)return;this.done=true;this.stopPlay();KitaAudio.sfx('win');
  this.time.delayedCall(700,()=>this.askAndResult(perf,lines));}
 askAndResult(perf,lines){const i=this.idx;KitaUI.question(this.st.q).then(ok=>{const stars=Math.max(1,Math.min(3,perf+(ok?1:0)));K.Store.set(i,stars);
   const last=i===5;const L=[...lines];if(!ok)L.push('טיפ: בשאלה מהטקסט התשובה הנכונה בניסיון הראשון שווה כוכב.');if(last)L.push(`סך הכל במסע: ${K.Store.total()} כוכבים מתוך 18`);
   return KitaUI.result({title:last?'סיימתם את המסע!':(stars===3?'מושלם!':'כל הכבוד!'),stars,lines:L,
    buttons:last?[{t:'למפת המסע',v:'map'},{t:'לשחק שוב את התחנה',v:'retry',cls:'ghost'}]:[{t:'לתחנה הבאה ▸',v:'next'},{t:'שוב',v:'retry',cls:'ghost'},{t:'למפה',v:'map',cls:'ghost'}]});})
  .then(v=>this.route(v));}
 fail(title,lines=['אפשר לנסות שוב, זה חלק מהמשחק.']){if(this.done)return;this.done=true;this.stopPlay();KitaAudio.sfx('bad');this.cameras.main.shake(300,.01);
  this.time.delayedCall(600,()=>KitaUI.result({title,stars:0,lines,buttons:[{t:'לנסות שוב',v:'retry'},{t:'למפה',v:'map',cls:'ghost'}]}).then(v=>this.route(v)));}
 route(v){if(v==='retry'){const key=this.retryScene||this.st.scene;this.scene.start(key,{i:this.idx});}else if(v==='next')this.scene.start('Map',{auto:this.idx+1});else this.scene.start('Map',{});}
 par(key,y,h,f,o={}){const ts=this.add.tileSprite(0,y,W,h,key).setOrigin(0).setScrollFactor(0);if(o.tint)ts.setTint(o.tint);if(o.alpha!=null)ts.setAlpha(o.alpha);(this._par=this._par||[]).push([ts,f,o.drift||0]);return ts;}
 updPar(dt){const sx=this.cameras.main.scrollX;(this._par||[]).forEach(p=>{p[3]=(p[3]||0)+p[2]*dt;p[0].tilePositionX=sx*p[1]+p[3];});}
 stars(n=80,maxY=360){for(let k=0;k<n;k++){const s=this.add.image(Math.random()*W,Math.random()*maxY,'dot').setScrollFactor(0).setScale(.08+Math.random()*.12).setAlpha(.4+Math.random()*.6);
  this.tweens.add({targets:s,alpha:.15,duration:600+Math.random()*1600,yoyo:true,repeat:-1,delay:Math.random()*1500});}}
}
K.Boot=Boot;K.Title=Title;K.MapScene=MapScene;K.BaseStage=BaseStage;
window.K=K;window.KitaGame={starURL:K.starURL};
})();
