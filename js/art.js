/* Kita · יציאת מצרים – all artwork is original, generated here as SVG and rasterised at load time. */
(function(){
const OL='#3b2616';
const S=(w,h,b,extra='')=>`<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" ${extra}>${b}</svg>`;
const st=(c=OL,w=3)=>`stroke="${c}" stroke-width="${w}" stroke-linejoin="round" stroke-linecap="round"`;
// deterministic random for tileable art
let seed=7;const rnd=()=>{seed=(seed*16807)%2147483647;return (seed-1)/2147483646;};
const ART=[];const add=(key,w,h,svg)=>ART.push({key,w,h,svg});

/* ---------- people ---------- */
function person(o,f){
  const a=[-22,-8,22,8][f%4]*(o.walk===false?0:1), bob=[0,-2,0,-2][f%4]*(o.walk===false?0:1);
  const skin=o.skin||'#c98d5c', skinD=o.skinD||'#a96e43';
  const leg=(ang,fill)=>`<g transform="rotate(${ang} 50 106)"><rect x="45" y="102" width="10" height="38" rx="4" fill="${fill}" ${st(OL,2.5)}/><path d="M43 139 q8 -5 18 0 q2 4 -2 5 h-15 q-3 -1 -1 -5z" fill="#6b4a2b" ${st(OL,2.5)}/></g>`;
  const kilt=o.kilt;
  const robeBottom=kilt?106:124;
  let s='';
  s+=`<ellipse cx="50" cy="146" rx="22" ry="4" fill="#000" opacity=".18"/>`;
  s+=`<g transform="translate(0 ${bob})">`;
  s+=leg(-a,skinD)+leg(a,skin);
  // back arm
  if(!o.raise) s+=`<path d="M40 58 Q30 78 36 92" fill="none" ${st(OL,9)}/><path d="M40 58 Q30 78 36 92" fill="none" stroke="${o.robeD||o.robe}" stroke-width="5" stroke-linecap="round"/>`;
  // robe
  s+=`<path d="M35 52 Q50 44 65 52 L${kilt?68:74} ${robeBottom} Q50 ${robeBottom+6} ${kilt?32:26} ${robeBottom} Z" fill="${kilt?skin:o.robe}" ${st()}/>`;
  if(kilt){s+=`<path d="M33 86 L67 86 L71 108 Q50 114 29 108 Z" fill="#f4efe2" ${st()}/><path d="M50 88 L50 110" ${st('#cfc6b0',2)}/><rect x="33" y="84" width="34" height="6" fill="#d9a933" ${st(OL,2)}/><path d="M37 54 Q50 66 63 54 L63 60 Q50 72 37 60Z" fill="#2f6fa8" ${st(OL,2)}/>`;}
  else{s+=`<path d="M57 50 Q66 54 74 ${robeBottom} Q66 ${robeBottom+3} 60 ${robeBottom+3} Q62 80 57 50Z" fill="${o.robeD||'#000'}" opacity="${o.robeD?1:.15}"/>`;
    if(o.stripe) s+=`<path d="M30 112 Q50 118 72 112" fill="none" stroke="${o.stripe}" stroke-width="4"/>`;
    s+=`<path d="M34 84 Q50 90 68 84" fill="none" stroke="${o.belt||'#7a5230'}" stroke-width="6"/>`;}
  // head
  s+=`<circle cx="52" cy="34" r="15" fill="${skin}" ${st()}/>`;
  s+=`<circle cx="60" cy="32" r="2.2" fill="${OL}"/><path d="M66 36 q3 2 0 4" fill="none" ${st(OL,2)}/>`;
  if(o.beard) s+=`<path d="M42 40 Q46 58 58 56 Q68 52 66 42 Q60 46 52 44 Z" fill="${o.beard}" ${st(OL,2.5)}/>`;
  if(o.scarf) s+=`<path d="M35 40 Q33 15 54 16 Q70 17 69 31 Q60 25 46 28 L43 58 Q34 56 35 40Z" fill="${o.scarf}" ${st()}/><path d="M38 24 Q52 18 66 25" fill="none" stroke="${o.scarfBand||'#a8432a'}" stroke-width="3"/>`;
  if(o.hair) s+=`<path d="M36 40 Q32 16 54 17 Q70 18 68 30 Q60 24 48 27 Q44 40 46 52 Q38 52 36 40Z" fill="${o.hair}" ${st()}/>`;
  if(o.nemes) s+=`<path d="M35 46 Q32 14 54 15 Q72 16 69 32 L64 28 Q52 22 44 30 L44 62 L34 62 Z" fill="#f2d16b" ${st()}/><path d="M37 30 L45 30 M36 38 L44 38 M36 46 L44 46 M37 54 L44 54 M46 19 L48 27 M56 17 L56 24" ${st('#2f6fa8',3)}/>`;
  if(o.crown) s+=`<path d="M38 22 L40 2 Q52 -2 60 4 L62 22 Z" fill="#f3efe6" ${st()}/><path d="M36 26 L36 14 Q48 18 58 14 L66 10 L66 26Z" fill="#c0392b" ${st()}/><path d="M64 18 q8 -2 6 -10" fill="none" ${st('#d9a933',3)}/>`;
  if(o.band) s+=`<path d="M38 26 Q52 20 67 27" fill="none" stroke="#d9a933" stroke-width="4"/>`;
  // front arm
  if(o.raise){
    s+=`<path d="M58 56 Q70 40 76 20" fill="none" ${st(OL,9)}/><path d="M58 56 Q70 40 76 20" fill="none" stroke="${o.robeD||o.robe}" stroke-width="5" stroke-linecap="round"/><circle cx="76" cy="19" r="5" fill="${skin}" ${st(OL,2.5)}/>`;
    s+=`<path d="M70 -0 L84 60" ${st(OL,7)}/><path d="M70 0 L84 60" stroke="#8a5a2b" stroke-width="4" stroke-linecap="round"/><path d="M70 0 q-10 -6 -14 4" fill="none" ${st('#8a5a2b',4)}/>`;
  } else {
    if(o.staff) s+=`<path d="M78 14 L76 146" ${st(OL,7)}/><path d="M78 14 L76 146" stroke="#8a5a2b" stroke-width="4" stroke-linecap="round"/><path d="M78 14 q-2 -12 -12 -8 q-6 4 -2 10" fill="none" stroke="#8a5a2b" stroke-width="4" stroke-linecap="round"/>`;
    if(o.spear) s+=`<path d="M78 4 L76 146" ${st(OL,5)}/><path d="M78 4 L76 146" stroke="#b08850" stroke-width="2.5"/><path d="M78 -6 L84 10 L72 10 Z" fill="#cfd6db" ${st(OL,2)}/>`;
    if(o.carry) s+=`<rect x="54" y="${o.carryY||52}" width="34" height="14" rx="2" fill="#b5763f" ${st(OL,2.5)}/>`;
    if(o.tof){const ty=[22,30,22,30][f%4];s+=`<path d="M58 58 Q70 44 74 ${ty+6}" fill="none" ${st(OL,9)}/><path d="M58 58 Q70 44 74 ${ty+6}" fill="none" stroke="${o.robeD||o.robe}" stroke-width="5" stroke-linecap="round"/><circle cx="78" cy="${ty}" r="11" fill="#e6c27a" ${st(OL,3)}/><circle cx="78" cy="${ty}" r="6" fill="none" stroke="#a8432a" stroke-width="2"/>`;}
    else s+=`<path d="M60 58 Q72 72 76 86" fill="none" ${st(OL,9)}/><path d="M60 58 Q72 72 76 86" fill="none" stroke="${o.robeD||o.robe}" stroke-width="5" stroke-linecap="round"/><circle cx="76" cy="88" r="5" fill="${skin}" ${st(OL,2.5)}/>`;
  }
  s+=`</g>`;
  return S(100,150,s,'overflow="visible"');
}
const MOSES={robe:'#b4572e',robeD:'#8f3f1f',scarf:'#ead9b5',scarfBand:'#3d6e8f',beard:'#8b8178',staff:true,stripe:'#ead9b5'};
for(let f=0;f<4;f++) add('moses'+f,100,150,person(MOSES,f));
add('mosesIdle',100,150,person({...MOSES,walk:false},0));
add('mosesRaise',100,150,person({...MOSES,walk:false,raise:true},0));
add('mosesYoung',100,150,person({...MOSES,beard:'#3a2a1d',walk:false},0));
add('aaron',100,150,person({robe:'#3d6e8f',robeD:'#2c536d',scarf:'#f1e6c8',scarfBand:'#b4572e',beard:'#6d625a',walk:false,stripe:'#f1e6c8'},0));
const PEOPLE=[
 {robe:'#6b8f3a',robeD:'#527029',scarf:'#e8d7b0',beard:'#3a2a1d',stripe:'#e8d7b0'},
 {robe:'#a8432a',robeD:'#80301c',hair:'#2b1d12',stripe:'#e6c27a',skin:'#b97c4c'},
 {robe:'#d9a933',robeD:'#b08422',scarf:'#7a4e9c',scarfBand:'#e8d7b0',stripe:'#7a4e9c'},
 {robe:'#4f7ea3',robeD:'#3a6283',scarf:'#f0e3c5',beard:'#5b4636'},
 {robe:'#8d5b9c',robeD:'#6d4279',hair:'#3a2a1d',stripe:'#f0e3c5',skin:'#d39c6e'},
];
PEOPLE.forEach((p,i)=>{for(let f=0;f<4;f++) add(`p${i}_${f}`,100,150,person(p,f));});
for(let f=0;f<4;f++) add('worker'+f,100,150,person({...PEOPLE[0],carry:true},f));
for(let f=0;f<4;f++) add('guard'+f,100,150,person({kilt:true,nemes:true,spear:true,skin:'#b9773f'},f));
add('pharaoh',100,150,person({kilt:true,crown:true,skin:'#b9773f',walk:false,staff:true},0));
add('princess',100,150,person({robe:'#f6f1e4',robeD:'#ddd3bd',hair:'#1e1712',band:true,skin:'#c48450',walk:false,belt:'#d9a933'},0));
for(let f=0;f<4;f++) add('miriam'+f,100,150,person({robe:'#2f8f86',robeD:'#21706a',scarf:'#f3d27a',scarfBand:'#a8432a',stripe:'#f3d27a',tof:true},f));
for(let f=0;f<4;f++) add('woman'+f,100,150,person({robe:'#c0567a',robeD:'#9a3f5f',scarf:'#f3e3c0',scarfBand:'#2f8f86',stripe:'#f3e3c0',tof:true,skin:'#b97c4c'},f));

/* ---------- animals & objects ---------- */
function sheep(f){const l=[6,-6][f%2];return S(80,60,`<ellipse cx="40" cy="57" rx="24" ry="3" fill="#000" opacity=".15"/>
<g ${st(OL,2.5)}><rect x="22" y="36" width="6" height="20" rx="3" fill="#4a3a2e" transform="rotate(${l} 25 36)"/><rect x="50" y="36" width="6" height="20" rx="3" fill="#4a3a2e" transform="rotate(${-l} 53 36)"/>
<path d="M14 30 q-6 -12 6 -16 q4 -10 16 -6 q8 -8 18 0 q12 -2 12 10 q8 8 -2 16 q0 10 -12 8 q-8 6 -18 0 q-12 4 -16 -4 q-10 -2 -4 -8z" fill="#f5f0e4"/>
<ellipse cx="66" cy="26" rx="9" ry="11" fill="#4a3a2e"/><path d="M60 18 q-8 -2 -8 4" fill="#4a3a2e"/></g><circle cx="69" cy="23" r="1.8" fill="#fff"/>`);}
add('sheep0',80,60,sheep(0));add('sheep1',80,60,sheep(1));

add('basket',120,64,S(120,64,`<ellipse cx="60" cy="56" rx="54" ry="6" fill="#0d3d4a" opacity=".3"/>
<path d="M30 22 q6 -16 22 -12 q6 -6 12 2" fill="#f1e6c8" ${st(OL,2.5)}/><circle cx="62" cy="16" r="9" fill="#d29a6a" ${st(OL,2.5)}/><path d="M56 12 q6 -8 12 0" fill="#3a2a1d"/>
<path d="M6 26 Q60 16 114 26 Q112 54 60 56 Q8 54 6 26Z" fill="#c08a43" ${st()}/>
<path d="M12 34 Q60 44 108 34 M14 44 Q60 52 104 44" fill="none" stroke="#8a5a2b" stroke-width="3"/>
${[20,32,44,56,68,80,92].map(x=>`<path d="M${x} 24 l4 30" stroke="#8a5a2b" stroke-width="2"/>`).join('')}
<path d="M6 26 Q60 34 114 26" fill="none" ${st(OL,3)}/>`));
function croc(f){const j=f?14:4;return S(180,64,`<ellipse cx="90" cy="54" rx="80" ry="7" fill="#0d3d4a" opacity=".25"/>
<g ${st()}><path d="M176 40 Q150 30 120 30 L60 28 Q30 30 8 ${40-j} L8 ${44} Q30 50 60 50 L130 52 Q160 52 176 40Z" fill="#5c8a3a"/>
<path d="M8 ${44} Q28 ${48+j} 58 50" fill="#4e7a30"/></g>
${[70,84,98,112,126,140].map((x,i)=>`<path d="M${x} 30 l6 -9 l6 9" fill="#4e7a30" ${st(OL,2)}/>`).join('')}
<path d="M14 ${41-j/2} l4 5 l4 -5 l4 5 l4 -5 l4 5" fill="#fff" ${st(OL,1.5)}/>
<circle cx="52" cy="${28-1}" r="7" fill="#e7d26b" ${st(OL,2.5)}/><circle cx="50" cy="27" r="2.6" fill="${OL}"/>`);}
add('croc0',180,64,croc(0));add('croc1',180,64,croc(1));
add('rock',100,56,S(100,56,`<ellipse cx="50" cy="50" rx="46" ry="6" fill="#0d3d4a" opacity=".3"/><path d="M6 46 Q4 22 26 14 Q44 2 64 10 Q92 14 94 44 Q50 54 6 46Z" fill="#8f8577" ${st()}/><path d="M26 18 Q40 10 54 14" fill="none" stroke="#b9b0a2" stroke-width="5" stroke-linecap="round"/>`));
add('lotus',48,40,S(48,40,`<ellipse cx="24" cy="32" rx="20" ry="5" fill="#3f8a4e" ${st(OL,2)}/>${[-40,-20,0,20,40].map(r=>`<path d="M24 30 Q16 16 24 4 Q32 16 24 30Z" fill="#f4a3c4" ${st(OL,2)} transform="rotate(${r} 24 30)"/>`).join('')}<circle cx="24" cy="24" r="4" fill="#f3d27a"/>`));
function reeds(w,h,n,dark){seed=11+n;let s='';for(let i=0;i<n;i++){const x=8+rnd()*(w-16),top=h*0.05+rnd()*h*0.35,b=rnd()*16-8;
 s+=`<path d="M${x} ${h} Q${x+b} ${(h+top)/2} ${x+b*1.6} ${top}" fill="none" stroke="${dark?'#2e5a2a':'#4f7f35'}" stroke-width="5" stroke-linecap="round"/>`;
 s+=`<path d="M${x+b*1.6} ${top} l-14 -16 M${x+b*1.6} ${top} l-6 -20 M${x+b*1.6} ${top} l4 -21 M${x+b*1.6} ${top} l14 -15 M${x+b*1.6} ${top} l-18 -6 M${x+b*1.6} ${top} l18 -6" stroke="${dark?'#4a7a32':'#89b04a'}" stroke-width="3" stroke-linecap="round"/>`;}
 for(let i=0;i<n*0.8;i++){const x=rnd()*w;s+=`<path d="M${x} ${h} q${rnd()*20-10} -${30+rnd()*40} ${rnd()*30-15} -${50+rnd()*50}" fill="none" stroke="${dark?'#3d6e2f':'#6f9a3e'}" stroke-width="4" stroke-linecap="round"/>`;}
 return S(w,h,s);}
add('reedClump',150,170,reeds(150,170,9,false));
add('bush',150,120,S(150,120,`<ellipse cx="75" cy="114" rx="60" ry="6" fill="#000" opacity=".2"/><g ${st(OL,3)}><path d="M75 116 L70 70 M75 116 L96 64 M74 100 L44 66" fill="none" stroke="#5a3d22"/><path d="M20 80 Q10 50 40 46 Q46 18 76 24 Q104 12 118 40 Q146 46 134 78 Q128 100 100 96 Q76 108 52 96 Q24 102 20 80Z" fill="#6f8a3a"/></g><path d="M40 60 Q60 50 80 56 M86 46 Q104 44 116 58" fill="none" stroke="#9cb25a" stroke-width="5" stroke-linecap="round"/>`));
add('jar',60,70,S(60,70,`<ellipse cx="30" cy="66" rx="24" ry="4" fill="#000" opacity=".2"/><path d="M18 6 h24 l-3 8 Q56 22 52 44 Q48 64 30 66 Q12 64 8 44 Q4 22 21 14Z" fill="#b5653a" ${st()}/><path d="M12 34 Q30 40 48 34" fill="none" stroke="#e6c27a" stroke-width="4"/>`));
add('cart',120,70,S(120,70,`<ellipse cx="60" cy="66" rx="54" ry="4" fill="#000" opacity=".2"/><g ${st()}><rect x="10" y="20" width="100" height="26" rx="4" fill="#9a6a3a"/><circle cx="30" cy="52" r="14" fill="#6b4a2b"/><circle cx="90" cy="52" r="14" fill="#6b4a2b"/></g><path d="M14 28 h92 M14 38 h92" stroke="#7a5230" stroke-width="2"/><circle cx="30" cy="52" r="3" fill="${OL}"/><circle cx="90" cy="52" r="3" fill="${OL}"/>`));
add('dough',54,44,S(54,44,`<ellipse cx="27" cy="40" rx="22" ry="3" fill="#000" opacity=".2"/><path d="M6 30 Q4 10 27 8 Q50 10 48 30 Q48 40 27 40 Q6 40 6 30Z" fill="#f1e6c8" ${st()}/><path d="M14 16 Q27 4 40 16" fill="none" stroke="#a8432a" stroke-width="4"/><path d="M27 8 l-6 -6 M27 8 l6 -6" ${st('#a8432a',3)}/>`));
add('seaRock',110,60,S(110,60,`<ellipse cx="55" cy="56" rx="50" ry="5" fill="#000" opacity=".25"/><path d="M6 52 Q8 26 30 22 Q44 4 66 12 Q98 14 104 52Z" fill="#6f7d74" ${st()}/><path d="M20 40 q6 -8 14 -2 M70 26 q8 -2 12 6" fill="none" stroke="#9fb0a2" stroke-width="4" stroke-linecap="round"/><path d="M40 52 q-4 -20 6 -34 M46 52 q6 -16 0 -30" fill="none" stroke="#3f8a4e" stroke-width="4" stroke-linecap="round"/>`));
add('coral',80,70,S(80,70,`<path d="M40 68 L40 40 M40 50 Q24 40 20 20 M40 44 Q56 34 60 14 M24 30 Q12 26 10 14 M58 26 Q70 22 72 10" fill="none" ${st(OL,10)}/><path d="M40 68 L40 40 M40 50 Q24 40 20 20 M40 44 Q56 34 60 14 M24 30 Q12 26 10 14 M58 26 Q70 22 72 10" fill="none" stroke="#e8735a" stroke-width="6" stroke-linecap="round"/>`));
add('shell',30,22,S(30,22,`<path d="M3 20 Q15 -6 27 20Z" fill="#f4cdb5" ${st(OL,2)}/><path d="M15 20 L15 6 M9 20 L12 9 M21 20 L18 9" stroke="#c9937a" stroke-width="2"/>`));
add('fish0',70,36,S(70,36,`<path d="M8 18 Q26 0 50 12 L66 2 L62 18 L66 34 L50 24 Q26 36 8 18Z" fill="#f3b24a" ${st(OL,2.5)}/><circle cx="20" cy="15" r="2.5" fill="${OL}"/><path d="M34 10 q-4 8 0 16" fill="none" stroke="#e06b3a" stroke-width="3"/>`));
add('fish1',70,36,S(70,36,`<path d="M8 18 Q26 4 50 14 L66 4 L60 18 L66 32 L50 22 Q26 32 8 18Z" fill="#7fc6d9" ${st(OL,2.5)}/><circle cx="20" cy="16" r="2.5" fill="${OL}"/><path d="M30 12 l0 12 M38 12 l0 12" stroke="#3d8fb0" stroke-width="3"/>`));
add('wheel',60,60,S(60,60,`<circle cx="30" cy="30" r="26" fill="none" ${st(OL,7)}/><circle cx="30" cy="30" r="26" fill="none" stroke="#c0873f" stroke-width="4"/>${[0,60,120].map(r=>`<path d="M30 6 L30 54" stroke="#c0873f" stroke-width="4" transform="rotate(${r} 30 30)"/>`).join('')}<circle cx="30" cy="30" r="6" fill="#d9a933" ${st(OL,2)}/>`));
function chariot(f){const g=[[30,-20,-30,20],[-10,10,10,-10],[-30,20,30,-20],[10,-10,-10,10]][f%4];const wr=f*30;
 const legs=[[150,g[0]],[162,g[1]],[200,g[2]],[212,g[3]]].map(([x,a])=>`<g transform="rotate(${a} ${x} 82)"><path d="M${x} 80 L${x} 118" ${st(OL,9)}/><path d="M${x} 80 L${x} 118" stroke="#8b5a35" stroke-width="5" stroke-linecap="round"/></g>`).join('');
 return S(250,150,`<ellipse cx="125" cy="144" rx="110" ry="5" fill="#000" opacity=".2"/>
${legs}<path d="M140 70 Q120 66 112 92" fill="none" ${st('#3a2516',7)}/>
<ellipse cx="180" cy="74" rx="44" ry="22" fill="#a86a3e" ${st()}/>
<path d="M206 66 Q214 34 230 24 L246 36 Q236 44 226 56 Q222 74 210 84Z" fill="#a86a3e" ${st()}/>
<path d="M210 30 Q206 46 202 64" fill="none" stroke="#3a2516" stroke-width="7" stroke-linecap="round"/><path d="M228 22 l2 -10 l6 10" fill="#a86a3e" ${st(OL,2)}/>
<circle cx="236" cy="32" r="2.4" fill="${OL}"/><path d="M220 30 Q190 20 214 50" fill="none" stroke="#c0392b" stroke-width="5"/><path d="M226 24 l2 -14 l4 2z" fill="#c0392b"/>
<path d="M96 74 L150 72" ${st(OL,5)}/><path d="M96 74 L150 72" stroke="#8a5a2b" stroke-width="2.5"/>
<g transform="translate(46 -14) scale(.82)">${person({kilt:true,nemes:true,skin:'#b9773f',walk:false},0).replace(/<\/?svg[^>]*>/g,'')}</g>
<path d="M44 58 L108 58 L104 104 L50 104Z" fill="#c0392b" ${st()}/><path d="M50 64 L102 64 M54 96 L100 96" stroke="#d9a933" stroke-width="5"/><circle cx="76" cy="80" r="8" fill="#d9a933" ${st(OL,2)}/>
<g transform="rotate(${wr} 76 112)"><circle cx="76" cy="112" r="30" fill="none" ${st(OL,8)}/><circle cx="76" cy="112" r="30" fill="none" stroke="#c0873f" stroke-width="5"/>${[0,60,120].map(r=>`<path d="M76 84 L76 140" stroke="#c0873f" stroke-width="5" transform="rotate(${r} 76 112)"/>`).join('')}</g><circle cx="76" cy="112" r="7" fill="#d9a933" ${st(OL,2)}/>`);}
for(let f=0;f<4;f++) add('chariot'+f,250,150,chariot(f));
add('brick',60,32,S(60,32,`<rect x="1.5" y="1.5" width="57" height="29" rx="3" fill="#c9844a" stroke="#6b3d1e" stroke-width="3"/><rect x="5" y="5" width="50" height="8" rx="3" fill="#dfa06a" opacity=".7"/>${[[12,18],[30,22],[44,14],[20,24],[50,24]].map(([x,y])=>`<path d="M${x} ${y} l7 -2" stroke="#e9c27a" stroke-width="2"/>`).join('')}`));
add('throne',170,190,S(170,190,`<g ${st()}><rect x="20" y="10" width="130" height="170" rx="10" fill="#2f6fa8"/><rect x="34" y="24" width="102" height="150" rx="6" fill="#d9a933"/><rect x="10" y="120" width="150" height="60" rx="6" fill="#c0392b"/></g><path d="M50 40 l70 0 M50 60 l70 0 M50 80 l70 0" stroke="#b08422" stroke-width="5"/>`));
add('heart',40,36,S(40,36,`<path d="M20 34 Q2 22 3 11 Q4 2 13 2 Q18 2 20 8 Q22 2 27 2 Q36 2 37 11 Q38 22 20 34Z" fill="#e2504a" ${st(OL,3)}/><path d="M10 10 q2 -4 6 -4" fill="none" stroke="#f9a49c" stroke-width="3" stroke-linecap="round"/>`));
add('heartEmpty',40,36,S(40,36,`<path d="M20 34 Q2 22 3 11 Q4 2 13 2 Q18 2 20 8 Q22 2 27 2 Q36 2 37 11 Q38 22 20 34Z" fill="#000" opacity=".35" ${st(OL,3)}/>`));
add('star',64,64,S(64,64,`<path d="M32 3 L40 23 L61 24 L44 37 L50 58 L32 46 L14 58 L20 37 L3 24 L24 23Z" fill="#f6c443" ${st(OL,3.5)}/><path d="M24 26 L32 10" stroke="#fde69a" stroke-width="4" stroke-linecap="round"/>`));
add('starEmpty',64,64,S(64,64,`<path d="M32 3 L40 23 L61 24 L44 37 L50 58 L32 46 L14 58 L20 37 L3 24 L24 23Z" fill="#000" opacity=".25" ${st(OL,3.5)}/>`));
add('lock',40,48,S(40,48,`<path d="M10 22 V14 Q10 3 20 3 Q30 3 30 14 V22" fill="none" ${st(OL,5)}/><rect x="5" y="20" width="30" height="25" rx="5" fill="#a89c88" ${st(OL,3)}/><circle cx="20" cy="31" r="3.5" fill="${OL}"/>`));

/* ---------- plague icons ---------- */
const tile=(inner,bg)=>S(120,120,`<rect x="4" y="4" width="112" height="112" rx="22" fill="${bg}" ${st(OL,4)}/><rect x="12" y="10" width="96" height="24" rx="12" fill="#fff" opacity=".18"/>${inner}`);
const PL=[
 tile(`<path d="M14 70 q12 -10 23 0 t23 0 t23 0 t23 0 V104 H14Z" fill="#b3261e" ${st(OL,3)}/><path d="M60 22 Q78 46 78 56 Q78 70 60 70 Q42 70 42 56 Q42 46 60 22Z" fill="#d9362b" ${st(OL,3)}/><path d="M52 52 q0 -8 6 -14" stroke="#ff9b8f" stroke-width="4" fill="none" stroke-linecap="round"/>`,'#f6d9b0'),
 tile(`<ellipse cx="60" cy="74" rx="38" ry="26" fill="#5fae4a" ${st(OL,3)}/><circle cx="42" cy="46" r="13" fill="#5fae4a" ${st(OL,3)}/><circle cx="78" cy="46" r="13" fill="#5fae4a" ${st(OL,3)}/><circle cx="42" cy="46" r="6" fill="#fff"/><circle cx="78" cy="46" r="6" fill="#fff"/><circle cx="43" cy="47" r="3" fill="${OL}"/><circle cx="79" cy="47" r="3" fill="${OL}"/><path d="M40 78 Q60 92 80 78" fill="none" ${st(OL,3)}/><circle cx="46" cy="70" r="4" fill="#f08a9a" opacity=".7"/><circle cx="74" cy="70" r="4" fill="#f08a9a" opacity=".7"/>`,'#cfe8f0'),
 tile(`<circle cx="52" cy="54" r="26" fill="#fff" opacity=".6" ${st(OL,4)}/><path d="M71 73 L94 96" ${st(OL,10)}/><path d="M71 73 L94 96" stroke="#8a5a2b" stroke-width="6" stroke-linecap="round"/>${[[44,46],[58,52],[50,62],[62,40]].map(([x,y])=>`<g><ellipse cx="${x}" cy="${y}" rx="4" ry="5" fill="#4a3a2e"/><path d="M${x-6} ${y-3} l12 6 M${x+6} ${y-3} l-12 6" stroke="#4a3a2e" stroke-width="1.5"/></g>`).join('')}${[[86,30],[24,90],[96,58]].map(([x,y])=>`<ellipse cx="${x}" cy="${y}" rx="3" ry="4" fill="#4a3a2e"/>`).join('')}`,'#f2e6c9'),
 tile(`<circle cx="60" cy="64" r="36" fill="#c7782a" ${st(OL,3)}/>${Array.from({length:12},(_,i)=>`<path d="M60 64 L60 22" stroke="#9a5a1e" stroke-width="10" stroke-linecap="round" transform="rotate(${i*30} 60 64)"/>`).join('')}<circle cx="60" cy="66" r="24" fill="#e9b25a" ${st(OL,3)}/><circle cx="51" cy="60" r="3.5" fill="${OL}"/><circle cx="69" cy="60" r="3.5" fill="${OL}"/><path d="M54 72 L60 78 L66 72Z" fill="${OL}"/><path d="M60 78 q-6 8 -12 4 M60 78 q6 8 12 4" fill="none" ${st(OL,2.5)}/>`,'#e9dcc0'),
 tile(`<path d="M28 50 Q30 30 60 30 Q90 30 92 50 Q96 80 80 92 L40 92 Q24 80 28 50Z" fill="#efe6da" ${st(OL,3)}/><path d="M28 44 l-14 -10 M92 44 l14 -10" ${st(OL,6)}/><ellipse cx="60" cy="82" rx="18" ry="11" fill="#f2b8a8" ${st(OL,3)}/><circle cx="54" cy="82" r="2.5" fill="${OL}"/><circle cx="66" cy="82" r="2.5" fill="${OL}"/><path d="M44 58 q4 -4 8 0 M68 58 q4 -4 8 0" fill="none" ${st(OL,3)}/><path d="M40 40 q6 4 12 0" fill="#6b5a4a"/><circle cx="76" cy="44" r="6" fill="#8a7a6a"/>`,'#d8e3c4'),
 tile(`<path d="M34 104 L34 62 Q34 50 42 50 L42 34 Q42 26 48 26 Q54 26 54 34 L54 30 Q54 22 60 22 Q66 22 66 30 L66 34 Q66 26 72 26 Q78 26 78 34 L78 58 Q84 50 90 54 Q94 58 88 70 L76 104Z" fill="#d6a074" ${st(OL,3)}/>${[[48,62],[62,74],[54,88],[70,56],[44,80]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="5" fill="#d0453a" ${st('#8a2a20',1.5)}/>`).join('')}`,'#f3e2c4'),
 tile(`<path d="M24 54 Q20 36 38 34 Q44 18 64 22 Q84 18 88 36 Q102 38 98 54Z" fill="#5d6a80" ${st(OL,3)}/><path d="M62 54 L52 76 L62 76 L54 98 L76 68 L64 68 L72 54Z" fill="#f6c443" ${st(OL,2.5)}/>${[[34,70],[40,90],[86,72],[92,96],[28,100]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="7" fill="#e6f2fa" ${st(OL,2.5)}/>`).join('')}`,'#9cc1de'),
 tile(`<ellipse cx="62" cy="64" rx="34" ry="12" fill="#8fa83a" ${st(OL,3)} transform="rotate(-12 62 64)"/><circle cx="30" cy="70" r="11" fill="#8fa83a" ${st(OL,3)}/><circle cx="27" cy="67" r="3" fill="${OL}"/><path d="M50 56 Q70 20 96 40 Q80 54 50 56Z" fill="#e8e2b4" opacity=".9" ${st(OL,2)}/><path d="M56 74 L44 98 M70 72 L80 98 L88 96 M40 74 L30 92" fill="none" ${st(OL,3)}/><path d="M24 60 Q16 40 22 30 M30 60 Q34 40 44 34" fill="none" ${st(OL,2)}/>`,'#efe0a8'),
 tile(`<circle cx="60" cy="60" r="44" fill="#141a2e"/><circle cx="76" cy="40" r="14" fill="#2a3352"/><circle cx="82" cy="36" r="13" fill="#141a2e"/>${[[30,36],[44,86],[90,80],[60,26]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="1.6" fill="#5b6688"/>`).join('')}<path d="M44 92 h32 l-6 -14 h-20Z" fill="#c9844a" ${st(OL,2)}/><path d="M60 78 q-8 -10 0 -22 q8 12 0 22Z" fill="#f6c443"/>`,'#2a3352'),
 tile(`<rect x="24" y="22" width="72" height="84" fill="#e3c08a" ${st(OL,3)}/><rect x="40" y="44" width="40" height="62" rx="18" fill="#3a2a1d" ${st(OL,3)}/><rect x="30" y="30" width="10" height="76" fill="#b3261e" opacity=".85"/><rect x="80" y="30" width="10" height="76" fill="#b3261e" opacity=".85"/><rect x="30" y="24" width="60" height="9" fill="#b3261e" opacity=".85"/><path d="M60 64 q-5 -8 0 -16 q5 8 0 16Z" fill="#f6c443"/>`,'#6d5a8a'),
];
PL.forEach((s,i)=>add('plague'+i,120,120,s));

/* ---------- backgrounds (tileable) ---------- */
function ridge(w,h,base,amps,fill,extra=''){let d=`M0 ${h}`;for(let x=0;x<=w;x+=16){let y=base;amps.forEach(([a,k,ph])=>y+=a*Math.sin((x/w)*Math.PI*2*k+ph));d+=` L${x} ${y.toFixed(1)}`;}d+=` L${w} ${h}Z`;return `<path d="${d}" fill="${fill}"/>${extra}`;}
const pyr=(x,b,s,c1,c2)=>`<path d="M${x-s} ${b} L${x} ${b-s*0.8} L${x+s} ${b}Z" fill="${c1}"/><path d="M${x} ${b-s*0.8} L${x+s} ${b} L${x+s*0.25} ${b}Z" fill="${c2}"/>`;
add('bgFar',1280,320,S(1280,320,ridge(1280,320,250,[[16,2,0],[8,5,1]],'#e3b77c')+pyr(300,262,120,'#d9a766','#b98445')+pyr(470,258,70,'#d9a766','#b98445')+pyr(980,262,90,'#d9a766','#b98445')+ridge(1280,320,280,[[10,3,2],[6,7,0]],'#d6a66a')));
function palm(x,b,h,c,lc){return `<path d="M${x} ${b} Q${x+10} ${b-h/2} ${x+4} ${b-h}" fill="none" stroke="${c}" stroke-width="9" stroke-linecap="round"/>`+[-60,-25,10,40,75,150,200].map(r=>`<path d="M${x+4} ${b-h} q30 -14 56 10 q-30 -6 -56 -10Z" fill="${lc}" stroke="${lc}" stroke-width="4" stroke-linejoin="round" transform="rotate(${r} ${x+4} ${b-h})"/>`).join('');}
seed=3;let mid='';for(let i=0;i<9;i++){const x=40+i*140+rnd()*60;mid+=palm(x,250,110+rnd()*70,'#6b4a2b','#3f7a3a');}
add('bgPalms',1280,260,S(1280,260,mid+ridge(1280,260,238,[[6,4,0]],'#4f7f35')));
add('bgReedsNear',1280,180,S(1280,180,reeds(1280,180,46,true).replace(/<\/?svg[^>]*>/g,'')));
add('water',256,256,S(256,256,`<rect width="256" height="256" fill="#2f8a9a"/>${[30,90,150,210].map((y,i)=>`<path d="M${i%2?0:-64} ${y} q32 -10 64 0 t64 0 t64 0 t64 0 t64 0" fill="none" stroke="#5fb8c4" stroke-width="4" opacity=".6"/>`).join('')}${[[40,60],[170,120],[100,200],[220,30]].map(([x,y])=>`<path d="M${x} ${y} h24" stroke="#bfe6ea" stroke-width="3" stroke-linecap="round" opacity=".7"/>`).join('')}`));
add('sandTile',256,128,S(256,128,`<rect width="256" height="128" fill="#e5c08a"/>${Array.from({length:40},()=>`<circle cx="${(rnd()*256).toFixed(0)}" cy="${(rnd()*128).toFixed(0)}" r="${(1+rnd()*2).toFixed(1)}" fill="#c99a5e" opacity=".7"/>`).join('')}<rect width="256" height="8" fill="#c99a5e"/>`));
add('seabedTile',256,160,S(256,160,`<rect width="256" height="160" fill="#c9b07a"/><rect width="256" height="10" fill="#8d7a52"/>${Array.from({length:50},()=>`<circle cx="${(rnd()*256).toFixed(0)}" cy="${(14+rnd()*140).toFixed(0)}" r="${(1+rnd()*2.5).toFixed(1)}" fill="#a48c5c" opacity=".8"/>`).join('')}<path d="M0 40 q32 -8 64 0 t64 0 t64 0 t64 0" fill="none" stroke="#b39b68" stroke-width="3"/>`));
// city of store-cities (פיתום ורעמסס)
seed=5;let city='';for(let i=0;i<8;i++){const x=i*160+rnd()*30,w=110+rnd()*40,h=90+rnd()*110;city+=`<rect x="${x}" y="${300-h}" width="${w}" height="${h}" fill="#c99a62" stroke="#8a6238" stroke-width="3"/><rect x="${x}" y="${300-h}" width="${w}" height="10" fill="#b5844c"/>`;for(let k=0;k<3;k++)city+=`<rect x="${x+14+k*30}" y="${300-h+30}" width="12" height="20" fill="#5b3d22" opacity=".7"/>`;
 if(i%3==1) city+=`<path d="M${x+20} ${300-h} Q${x+w/2} ${300-h-70} ${x+w-20} ${300-h}Z" fill="#d9ad72" stroke="#8a6238" stroke-width="3"/>`;}
add('bgCity',1280,300,S(1280,300,city));
// houses with marked doorposts (night city)
seed=9;let houses='';for(let i=0;i<7;i++){const x=i*183+20,w=140,h=110+rnd()*40;houses+=`<rect x="${x}" y="${260-h}" width="${w}" height="${h}" fill="#7c6a8c" stroke="#3a2e4a" stroke-width="3"/><rect x="${x-6}" y="${260-h-10}" width="${w+12}" height="12" fill="#6a5a7a" stroke="#3a2e4a" stroke-width="3"/><rect x="${x+50}" y="${260-60}" width="40" height="60" rx="16" fill="#f3c46a"/><path d="M${x+46} 260 V${260-62} H${x+94} V260" fill="none" stroke="#b3261e" stroke-width="7"/><rect x="${x+14}" y="${260-h+24}" width="20" height="16" fill="#f3c46a"/><rect x="${x+106}" y="${260-h+24}" width="20" height="16" fill="#f3c46a" opacity="${rnd()>.5?1:.3}"/>`;}
add('bgHouses',1280,260,S(1280,260,houses));
add('bgMountains',1280,360,S(1280,360,ridge(1280,360,190,[[60,1,0.5],[30,3,1],[12,7,0]],'#b36a4c')+ridge(1280,360,260,[[30,2,2],[14,5,0]],'#8f4e3a')));
add('sun',200,200,S(200,200,`<defs><radialGradient id="g"><stop offset="0" stop-color="#fff6c8"/><stop offset=".35" stop-color="#ffe08a"/><stop offset=".5" stop-color="#ffd36a" stop-opacity=".5"/><stop offset="1" stop-color="#ffd36a" stop-opacity="0"/></radialGradient></defs><circle cx="100" cy="100" r="100" fill="url(#g)"/>`));
add('moon',160,160,S(160,160,`<defs><radialGradient id="g"><stop offset="0" stop-color="#fffbe8"/><stop offset=".4" stop-color="#f6efcf"/><stop offset=".45" stop-color="#e8f0ff" stop-opacity=".35"/><stop offset="1" stop-color="#e8f0ff" stop-opacity="0"/></radialGradient></defs><circle cx="80" cy="80" r="80" fill="url(#g)"/><circle cx="70" cy="70" r="6" fill="#e3dab4"/><circle cx="92" cy="88" r="8" fill="#e3dab4"/>`));
add('cloud',220,90,S(220,90,`<path d="M20 70 Q4 70 8 54 Q12 40 32 44 Q36 18 66 22 Q86 2 116 16 Q146 6 160 30 Q196 26 200 52 Q214 70 192 74Z" fill="#fff" opacity=".85"/>`));
add('waterWall',256,512,S(256,512,`<defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3fa7c9"/><stop offset=".5" stop-color="#1f6f9a"/><stop offset="1" stop-color="#123f66"/></linearGradient></defs><rect width="256" height="512" fill="url(#g)"/>${[[30,80],[150,160],[90,300],[200,400],[40,440]].map(([x,y])=>`<path d="M${x} ${y} q20 -14 40 0" fill="none" stroke="#8fd3e8" stroke-width="3" opacity=".4"/>`).join('')}<path d="M60 0 L40 512 M180 0 L210 512" stroke="#8fd3e8" stroke-width="10" opacity=".08"/>`));
add('foam',256,40,S(256,40,`<path d="M0 26 q16 -18 32 -6 t32 0 t32 -4 t32 4 t32 -6 t32 4 t32 0 t32 4 V40 H0Z" fill="#e8fbff"/><path d="M0 30 q16 -10 32 -2 t32 0 t32 -2 t32 2 t32 -2 t32 2 t32 0 t32 2" fill="none" stroke="#9fdcef" stroke-width="3"/>${[20,90,160,230].map(x=>`<circle cx="${x}" cy="14" r="4" fill="#fff"/>`).join('')}`));
add('map',1280,720,S(1280,720,`<defs><radialGradient id="v" cx=".5" cy=".5" r=".75"><stop offset=".6" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#5a3a1a" stop-opacity=".45"/></radialGradient></defs>
<rect width="1280" height="720" fill="#efd9a8"/>${Array.from({length:120},()=>`<circle cx="${(rnd()*1280).toFixed(0)}" cy="${(rnd()*720).toFixed(0)}" r="${(1+rnd()*3).toFixed(1)}" fill="#d9bb84" opacity=".7"/>`).join('')}
<path d="M780 0 Q740 140 810 300 Q860 420 880 560 L940 720 L1280 720 L1280 0Z" fill="#9cc9c9" opacity=".0"/>
<path d="M300 720 Q330 560 280 440 Q240 330 300 200 Q330 120 280 0" fill="none" stroke="#5fa8b4" stroke-width="22" stroke-linecap="round"/><path d="M300 200 Q250 140 200 120 M300 200 Q340 130 380 110" fill="none" stroke="#5fa8b4" stroke-width="12" stroke-linecap="round"/>
<path d="M0 0 H1280 V50 Q900 60 640 40 Q300 20 0 60Z" fill="#7fb6c8"/>
<path d="M760 720 Q760 560 820 430 Q860 330 830 200 Q800 140 860 60 L900 40 Q880 160 900 240 Q940 380 880 520 Q850 620 860 720Z" fill="#7fb6c8"/>
<path d="M900 40 L940 80" stroke="#7fb6c8" stroke-width="16"/>
${pyr(380,520,40,'#d4a564','#b48448')+pyr(430,530,26,'#d4a564','#b48448')}
${[[1000,600],[1080,470],[1150,560],[1040,330],[1170,250]].map(([x,y])=>`<path d="M${x-50} ${y} L${x} ${y-60} L${x+50} ${y}Z" fill="#c08a64" opacity=".8"/>`).join('')}
<rect width="1280" height="720" fill="url(#v)"/>
<rect x="10" y="10" width="1260" height="700" fill="none" stroke="#8a6238" stroke-width="6" rx="14"/><rect x="22" y="22" width="1236" height="676" fill="none" stroke="#8a6238" stroke-width="2" rx="10"/>
<g transform="translate(1180 120)"><circle r="40" fill="#f5e6c4" stroke="#8a6238" stroke-width="3"/><path d="M0 -34 L8 0 L0 34 L-8 0Z" fill="#8a6238"/><text y="-44" text-anchor="middle" font-size="18" font-family="Arial" fill="#8a6238">צ</text></g>`));
add('vignette',1280,720,S(1280,720,`<defs><radialGradient id="v" cx=".5" cy=".5" r=".75"><stop offset=".55" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".55"/></radialGradient></defs><rect width="1280" height="720" fill="url(#v)"/>`));
/* particles */
add('dot',32,32,S(32,32,`<defs><radialGradient id="g"><stop offset="0" stop-color="#fff"/><stop offset=".4" stop-color="#fff" stop-opacity=".8"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient></defs><circle cx="16" cy="16" r="16" fill="url(#g)"/>`));
add('drop',20,28,S(20,28,`<path d="M10 2 Q18 14 18 19 Q18 26 10 26 Q2 26 2 19 Q2 14 10 2Z" fill="#cfefff"/>`));
add('spark',32,32,S(32,32,`<path d="M16 0 L19 13 L32 16 L19 19 L16 32 L13 19 L0 16 L13 13Z" fill="#fff"/>`));
add('flame',40,40,S(40,40,`<defs><radialGradient id="g"><stop offset="0" stop-color="#fff3b0"/><stop offset=".35" stop-color="#ffb43a"/><stop offset=".7" stop-color="#f05a1e" stop-opacity=".6"/><stop offset="1" stop-color="#f05a1e" stop-opacity="0"/></radialGradient></defs><circle cx="20" cy="20" r="20" fill="url(#g)"/>`));
add('confetti',14,8,S(14,8,`<rect width="14" height="8" rx="2" fill="#fff"/>`));
add('streak',80,6,S(80,6,`<defs><linearGradient id="g"><stop offset="0" stop-color="#fff" stop-opacity="0"/><stop offset=".5" stop-color="#fff"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient></defs><rect width="80" height="6" rx="3" fill="url(#g)"/>`));

window.KitaArt={list:ART,load(){
  return Promise.all(ART.map(a=>new Promise((res)=>{const img=new Image();img.onload=()=>res({...a,img});img.onerror=()=>{console.warn('art fail',a.key);res(null);};
    img.src='data:image/svg+xml;charset=utf-8,'+encodeURIComponent(a.svg);})));
}};
})();
/* UI icons */
(function(){const A=window.KitaArt.list,OL='#3b2616';
const I=(k,b)=>A.push({key:k,w:64,h:64,svg:`<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64">${b}</svg>`});
const ring=`<circle cx="32" cy="32" r="29" fill="#fbf1dc" stroke="${OL}" stroke-width="4"/>`;
I('icoSound',ring+`<path d="M16 26 h8 l10 -8 v28 l-10 -8 h-8z" fill="${OL}"/><path d="M40 24 q6 8 0 16 M45 19 q10 13 0 26" fill="none" stroke="${OL}" stroke-width="4" stroke-linecap="round"/>`);
I('icoMute',ring+`<path d="M16 26 h8 l10 -8 v28 l-10 -8 h-8z" fill="${OL}"/><path d="M40 25 l12 14 M52 25 l-12 14" stroke="#b3261e" stroke-width="4" stroke-linecap="round"/>`);
I('icoMap',ring+`<path d="M14 20 l12 -4 l12 4 l12 -4 v28 l-12 4 l-12 -4 l-12 4z" fill="#f6c443" stroke="${OL}" stroke-width="3" stroke-linejoin="round"/><path d="M26 16 v28 M38 20 v28" stroke="${OL}" stroke-width="3"/>`);
const arrow=(r)=>`<g transform="rotate(${r} 32 32)"><path d="M32 14 L50 36 H38 V50 H26 V36 H14Z" fill="#fff" stroke="${OL}" stroke-width="4" stroke-linejoin="round"/></g>`;
const pad=`<circle cx="32" cy="32" r="30" fill="#000" opacity=".35"/><circle cx="32" cy="32" r="28" fill="none" stroke="#fff" stroke-width="3" opacity=".8"/>`;
I('icoUp',pad+arrow(0));I('icoDown',pad+arrow(180));I('icoLeft',pad+arrow(-90));I('icoRight',pad+arrow(90));
I('icoJump',pad+`<path d="M14 46 Q32 4 50 30" fill="none" stroke="#fff" stroke-width="6" stroke-linecap="round"/><path d="M42 30 h12 v-12" fill="none" stroke="#fff" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>`);
I('icoStaff',`<circle cx="32" cy="32" r="30" fill="#f6c443" stroke="${OL}" stroke-width="4"/><path d="M24 54 L38 12" stroke="${OL}" stroke-width="8" stroke-linecap="round"/><path d="M24 54 L38 12" stroke="#8a5a2b" stroke-width="4" stroke-linecap="round"/><path d="M38 12 q8 -4 8 6" fill="none" stroke="#8a5a2b" stroke-width="4" stroke-linecap="round"/><path d="M8 40 q8 -6 16 0 M40 44 q8 -6 16 0" fill="none" stroke="#2f8a9a" stroke-width="4" stroke-linecap="round"/>`);
I('icoWave',`<circle cx="32" cy="32" r="30" fill="#7fc6d9" stroke="${OL}" stroke-width="3"/><path d="M8 34 q6 -8 12 0 t12 0 t12 0 t12 0 V60 H8Z" fill="#2f6fa8"/><path d="M28 54 V18" stroke="${OL}" stroke-width="7" stroke-linecap="round"/><path d="M28 54 V18" stroke="#8a5a2b" stroke-width="3.5" stroke-linecap="round"/>`);
})();
