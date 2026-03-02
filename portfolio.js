const loaderEl = document.getElementById('loader');
const loaderBar = document.getElementById('loaderBar');
const loaderNum = document.getElementById('loaderNum');
const loaderPct = document.getElementById('loaderPct');
let p = 0;
const iv = setInterval(()=>{
  p += Math.random()*6+1;
  if(p>=100){p=100;clearInterval(iv);setTimeout(()=>loaderEl.classList.add('out'),400);}
  loaderBar.style.width=p+'%';
  loaderNum.textContent=Math.floor(p);
  loaderPct.textContent=Math.floor(p)+'%';
},40);

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   CURSOR
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
const dot=document.getElementById('cursor-dot');
const ring=document.getElementById('cursor-circle');
const ctxt=document.getElementById('cursor-text');
let mx=0,my=0,rx=0,ry=0;

document.addEventListener('mousemove',e=>{
  mx=e.clientX;my=e.clientY;
  dot.style.left=mx+'px';dot.style.top=my+'px';
});
(function follow(){
  rx+=(mx-rx)*.11;ry+=(my-ry)*.11;
  ring.style.left=rx+'px';ring.style.top=ry+'px';
  ctxt.style.left=rx+'px';ctxt.style.top=(ry+48)+'px';
  requestAnimationFrame(follow);
})();

document.querySelectorAll('a,button,.stat-item,.skill-row,.pc').forEach(el=>{
  el.addEventListener('mouseenter',()=>document.body.classList.add('cursor-hover'));
  el.addEventListener('mouseleave',()=>document.body.classList.remove('cursor-hover'));
});

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   HERO CANVAS — flowing aurora
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
const heroCanvas = document.getElementById('hero-canvas');
const hCtx = heroCanvas.getContext('2d');
let hW,hH;

function resizeHero(){
  hW=heroCanvas.width=heroCanvas.offsetWidth;
  hH=heroCanvas.height=heroCanvas.offsetHeight;
}
resizeHero();
new ResizeObserver(resizeHero).observe(heroCanvas);

// Particles
class HeroParticle{
  constructor(){this.reset();}
  reset(){
    this.x=Math.random()*hW;
    this.y=Math.random()*hH;
    this.vx=(Math.random()-.5)*.5;
    this.vy=(Math.random()-.5)*.4;
    this.size=Math.random()*2+.5;
    this.alpha=Math.random()*.6+.1;
    this.life=0;
    this.maxLife=250+Math.random()*350;
    const t=Math.random();
    if(t<.45) this.hue='200,255,0';
    else if(t<.75) this.hue='123,79,255';
    else this.hue='255,59,122';
  }
  tick(){
    this.x+=this.vx;this.y+=this.vy;this.life++;
    if(this.life>this.maxLife||this.x<-10||this.x>hW+10||this.y<-10||this.y>hH+10) this.reset();
  }
  draw(){
    const fade=this.life>this.maxLife*.7?(this.maxLife-this.life)/(this.maxLife*.3):1;
    hCtx.beginPath();
    hCtx.arc(this.x,this.y,this.size,0,Math.PI*2);
    hCtx.fillStyle=`rgba(${this.hue},${this.alpha*fade})`;
    hCtx.fill();
  }
}

const hParticles=[];
function initHP(){
  hParticles.length=0;
  const n=Math.floor((hW*hH)/8000);
  for(let i=0;i<n;i++) hParticles.push(new HeroParticle());
}
initHP();

// Aurora waves
let t=0;
function drawAurora(){
  t+=.003;
  // Wave 1 — lime
  hCtx.beginPath();
  hCtx.moveTo(0,hH*.5);
  for(let x=0;x<=hW;x+=4){
    const y=hH*.5+Math.sin(x*.004+t)*100+Math.sin(x*.008+t*1.5)*50;
    hCtx.lineTo(x,y);
  }
  hCtx.lineTo(hW,hH);hCtx.lineTo(0,hH);hCtx.closePath();
  const g1=hCtx.createLinearGradient(0,0,0,hH);
  g1.addColorStop(0,'rgba(200,255,0,0)');
  g1.addColorStop(.5,'rgba(200,255,0,0.035)');
  g1.addColorStop(1,'rgba(200,255,0,0)');
  hCtx.fillStyle=g1;hCtx.fill();

  // Wave 2 — violet
  hCtx.beginPath();
  hCtx.moveTo(0,hH*.6);
  for(let x=0;x<=hW;x+=4){
    const y=hH*.6+Math.sin(x*.005+t*1.2+1)*80+Math.sin(x*.01+t*.8)*40;
    hCtx.lineTo(x,y);
  }
  hCtx.lineTo(hW,hH);hCtx.lineTo(0,hH);hCtx.closePath();
  const g2=hCtx.createLinearGradient(0,0,0,hH);
  g2.addColorStop(0,'rgba(123,79,255,0)');
  g2.addColorStop(.5,'rgba(123,79,255,0.025)');
  g2.addColorStop(1,'rgba(123,79,255,0)');
  hCtx.fillStyle=g2;hCtx.fill();
}

