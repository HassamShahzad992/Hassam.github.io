const QUESTIONS = {
  Science: [
    {q:"What is the chemical symbol for water?",opts:["H2O","CO2","NaCl","O2"],ans:0,exp:"Water is made of 2 hydrogen atoms and 1 oxygen atom — H₂O."},
    {q:"How many bones does an adult human body have?",opts:["206","186","226","196"],ans:0,exp:"An adult human body has exactly 206 bones."},
    {q:"What planet is closest to the Sun?",opts:["Venus","Earth","Mercury","Mars"],ans:2,exp:"Mercury is the closest planet to the Sun in our solar system."},
    {q:"What is the speed of light (approximately)?",opts:["300,000 km/s","150,000 km/s","450,000 km/s","200,000 km/s"],ans:0,exp:"Light travels at approximately 299,792 km/s — about 300,000 km/s."},
    {q:"What gas do plants absorb from the atmosphere?",opts:["Oxygen","Nitrogen","Carbon Dioxide","Hydrogen"],ans:2,exp:"Plants absorb CO₂ and release oxygen through photosynthesis."},
    {q:"What is the powerhouse of the cell?",opts:["Nucleus","Mitochondria","Ribosome","Golgi Body"],ans:1,exp:"The mitochondria generates most of the cell's energy as ATP."},
    {q:"Which element has the atomic number 1?",opts:["Helium","Oxygen","Carbon","Hydrogen"],ans:3,exp:"Hydrogen is element #1 on the periodic table."},
    {q:"What force keeps planets in orbit?",opts:["Magnetism","Gravity","Nuclear Force","Friction"],ans:1,exp:"Gravity is the force that keeps planets in their orbits around stars."},
  ],
  History: [
    {q:"In what year did World War II end?",opts:["1943","1944","1945","1946"],ans:2,exp:"World War II ended in 1945 — VE Day (May) and VJ Day (August/September)."},
    {q:"Who was the first President of the United States?",opts:["John Adams","Thomas Jefferson","George Washington","Benjamin Franklin"],ans:2,exp:"George Washington became the first US President in 1789."},
    {q:"Which ancient wonder was in Alexandria, Egypt?",opts:["Colosseum","Great Lighthouse","Pyramids","Hanging Gardens"],ans:1,exp:"The Lighthouse of Alexandria was one of the Seven Wonders of the Ancient World."},
    {q:"What year did the Berlin Wall fall?",opts:["1987","1988","1989","1991"],ans:2,exp:"The Berlin Wall fell on November 9, 1989."},
    {q:"Which empire was ruled by Julius Caesar?",opts:["Greek","Ottoman","Roman","Persian"],ans:2,exp:"Julius Caesar was a Roman general and statesman in the Roman Republic/Empire."},
    {q:"Who painted the Mona Lisa?",opts:["Michelangelo","Raphael","Caravaggio","Leonardo da Vinci"],ans:3,exp:"The Mona Lisa was painted by Leonardo da Vinci, likely between 1503 and 1519."},
    {q:"What year did the Titanic sink?",opts:["1910","1912","1914","1916"],ans:1,exp:"RMS Titanic sank on April 15, 1912 after hitting an iceberg."},
    {q:"The French Revolution began in which year?",opts:["1776","1783","1789","1799"],ans:2,exp:"The French Revolution began in 1789 with the storming of the Bastille."},
  ],
  Tech: [
    {q:"What does 'HTML' stand for?",opts:["Hyper Text Markup Language","High Text Machine Language","Hyper Transfer Markup Logic","Hyper Text Modern Language"],ans:0,exp:"HTML = HyperText Markup Language — the standard language for web pages."},
    {q:"Who co-founded Apple Inc.?",opts:["Bill Gates","Steve Jobs","Elon Musk","Jeff Bezos"],ans:1,exp:"Steve Jobs co-founded Apple Inc. in 1976 with Steve Wozniak and Ronald Wayne."},
    {q:"What does 'CPU' stand for?",opts:["Central Processing Unit","Computer Power Unit","Core Processing Utility","Central Program Unit"],ans:0,exp:"CPU = Central Processing Unit — the primary component of a computer."},
    {q:"Which language is primarily used for data science?",opts:["Java","JavaScript","C++","Python"],ans:3,exp:"Python is the most widely used language in data science and machine learning."},
    {q:"What does 'WWW' stand for?",opts:["World Wide Web","Wide World Web","World Web Wide","World Wide Wire"],ans:0,exp:"WWW = World Wide Web, invented by Tim Berners-Lee in 1989."},
    {q:"What is the binary equivalent of decimal 10?",opts:["1010","1100","1001","1110"],ans:0,exp:"10 in binary is 1010 (8+2 = 10)."},
    {q:"Which company developed the Android OS?",opts:["Apple","Microsoft","Google","Samsung"],ans:2,exp:"Google developed Android OS, which it acquired in 2005."},
    {q:"What does 'SQL' stand for?",opts:["Structured Query Language","Simple Query Logic","System Query Language","Standard Query Layer"],ans:0,exp:"SQL = Structured Query Language, used to manage relational databases."},
  ],
  Geography: [
    {q:"What is the capital of Australia?",opts:["Sydney","Melbourne","Canberra","Brisbane"],ans:2,exp:"Canberra is the capital of Australia — chosen as a compromise between Sydney and Melbourne."},
    {q:"Which is the largest ocean on Earth?",opts:["Atlantic","Indian","Arctic","Pacific"],ans:3,exp:"The Pacific Ocean is the largest, covering more than 165 million km²."},
    {q:"Which country has the most natural lakes?",opts:["USA","Brazil","Russia","Canada"],ans:3,exp:"Canada has more lakes than any other country, with over 3 million lakes."},
    {q:"What is the longest river in the world?",opts:["Amazon","Congo","Yangtze","Nile"],ans:3,exp:"The Nile River in Africa is generally considered the world's longest at ~6,650 km."},
    {q:"Which country is the largest by area?",opts:["China","USA","Canada","Russia"],ans:3,exp:"Russia is the largest country by area at approximately 17.1 million km²."},
    {q:"In which continent is the Sahara Desert?",opts:["Asia","Australia","Africa","South America"],ans:2,exp:"The Sahara Desert is located in North Africa and is the world's largest hot desert."},
    {q:"Which mountain is the tallest on Earth?",opts:["K2","Kangchenjunga","Lhotse","Mount Everest"],ans:3,exp:"Mount Everest at 8,848 m is the tallest mountain on Earth."},
    {q:"What is the capital of Japan?",opts:["Osaka","Kyoto","Hiroshima","Tokyo"],ans:3,exp:"Tokyo is the capital and largest city of Japan."},
  ],
};

