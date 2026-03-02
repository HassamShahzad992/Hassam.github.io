// ═══════════════════════════════════
//  AMBIENT BACKGROUND
// ═══════════════════════════════════
(function(){
  const c=document.getElementById('bg-canvas');
  const ctx=c.getContext('2d');
  let orbs=[];
  function resize(){c.width=window.innerWidth;c.height=window.innerHeight;initOrbs();}
  function initOrbs(){
    orbs=Array.from({length:6},()=>({
      x:Math.random()*c.width,y:Math.random()*c.height,
      r:Math.random()*180+80,
      vx:(Math.random()-0.5)*0.2,vy:(Math.random()-0.5)*0.15,
      hue:Math.random()>0.5?170:300,
      alpha:Math.random()*0.04+0.02
    }));
  }
  function draw(){
    ctx.clearRect(0,0,c.width,c.height);
    orbs.forEach(o=>{
      const g=ctx.createRadialGradient(o.x,o.y,0,o.x,o.y,o.r);
      g.addColorStop(0,`hsla(${o.hue},100%,60%,${o.alpha})`);
      g.addColorStop(1,'transparent');
      ctx.fillStyle=g;ctx.beginPath();ctx.arc(o.x,o.y,o.r,0,Math.PI*2);ctx.fill();
      o.x+=o.vx;o.y+=o.vy;
      if(o.x<-o.r)o.x=c.width+o.r;
      if(o.x>c.width+o.r)o.x=-o.r;
      if(o.y<-o.r)o.y=c.height+o.r;
      if(o.y>c.height+o.r)o.y=-o.r;
    });
    requestAnimationFrame(draw);
  }
  resize();draw();
  window.addEventListener('resize',resize);
})();

// ═══════════════════════════════════
//  AUDIO
// ═══════════════════════════════════
const AC=new(window.AudioContext||window.webkitAudioContext)();
function beep(freq,dur,type='sine',vol=0.12){
  if(AC.state==='suspended')AC.resume();
  const o=AC.createOscillator(),g=AC.createGain();
  o.connect(g);g.connect(AC.destination);
  const t=AC.currentTime;
  o.type=type;o.frequency.value=freq;
  g.gain.setValueAtTime(vol,t);
  g.gain.exponentialRampToValueAtTime(0.0001,t+dur);
  o.start(t);o.stop(t+dur);
}
function eatSound(){beep(660,0.06,'sine',0.14);setTimeout(()=>beep(990,0.05,'sine',0.1),40);}
function bonusSound(){beep(880,0.06,'triangle',0.15);setTimeout(()=>beep(1320,0.06,'triangle',0.12),60);setTimeout(()=>beep(1760,0.08,'sine',0.1),120);}
function deathSound(){
  beep(200,0.15,'sawtooth',0.12);
  setTimeout(()=>beep(150,0.2,'sawtooth',0.1),100);
  setTimeout(()=>beep(100,0.3,'square',0.08),220);
}
function moveSound(){beep(220,0.03,'sine',0.04);}

// ═══════════════════════════════════
//  GAME STATE
// ═══════════════════════════════════
const COLS=20,ROWS=20;
const SPEEDS={slow:180,normal:120,fast:75};
let speed='normal';

let snake,dir,nextDir,food,bonusFood,bonusTimer;
let score,foodEaten,startTime;
let running=false,paused=false,alive=false;
let loop=null;

const canvas=document.getElementById('gameCanvas');
const ctx=canvas.getContext('2d');
let CW,CH,CS;// cell size

function setSp(el){
  document.querySelectorAll('.sp-pill').forEach(p=>{p.classList.remove('on');});
  el.classList.add('on');
  speed=el.dataset.speed;
}

function resize(){
  const bw=canvas.parentElement.clientWidth||480;
  const size=Math.min(bw,480);
  canvas.width=size;canvas.height=size;
  CW=size;CH=size;CS=size/COLS;
}

function show(id){document.querySelectorAll('.screen').forEach(s=>s.hidden=s.id!==id);}
function goHome(){
  clearInterval(loop);running=false;alive=false;
  show('homeScreen');updateHomeStats();
}

function updateHomeStats(){
  document.getElementById('bestDisplay').textContent=getBest();
  document.getElementById('gamesDisplay').textContent=getGames();
}

function getBest(){return parseInt(localStorage.getItem('syn_best')||'0');}
function setBest(v){localStorage.setItem('syn_best',v);}
function getGames(){return parseInt(localStorage.getItem('syn_games')||'0');}
function setGames(v){localStorage.setItem('syn_games',v);}