function drawConnections(){
  for(let i=0;i<hParticles.length;i++){
    for(let j=i+1;j<hParticles.length;j++){
      const dx=hParticles[i].x-hParticles[j].x;
      const dy=hParticles[i].y-hParticles[j].y;
      const d=Math.sqrt(dx*dx+dy*dy);
      if(d<120){
        hCtx.beginPath();
        hCtx.strokeStyle=`rgba(200,255,0,${.03*(1-d/120)})`;
        hCtx.lineWidth=.5;
        hCtx.moveTo(hParticles[i].x,hParticles[i].y);
        hCtx.lineTo(hParticles[j].x,hParticles[j].y);
        hCtx.stroke();
      }
    }
  }
}

function heroAnimate(){
  hCtx.clearRect(0,0,hW,hH);
  drawAurora();
  drawConnections();
  hParticles.forEach(p=>{p.tick();p.draw();});
  requestAnimationFrame(heroAnimate);
}
heroAnimate();

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   SCROLL PROGRESS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
const prog=document.getElementById('progress');
const nav=document.getElementById('mainNav');

window.addEventListener('scroll',()=>{
  const pct=window.scrollY/(document.documentElement.scrollHeight-window.innerHeight)*100;
  prog.style.width=pct+'%';
  nav.classList.toggle('stuck',window.scrollY>80);

  // Parallax aurora waves on hero section
  if(window.scrollY<window.innerHeight){
    heroCanvas.style.transform=`translateY(${window.scrollY*.25}px)`;
  }

  // Skill bar parallax float
  document.querySelectorAll('.skill-row.in').forEach(r=>{
    if(r.matches(':hover')) return;
    const rect=r.getBoundingClientRect();
    const d=(rect.top+rect.height/2-window.innerHeight/2)/window.innerHeight;
    r.style.transform=`translateX(${d*8}px)`;
  });

  // Project card float
  document.querySelectorAll('.pc.in').forEach(c=>{
    if(c.matches(':hover')) return;
    const rect=c.getBoundingClientRect();
    const d=(rect.top+rect.height/2-window.innerHeight/2)/window.innerHeight;
    c.style.transform=`translateY(${d*20}px)`;
  });
},{passive:true});

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   INTERSECTION OBSERVERS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
const obs=(sel,cls='in',opts={threshold:.12})=>{
  const o=new IntersectionObserver(entries=>{
    entries.forEach(e=>{ if(e.isIntersecting) e.target.classList.add(cls); });
  },opts);
  document.querySelectorAll(sel).forEach(el=>o.observe(el));
};

obs('.rv');
obs('.pc',undefined,{threshold:.08});

// Skill rows with stagger + bar animate
const skillObs=new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      e.target.classList.add('in');
      const bar=e.target.querySelector('.skill-bar-v-fill');
      if(bar) setTimeout(()=>{ bar.style.width=bar.dataset.w+'%'; },300);
    }
  });
},{threshold:.3});
document.querySelectorAll('.skill-row').forEach(r=>skillObs.observe(r));

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   3D TILT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
document.querySelectorAll('.stat-item').forEach(el=>{
  el.addEventListener('mousemove',e=>{
    const r=el.getBoundingClientRect();
    const x=(e.clientX-r.left)/r.width-.5;
    const y=(e.clientY-r.top)/r.height-.5;
    el.style.transform=`perspective(700px) rotateX(${-y*10}deg) rotateY(${x*10}deg) translateX(6px)`;
  });
  el.addEventListener('mouseleave',()=>el.style.transform='');
});

document.querySelectorAll('.pc').forEach(el=>{
  el.addEventListener('mousemove',e=>{
    const r=el.getBoundingClientRect();
    const x=(e.clientX-r.left)/r.width-.5;
    const y=(e.clientY-r.top)/r.height-.5;
    el.style.transform=`perspective(900px) rotateX(${-y*5}deg) rotateY(${x*5}deg) scale(1.01)`;
  });
  el.addEventListener('mouseleave',()=>el.style.transform='');
});

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   FORM
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
document.getElementById('fireBtn').addEventListener('click',function(){
  const orig=this.querySelector('span').textContent;
  this.querySelector('span').textContent='Message Sent ✓';
  this.style.background='var(--lime)';
  this.style.borderColor='var(--lime)';
  this.style.color='var(--black)';
  setTimeout(()=>{
    this.querySelector('span').textContent=orig;
    this.style.background='';this.style.borderColor='';this.style.color='';
  },3000);
});

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   ACTIVE NAV
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
const sectionObs=new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      document.querySelectorAll('.nav-mid a').forEach(a=>{
        a.style.color='';
        if(a.getAttribute('href')==='#'+e.target.id) a.style.color='#fff';
      });
    }
  });
},{threshold:.4});
document.querySelectorAll('section[id]').forEach(s=>sectionObs.observe(s));