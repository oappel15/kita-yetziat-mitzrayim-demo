(function(){
const fill=document.getElementById('ld-fill');let n=0;const tot=KitaArt.list.length;
const fonts=document.fonts?Promise.race([Promise.all([document.fonts.load('700 30px Rubik'),document.fonts.load('400 20px Rubik'),document.fonts.load('700 30px "Frank Ruhl Libre"')]),new Promise(r=>setTimeout(r,3000))]):Promise.resolve();
const art=Promise.all(KitaArt.list.map(a=>new Promise(res=>{const img=new Image();img.onload=()=>{n++;fill.style.width=(n/tot*100)+'%';res({...a,img});};img.onerror=()=>{console.error('art failed: '+a.key);res(null);};img.src='data:image/svg+xml;charset=utf-8,'+encodeURIComponent(a.svg);})));
function hint(){const h=document.getElementById('rotate-hint');h.hidden=!(window.innerHeight>window.innerWidth&&window.innerWidth<700);}
window.addEventListener('resize',hint);hint();
Promise.all([art,fonts]).then(([imgs])=>{window.__kitaImgs=imgs;
 const game=new Phaser.Game({type:Phaser.AUTO,parent:'game',width:K.W,height:K.H,backgroundColor:'#1c130d',
  scale:{mode:Phaser.Scale.FIT,autoCenter:Phaser.Scale.CENTER_BOTH},
  physics:{default:'arcade',arcade:{gravity:{y:0},debug:false}},input:{activePointers:3},
  render:{antialias:true,roundPixels:false},
  scene:[K.Boot,K.Title,K.MapScene,K.Stage1,K.Stage2,K.Stage3,K.Stage3b,K.Stage4,K.Stage5,K.Stage6,K.Stage6b,K.Song]});
 window.KitaGame.game=game;
 document.addEventListener('visibilitychange',()=>{if(document.hidden)KitaAudio.stopMusic();});
});
})();