function startGame(){
  resize();
  show('gameScreen');
  document.getElementById('hudBest').textContent=getBest();
  document.getElementById('startOverlay').hidden=false;
  document.getElementById('pauseOverlay').hidden=true;
  document.getElementById('deathOverlay').hidden=true;
  drawIdle();
}

function beginRound(){
  document.getElementById('startOverlay').hidden=true;
  document.getElementById('pauseOverlay').hidden=true;
  document.getElementById('deathOverlay').hidden=true;

  // Init snake in center
  const cx=Math.floor(COLS/2),cy=Math.floor(ROWS/2);
  snake=[{x:cx,y:cy},{x:cx-1,y:cy},{x:cx-2,y:cy}];
  dir={x:1,y:0};nextDir={x:1,y:0};
  score=0;foodEaten=0;startTime=Date.now();
  bonusFood=null;bonusTimer=0;
  running=true;alive=true;paused=false;

  placeFood();
  updateHUD();
  clearInterval(loop);
  loop=setInterval(tick,SPEEDS[speed]);
}

function pause(){
  if(!alive)return;
  paused=true;running=false;
  clearInterval(loop);
  document.getElementById('pauseOverlay').hidden=false;
}
function resume(){
  paused=false;running=true;
  document.getElementById('pauseOverlay').hidden=true;
  loop=setInterval(tick,SPEEDS[speed]);
}

function placeFood(){
  const empty=[];
  for(let x=0;x<COLS;x++) for(let y=0;y<ROWS;y++){
    if(!snake.some(s=>s.x===x&&s.y===y)) empty.push({x,y});
  }
  food=empty[Math.floor(Math.random()*empty.length)];
}

function placeBonusFood(){
  const empty=[];
  for(let x=0;x<COLS;x++) for(let y=0;y<ROWS;y++){
    if(!snake.some(s=>s.x===x&&s.y===y)&&!(food.x===x&&food.y===y)) empty.push({x,y});
  }
  bonusFood=empty[Math.floor(Math.random()*empty.length)];
  bonusFood.type=['⚡','★','◈'][Math.floor(Math.random()*3)];
  bonusTimer=20;// ticks before disappear
}

function tick(){
  if(!running||!alive)return;
  dir={...nextDir};

  const head={x:snake[0].x+dir.x,y:snake[0].y+dir.y};

  // Wall collision
  if(head.x<0||head.x>=COLS||head.y<0||head.y>=ROWS){die();return;}
  // Self collision
  if(snake.some(s=>s.x===head.x&&s.y===head.y)){die();return;}

  snake.unshift(head);

  let grew=false;
  // Eat food
  if(head.x===food.x&&head.y===food.y){
    grew=true;
    score+=10+Math.floor(foodEaten/3)*2;
    foodEaten++;
    eatSound();
    placeFood();
    flash('go');
    spawnParticles(head.x*CS+CS/2,head.y*CS+CS/2,'#00ffe0');
    // spawn bonus every 5 eats
    if(foodEaten%5===0&&!bonusFood) placeBonusFood();
  }

  // Eat bonus
  if(bonusFood&&head.x===bonusFood.x&&head.y===bonusFood.y){
    grew=true;
    score+=50;
    bonusSound();
    spawnParticles(head.x*CS+CS/2,head.y*CS+CS/2,'#ffe94f');
    flash('go');
    bonusFood=null;
  }

  if(!grew) snake.pop();

  // Bonus timer
  if(bonusFood){bonusTimer--;if(bonusTimer<=0)bonusFood=null;}

  updateHUD();
  draw();
}

function die(){
  alive=false;running=false;
  clearInterval(loop);
  deathSound();
  flash('die');
  spawnParticles(snake[0].x*CS+CS/2,snake[0].y*CS+CS/2,'#ff4fd8',20);
  setGames(getGames()+1);
  const isNew=score>getBest();
  if(isNew)setBest(score);
  document.getElementById('hudBest').textContent=getBest();

  document.getElementById('finalScore').textContent=score;
  document.getElementById('dLen').textContent=snake.length;
  document.getElementById('dFood').textContent=foodEaten;
  document.getElementById('dTime').textContent=Math.floor((Date.now()-startTime)/1000)+'s';
  document.getElementById('newBestTag').hidden=!isNew;
  document.getElementById('deathOverlay').hidden=false;
}

function updateHUD(){
  document.getElementById('hudScore').textContent=score;
  document.getElementById('hudLen').textContent=snake.length;
  document.getElementById('hudBest').textContent=getBest();
}

// ═══════════════════════════════════
//  DRAWING
// ═══════════════════════════════════
function draw(){
  ctx.clearRect(0,0,CW,CH);
  drawGrid();
  drawFood();
  if(bonusFood)drawBonus();
  drawSnake();
}

