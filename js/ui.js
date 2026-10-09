/* Kita · HTML overlay cards (real RTL text, accessible buttons) */
(function(){
const ov=()=>document.getElementById('overlay');
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
let open=false;
function show(html){const o=ov();o.innerHTML=`<div class="card" role="dialog" aria-modal="true">${html}</div>`;o.hidden=false;open=true;return o;}
function hide(){const o=ov();o.hidden=true;o.innerHTML='';open=false;}
function wire(o,resolve){o.querySelectorAll('[data-v]').forEach(b=>b.addEventListener('click',()=>{KitaAudio.sfx('click');hide();resolve(b.dataset.v);}));
  const first=o.querySelector('.btn');if(first)setTimeout(()=>first.focus(),50);}
const UI={
 get open(){return open;}, hide,
 card({kicker,title,ref,text=[],quote,qref,task,buttons=[{t:'יאללה, מתחילים',v:'go'}]}){return new Promise(res=>{
  const o=show(`${ref?`<span class="ref">${esc(ref)}</span>`:''}${kicker?`<span class="kicker">${esc(kicker)}</span>`:''}<h2>${esc(title)}</h2>
   ${text.map(t=>`<p>${esc(t)}</p>`).join('')}${quote?`<blockquote>${esc(quote)}<cite>${esc(qref||'')}</cite></blockquote>`:''}
   ${task?`<div class="task"><b>המשימה:</b> ${esc(task)}</div>`:''}
   <div class="btns">${buttons.map((b,i)=>`<button class="btn ${b.cls||''}" data-v="${b.v}">${esc(b.t)}</button>`).join('')}</div>`);wire(o,res);});},
 question({kicker='שאלה מהטקסט',q,opts,a,explain,who}){return new Promise(res=>{
  // shuffle options, keep track of correct
  const order=opts.map((t,i)=>({t,i})).sort(()=>Math.random()-.5);
  const o=show(`<span class="kicker">${esc(kicker)}</span><h2 style="font-size:clamp(20px,3.2vw,26px)">${who?`<span class="who">${esc(who)}: </span>`:''}${esc(q)}</h2>
   <div class="opts">${order.map(x=>`<button class="opt" data-i="${x.i}">${esc(x.t)}</button>`).join('')}</div><div class="slot"></div>`);
  let first=null;
  o.querySelectorAll('.opt').forEach(b=>b.addEventListener('click',()=>{const i=+b.dataset.i;
    if(i===a){b.classList.add('ok');KitaAudio.sfx('good');if(first===null)first=true;
      o.querySelectorAll('.opt').forEach(x=>x.disabled=true);
      o.querySelector('.slot').innerHTML=`<div class="explain">✔️ ${esc(explain)}</div><div class="btns"><button class="btn" data-v="next">המשך</button></div>`;
      o.querySelector('[data-v]').addEventListener('click',()=>{KitaAudio.sfx('click');hide();res(first);});o.querySelector('[data-v]').focus();}
    else{b.classList.add('no');b.disabled=true;KitaAudio.sfx('bad');if(first===null)first=false;}
  }));
  setTimeout(()=>{const f=o.querySelector('.opt');f&&f.focus();},50);});},
 result({title,stars,lines=[],buttons}){return new Promise(res=>{
  const s=[0,1,2].map(i=>`<img src="${KitaGame.starURL(i<stars)}" alt="" style="animation-delay:${.25+i*.3}s">`).join('');
  const o=show(`<h2 style="text-align:center">${esc(title)}</h2><div class="stars" aria-label="${stars} כוכבים מתוך 3">${s}</div>${lines.map(t=>`<p style="text-align:center">${esc(t)}</p>`).join('')}
   <div class="btns">${buttons.map(b=>`<button class="btn ${b.cls||''}" data-v="${b.v}">${esc(b.t)}</button>`).join('')}</div>`);
  [0,1,2].forEach(i=>{if(i<stars)setTimeout(()=>KitaAudio.sfx('star'),250+i*300);});wire(o,res);});}
};
window.KitaUI=UI;
document.addEventListener('keydown',e=>{if(!open)return;if(e.key==='Escape'){}});
})();
