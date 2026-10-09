/* Kita · synthesized sound (WebAudio) – no external audio files. */
(function(){
let ctx=null,master=null,musicGain=null,sfxGain=null,muted=localStorage.getItem('kita-yz-mute')==='1';
let musicTimer=null,musicStep=0,nextT=0,mood='calm',windNode=null;
function init(){ if(ctx) { if(ctx.state==='suspended') ctx.resume(); return; }
  const AC=window.AudioContext||window.webkitAudioContext; if(!AC) return;
  ctx=new AC(); master=ctx.createGain(); master.gain.value=muted?0:0.9; master.connect(ctx.destination);
  musicGain=ctx.createGain(); musicGain.gain.value=0.22; musicGain.connect(master);
  sfxGain=ctx.createGain(); sfxGain.gain.value=0.6; sfxGain.connect(master);
}
function noiseBuf(sec=1){const b=ctx.createBuffer(1,ctx.sampleRate*sec,ctx.sampleRate),d=b.getChannelData(0);for(let i=0;i<d.length;i++)d[i]=Math.random()*2-1;return b;}
let NB=null;
function tone(f,t,dur,type='triangle',vol=.5,dest=sfxGain,slideTo){const o=ctx.createOscillator(),g=ctx.createGain();o.type=type;o.frequency.setValueAtTime(f,t);if(slideTo)o.frequency.exponentialRampToValueAtTime(slideTo,t+dur);
  g.gain.setValueAtTime(0.0001,t);g.gain.exponentialRampToValueAtTime(vol,t+0.012);g.gain.exponentialRampToValueAtTime(0.0001,t+dur);o.connect(g);g.connect(dest);o.start(t);o.stop(t+dur+0.05);}
function noise(t,dur,fType,freq,vol=.5,dest=sfxGain,freqTo,q=1){if(!NB)NB=noiseBuf(2);const s=ctx.createBufferSource();s.buffer=NB;s.loop=true;const f=ctx.createBiquadFilter();f.type=fType;f.frequency.setValueAtTime(freq,t);f.Q.value=q;if(freqTo)f.frequency.exponentialRampToValueAtTime(freqTo,t+dur);
  const g=ctx.createGain();g.gain.setValueAtTime(0.0001,t);g.gain.exponentialRampToValueAtTime(vol,t+Math.min(.05,dur/4));g.gain.exponentialRampToValueAtTime(0.0001,t+dur);s.connect(f);f.connect(g);g.connect(dest);s.start(t);s.stop(t+dur+.05);}
// oud-like pluck
function pluck(f,t,dur=.5,vol=.35){const o=ctx.createOscillator(),o2=ctx.createOscillator(),fl=ctx.createBiquadFilter(),g=ctx.createGain();o.type='sawtooth';o2.type='triangle';o.frequency.value=f;o2.frequency.value=f*1.003;
  fl.type='lowpass';fl.frequency.setValueAtTime(f*8,t);fl.frequency.exponentialRampToValueAtTime(f*1.5,t+dur);g.gain.setValueAtTime(0.0001,t);g.gain.exponentialRampToValueAtTime(vol,t+.008);g.gain.exponentialRampToValueAtTime(0.0001,t+dur);
  o.connect(fl);o2.connect(fl);fl.connect(g);g.connect(musicGain);o.start(t);o2.start(t);o.stop(t+dur+.05);o2.stop(t+dur+.05);}
function drum(t,low=true,vol=.5){if(low){tone(110,t,.25,'sine',vol,musicGain,50);}else noise(t,.08,'bandpass',2400,vol*.5,musicGain,null,2);}
// Hijaz-flavoured scale on D
const D=146.83, SC=[0,1,4,5,7,8,10,12,13,16];
const fr=n=>D*Math.pow(2,SC[((n%SC.length)+SC.length)%SC.length]/12+Math.floor(n/SC.length));
const MEL={
 calm:[0,2,3,4,3,2,1,0, 4,5,4,3,2,3,1,0], tense:[0,1,0,1,2,1,0,-1, 0,1,2,3,2,1,0,1],
 joy:[4,5,6,7,6,5,4,3, 4,6,7,8,7,6,5,4], night:[0,-1,0,2,1,0,-1,-3, 0,2,3,2,1,0,-1,0]};
const TEMPO={calm:.32,tense:.2,joy:.18,night:.36};
function schedule(){ if(!ctx) return; const step=TEMPO[mood]; while(nextT<ctx.currentTime+0.4){const i=musicStep%16, m=MEL[mood];
  if(mood!=='tense'||i%2===0) { if(m[i]!==null && (i%4!==3||mood==='joy')) pluck(fr(m[i]+7),nextT,step*2.2,.18);} 
  if(i%8===0) pluck(fr(0)/2,nextT,step*7,.16); if(i%8===4) pluck(fr(4)/2,nextT,step*6,.1);
  if(mood==='tense'||mood==='joy'){ if(i%4===0)drum(nextT,true,.45); if(i%4===2||i%4===3)drum(nextT,false,.4);} else if(i%8===0) drum(nextT,true,.25);
  nextT+=step; musicStep++; } }
const A={
 init, get muted(){return muted;},
 toggle(){muted=!muted;localStorage.setItem('kita-yz-mute',muted?'1':'0');if(master)master.gain.setTargetAtTime(muted?0:0.9,ctx.currentTime,.05);return muted;},
 music(m){ init(); if(!ctx) return; mood=m||'calm'; if(!musicTimer){nextT=ctx.currentTime+.1;musicTimer=setInterval(schedule,100);} },
 stopMusic(){ if(musicTimer){clearInterval(musicTimer);musicTimer=null;} },
 sfx(name){ if(!ctx) return; const t=ctx.currentTime;
  switch(name){
   case 'click': tone(660,t,.06,'square',.15); break;
   case 'good': [523,659,784,1046].forEach((f,i)=>tone(f,t+i*.07,.25,'triangle',.3)); break;
   case 'bad': tone(180,t,.25,'sawtooth',.25,sfxGain,110); break;
   case 'coin': tone(988,t,.08,'square',.18); tone(1319,t+.07,.25,'square',.18); break;
   case 'jump': tone(300,t,.18,'triangle',.3,sfxGain,700); break;
   case 'hit': noise(t,.25,'lowpass',900,.6); tone(120,t,.2,'sine',.5,sfxGain,60); break;
   case 'drop': tone(220,t,.12,'sine',.5,sfxGain,90); noise(t,.1,'lowpass',600,.4); break;
   case 'perfect': [784,988,1319].forEach((f,i)=>tone(f,t+i*.05,.3,'sine',.3)); break;
   case 'splash': noise(t,.9,'lowpass',3000,.6,sfxGain,300); break;
   case 'crash': noise(t,2.8,'lowpass',1600,.9,sfxGain,120); tone(70,t,1.6,'sine',.7,sfxGain,35); break;
   case 'roar': noise(t,2.2,'bandpass',300,.8,sfxGain,1400,.7); tone(55,t,2,'sawtooth',.25,sfxGain,80); break;
   case 'star': tone(1568,t,.4,'sine',.25); tone(2093,t+.08,.5,'sine',.18); break;
   case 'whoosh': noise(t,.4,'bandpass',400,.4,sfxGain,3000,1.5); break;
   case 'fire': noise(t,1.2,'bandpass',800,.25,sfxGain,1200,.6); break;
   case 'tof': noise(t,.12,'highpass',5000,.35); tone(240,t,.12,'sine',.25); break;
   case 'win': [0,2,4,7,9].forEach((n,i)=>tone(fr(n+7),t+i*.12,.5,'triangle',.28)); break;
  } },
 wind(on){ if(!ctx) return; if(on&&!windNode){ if(!NB)NB=noiseBuf(2); const s=ctx.createBufferSource();s.buffer=NB;s.loop=true;const f=ctx.createBiquadFilter();f.type='bandpass';f.frequency.value=500;f.Q.value=.8;const g=ctx.createGain();g.gain.value=0.0001;g.gain.exponentialRampToValueAtTime(.5,ctx.currentTime+.4);s.connect(f);f.connect(g);g.connect(sfxGain);s.start();windNode={s,f,g};}
   else if(!on&&windNode){const w=windNode;windNode=null;w.g.gain.setTargetAtTime(0.0001,ctx.currentTime,.15);setTimeout(()=>w.s.stop(),600);} },
 windLevel(p){ if(windNode){windNode.f.frequency.setTargetAtTime(400+p*1400,ctx.currentTime,.1);} }
};
window.KitaAudio=A;
})();
