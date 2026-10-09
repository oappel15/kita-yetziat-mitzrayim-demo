/* Stage 3 – Midian & the bush, 3b – before Pharaoh, Stage 4 – the ten plagues */
(function(){const {W,H,txt,BaseStage}=K;const A=KitaAudio;
class Stage3 extends BaseStage{constructor(){super('Stage3');}
 create(){A.music('calm');const LEN=3900;this.LEN=LEN;this.perfDlg=0;
  K.sky(this,0x5b4a8f,0xf5a66a);this.add.image(980,300,'sun').setScrollFactor(0).setScale(2).setAlpha(.9);this.stars(30,200);
  this.par('bgMountains',240,360,.15,{tint:0xd9a0a0});this.par('bgMountains',330,360,.3,{tint:0xc58a6a});
  this.physics.world.setBounds(0,0,LEN,H);this.cameras.main.setBounds(0,0,LEN,H);
  this.par('sandTile',640,90,1,{tint:0xf0c8a0});this.ground=this.add.rectangle(LEN/2,685,LEN,90);this.physics.add.existing(this.ground,true);
  this.plats=this.physics.add.staticGroup();
  const ledges=[[700,540,2],[1050,470,1.6],[1600,520,2.2],[2150,450,1.8],[2500,540,1.6],[2900,480,2]];
  ledges.forEach(([x,y,sc])=>{const im=this.add.image(x,y,'rock').setScale(sc,1.3);const top=y-im.displayHeight/2+16;
   const r=this.add.rectangle(x,top+12,im.displayWidth*.8,24);this.plats.add(r);});
  // decorative shrubs
  for(let x=200;x<LEN;x+=380+Math.random()*200)this.add.image(x,646,'bush').setOrigin(.5,1).setScale(.35+Math.random()*.2).setTint(0xc8b080);
  // the bush on Horeb
  const hx=LEN-260;const mound=this.add.graphics();mound.fillStyle(0x9a5a3e);mound.fillEllipse(hx,650,700,170);mound.fillStyle(0xb36a4c);mound.fillEllipse(hx,656,560,120);
  this.glow=this.add.image(hx,560,'dot').setScale(9).setTint(0xffa040).setAlpha(.35).setBlendMode('ADD');this.tweens.add({targets:this.glow,alpha:.55,scale:10,duration:700,yoyo:true,repeat:-1});
  this.bush=this.add.image(hx,612,'bush').setOrigin(.5,1).setScale(1.25);
  this.fire=this.add.particles(0,0,'flame',{x:{min:hx-70,max:hx+70},y:{min:530,max:590},lifespan:{min:450,max:850},speedY:{min:-160,max:-70},speedX:{min:-25,max:25},scale:{start:.9,end:0},alpha:{start:.85,end:0},tint:[0xffffff,0xffd27a,0xff9a3a],frequency:22,blendMode:'ADD'});
  this.add.particles(0,0,'spark',{x:{min:hx-60,max:hx+60},y:{min:520,max:580},lifespan:1200,speedY:{min:-120,max:-50},speedX:{min:-30,max:30},scale:{start:.25,end:0},tint:0xffc36a,frequency:120,blendMode:'ADD'});
  this.hx=hx;
  // player
  this.p=this.physics.add.sprite(140,560,'moses0').setOrigin(.5,1);this.p.body.setSize(40,130).setOffset(30,16);this.p.setGravityY(1500).setCollideWorldBounds(true);this.p.setDepth(50);
  this.physics.add.collider(this.p,this.ground);this.physics.add.collider(this.p,this.plats,null,(pl)=>pl.body.velocity.y>=0);
  // sheep
  this.sheep=[];const spots=[[700,470],[1600,450],[2150,380],[2900,410]];
  spots.forEach(([x,y])=>{const sh=this.physics.add.sprite(x,y-10,'sheep0').setOrigin(.5,1);sh.setGravityY(1200);sh.body.setSize(60,40).setOffset(10,14);this.physics.add.collider(sh,this.plats);this.physics.add.collider(sh,this.ground);
   sh.lost=true;this.tweens.add({targets:sh,scaleY:.94,duration:500,yoyo:true,repeat:-1});this.sheep.push(sh);});
  this.trail=[];this.got=0;
  this.cameras.main.startFollow(this.p,true,.1,.1,-200,0);
  this.hud(this.st.name,false);this.setScore('כבשים: 0/4');
  this.keys=this.input.keyboard.addKeys('LEFT,RIGHT,UP,SPACE,A,D,W');this.tl={};
  if(K.isTouch()){this.touchBtn(90,620,'icoLeft',()=>this.tl.l=1,()=>this.tl.l=0);this.touchBtn(220,620,'icoRight',()=>this.tl.r=1,()=>this.tl.r=0);this.touchBtn(W-100,620,'icoJump',()=>this.tl.j=1,()=>this.tl.j=0);}
  this.tip=txt(this,W/2,120,K.isTouch()?'חיצים ללכת, הכפתור הימני לקפוץ':'חצים ללכת, חץ למעלה או רווח לקפוץ',24,'#fff',{st:5}).setScrollFactor(0).setDepth(980);
  this.time.delayedCall(4500,()=>this.tip&&this.tweens.add({targets:this.tip,alpha:0,duration:500}));
  this.hearts2=this.add.particles(0,0,'spark',{emitting:false,lifespan:600,speed:{min:40,max:140},scale:{start:.5,end:0},tint:0xfff3b0});
 }
 update(t,dt){this.updPar(dt);if(this.ended||KitaUI.open){if(this.p.body)this.p.setVelocityX(0);return;}
  const k=this.keys,p=this.p;const L=k.LEFT.isDown||k.A.isDown||this.tl.l,R=k.RIGHT.isDown||k.D.isDown||this.tl.r,J=k.UP.isDown||k.SPACE.isDown||k.W.isDown||this.tl.j;
  if(L){p.setVelocityX(-280);p.setFlipX(true);}else if(R){p.setVelocityX(280);p.setFlipX(false);}else p.setVelocityX(0);
  const onG=p.body.blocked.down||p.body.touching.down;if(J&&onG){p.setVelocityY(-820);A.sfx('jump');}
  if(!onG)p.anims.stop(),p.setTexture('moses1');else if(L||R)p.anims.play('moses-walk',true);else{p.anims.stop();p.setTexture('mosesIdle');}
  this.trail.unshift({x:p.x,y:p.y,f:p.flipX});if(this.trail.length>200)this.trail.pop();
  let n=0;this.sheep.forEach(sh=>{if(sh.lost){if(Math.abs(sh.x-p.x)<60&&Math.abs(sh.y-p.y)<90){sh.lost=false;sh.body.enable=false;this.got++;A.sfx('coin');this.hearts2.explode(12,sh.x,sh.y-30);this.setScore(`כבשים: ${this.got}/4`);K.floatText(this,sh.x,sh.y-60,'מֶה!','#fff',28);sh.play('sheep-walk');}}
   else{n++;const tr=this.trail[Math.min(this.trail.length-1,n*16)];sh.x=tr.x-(tr.f?-1:1)*20;sh.y=tr.y;sh.setFlipX(tr.f);}});
  if(p.x>this.hx-220)this.atBush();}
 atBush(){this.ended=true;this.p.setVelocity(0);this.p.anims.stop();this.p.setTexture('mosesIdle');A.sfx('fire');
  this.cameras.main.stopFollow();this.cameras.main.pan(this.hx-120,420,1200,'Sine.easeInOut');this.cameras.main.zoomTo(1.25,1200);
  this.tweens.add({targets:this.fire,frequency:12,duration:500});
  this.time.delayedCall(1500,()=>KitaUI.card({kicker:'שמות ג, 3–5',title:'"אָסֻרָה נָּא וְאֶרְאֶה"',text:['הסיפור מספר שמשה סר לראות את המראה הגדול, ומתוך הסנה נקרא בשמו: "משה, משה".','נאמר לו לחלוץ את נעליו, כי המקום שהוא עומד עליו הוא "אַדְמַת קֹדֶשׁ" (ג, 5).'],buttons:[{t:'המשך',v:'n'}]})
   .then(()=>KitaUI.question({kicker:'מה משה עונה?',q:this.st.dlg1.ctx,opts:this.st.dlg1.opts,a:0,explain:this.st.dlg1.explain}))
   .then(ok=>{if(ok)this.perfDlg++;this.cameras.main.fadeOut(600,0,0,0);this.time.delayedCall(650,()=>this.scene.start('Stage3b',{i:this.idx,sheep:this.got,dlg:this.perfDlg}));}));}
}
class Stage3b extends BaseStage{constructor(){super('Stage3b');}
 create(){this.retryScene='Stage3';A.music('tense');const d=this.data0;
  K.sky(this,0x4a2e1e,0x8a5a32);
  const g=this.add.graphics();g.fillStyle(0xd9b07a);g.fillRect(0,70,W,560);g.fillStyle(0xc49a62);g.fillRect(0,560,W,80);
  // painted band
  g.fillStyle(0x2f6fa8);g.fillRect(0,110,W,18);g.fillStyle(0xc0392b);g.fillRect(0,128,W,10);g.fillStyle(0xd9a933);g.fillRect(0,138,W,8);
  for(let x=30;x<W;x+=70){g.fillStyle(0x3b2616,.55);g.fillCircle(x,180,8);g.fillRect(x+16,170,6,22);g.fillTriangle(x+32,192,x+44,168,x+56,192);}
  [140,400,880,1140].forEach(x=>{g.fillStyle(0x3b2616);g.fillRect(x-38,210,76,430);g.fillStyle(0xe8cf9a);g.fillRect(x-34,214,68,422);g.fillStyle(0x2f6fa8);g.fillRect(x-34,250,68,12);g.fillStyle(0xc0392b);g.fillRect(x-34,262,68,8);
   g.fillStyle(0x6f9a3e);g.fillTriangle(x-50,214,x+50,214,x,160);g.fillStyle(0x3b2616);g.fillRect(x-50,206,100,10);});
  g.fillStyle(0x8a5a32);g.fillRect(0,640,W,90);
  [270,1010].forEach(x=>{this.add.particles(x,330,'flame',{lifespan:600,speedY:{min:-120,max:-60},speedX:{min:-15,max:15},scale:{start:.8,end:0},alpha:{start:.9,end:0},frequency:40,blendMode:'ADD'});g.fillStyle(0x3b2616);g.fillRect(x-6,340,12,120);g.fillStyle(0xd9a933);g.fillRect(x-18,330,36,14);});
  this.add.image(1040,640,'throne').setOrigin(.5,1).setScale(.95);
  this.ph=this.add.image(1040,620,'pharaoh').setOrigin(.5,1).setFlipX(true).setScale(1.25);
  this.add.image(870,640,'guard0').setOrigin(.5,1).setFlipX(true).setScale(1.05);this.add.image(1200,640,'guard0').setOrigin(.5,1).setFlipX(true).setScale(1.05);
  const mo=this.add.sprite(-80,640,'moses0').setOrigin(.5,1).setScale(1.15);const aa=this.add.image(-200,640,'aaron').setOrigin(.5,1).setScale(1.1);mo.play('moses-walk');
  this.add.image(W/2,H/2,'vignette').setAlpha(.6);
  this.hud('לפני פרעה',false);
  this.tweens.add({targets:mo,x:470,duration:2200,ease:'Sine.Out',onComplete:()=>{mo.anims.stop();mo.setTexture('mosesIdle');}});this.tweens.add({targets:aa,x:350,duration:2200,ease:'Sine.Out'});
  this.time.delayedCall(2500,()=>KitaUI.question({kicker:'מה הם אומרים?',who:this.st.dlg2.who,q:this.st.dlg2.ctx,opts:this.st.dlg2.opts,a:0,explain:this.st.dlg2.explain}).then(ok=>{
   const dl=(d.dlg||0)+(ok?1:0);mo.setTexture('mosesRaise');K.bubble(this,470,380,'"שַׁלַּח אֶת עַמִּי"',2000,{size:26});
   this.time.delayedCall(2100,()=>{this.cameras.main.shake(400,.01);A.sfx('bad');this.ph.setTint(0xffb0a0);K.bubble(this,1030,360,'"וְגַם אֶת יִשְׂרָאֵל לֹא אֲשַׁלֵּחַ!"',2600,{size:26});});
   const perf=((d.sheep||0)>=4?1:0)+(dl>=2?1:0);
   this.time.delayedCall(4900,()=>this.finish(perf,[`${d.sheep||0}/4 כבשים · ${dl}/2 תשובות נכונות בדיאלוג`,'פרעה מסרב (שמות ה, 2), ומכאן מתחילות המכות.']));}));}
}
class Stage4 extends BaseStage{constructor(){super('Stage4');}
 create(){A.music('tense');this.next=0;this.mist=0;this.t0=this.time.now;
  K.sky(this,0x384a7a,0xe59a6a);this.add.image(980,260,'sun').setScale(1.6).setAlpha(.8);
  this.add.tileSprite(0,240,W,320,'bgFar').setOrigin(0).setTint(0xd8a888);this.add.tileSprite(0,330,W,260,'bgPalms').setOrigin(0).setTint(0xa08070);
  this.water=this.add.tileSprite(0,560,W,170,'water').setOrigin(0);
  this.add.image(W/2,H/2,'vignette').setAlpha(.5);
  this.dark=this.add.rectangle(0,0,W,H,0x05060f,0).setOrigin(0).setDepth(600);
  this.hud(this.st.name,false);
  // sequence strip (right to left)
  this.slots=[];for(let k=0;k<10;k++){const x=1150-k*100,y=118;const g=this.add.graphics();g.fillStyle(0x000000,.3);g.fillRoundedRect(x-40,y-40,80,80,14);g.lineStyle(3,0xfbf1dc,.6);g.strokeRoundedRect(x-40,y-40,80,80,14);
   txt(this,x,y,String(k+1),26,'#fbf1dc',{st:0}).setAlpha(.6);this.slots.push({x,y});}
  // tiles
  const names=this.st.names;const order=Phaser.Utils.Array.Shuffle([...Array(10).keys()]);this.tiles=[];
  order.forEach((pi,k)=>{const col=k%5,row=Math.floor(k/5);const x=W/2+(2-col)*190,y=290+row*190;const c=this.add.container(x,y).setDepth(100);
   const bg=this.add.graphics();bg.fillStyle(0x3b2616,1);bg.fillRoundedRect(-80,-74,160,168,20);bg.fillStyle(0xfbf1dc,1);bg.fillRoundedRect(-76,-78,152,164,18);
   const im=this.add.image(0,-14,'plague'+pi);const lb=txt(this,0,66,names[pi],pi===9?19:24,'#3b2616',{st:0});c.add([bg,im,lb]);c.setSize(160,170).setInteractive({useHandCursor:true});c.pi=pi;
   c.on('pointerover',()=>!c.done&&this.tweens.add({targets:c,scale:1.07,duration:100}));c.on('pointerout',()=>!c.done&&this.tweens.add({targets:c,scale:1,duration:100}));
   c.on('pointerup',()=>this.tap(c));c.setScale(0);this.tweens.add({targets:c,scale:1,duration:350,delay:k*60,ease:'Back.Out'});this.tiles.push(c);});
  this.ph=this.add.image(70,700,'pharaoh').setOrigin(.5,1).setScale(1.1).setDepth(200);
  this.hint=txt(this,W/2,668,'סימן זיכרון: דצ״ך · עד״ש · באח״ב',26,'#fff6dc',{st:5}).setDepth(300);
  this.fx=this.add.particles(0,0,'dot',{emitting:false,lifespan:1400,speed:{min:100,max:300},scale:{start:.5,end:0},gravityY:300}).setDepth(700);
  this.fall=this.add.particles(0,0,'dot',{emitting:false,lifespan:1600,x:{min:0,max:W},y:-20,speedY:{min:400,max:700},speedX:{min:-60,max:60},scale:{start:.35,end:.2},tint:0xe8f6ff}).setDepth(700);
  this.swarm=this.add.particles(0,0,'confetti',{emitting:false,lifespan:2200,x:-40,y:{min:150,max:620},speedX:{min:500,max:800},speedY:{min:-60,max:60},rotate:{min:0,max:360},scale:{min:.6,max:1},tint:[0x8fa83a,0xb5b84a,0x6f8a2a]}).setDepth(700);
  this.updT();}
 updT(){this.setScore(`מכה ${this.next+1}/10 · טעויות: ${this.mist}`);}
 tap(c){if(c.done||this.ended||KitaUI.open)return;
  if(c.pi===this.next){c.done=true;c.disableInteractive();A.sfx('good');const sl=this.slots[this.next];this.effect(this.next,c.x,c.y);
   this.tweens.add({targets:c,x:sl.x,y:sl.y+4,scale:.46,duration:520,ease:'Cubic.InOut'});this.next++;this.updT();
   const lines=['לא אשלח!','"הַעְתִּירוּ… וַאֲשַׁלְּחָה"','לא!','"רַק הַרְחֵק לֹא תַרְחִיקוּ"','לא אשלח!','…','"חָטָאתִי הַפָּעַם"… ובכל זאת לא','רק הגברים ילכו!','"לֵךְ מֵעָלַי!"','"קוּמוּ צְּאוּ!"'];
   K.bubble(this,190,440,lines[this.next-1],1400,{size:22,tail:-60});
   this.tweens.add({targets:this.ph,angle:{from:-3,to:3},duration:80,yoyo:true,repeat:3});
   if(this.next===10){this.ended=true;const sec=Math.round((this.time.now-this.t0)/1000);const perf=this.mist===0?2:(this.mist<=2?1:0);
    this.time.delayedCall(1600,()=>this.finish(perf,[`${this.mist} טעויות · ${sec} שניות`,'"קוּמוּ צְּאוּ מִתּוֹךְ עַמִּי" (שמות יב, 31)']));}}
  else{this.mist++;this.updT();A.sfx('bad');this.cameras.main.shake(150,.005);this.tweens.add({targets:c,angle:{from:-8,to:8},duration:60,yoyo:true,repeat:3,onComplete:()=>c.setAngle(0)});
   K.floatText(this,c.x,c.y-80,`קודם: ${this.st.names[this.next]}?`,'#ffd0c0',24);
   this.tweens.add({targets:this.hint,scale:1.15,duration:150,yoyo:true});}}
 effect(i,x,y){const cam=this.cameras.main;
  switch(i){case 0:this.tweens.addCounter({from:0,to:100,duration:900,onUpdate:tw=>{const v=tw.getValue()/100;this.water.setTint(Phaser.Display.Color.GetColor(255,Math.round(255-v*170),Math.round(255-v*170)));}});this.fx.setParticleTint(0xc0261e);this.fx.explode(30,x,y);break;
   case 1:this.fx.setParticleTint(0x5fae4a);this.fx.explode(40,x,y);break;
   case 2:this.fx.setParticleTint(0x3b2616);this.fx.explode(60,x,y);break;
   case 3:cam.shake(400,.012);A.sfx('roar');break;
   case 4:this.fx.setParticleTint(0x9aa080);this.fx.explode(40,x,y);break;
   case 5:this.fx.setParticleTint(0xd0453a);this.fx.explode(30,x,y);break;
   case 6:cam.flash(200,255,255,255);this.fall.explode(120);A.sfx('crash');break;
   case 7:this.swarm.explode(160);A.sfx('whoosh');break;
   case 8:this.tweens.add({targets:this.dark,fillAlpha:.82,duration:400,yoyo:true,hold:900});break;
   case 9:cam.flash(500,40,40,90);A.sfx('star');break;}}
}
K.Stage3=Stage3;K.Stage3b=Stage3b;K.Stage4=Stage4;})();