const DIFF_TIME = {easy:30,medium:20,hard:12};
const DIFF_SCORE = {easy:100,medium:150,hard:250};
const LETTERS = ['A','B','C','D'];

let state = {
  topic:'Science', diff:'medium',
  questions:[], qi:0,
  score:0, correct:0, wrong:0, skipped:0,
  lives:3, hints:3,
  streak:0, totalTime:0,
  timeLeft:20, timerInterval:null,
  answered:false, questionStartTime:0,
};

// ── TOPIC / DIFF ──
function selectTopic(el){
  document.querySelectorAll('.topic-card').forEach(c=>c.classList.remove('selected'));
  el.classList.add('selected');
  state.topic = el.dataset.topic;
}
function selectDiff(el, diff){
  document.querySelectorAll('.diff-btn').forEach(b=>b.className='diff-btn');
  el.classList.add('active-'+diff);
  state.diff = diff;
}

// ── START ──
function startQuiz(){
  const qs = [...QUESTIONS[state.topic]].sort(()=>Math.random()-0.5).slice(0,8);
  state = {...state, questions:qs, qi:0, score:0, correct:0, wrong:0, skipped:0,
    lives:3, hints:3, streak:0, totalTime:0, answered:false};
  show('quizScreen');
  document.getElementById('quizTopic').textContent = state.topic;
  updateLives();
  loadQuestion();
}

// ── QUESTION ──
function loadQuestion(){
  clearInterval(state.timerInterval);
  state.answered = false;
  state.questionStartTime = Date.now();

  const q = state.questions[state.qi];
  const total = state.questions.length;

  document.getElementById('qNum').textContent = `${state.qi+1} / ${total}`;
  document.getElementById('qCategory').textContent = state.topic;
  document.getElementById('questionText').textContent = q.q;
  document.getElementById('progressFill').style.width = `${(state.qi/total)*100}%`;
  document.getElementById('progressLabel').textContent = `${state.qi} answered`;
  document.getElementById('scoreLabel').textContent = `Score: ${state.score}`;
  document.getElementById('hintCount').textContent = state.hints;
  document.getElementById('hintBtn').disabled = state.hints === 0;

  // Hide explanation
  const expBox = document.getElementById('explanationBox');
  expBox.style.display = 'none';
  expBox.classList.remove('wrong-exp');

  // Next btn
  const nb = document.getElementById('nextBtn');
  nb.classList.remove('show');
  nb.textContent = state.qi === total-1 ? 'Finish 🎯' : 'Next →';
  if(state.qi === total-1){ nb.innerHTML = 'Finish <span class="next-arrow">🎯</span>'; }
  else { nb.innerHTML = 'Next <span class="next-arrow">→</span>'; }

  // Options
  const grid = document.getElementById('optionsGrid');
  grid.innerHTML = '';
  q.opts.forEach((opt, i) => {
    const div = document.createElement('div');
    div.className = 'option';
    div.innerHTML = `
      <div class="option-letter">${LETTERS[i]}</div>
      <div class="option-text">${opt}</div>
      <div class="option-icon" id="icon_${i}"></div>`;
    div.onclick = () => answer(i);
    grid.appendChild(div);
  });

  // Timer
  state.timeLeft = DIFF_TIME[state.diff];
  updateTimer();
  state.timerInterval = setInterval(() => {
    state.timeLeft--;
    updateTimer();
    if(state.timeLeft <= 0){
      clearInterval(state.timerInterval);
      timeOut();
    }
  }, 1000);
}

