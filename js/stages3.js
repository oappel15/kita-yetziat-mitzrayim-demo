/* Stage 5 – the night of the exodus, Stage 6 – the sea splits, 6b – crossing, Song – שירת הים */
(function(){const {W,H,txt,BaseStage}=K;const A=KitaAudio;
// auto-runner shared by stage 5 and 6b
class Runner extends BaseStage{
 setupRunner(len,groundY,groundKey,tint){this.LEN=len;this.GY=groundY;this.physics.world.setBounds(0,0,len,H);this.cameras.main.setBounds(0,0,len,H);
  this.par(groundKey,groundY,H-groundY,1,tint?{tint}:{}).setDepth(10);this.ground=this.add.rectangle(len/2,groundY+(H-groundY)/2,len,H-groundY);this.physics.add.existing(this.ground,true);
  this.p=this.physics.add.sprite(160,groundY-10,'moses0').setOrigin(.5,1).setDepth(60);this.p.body.setSize(40,120).setOffset(30,26);this.p.setGravityY(1700);this.p.play('moses-run');
  this.physics.add.collider(this.p,this.ground);this.obs=this.physics.add.group({allowGravity:false,immovable:true});this.items=this.physics.add.group({allowGravity:false});
  this.physics.add.overlap(this.p,this.obs,(p,o)=>this.bump(o));this.physics.add.overlap(this.p,this.items,(p,o)=>this.collect(o));
  this.cameras.main.startFollow(this.p,true,.12,.12,-360,0);this.trail=[];this.followers=[];this.inv=0;this.slow=0;this.hits=0;
  this.input.on('pointerdown',p=>{if(p.y>70&&!KitaUI.open)this.jump();});this.input.keyboard.on('keydown-SPACE',()=>this.jump());this.input.keyboard.on('keydown-UP',()=>this.jump());
  this.dust=this.add.particles(0,0,'dot',{follow:this.p,followOffset:{x:-14,y:-4},lifespan:400,speedX:{min:-120,max:-40},speedY:{min:-40,max:0},scale:{start:.35,end:0},alpha:{start:.5,end:0},frequency:60,tint:0xd9c09a}).setDepth(59);}
 jump(){if(this.ended||KitaUI.open||!this.p.body)return;if(this.p.body.blocked.down||this.p.body.touching.down){this.p.setVelocityY(-860);A.sfx('jump');}}
 addFollower(key){const f=this.add.sprite(this.p.x-40,this.GY,key+'_0').setOrigin(.5,1).setDepth(55-this.followers.length*.01).setScale(.9);f.play({key:key+'-walk',startFrame:this.followers.length%4});f.anims.timeScale=1.4;this.followers.push(f);}
 runUpdate(dt,speed){const p=this.p;this.inv=Math.max(0,this.inv-dt);this.slow=Math.max(0,this.slow-dt);
  p.setVelocityX(this.slow>0?speed*.45:speed);const onG=p.body.blocked.down||p.body.touching.down;if(!onG){p.anims.pause();p.setTexture('moses1');}else if(!p.anims.isPlaying){p.play('moses-run');}
  this.dust.emitting=onG;this.trail.unshift({x:p.x,y:p.y});if(this.trail.length>400)this.trail.pop();
  this.followers.forEach((f,i)=>{const tr=this.trail[Math.min(this.trail.length-1,(i+1)*9)];if(tr){f.x=tr.x-(i+1)*6;f.y=Math.min(this.GY,tr.y);}});}
 hurt(){this.inv=1.3;this.slow=.6;this.hits++;A.sfx('hit');this.cameras.main.shake(200,.008);this.tweens.add({targets:this.p,alpha:.3,duration:110,yoyo:true,repeat:5});}
}
class Stage5 extends Runner{constructor(){super('Stage5');}
 create(){A.music('night');this.fam=0;this.famTotal=0;this.dough=0;
  K.sky(this,0x0b1030,0x3a3a6a);this.stars(110,420);this.add.image(1040,130,'moon').setScrollFactor(0).setScale(1.2);
  this.par('bgFar',300,320,.08,{tint:0x4a5276});this.par('bgHouses',380,260,.45,{tint:0xbfb6d6});
  this.setupRunner(9600,640,'sandTile',0x8a7aa0);
  // fences/walls in the near background
  for(let x=600;x<9000;x+=700+Math.random()*500){this.add.image(x,640,'bush').setOrigin(.5,1).setScale(.4).setTint(0x4a5a5a).setDepth(5);}
  let x=900;while(x<9000){const r=Math.random();
   if(r<.45){const o=this.obs.create(x,this.GY,Math.random()<.6?'jar':'cart').setOrigin(.5,1);o.body.setSize(o.width*.7,o.height*.7).setOffset(o.width*.15,o.height*.3);x+=520+Math.random()*300;}
   else if(r<.8){const k=Math.floor(Math.random()*5);const f=this.items.create(x,this.GY,`p${k}_0`).setOrigin(.5,1).setFlipX(true).setScale(.9);f.kind='fam';f.pk=k;f.body.setSize(60,140);this.famTotal++;
    this.tweens.add({targets:f,y:this.GY-8,duration:300,yoyo:true,repeat:-1,delay:Math.random()*300});x+=420+Math.random()*200;}
   else{const d=this.items.create(x,this.GY-170,'dough');d.kind='dough';this.tweens.add({targets:d,y:d.y-12,duration:600,yoyo:true,repeat:-1});x+=360+Math.random()*200;}}
  // the gate out of the city
  const gx=this.LEN-260;const gg=this.add.graphics().setDepth(8);gg.fillStyle(0x3a2e4a);gg.fillRect(gx-120,380,40,260);gg.fillRect(gx+80,380,40,260);gg.fillRect(gx-140,360,280,40);
  txt(this,gx,330,'סֻכּוֹת ▸',34,'#f6c443',{st:6}).setDepth(9);
  this.spark=this.add.particles(0,0,'spark',{emitting:false,lifespan:600,speed:{min:60,max:200},scale:{start:.5,end:0},tint:[0xfff3b0,0xf6c443],blendMode:'ADD'}).setDepth(90);
  this.hud(this.st.name);this.updS();
  this.tip=txt(this,W/2,130,K.isTouch()?'הקישו על המסך כדי לקפוץ':'רווח / חץ למעלה / הקלקה = קפיצה',26,'#fff',{st:5}).setScrollFactor(0).setDepth(980);
  this.time.delayedCall(3500,()=>this.tip&&this.tweens.add({targets:this.tip,alpha:0,duration:500}));}
 updS(){this.setScore(`משפחות: ${this.fam}/${this.famTotal} · בצק: ${this.dough}`);}
 bump(o){if(this.inv>0||o.hit||this.ended)return;o.hit=true;this.hurt();this.tweens.add({targets:o,angle:80,y:o.y+10,alpha:.5,duration:400});if(this.loseHeart())this.fail('נתקלתם יותר מדי פעמים',['קפצו מוקדם יותר מעל הכדים והעגלות.']);}
 collect(o){if(o.got)return;o.got=true;if(o.kind==='fam'){this.fam++;A.sfx('coin');if(this.followers.length<14)this.addFollower('p'+o.pk);K.floatText(this,o.x,o.y-150,'+ משפחה','#fff',24);}
  else{this.dough++;A.sfx('coin');this.spark.explode(12,o.x,o.y);}o.destroy();this.updS();}
 update(t,dt){this.updPar(dt);if(this.ended||KitaUI.open){if(this.p.body)this.p.setVelocityX(0);return;}this.runUpdate(dt/1000,330);
  if(this.p.x>this.LEN-300){this.ended=true;this.p.setVelocityX(0);this.p.anims.stop();this.p.setTexture('mosesRaise');this.dust.emitting=false;A.sfx('good');this.spark.explode(40,this.p.x,this.p.y-120);
   const ratio=this.famTotal?this.fam/this.famTotal:1;const perf=(ratio>=.8?1:0)+(this.hits===0?1:0);
   this.time.delayedCall(1500,()=>this.finish(perf,[`${this.fam}/${this.famTotal} משפחות · ${this.dough} צרורות בצק · ${this.hits} מכשולים`,'"וַיִּסְעוּ בְנֵי יִשְׂרָאֵל מֵרַעְמְסֵס סֻכֹּתָה" (שמות יב, 37)']));}}
}
/* ---- Stage 6: the sea splits (frontal view) ---- */
class Stage6 extends BaseStage{constructor(){super('Stage6');}
 create(){A.music('tense');this.p=0;this.chase=0;this.hold=false;this.t=0;this.split=false;
  K.sky(this,0x10173a,0x5a4a8a);this.stars(80,260);this.add.image(1050,110,'moon').setScale(.9);
  this.add.tileSprite(0,190,W,120,'bgMountains').setOrigin(0).setTint(0x2a2f55).setTileScale(1,.35);
  this.sea=this.add.graphics();
  this.shore=this.add.graphics().setDepth(20);this.shore.fillGradientStyle(0xc9a46a,0xc9a46a,0x8a6a3e,0x8a6a3e,1);this.shore.fillRect(0,600,W,130);this.shore.fillStyle(0xe8d2a0,1);
  for(let x=0;x<W;x+=40)this.shore.fillEllipse(x+20,604,60,14);
  // people on the shore
  const pk=[[60,.95,0],[150,1,1],[230,.9,2],[320,1.05,3],[410,.95,4],[1180,1,1],[1100,.9,3],[1020,1,0]];
  pk.forEach(([x,s,k])=>this.add.image(x,712,`p${k}_0`).setOrigin(.5,1).setScale(s*1.15).setDepth(25).setFlipX(x>640));
  this.mo=this.add.image(640,712,'mosesIdle').setOrigin(.5,1).setScale(1.35).setDepth(26);
  this.wind=this.add.particles(0,0,'streak',{x:W+40,y:{min:120,max:600},speedX:{min:-1300,max:-800},lifespan:1600,scaleX:{min:.8,max:2},alpha:{start:.5,end:0},frequency:30,emitting:false}).setDepth(30);
  this.spray=this.add.particles(0,0,'drop',{emitting:false,lifespan:900,speedY:{min:-260,max:-80},speedX:{min:-80,max:80},gravityY:500,scale:{start:.8,end:.2},alpha:{start:.9,end:0}}).setDepth(15);
  this.hud(this.st.name,false);
  // chariot pressure meter
  const mg=this.add.graphics().setDepth(991);mg.fillStyle(0x000000,.45);mg.fillRoundedRect(380,82,520,26,13);this.mFill=this.add.graphics().setDepth(992);
  this.add.image(904,95,'chariot0').setScale(.3).setDepth(993);txt(this,640,126,'מרכבות פרעה מתקרבות…',22,'#ffd0c0',{st:4}).setDepth(993);
  this.pFillBg=this.add.graphics().setDepth(40);this.pFill=this.add.graphics().setDepth(41);
  // hold button
  this.hb=this.add.container(1150,560).setDepth(995);const hbg=this.add.image(0,0,'icoStaff').setDisplaySize(150,150);const ht=txt(this,0,94,'החזיקו!',24,'#fff',{st:5});this.hb.add([hbg,ht]);
  this.hb.setSize(160,160).setInteractive({useHandCursor:true});this.tweens.add({targets:hbg,scale:hbg.scale*1.08,duration:600,yoyo:true,repeat:-1});
  this.hb.on('pointerdown',()=>this.setHold(true));this.input.on('pointerup',()=>this.setHold(false));
  this.input.on('pointerdown',p=>{if(p.y>140&&!KitaUI.open)this.setHold(true);});
  this.input.keyboard.on('keydown-SPACE',()=>this.setHold(true));this.input.keyboard.on('keyup-SPACE',()=>this.setHold(false));
  this.tip=txt(this,W/2,200,K.isTouch()?'החזיקו את האצבע על המסך כדי שמשה ינטה את ידו על הים':'החזיקו את מקש הרווח (או את העכבר) כדי שמשה ינטה את ידו על הים',26,'#fff',{st:5}).setDepth(980);
 }
 setHold(h){if(this.split||this.ended||KitaUI.open)h=false;if(h===this.hold)return;this.hold=h;this.mo.setTexture(h?'mosesRaise':'mosesIdle');this.wind.emitting=h;A.wind(h);if(h&&this.tip){this.tweens.add({targets:this.tip,alpha:0,duration:300});}}
 drawSea(){const g=this.sea;g.clear();const p=Phaser.Math.Easing.Sine.InOut(this.p),t=this.t;const HZ=300,BY=600;
  // base sea
  g.fillGradientStyle(0x3a6a9a,0x3a6a9a,0x14365e,0x14365e,1);g.fillRect(0,HZ,W,BY-HZ);
  g.lineStyle(3,0x7fb6d9,.35);for(let k=0;k<7;k++){const y=HZ+20+k*k*7+((t*30)%20);g.beginPath();for(let x=0;x<=W;x+=40){const yy=y+Math.sin(x/60+t*2+k)*3*(1+k*.3);if(x===0)g.moveTo(x,yy);else g.lineTo(x,yy);}g.strokePath();}
  if(p<=0.001)return;
  const hwh=3+60*p,hwb=8+330*p,topH=HZ-70*p,topB=BY-400*p;
  // seabed
  g.fillGradientStyle(0x8a7a5a,0x8a7a5a,0xd9c08a,0xd9c08a,1);g.fillTriangle(640-hwh,HZ,640+hwh,HZ,640+hwb,BY);g.fillTriangle(640-hwh,HZ,640+hwb,BY,640-hwb,BY);
  [[-1],[1]].forEach(([s])=>{const ih={x:640+s*hwh,y:HZ},ib={x:640+s*hwb,y:BY};const N=10;const top=[];
    for(let k=0;k<=N;k++){const f=k/N;const x=ih.x+(ib.x-ih.x)*f;const y=topH+(topB-topH)*f+Math.sin(t*3+f*8+s)*6*p;top.push({x,y});}
    // water hump outside the wall
    g.fillStyle(0x24507e,1);g.beginPath();g.moveTo(s<0?0:W,HZ);top.forEach(q=>g.lineTo(q.x,q.y));g.lineTo(ib.x,BY);g.lineTo(s<0?0:W,BY);g.closePath();g.fillPath();
    // wall face
    for(let k=0;k<N;k++){const a=top[k],b=top[k+1];const fa=k/N,fb=(k+1)/N;const ba={x:ih.x+(ib.x-ih.x)*fa,y:HZ+(BY-HZ)*fa},bb={x:ih.x+(ib.x-ih.x)*fb,y:HZ+(BY-HZ)*fb};
     g.fillGradientStyle(0x5fb8d9,0x5fb8d9,0x0f3a66,0x0f3a66,.96);g.fillTriangle(a.x,a.y,b.x,b.y,bb.x,bb.y);g.fillTriangle(a.x,a.y,bb.x,bb.y,ba.x,ba.y);}
    g.lineStyle(10,0xe8fbff,.9);g.beginPath();top.forEach((q,i)=>i?g.lineTo(q.x,q.y):g.moveTo(q.x,q.y));g.strokePath();
    g.lineStyle(3,0xbfe9f7,.4);for(let k=1;k<4;k++){g.beginPath();top.forEach((q,i)=>{const fy=q.y+(HZ+(BY-HZ)*(i/N)-q.y)*(k/4);i?g.lineTo(q.x+Math.sin(t*2+i+k)*3,fy):g.moveTo(q.x,fy);});g.strokePath();}
    if(Math.random()<.6*p){const q=top[Math.floor(Math.random()*N)];this.spray.explode(2,q.x,q.y);}
  });}
 update(time,dt){const s=dt/1000;this.t+=s;if(KitaUI.open)return;
  if(!this.split&&!this.ended){this.p=Phaser.Math.Clamp(this.p+(this.hold?s*.24:-s*.05),0,1);this.chase=Math.min(1,this.chase+s/40);A.windLevel(this.p);
   if(this.hold)this.cameras.main.shake(100,.001+.004*this.p);
   this.mFill.clear();this.mFill.fillStyle(0xd9362b,1);this.mFill.fillRoundedRect(383,85,514*this.chase,20,10);
   this.pFillBg.clear();this.pFill.clear();this.pFillBg.fillStyle(0x000000,.5);this.pFillBg.fillRoundedRect(540,656,200,18,9);this.pFill.fillStyle(0x7fd0f0,1);this.pFill.fillRoundedRect(540,656,200*this.p,18,9);
   if(this.p>=1)this.doSplit();else if(this.chase>=1)this.fail('המרכבות הגיעו',['החזיקו את הכפתור ברצף, בלי לעזוב.']);}
  this.drawSea();}
 doSplit(){this.split=true;this.setHold(false);this.hold=false;this.mo.setTexture('mosesRaise');A.wind(false);A.sfx('roar');this.cameras.main.flash(600,220,240,255);this.cameras.main.shake(1200,.012);
  this.hb.destroy();this.pFill.clear();this.pFillBg.clear();
  const t=txt(this,W/2,250,'וַיִּבָּקְעוּ הַמָּיִם',96,'#e8fbff',{font:'"Frank Ruhl Libre", serif',st:10,stroke:'#0f3a66',shadow:true}).setDepth(999).setScale(.3).setAlpha(0);
  this.tweens.add({targets:t,scale:1,alpha:1,duration:900,ease:'Back.Out'});txt(this,W/2,330,'שמות יד, 21',26,'#fff',{st:4}).setDepth(999);
  this.time.delayedCall(3200,()=>{this.cameras.main.fadeOut(600,255,255,255);this.time.delayedCall(650,()=>this.scene.start('Stage6b',{i:this.idx}));});}
}
/* ---- Stage 6b: run between the walls of water ---- */
class Stage6b extends Runner{constructor(){super('Stage6b');}
 create(){this.retryScene='Stage6b';A.music('tense');this.gap=560;
  K.sky(this,0x0c1436,0x24305e);this.stars(60,120);
  this.wall=this.par('waterWall',60,420,.85);this.foam=this.par('foam',36,40,.85,{drift:.06});
  this.fish=[];for(let k=0;k<16;k++){const f=this.add.image(400+k*520+Math.random()*200,140+Math.random()*260,'fish'+(k%2)).setScrollFactor(.85).setAlpha(.75).setScale(.7+Math.random()*.5);
   this.tweens.add({targets:f,x:f.x+(Math.random()<.5?-1:1)*120,duration:3000+Math.random()*2000,yoyo:true,repeat:-1,ease:'Sine.InOut',onYoyo:()=>f.toggleFlipX(),onRepeat:()=>f.toggleFlipX()});}
  this.add.particles(0,0,'dot',{x:{min:0,max:W},y:470,speedY:{min:-80,max:-30},lifespan:5000,scale:{start:.15,end:.05},alpha:{start:.5,end:0},frequency:120}).setScrollFactor(0);
  for(let k=0;k<5;k++){const r=this.add.image(200+k*260,60,'streak').setScrollFactor(0).setOrigin(0,.5).setAngle(80+k*3).setScale(6,4).setAlpha(.05).setBlendMode('ADD');}
  this.setupRunner(8200,560,'seabedTile');
  for(let x=300;x<8000;x+=90+Math.random()*160)this.add.image(x,566+Math.random()*60,'shell').setDepth(11).setAngle(Math.random()*40-20);
  for(let x=900;x<7600;){const o=this.obs.create(x,this.GY+4,Math.random()<.6?'seaRock':'coral').setOrigin(.5,1);o.body.setSize(o.width*.65,o.height*.6).setOffset(o.width*.18,o.height*.4);x+=480+Math.random()*320;}
  // far shore
  this.endX=this.LEN-260;const sh=this.add.graphics().setDepth(12);sh.fillStyle(0xd9b47a);sh.fillRect(this.LEN-500,520,500,200);sh.fillStyle(0xe8cc94);sh.fillEllipse(this.LEN-500,560,200,80);
  for(let k=0;k<4;k++)this.addFollower('p'+k);
  this.ch=[this.add.sprite(0,this.GY+2,'chariot0').setOrigin(.5,1).setDepth(58),this.add.sprite(0,this.GY+2,'chariot0').setOrigin(.5,1).setDepth(57).setScale(.9)];this.ch.forEach((c,k)=>c.play({key:'chariot-run',startFrame:k*2}));
  this.chDust=this.add.particles(0,0,'dot',{follow:this.ch[0],followOffset:{x:-80,y:-10},lifespan:700,speedX:{min:-200,max:-60},speedY:{min:-60,max:0},scale:{start:.6,end:0},alpha:{start:.5,end:0},frequency:40,tint:0xc9b07a}).setDepth(56);
  this.front=this.par('waterWall',652,80,1,{alpha:.55});this.front.setDepth(100);this.ffoam=this.par('foam',628,40,1,{drift:.1});this.ffoam.setDepth(101);
  this.hud('בין חומות המים');this.updS();
  const pb=this.add.graphics().setScrollFactor(0).setDepth(991);pb.fillStyle(0x000000,.35);pb.fillRoundedRect(440,82,400,14,7);this.pbFill=this.add.graphics().setScrollFactor(0).setDepth(991);
  txt(this,W/2,128,'"וְהַמַּיִם לָהֶם חוֹמָה מִימִינָם וּמִשְּׂמֹאלָם"',24,'#e8fbff',{font:'"Frank Ruhl Libre", serif',st:4,stroke:'#0f3a66'}).setScrollFactor(0).setDepth(980);
 }
 updS(){this.setScore(`מכשולים: ${this.hits}`);}
 bump(o){if(this.inv>0||o.hit||this.ended)return;o.hit=true;this.hurt();this.gap-=150;this.updS();K.floatText(this,this.p.x,this.p.y-160,'המרכבות מתקרבות!','#ffd0c0',24);
  if(this.loseHeart()||this.gap<140)this.fail('המרכבות השיגו אתכם',['קפצו מעל הסלעים והאלמוגים כדי לשמור מרחק.']);}
 collect(){}
 update(t,dt){const s=dt/1000;this.updPar(dt);if(KitaUI.open){this.p.setVelocityX(0);return;}
  if(!this.ended){this.runUpdate(s,330);this.gap=Math.min(560,this.gap+s*14);
   const pr=Math.min(1,this.p.x/this.endX);this.pbFill.clear();this.pbFill.fillStyle(0x7fd0f0,1);this.pbFill.fillRoundedRect(440,82,400*pr,14,7);
   if(this.p.x>=this.endX)this.reachShore();}
  if(!this.closing){this.ch[0].x=this.p.x-this.gap;this.ch[1].x=this.ch[0].x-190;}}
 reachShore(){this.ended=true;this.closing=true;this.p.setVelocityX(0);this.p.anims.stop();this.p.setTexture('mosesIdle');this.dust.emitting=false;this.cameras.main.stopFollow();
  const cam=this.cameras.main;this.followers.forEach((f,i)=>this.tweens.add({targets:f,x:this.LEN-330-i*50,duration:900}));this.tweens.add({targets:this.p,x:this.LEN-150,duration:700});
  this.tweens.add({targets:cam,scrollX:this.LEN-W,duration:900});
  this.ch.forEach((c,k)=>{c.x=this.LEN-W-200-k*200;this.tweens.add({targets:c,x:this.LEN-W+420-k*220,duration:2600,ease:'Sine.Out'});});
  this.time.delayedCall(1300,()=>{this.p.setFlipX(true).setTexture('mosesRaise');K.bubble(this,this.p.x-20,this.p.y-200,'"וַיֵּט מֹשֶׁה אֶת יָדוֹ עַל הַיָּם"',1800,{size:22});});
  this.time.delayedCall(2600,()=>this.closeSea());}
 closeSea(){const cam=this.cameras.main;A.sfx('crash');cam.shake(1800,.016);cam.flash(300,230,250,255);
  const L=this.LEN-W;const water=this.add.graphics().setDepth(70);let lvl={h:0};
  this.tweens.add({targets:lvl,h:1,duration:1600,ease:'Cubic.In',onUpdate:()=>{water.clear();const top=60+(1-lvl.h)*0+lvl.h*0;water.fillGradientStyle(0x3fa7c9,0x3fa7c9,0x0f3a66,0x0f3a66,.97);
    const yTop=Phaser.Math.Linear(700,300,lvl.h);water.fillRect(L,yTop,W-470,720-yTop);}});
  this.tweens.add({targets:[this.wall,this.foam],y:'+=260',duration:1600,ease:'Cubic.In'});
  const splash=this.add.particles(0,0,'drop',{emitting:false,lifespan:1500,speedY:{min:-700,max:-200},speedX:{min:-200,max:200},gravityY:900,scale:{start:1.4,end:.3},alpha:{start:1,end:0}}).setDepth(80);
  const foamP=this.add.particles(0,0,'dot',{emitting:false,lifespan:1800,speed:{min:100,max:400},scale:{start:1.4,end:0},alpha:{start:.8,end:0},tint:0xe8fbff}).setDepth(81);
  for(let k=0;k<8;k++)this.time.delayedCall(k*170,()=>{const x=L+60+Math.random()*(W-560);splash.explode(40,x,420);foamP.explode(20,x,420);A.sfx('splash');});
  this.ch.forEach(c=>{this.tweens.add({targets:c,y:c.y+260,alpha:0,duration:1500,delay:500});});
  this.time.delayedCall(1700,()=>{const wh=this.add.image(L+380,300,'wheel').setDepth(75);this.tweens.add({targets:wh,y:312,angle:20,duration:1400,yoyo:true,repeat:-1,ease:'Sine.InOut'});
   const tt=txt(this,W/2,200,'"וַיָּשֻׁבוּ הַמַּיִם"',64,'#e8fbff',{font:'"Frank Ruhl Libre", serif',st:8,stroke:'#0f3a66',shadow:true}).setScrollFactor(0).setDepth(999).setAlpha(0);
   this.tweens.add({targets:tt,alpha:1,duration:600});txt(this,W/2,260,'שמות יד, 28',22,'#fff',{st:4}).setScrollFactor(0).setDepth(999);});
  const perf=this.hits===0?2:(this.hits<=1?1:0);
  this.time.delayedCall(4600,()=>{cam.fadeOut(800,255,236,200);this.time.delayedCall(850,()=>this.scene.start('Song',{i:this.idx,perf,hits:this.hits}));});}
}
/* ---- Song of the Sea ---- */
class Song extends BaseStage{constructor(){super('Song');}
 create(){this.retryScene='Stage6';A.music('joy');const d=this.data0;
  K.sky(this,0x7a8fd0,0xffc48a);const sun=this.add.image(1000,420,'sun').setScale(2.6);this.tweens.add({targets:sun,y:330,duration:6000});
  this.add.image(260,110,'cloud').setAlpha(.7);this.add.image(760,70,'cloud').setScale(.6).setAlpha(.6);
  const w=this.add.tileSprite(0,420,W,140,'water').setOrigin(0).setTint(0xb8d8ff);this.tweens.add({targets:w,tilePositionX:400,duration:20000,repeat:-1});
  const wh=this.add.image(1100,440,'wheel').setScale(.6).setAlpha(.8);this.tweens.add({targets:wh,y:448,angle:15,duration:1600,yoyo:true,repeat:-1});
  this.add.tileSprite(0,540,W,200,'sandTile').setOrigin(0);this.add.tileSprite(0,320,W,260,'bgMountains').setOrigin(0).setTint(0xd8a890).setAlpha(.0);
  const dancers=[['miriam',640,1.2],['woman',470,1],['woman',810,1],['woman',330,.95],['woman',950,.95]];
  dancers.forEach(([k,x,sc],i)=>{const s=this.add.sprite(x,680,k+'0').setOrigin(.5,1).setScale(sc).setFlipX(i%2===1);s.play({key:k+'-dance',startFrame:i%4});
   this.tweens.add({targets:s,y:660,duration:330,yoyo:true,repeat:-1,delay:i*80,ease:'Sine.Out'});this.tweens.add({targets:s,x:x+(i%2?-24:24),duration:1300,yoyo:true,repeat:-1,ease:'Sine.InOut'});});
  [[120,0],[200,3],[1180,1],[1100,4]].forEach(([x,k])=>this.add.image(x,700,`p${k}_0`).setOrigin(.5,1).setFlipX(x>640));
  this.add.image(60,700,'mosesRaise').setOrigin(.5,1).setScale(1.05);
  this.add.particles(0,0,'confetti',{x:{min:0,max:W},y:-20,lifespan:5000,speedY:{min:80,max:180},speedX:{min:-40,max:40},rotate:{start:0,end:720},scale:{min:.6,max:1.1},frequency:60,tint:[0xf6c443,0xe8735a,0x2f8a9a,0xf4a3c4,0x8fd3e8]});
  this.add.particles(0,0,'spark',{x:{min:0,max:W},y:{min:200,max:600},lifespan:1200,scale:{start:.5,end:0},alpha:{start:.9,end:0},frequency:150,blendMode:'ADD'});
  this.time.addEvent({delay:330,loop:true,callback:()=>A.sfx('tof')});
  this.hud('שירת הים',false);
  const t=txt(this,W/2,180,'שִׁירַת הַיָּם',96,'#fff6dc',{font:'"Frank Ruhl Libre", serif',st:10,shadow:true}).setScale(.3).setAlpha(0);this.tweens.add({targets:t,scale:1,alpha:1,duration:900,ease:'Back.Out'});
  this.time.delayedCall(2600,()=>{const sg=KitaData.song;KitaUI.card({kicker:sg.qref,title:sg.title,text:sg.text,quote:sg.quote,qref:sg.qref,buttons:[{t:'המשך',v:'n'}]}).then(()=>this.finish(d.perf||0,[`${d.hits||0} מכשולים בים`,'עברתם את כל ששת שלבי הסיפור, משמות א ועד שמות טו.']));});}
}
K.Stage5=Stage5;K.Stage6=Stage6;K.Stage6b=Stage6b;K.Song=Song;})();
