/* Stage 1 – brick tower, Stage 2 – the basket on the Nile */
(function(){const {W,H,txt,BaseStage}=K;const A=KitaAudio;
class Stage1 extends BaseStage{constructor(){super('Stage1');}
 create(){A.music('tense');
  K.sky(this,0x7fc3e0,0xf6dcae);this.add.image(1050,150,'sun').setScrollFactor(0,.1).setScale(1.4);
  this.add.image(260,140,'cloud').setScrollFactor(.05,.1).setAlpha(.8);this.add.image(820,90,'cloud').setScrollFactor(.05,.1).setScale(.7).setAlpha(.7);
  this.add.tileSprite(0,260,W,320,'bgFar').setOrigin(0).setScrollFactor(0,.25);
  this.add.tileSprite(0,330,W,300,'bgCity').setOrigin(0).setScrollFactor(0,.5);
  this.add.tileSprite(0,630,W,200,'sandTile').setOrigin(0);
  // workers carrying bricks
  for(let k=0;k<4;k++){const w=this.add.sprite(-100-k*330,646,'worker0').setOrigin(.5,1).setScale(.8);w.play({key:'worker-walk',startFrame:k%4});
   this.tweens.add({targets:w,x:W+120,duration:16000,repeat:-1,delay:k*900,onRepeat:()=>{w.x=-100;}});}
  this.boss=this.add.sprite(1110,660,'guard0').setOrigin(.5,1).setFlipX(true).setScale(1.05);
  this.tweens.add({targets:this.boss,x:1050,duration:2600,yoyo:true,repeat:-1,ease:'Sine.InOut',onYoyo:()=>this.boss.setFlipX(false),onRepeat:()=>this.boss.setFlipX(true)});
  this.boss.play('guard-walk');
  // foundation
  const fg=this.add.graphics();fg.fillStyle(0x3b2616);fg.fillRoundedRect(480,610,320,40,6);fg.fillStyle(0x9a8a74);fg.fillRoundedRect(484,612,312,32,5);fg.fillStyle(0xb9ab94);fg.fillRect(490,614,300,8);
  this.BH=32;this.layers=[{x:640,w:300,y:610}];this.goal=12;this.placed=0;this.misses=0;this.perfects=0;this.speed=230;this.dropping=false;
  this.dust=this.add.particles(0,0,'dot',{emitting:false,lifespan:600,speed:{min:40,max:140},angle:{min:180,max:360},scale:{start:.6,end:0},alpha:{start:.6,end:0},tint:0xd9b07a});
  this.spark=this.add.particles(0,0,'spark',{emitting:false,lifespan:700,speed:{min:80,max:260},scale:{start:.6,end:0},tint:[0xfff3b0,0xf6c443],blendMode:'ADD'});
  this.hud(this.st.name);this.setScore(`שורות: 0/${this.goal}`);
  this.spawn();
  this.input.on('pointerdown',(p)=>{if(p.y>70)this.drop();});
  this.input.keyboard.on('keydown-SPACE',()=>this.drop());this.input.keyboard.on('keydown-DOWN',()=>this.drop());
  this.time.delayedCall(900,()=>K.bubble(this,this.boss.x,this.boss.y-190,'מהר! לבנים לפיתום!',2200));
  this.tip=txt(this,W/2,110,K.isTouch()?'הקישו על המסך כדי להפיל את הלבנים':'לחצו רווח (או הקליקו) כדי להפיל את הלבנים',24,'#fff',{st:5}).setScrollFactor(0).setDepth(980);
 }
 top(){return this.layers[this.layers.length-1];}
 spawn(){const t=this.top();const w=t.w;const y=t.y-this.BH/2-120;const fromLeft=this.placed%2===0;
  this.cur=this.add.tileSprite(fromLeft?160+w/2:W-160-w/2,y,w,this.BH,'brick');this.cur.tilePositionX=(this.placed%2)*30;this.dir=fromLeft?1:-1;this.dropping=false;
  const cam=this.cameras.main;const target=Math.min(0,y-260);this.tweens.add({targets:cam,scrollY:target,duration:500,ease:'Sine.Out'});}
 drop(){if(this.dropping||this.ended||!this.cur||KitaUI.open)return;this.dropping=true;if(this.tip){this.tip.destroy();this.tip=null;}
  const t=this.top();const ty=t.y-this.BH/2;
  this.tweens.add({targets:this.cur,y:ty,duration:200,ease:'Quad.In',onComplete:()=>this.land()});}
 land(){const t=this.top(),c=this.cur;const cl=c.x-c.width/2,cr=c.x+c.width/2,tl=t.x-t.w/2,tr=t.x+t.w/2;const L=Math.max(cl,tl),R=Math.min(cr,tr),ov=R-L;
  if(ov<=4){A.sfx('bad');this.misses++;this.loseHeart();this.tweens.add({targets:c,y:c.y+700,angle:c.x<t.x?-60:60,duration:900,ease:'Quad.In',onComplete:()=>c.destroy()});
   this.cameras.main.shake(200,.006);K.floatText(this,c.x,c.y-30,'פספוס!','#ff8a7a');
   if(this.misses>=3){this.fail('המגדל לא הושלם',['שלוש לבנים נפלו. נסו להפיל כשהשורה בדיוק מעל הקודמת.']);return;}
   this.time.delayedCall(500,()=>this.spawn());return;}
  let nx,nw;if(Math.abs(c.x-t.x)<10){nx=t.x;nw=t.w;c.x=nx;this.perfects++;A.sfx('perfect');this.spark.explode(24,nx,c.y);K.floatText(this,nx,c.y-40,'מושלם!');}
  else{nx=(L+R)/2;nw=ov;const cutW=c.width-ov;const cutX=c.x<t.x?L-cutW/2:R+cutW/2;const piece=this.add.tileSprite(cutX,c.y,cutW,this.BH,'brick');piece.tilePositionX=c.tilePositionX+(cutX<nx?0:ov);
   this.tweens.add({targets:piece,y:c.y+700,angle:cutX<nx?-50:50,x:cutX+(cutX<nx?-80:80),duration:1000,ease:'Quad.In',onComplete:()=>piece.destroy()});
   if(cutX<nx)c.tilePositionX+=cutW;c.setSize(nw,this.BH);c.x=nx;A.sfx('drop');}
  this.dust.explode(14,nx,c.y+this.BH/2);this.cameras.main.shake(80,.003);
  this.layers.push({x:nx,w:nw,y:c.y-this.BH/2+this.BH/2-0});this.layers[this.layers.length-1].y=c.y-this.BH/2;
  this.placed++;this.setScore(`שורות: ${this.placed}/${this.goal}`);this.speed=Math.min(430,this.speed+16);this.cur=null;
  if(this.placed===6)K.bubble(this,this.boss.x,this.boss.y-190,'עוד! מהר יותר!',1800);
  if(this.placed>=this.goal){this.win();return;}
  if(nw<26){this.fail('הלבנים נעשו צרות מדי',['כדאי לכוון טוב יותר כדי שהשורות לא יתקצרו.']);return;}
  this.time.delayedCall(250,()=>this.spawn());}
 win(){this.ended=true;const cam=this.cameras.main;this.tweens.add({targets:cam,scrollY:Math.min(0,this.top().y-300),zoom:.92,duration:900});
  this.spark.explode(60,640,this.top().y);A.sfx('good');K.floatText(this,640,this.top().y-60,'המגדל הושלם!','#fff',40);
  const perf=(this.misses===0&&this.perfects>=3)?2:(this.misses<=1?1:0);
  this.time.delayedCall(1300,()=>this.finish(perf,[`${this.perfects} הנחות מושלמות · ${this.misses} פספוסים`,'כך, לפי הסיפור, נבנו ערי המסכנות פיתום ורעמסס.']));}
 update(t,dt){if(this.ended||!this.cur||this.dropping||KitaUI.open)return;const c=this.cur;c.x+=this.dir*this.speed*dt/1000;const half=c.width/2;
  if(c.x+half>W-60){c.x=W-60-half;this.dir=-1;}if(c.x-half<60){c.x=60+half;this.dir=1;}}
}

class Stage2 extends BaseStage{constructor(){super('Stage2');}
 create(){A.music('calm');this.speed=210;this.dist=0;this.total=10500;this.lotus=0;this.hits=0;this.inv=0;this.detect=0;
  K.sky(this,0x6cc0e6,0xdff1f0);this.add.image(1080,110,'sun').setScale(1.3);
  this.clouds=[this.add.image(300,90,'cloud').setAlpha(.8),this.add.image(900,140,'cloud').setScale(.6).setAlpha(.7)];
  this.far=this.add.tileSprite(0,40,W,320,'bgFar').setOrigin(0);
  this.palms=this.add.tileSprite(0,70,W,260,'bgPalms').setOrigin(0);
  const bank=this.add.graphics();bank.fillStyle(0xd9b47a);bank.fillRect(0,300,W,22);bank.fillStyle(0x8a6a3a);bank.fillRect(0,320,W,6);
  this.water=this.add.tileSprite(0,322,W,400,'water').setOrigin(0);this.water2=this.add.tileSprite(0,322,W,400,'water').setOrigin(0).setAlpha(.25).setTileScale(1.6);
  this.objs=this.add.group();this.cover=[];this.guards=[];
  this.basket=this.add.image(250,500,'basket').setDepth(500);this.ty=500;
  this.tweens.add({targets:this.basket,angle:{from:-4,to:4},duration:900,yoyo:true,repeat:-1,ease:'Sine.InOut'});
  this.ripple=this.add.particles(0,0,'dot',{follow:this.basket,followOffset:{x:-50,y:22},lifespan:900,speedX:{min:-160,max:-120},speedY:{min:-10,max:10},scale:{start:.35,end:.8},alpha:{start:.5,end:0},frequency:70,tint:0xd8f4f7});
  this.ripple.setDepth(499);
  this.spark=this.add.particles(0,0,'spark',{emitting:false,lifespan:700,speed:{min:60,max:200},scale:{start:.5,end:0},tint:[0xfff3b0,0xf4a3c4],blendMode:'ADD'}).setDepth(800);
  this.cones=this.add.graphics().setDepth(450);
  this.near=this.add.tileSprite(0,590,W,180,'bgReedsNear').setOrigin(0).setDepth(700);
  // Miriam watching from the reeds
  const mr=this.add.image(330,312,'miriam0').setOrigin(.5,1).setScale(.62).setDepth(300);const rc=this.add.image(360,334,'reedClump').setOrigin(.5,1).setScale(.8).setDepth(301);
  this.objs.add(mr);this.objs.add(rc);mr.kind='deco';rc.kind='deco';
  this.time.delayedCall(700,()=>{const b=K.bubble(this,330,170,'אני שומרת עליך מרחוק…',2600,{size:22});});
  this.hud(this.st.name);this.updScore();
  // progress bar
  const pb=this.add.graphics().setScrollFactor(0).setDepth(991);pb.fillStyle(0x000000,.35);pb.fillRoundedRect(440,82,400,14,7);this.pbFill=this.add.graphics().setDepth(991);
  this.pbIcon=this.add.image(440,89,'basket').setScale(.3).setDepth(992);this.add.image(852,82,'princess').setScale(.28).setDepth(992);
  this.keys=this.input.keyboard.addKeys('UP,DOWN,W,S');
  this.input.on('pointerdown',p=>{if(p.y>70)this.drag=p;});this.input.on('pointermove',p=>{if(p.isDown&&p.y>70)this.drag=p;});this.input.on('pointerup',()=>this.drag=null);
  this.tip=txt(this,W/2,140,K.isTouch()?'גררו את האצבע למעלה ולמטה כדי לכוון את התיבה':'חצים למעלה ולמטה (או גרירה בעכבר) כדי לכוון את התיבה',24,'#fff',{st:5}).setDepth(980);
  this.time.delayedCall(4000,()=>this.tip&&this.tweens.add({targets:this.tip,alpha:0,duration:500}));
  this.nextSpawn=900;this.nextGuard=3200;}
 updScore(){this.setScore(`לוטוס: ${this.lotus}`);}
 spawn(){const r=Math.random();const y=360+Math.random()*260;
  if(r<.34){const c=this.add.sprite(W+120,y,'croc0').setDepth(400+y/10);c.play({key:'croc-snap',startFrame:Math.random()<.5?0:1});c.kind='croc';c.vx=-(this.speed+70);c.base=y;c.ph=Math.random()*6;this.objs.add(c);}
  else if(r<.55){const c=this.add.image(W+80,y,'rock').setDepth(400+y/10);c.kind='rock';this.objs.add(c);}
  else{for(let k=0;k<3;k++){const c=this.add.image(W+60+k*70,y+Math.sin(k)*20,'lotus').setDepth(420);c.kind='lotus';this.tweens.add({targets:c,scale:1.15,duration:500,yoyo:true,repeat:-1});this.objs.add(c);}}}
 spawnGuard(){// reed cover in the river + a guard on the bank sweeping his gaze
  const gx=W+260;const g=this.add.sprite(gx,318,'guard0').setOrigin(.5,1).setScale(.7).setFlipX(true).setDepth(310);g.kind='guard';g.ang=110;g.play('guard-walk');g.anims.pause();
  this.tweens.add({targets:g,ang:150,duration:1500,yoyo:true,repeat:-1,ease:'Sine.InOut'});this.objs.add(g);this.guards.push(g);
  const ys=[400,540];ys.forEach((y,k)=>{const rc=this.add.image(gx-140+k*160,y+70,'reedClump').setOrigin(.5,1).setDepth(600).setAlpha(.95);rc.kind='cover';rc.cy=y;this.objs.add(rc);this.cover.push(rc);});}
 hit(msg){if(this.inv>0||this.ended)return;this.inv=1.6;this.hits++;A.sfx('hit');this.cameras.main.shake(220,.008);this.cameras.main.flash(150,255,80,60);
  this.tweens.add({targets:this.basket,alpha:.3,duration:120,yoyo:true,repeat:5});K.floatText(this,this.basket.x,this.basket.y-50,msg,'#ff8a7a',28);
  if(this.loseHeart())this.fail('התיבה נתפסה',['נסו להתחבא בין הסוף כשהשומר מסתכל, ולהתרחק מהתנינים.']);}
 inCone(g,x,y){const ex=g.x-10,ey=g.y-80;const a=Phaser.Math.DegToRad(g.ang);const len=460,hw=Phaser.Math.DegToRad(13);
  const p1={x:ex+Math.cos(a-hw)*len,y:ey+Math.sin(a-hw)*len},p2={x:ex+Math.cos(a+hw)*len,y:ey+Math.sin(a+hw)*len};g.p1=p1;g.p2=p2;g.ex=ex;g.ey=ey;
  return Phaser.Geom.Triangle.Contains(new Phaser.Geom.Triangle(ex,ey,p1.x,p1.y,p2.x,p2.y),x,y);}
 update(t,dt){const s=dt/1000;if(KitaUI.open)return;
  const v=this.ended?Math.max(0,this.speed*(this.endSlow||0)):this.speed;
  this.water.tilePositionX+=v*s;this.water2.tilePositionX+=v*s*.6;this.water2.tilePositionY=Math.sin(t/900)*10;this.far.tilePositionX+=v*s*.1;this.palms.tilePositionX+=v*s*.3;this.near.tilePositionX+=v*s*1.3;
  this.clouds.forEach(c=>{c.x-=s*8;if(c.x<-150)c.x=W+150;});
  this.cones.clear();
  this.objs.getChildren().slice().forEach(o=>{o.x-=v*s;if(o.kind==='croc'){o.x+=(o.vx+this.speed)*s*(this.ended?0:1);o.y=o.base+Math.sin(t/400+o.ph)*14;}
    if(o.x<-260){if(o.kind==='guard')this.guards=this.guards.filter(g=>g!==o);if(o.kind==='cover')this.cover=this.cover.filter(g=>g!==o);o.destroy();}});
  if(this.ended){this.endUpdate(s);return;}
  // control
  if(this.keys.UP.isDown||this.keys.W.isDown)this.ty-=380*s;if(this.keys.DOWN.isDown||this.keys.S.isDown)this.ty+=380*s;if(this.drag)this.ty=this.drag.y;
  this.ty=Phaser.Math.Clamp(this.ty,370,640);this.basket.y+=(this.ty-this.basket.y)*Math.min(1,s*8);
  const bx=this.basket.x,by=this.basket.y;this.inv=Math.max(0,this.inv-s);
  // collisions
  this.objs.getChildren().slice().forEach(o=>{const dx=Math.abs(o.x-bx),dy=Math.abs(o.y-by);
   if(o.kind==='croc'&&dx<85&&dy<28)this.hit('תנין!');else if(o.kind==='rock'&&dx<62&&dy<26)this.hit('סלע!');
   else if(o.kind==='lotus'&&dx<46&&dy<36){this.lotus++;A.sfx('coin');this.spark.explode(10,o.x,o.y);o.destroy();this.updScore();}});
  const hidden=this.cover.some(c=>Math.abs(c.x-bx)<72&&by>c.cy-60&&by<c.cy+80);
  this.cover.forEach(c=>c.setAlpha(Math.abs(c.x-bx)<80&&Math.abs(c.cy-by)<90?.6:.95));
  let seen=false;this.guards.forEach(g=>{const inside=this.inCone(g,bx,by);const spot=inside&&!hidden;if(spot)seen=true;
   this.cones.fillStyle(spot?0xff5a3c:0xfff1a8,spot?.32:.2);this.cones.fillTriangle(g.ex,g.ey,g.p1.x,g.p1.y,g.p2.x,g.p2.y);this.cones.lineStyle(2,spot?0xff5a3c:0xffe680,.5);this.cones.strokeTriangle(g.ex,g.ey,g.p1.x,g.p1.y,g.p2.x,g.p2.y);});
  this.detect=Phaser.Math.Clamp(this.detect+(seen?s*1.5:-s),0,1);
  if(seen&&!this.warned){this.warned=true;K.floatText(this,bx,by-60,'השומר רואה! להתחבא בסוף!','#ffd0c0',24);this.time.delayedCall(1500,()=>this.warned=false);}
  if(this.detect>=1){this.detect=0;this.hit('נתפסת!');}
  this.basket.setTint(this.detect>0?Phaser.Display.Color.GetColor(255,255-this.detect*150,255-this.detect*150):0xffffff);
  // spawning
  this.dist+=v*s;this.nextSpawn-=v*s;this.nextGuard-=v*s;
  if(this.dist<this.total-900){if(this.nextSpawn<=0){this.spawn();this.nextSpawn=280+Math.random()*260-Math.min(120,this.dist/80);}if(this.nextGuard<=0){this.spawnGuard();this.nextGuard=2100+Math.random()*900;this.nextSpawn=Math.max(this.nextSpawn,520);}}
  const pr=Math.min(1,this.dist/this.total);this.pbFill.clear();this.pbFill.fillStyle(0xf6c443,1);this.pbFill.fillRoundedRect(440,82,400*pr,14,7);this.pbIcon.x=440+400*pr;
  if(this.dist>=this.total)this.arrive();}
 arrive(){this.ended=true;this.endSlow=1;this.tweens.add({targets:this,endSlow:0,duration:2200});
  const pr=this.add.image(W+120,318,'princess').setOrigin(.5,1).setFlipX(true).setDepth(320).setScale(.9);const mm=this.add.image(W+220,318,'p4_0').setOrigin(.5,1).setFlipX(true).setDepth(319).setScale(.8);
  this.tweens.add({targets:[pr],x:1010,duration:2200,ease:'Sine.Out'});this.tweens.add({targets:[mm],x:1110,duration:2200,ease:'Sine.Out'});
  this.tweens.add({targets:this.basket,x:960,y:370,duration:2600,ease:'Sine.InOut',onComplete:()=>{A.sfx('good');this.spark.explode(30,960,360);
   K.bubble(this,1010,150,'"וַתִּרְאֶה אֶת הַתֵּבָה בְּתוֹךְ הַסּוּף"',2600,{size:22});
   const perf=this.hits===0?2:(this.hits===1?1:0);this.time.delayedCall(2600,()=>this.finish(perf,[`${this.lotus} פרחי לוטוס · ${this.hits} פגיעות`,'בת פרעה מצאה את התיבה וחמלה על הילד (שמות ב, 5–6).']));}});}
 endUpdate(s){}
}
K.Stage1=Stage1;K.Stage2=Stage2;})();