function updateTimer(){
  const max = DIFF_TIME[state.diff];
  const pct = (state.timeLeft / max) * 100;
  const bar = document.getElementById('timerBar');
  const count = document.getElementById('timerCount');
  bar.style.width = pct+'%';
  count.textContent = state.timeLeft;
  const urgent = state.timeLeft <= 5;
  bar.classList.toggle('urgent', urgent);
  count.classList.toggle('urgent', urgent);
}

function timeOut(){
  if(state.answered) return;
  state.answered = true;
  state.skipped++;
  state.streak = 0;
  // Mark correct answer
  revealAnswer(-1);
  document.getElementById('nextBtn').classList.add('show');
}

// ── ANSWER ──
function answer(idx){
  if(state.answered) return;
  state.answered = true;
  clearInterval(state.timerInterval);

  const elapsed = (Date.now() - state.questionStartTime) / 1000;
  state.totalTime += elapsed;

  const q = state.questions[state.qi];
  const options = document.querySelectorAll('.option');
  const expBox = document.getElementById('explanationBox');

  if(idx === q.ans){
    // Correct
    state.correct++;
    state.streak++;
    const timeBonus = Math.max(0, Math.floor(state.timeLeft * 5));
    const streakBonus = state.streak >= 3 ? 50 : 0;
    const pts = DIFF_SCORE[state.diff] + timeBonus + streakBonus;
    state.score += pts;

    options[idx].classList.add('correct');
    options[idx].querySelector('.option-icon').textContent = '✓';

    expBox.classList.remove('wrong-exp');
    document.getElementById('expHead').textContent = `✓ Correct! +${pts} pts`;
    document.getElementById('expText').textContent = q.exp;
    expBox.style.display = 'block';

    if(state.streak >= 3) showStreak(state.streak);
  } else {
    // Wrong
    state.wrong++;
    state.streak = 0;
    state.lives--;
    updateLives();

    options[idx].classList.add('wrong');
    options[idx].querySelector('.option-icon').textContent = '✗';
    revealCorrect(q.ans, options);

    expBox.classList.add('wrong-exp');
    document.getElementById('expHead').textContent = '✗ Not quite...';
    document.getElementById('expText').textContent = q.exp;
    expBox.style.display = 'block';
  }

  // Disable all
  options.forEach((o, i) => {
    if(i !== idx && i !== q.ans) o.classList.add('disabled');
  });

  document.getElementById('scoreLabel').textContent = `Score: ${state.score}`;
  document.getElementById('nextBtn').classList.add('show');
}

function revealAnswer(selected){
  const q = state.questions[state.qi];
  const options = document.querySelectorAll('.option');
  revealCorrect(q.ans, options);
  options.forEach((o,i) => { if(i !== q.ans) o.classList.add('disabled'); });

  const expBox = document.getElementById('explanationBox');
  expBox.classList.add('wrong-exp');
  document.getElementById('expHead').textContent = '⏰ Time\'s up!';
  document.getElementById('expText').textContent = q.exp;
  expBox.style.display = 'block';
}

function revealCorrect(ansIdx, options){
  options[ansIdx].classList.add('correct');
  options[ansIdx].querySelector('.option-icon').textContent = '✓';
}

// ── HINT ──
function useHint(){
  if(state.hints <= 0 || state.answered) return;
  state.hints--;
  document.getElementById('hintCount').textContent = state.hints;
  if(state.hints === 0) document.getElementById('hintBtn').disabled = true;

  // Remove one wrong answer
  const q = state.questions[state.qi];
  const options = document.querySelectorAll('.option');
  const wrongIdxs = [];
  options.forEach((o, i) => {
    if(i !== q.ans && !o.classList.contains('disabled')) wrongIdxs.push(i);
  });
  if(wrongIdxs.length){
    const remove = wrongIdxs[Math.floor(Math.random()*wrongIdxs.length)];
    options[remove].classList.add('disabled');
    options[remove].style.opacity = '0.2';
  }
}