function drawIdle(){
  ctx.clearRect(0,0,CW,CH);
  drawGrid();
  // decorative idle snake
  const s=[];const cx=Math.floor(COLS/2),cy=Math.floor(ROWS/2);
  for(let i=0;i<6;i++)s.push({x:cx-i,y:cy});
  drawSnakeArr(s,0.4);
}

function drawGrid(){
  ctx.strokeStyle='rgba(0,255,224,0.03)';
  ctx.lineWidth=0.5;
  for(let x=0;x<=COLS;x++){ctx.beginPath();ctx.moveTo(x*CS,0);ctx.lineTo(x*CS,CH);ctx.stroke();}
  for(let y=0;y<=ROWS;y++){ctx.beginPath();ctx.moveTo(0,y*CS);ctx.lineTo(CW,y*CS);ctx.stroke();}
}

function drawSnake(){
  drawSnakeArr(snake,1);
}

function drawSnakeArr(arr,alpha){
  if(!arr.length)return;
  ctx.save();ctx.globalAlpha=alpha;

  arr.forEach((seg,i)=>{
    const progress=1-i/arr.length;
    const px=seg.x*CS,py=seg.y*CS;
    const pad=1.5;

    // glow
    const glow=ctx.createRadialGradient(px+CS/2,py+CS/2,0,px+CS/2,py+CS/2,CS*0.7);
    const a=progress*0.25;
    glow.addColorStop(0,`rgba(0,255,224,${a})`);
    glow.addColorStop(1,'transparent');
    ctx.fillStyle=glow;
    ctx.beginPath();ctx.arc(px+CS/2,py+CS/2,CS*0.7,0,Math.PI*2);ctx.fill();

    // body
    const r=i===0?5:3;
    roundRect(ctx,px+pad,py+pad,CS-pad*2,CS-pad*2,r);
    if(i===0){
      const hg=ctx.createLinearGradient(px,py,px+CS,py+CS);
      hg.addColorStop(0,'#7fffb2');hg.addColorStop(1,'#00ffe0');
      ctx.fillStyle=hg;
    } else {
      const bg=ctx.createLinearGradient(px,py,px+CS,py+CS);
      bg.addColorStop(0,`rgba(0,255,224,${0.7*progress})`);
      bg.addColorStop(1,`rgba(127,255,178,${0.4*progress})`);
      ctx.fillStyle=bg;
    }
    ctx.fill();

    // eye on head
    if(i===0){
      ctx.fillStyle='rgba(2,4,8,0.9)';
      const ex=px+CS*0.6,ey=py+CS*0.3;
      ctx.beginPath();ctx.arc(ex,ey,1.8,0,Math.PI*2);ctx.fill();
      ctx.fillStyle='rgba(0,255,224,0.8)';
      ctx.beginPath();ctx.arc(ex,ey,0.8,0,Math.PI*2);ctx.fill();
    }

    // segment border
    ctx.strokeStyle=`rgba(0,255,224,${0.15*progress})`;
    ctx.lineWidth=0.5;
    roundRect(ctx,px+pad,py+pad,CS-pad*2,CS-pad*2,r);
    ctx.stroke();
  });
  ctx.restore();
}

function drawFood(){
  if(!food)return;
  const px=food.x*CS+CS/2,py=food.y*CS+CS/2;
  const t=Date.now()/1000;
  const pulse=0.9+Math.sin(t*4)*0.1;

  // outer glow
  const glo=ctx.createRadialGradient(px,py,0,px,py,CS*0.8);
  glo.addColorStop(0,'rgba(255,233,79,0.18)');
  glo.addColorStop(1,'transparent');
  ctx.fillStyle=glo;ctx.beginPath();ctx.arc(px,py,CS*0.8,0,Math.PI*2);ctx.fill();

  // core
  ctx.save();ctx.translate(px,py);ctx.scale(pulse,pulse);
  const fg=ctx.createRadialGradient(0,0,0,0,0,CS*0.38);
  fg.addColorStop(0,'#ffffff');fg.addColorStop(0.3,'#ffe94f');fg.addColorStop(1,'rgba(255,233,79,0.3)');
  ctx.fillStyle=fg;ctx.beginPath();ctx.arc(0,0,CS*0.38,0,Math.PI*2);ctx.fill();

  // shimmer ring
  ctx.strokeStyle='rgba(255,233,79,0.4)';ctx.lineWidth=1;
  ctx.beginPath();ctx.arc(0,0,CS*0.44,0,Math.PI*2);ctx.stroke();
  ctx.restore();
}

function drawBonus(){
  if(!bonusFood)return;
  const px=bonusFood.x*CS+CS/2,py=bonusFood.y*CS+CS/2;
  const t=Date.now()/1000;
  const bob=Math.sin(t*5)*1.5;
  const fade=bonusTimer/20;

  ctx.save();ctx.globalAlpha=fade;ctx.translate(px,py+bob);

  const bg=ctx.createRadialGradient(0,0,0,0,0,CS*0.5);
  bg.addColorStop(0,'rgba(255,79,216,0.3)');bg.addColorStop(1,'transparent');
  ctx.fillStyle=bg;ctx.beginPath();ctx.arc(0,0,CS*0.5,0,Math.PI*2);ctx.fill();

  ctx.font=`bold ${CS*0.55}px sans-serif`;ctx.textAlign='center';ctx.textBaseline='middle';
  ctx.fillStyle='#ff4fd8';ctx.shadowColor='#ff4fd8';ctx.shadowBlur=8;
  ctx.fillText(bonusFood.type,0,0);
  ctx.restore();
}

function roundRect(ctx,x,y,w,h,r){
  ctx.beginPath();
  ctx.moveTo(x+r,y);ctx.lineTo(x+w-r,y);ctx.arcTo(x+w,y,x+w,y+r,r);
  ctx.lineTo(x+w,y+h-r);ctx.arcTo(x+w,y+h,x+w-r,y+h,r);
  ctx.lineTo(x+r,y+h);ctx.arcTo(x,y+h,x,y+h-r,r);
  ctx.lineTo(x,y+r);ctx.arcTo(x,y,x+r,y,r);
  ctx.closePath();
}

// ═══════════════════════════════════
//  PARTICLES
// ═══════════════════════════════════
function spawnParticles(x,y,color,n=12){
  const rect=canvas.getBoundingClientRect();
  for(let i=0;i<n;i++){
    const el=document.createElement('div');
    el.className='particle';
    const angle=Math.random()*Math.PI*2;
    const dist=30+Math.random()*50;
    const size=2+Math.random()*4;
    el.style.cssText=`
      width:${size}px;height:${size}px;background:${color};
      left:${rect.left+x}px;top:${rect.top+y}px;
      --px:${Math.cos(angle)*dist}px;--py:${Math.sin(angle)*dist}px;
      animation-duration:${0.4+Math.random()*0.4}s;
    `;
    document.body.appendChild(el);
    el.addEventListener('animationend',()=>el.remove());
  }
}

function flash(type){
  const f=document.getElementById('sf');
  f.classList.add(type);
  setTimeout(()=>f.classList.remove(type),150);
}

// ═══════════════════════════════════
//  INPUT
// ═══════════════════════════════════
const dirMap={
  ArrowUp:{x:0,y:-1},w:{x:0,y:-1},W:{x:0,y:-1},
  ArrowDown:{x:0,y:1},s:{x:0,y:1},S:{x:0,y:1},
  ArrowLeft:{x:-1,y:0},a:{x:-1,y:0},A:{x:-1,y:0},
  ArrowRight:{x:1,y:0},d:{x:1,y:0},D:{x:1,y:0},
};
document.addEventListener('keydown',e=>{
  if(e.key==='p'||e.key==='P'){
    if(alive&&!paused)pause();
    else if(paused)resume();
    return;
  }
  const d=dirMap[e.key];
  if(!d)return;
  e.preventDefault();
  // prevent reverse
  if(dir.x===0&&d.x!==0)nextDir=d;
  if(dir.y===0&&d.y!==0)nextDir=d;
});

function dpDir(dx,dy){
  if(!alive)return;
  const d={x:dx,y:dy};
  if(dir.x===0&&d.x!==0)nextDir=d;
  if(dir.y===0&&d.y!==0)nextDir=d;
}

// swipe
let touchX=0,touchY=0;
canvas.addEventListener('touchstart',e=>{touchX=e.touches[0].clientX;touchY=e.touches[0].clientY;},{passive:true});
canvas.addEventListener('touchend',e=>{
  const dx=e.changedTouches[0].clientX-touchX;
  const dy=e.changedTouches[0].clientY-touchY;
  if(Math.max(Math.abs(dx),Math.abs(dy))<10)return;
  if(Math.abs(dx)>Math.abs(dy)) dpDir(dx>0?1:-1,0);
  else dpDir(0,dy>0?1:-1);
},{passive:true});

// ═══════════════════════════════════
//  ANIMATION LOOP FOR FOOD PULSE
// ═══════════════════════════════════
function animFrame(){
  if(running&&alive) draw();
  requestAnimationFrame(animFrame);
}
animFrame();

window.addEventListener('resize',()=>{if(!document.getElementById('gameScreen').hidden)resize();});

// ─── INIT ───
updateHomeStats();