// ── NEXT ──
function nextQuestion(){
  state.qi++;
  if(state.qi >= state.questions.length){
    showResult();
  } else {
    loadQuestion();
  }
}

// ── LIVES ──
function updateLives(){
  [1,2,3].forEach(i => {
    const el = document.getElementById('l'+i);
    el.classList.toggle('lost', i > state.lives);
  });
}

// ── STREAK TOAST ──
function showStreak(n){
  const toast = document.getElementById('streakToast');
  document.getElementById('streakMsg').textContent = `${n}x Streak! 🔥 +50 Bonus`;
  toast.classList.add('show');
  setTimeout(()=>toast.classList.remove('show'), 2400);
}

// ── RESULT ──
function showResult(){
  clearInterval(state.timerInterval);
  const total = state.questions.length;
  const pct = Math.round((state.correct/total)*100);
  const avgTime = state.totalTime > 0 ? (state.totalTime/total).toFixed(1) : 0;

  let emoji, grade, sub;
  if(pct>=90){emoji='🏆';grade='Outstanding!';sub='You\'re a true expert. Incredible performance!';}
  else if(pct>=75){emoji='🎉';grade='Excellent!';sub='You really know your stuff. Great job!';}
  else if(pct>=60){emoji='👍';grade='Good Job!';sub='Solid effort! A little more practice and you\'ll ace it.';}
  else if(pct>=40){emoji='😅';grade='Not Bad!';sub='Keep learning and you\'ll improve fast!';}
  else{emoji='📚';grade='Keep Trying!';sub='Don\'t give up — every expert was once a beginner.';}

  document.getElementById('resultEmoji').textContent = emoji;
  document.getElementById('resultGrade').textContent = grade;
  document.getElementById('resultSub').textContent = sub;
  document.getElementById('resultScore').textContent = state.score.toLocaleString();
  document.getElementById('statCorrect').textContent = state.correct;
  document.getElementById('statWrong').textContent = state.wrong;
  document.getElementById('statTime').textContent = avgTime+'s';
  document.getElementById('barCorrectN').textContent = state.correct;
  document.getElementById('barWrongN').textContent = state.wrong;
  document.getElementById('barSkipN').textContent = state.skipped;

  show('resultScreen');

  setTimeout(()=>{
    document.getElementById('barCorrect').style.width = (state.correct/total*100)+'%';
    document.getElementById('barWrong').style.width = (state.wrong/total*100)+'%';
    document.getElementById('barSkip').style.width = (state.skipped/total*100)+'%';
  }, 200);

  if(pct >= 60) launchConfetti();
}

// ── CONFETTI ──
function launchConfetti(){
  const colors = ['#e85d3a','#f0a500','#2d9e6b','#3a6ee8','#f0875f','#ff6b9d'];
  for(let i=0;i<60;i++){
    setTimeout(()=>{
      const el = document.createElement('div');
      el.className = 'confetti-piece';
      el.style.left = Math.random()*100+'vw';
      el.style.background = colors[Math.floor(Math.random()*colors.length)];
      el.style.width = (6+Math.random()*8)+'px';
      el.style.height = (6+Math.random()*8)+'px';
      el.style.borderRadius = Math.random()>0.5?'50%':'2px';
      el.style.animationDuration = (2+Math.random()*3)+'s';
      el.style.animationDelay = '0s';
      document.body.appendChild(el);
      setTimeout(()=>el.remove(), 5000);
    }, i*40);
  }
}

// ── NAVIGATION ──
function show(screenId){
  document.querySelectorAll('.screen').forEach(s=>{
    s.style.display = s.id === screenId ? '' : 'none';
  });
  document.getElementById(screenId).style.animation = '';
  void document.getElementById(screenId).offsetWidth;
  document.getElementById(screenId).style.animation = 'screenIn 0.5s cubic-bezier(0.22,1,0.36,1) both';
}

function goHome(){
  clearInterval(state.timerInterval);
  show('homeScreen');
}

function restartQuiz(){
  startQuiz();
}

// ── CLICK SOUND ──
const _ac = new (window.AudioContext||window.webkitAudioContext)();
function playTick(freq=800,dur=0.06){
  if(_ac.state==='suspended')_ac.resume();
  const o=_ac.createOscillator(),g=_ac.createGain();
  o.connect(g);g.connect(_ac.destination);
  o.type='sine';o.frequency.value=freq;
  g.gain.setValueAtTime(0.08,_ac.currentTime);
  g.gain.exponentialRampToValueAtTime(0.0001,_ac.currentTime+dur);
  o.start();o.stop(_ac.currentTime+dur);
}
document.addEventListener('click',e=>{
  if(e.target.closest('.option')) playTick(600,0.05);
  else if(e.target.closest('button')) playTick(900,0.04);
});