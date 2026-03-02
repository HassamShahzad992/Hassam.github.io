// ══════════════════════════════════════
//  WEATHER DATA (realistic mock)
// ══════════════════════════════════════
const CITIES = {
  'Karachi': {
    temp:34,feels:39,condition:'Partly Cloudy',icon:'⛅',theme:'cloudy',
    humidity:72,wind:18,uv:9,pressure:1012,visibility:8,dewpoint:26,
    high:36,low:28,sunrise:'06:02',sunset:'19:45',
    aqi:85,aqiStatus:'Moderate',aqiDesc:'Air quality is acceptable for most.',
    pollutants:['PM2.5 ●','CO ○','O₃ ●'],
    hourly:[
      {t:'Now',icon:'⛅',temp:34},{t:'13h',icon:'🌤️',temp:35},{t:'14h',icon:'☀️',temp:36},
      {t:'15h',icon:'☀️',temp:35},{t:'16h',icon:'⛅',temp:33},{t:'17h',icon:'🌥️',temp:31},
      {t:'18h',icon:'🌥️',temp:30},{t:'19h',icon:'🌇',temp:29}
    ],
    weekly:[
      {day:'Today',icon:'⛅',cond:'Partly Cloudy',hi:36,lo:28,pct:50},
      {day:'Tue',icon:'☀️',cond:'Sunny',hi:37,lo:29,pct:85},
      {day:'Wed',icon:'🌤️',cond:'Mostly Sunny',hi:36,lo:28,pct:75},
      {day:'Thu',icon:'🌦️',cond:'Chance Rain',hi:33,lo:27,pct:35},
      {day:'Fri',icon:'🌧️',cond:'Rainy',hi:30,lo:25,pct:20},
      {day:'Sat',icon:'⛅',cond:'Cloudy',hi:32,lo:26,pct:45},
      {day:'Sun',icon:'☀️',cond:'Sunny',hi:35,lo:28,pct:90},
    ]
  },
  'Dubai': {
    temp:41,feels:45,condition:'Sunny & Hot',icon:'☀️',theme:'sunny',
    humidity:35,wind:12,uv:11,pressure:1008,visibility:15,dewpoint:18,
    high:42,low:32,sunrise:'06:15',sunset:'18:55',
    aqi:42,aqiStatus:'Good',aqiDesc:'Air quality is satisfactory.',
    pollutants:['PM2.5 ○','CO ○','NO₂ ○'],
    hourly:[
      {t:'Now',icon:'☀️',temp:41},{t:'13h',icon:'☀️',temp:42},{t:'14h',icon:'☀️',temp:41},
      {t:'15h',icon:'🌤️',temp:39},{t:'16h',icon:'🌤️',temp:38},{t:'17h',icon:'⛅',temp:36},
      {t:'18h',icon:'🌇',temp:34},{t:'19h',icon:'🌙',temp:33}
    ],
    weekly:[
      {day:'Today',icon:'☀️',cond:'Sunny',hi:42,lo:32,pct:95},
      {day:'Tue',icon:'☀️',cond:'Sunny',hi:43,lo:33,pct:98},
      {day:'Wed',icon:'🌤️',cond:'Hot & Humid',hi:41,lo:31,pct:80},
      {day:'Thu',icon:'☀️',cond:'Sunny',hi:42,lo:32,pct:95},
      {day:'Fri',icon:'🌤️',cond:'Mostly Sunny',hi:40,lo:31,pct:82},
      {day:'Sat',icon:'☀️',cond:'Sunny',hi:41,lo:31,pct:90},
      {day:'Sun',icon:'☀️',cond:'Sunny',hi:42,lo:32,pct:95},
    ]
  },
  'London': {
    temp:14,feels:11,condition:'Overcast',icon:'🌥️',theme:'cloudy',
    humidity:80,wind:24,uv:2,pressure:1018,visibility:6,dewpoint:10,
    high:16,low:9,sunrise:'07:30',sunset:'17:20',
    aqi:28,aqiStatus:'Good',aqiDesc:'Air quality is excellent today.',
    pollutants:['PM2.5 ○','CO ○','O₃ ○'],
    hourly:[
      {t:'Now',icon:'🌥️',temp:14},{t:'13h',icon:'🌦️',temp:14},{t:'14h',icon:'🌧️',temp:13},
      {t:'15h',icon:'🌧️',temp:12},{t:'16h',icon:'🌦️',temp:12},{t:'17h',icon:'🌥️',temp:11},
      {t:'18h',icon:'⛅',temp:11},{t:'19h',icon:'🌙',temp:10}
    ],
    weekly:[
      {day:'Today',icon:'🌥️',cond:'Overcast',hi:16,lo:9,pct:35},
      {day:'Tue',icon:'🌧️',cond:'Rainy',hi:13,lo:8,pct:20},
      {day:'Wed',icon:'🌦️',cond:'Showers',hi:12,lo:7,pct:30},
      {day:'Thu',icon:'⛅',cond:'Partly Cloudy',hi:15,lo:8,pct:55},
      {day:'Fri',icon:'🌤️',cond:'Mostly Sunny',hi:17,lo:9,pct:70},
      {day:'Sat',icon:'☀️',cond:'Sunny',hi:18,lo:10,pct:85},
      {day:'Sun',icon:'⛅',cond:'Partly Cloudy',hi:16,lo:9,pct:60},
    ]
  },
  'New York': {
    temp:22,feels:20,condition:'Clear & Breezy',icon:'🌤️',theme:'sunny',
    humidity:55,wind:20,uv:5,pressure:1021,visibility:14,dewpoint:12,
    high:24,low:16,sunrise:'06:48',sunset:'19:10',
    aqi:51,aqiStatus:'Moderate',aqiDesc:'Sensitive groups may be affected.',
    pollutants:['PM2.5 ●','O₃ ●','NO₂ ○'],
    hourly:[
      {t:'Now',icon:'🌤️',temp:22},{t:'13h',icon:'☀️',temp:23},{t:'14h',icon:'☀️',temp:24},
      {t:'15h',icon:'🌤️',temp:23},{t:'16h',icon:'⛅',temp:22},{t:'17h',icon:'⛅',temp:21},
      {t:'18h',icon:'🌇',temp:20},{t:'19h',icon:'🌙',temp:18}
    ],
    weekly:[
      {day:'Today',icon:'🌤️',cond:'Clear',hi:24,lo:16,pct:70},
      {day:'Tue',icon:'⛅',cond:'Partly Cloudy',hi:22,lo:15,pct:55},
      {day:'Wed',icon:'🌦️',cond:'PM Showers',hi:20,lo:14,pct:40},
      {day:'Thu',icon:'🌧️',cond:'Rainy',hi:18,lo:13,pct:25},
      {day:'Fri',icon:'🌥️',cond:'Cloudy',hi:19,lo:13,pct:38},
      {day:'Sat',icon:'☀️',cond:'Sunny',hi:23,lo:15,pct:80},
      {day:'Sun',icon:'☀️',cond:'Sunny',hi:25,lo:16,pct:85},
    ]
  },
  'Tokyo': {
    temp:18,feels:16,condition:'Light Rain',icon:'🌧️',theme:'rainy',
    humidity:88,wind:14,uv:3,pressure:1009,visibility:5,dewpoint:15,
    high:20,low:13,sunrise:'05:40',sunset:'18:30',
    aqi:65,aqiStatus:'Moderate',aqiDesc:'Some pollutants may affect sensitive groups.',
    pollutants:['PM2.5 ●','NO₂ ●','SO₂ ○'],
    hourly:[
      {t:'Now',icon:'🌧️',temp:18},{t:'13h',icon:'🌧️',temp:17},{t:'14h',icon:'🌦️',temp:17},
      {t:'15h',icon:'🌦️',temp:16},{t:'16h',icon:'🌥️',temp:16},{t:'17h',icon:'🌥️',temp:15},
      {t:'18h',icon:'⛅',temp:14},{t:'19h',icon:'🌙',temp:13}
    ],
    weekly:[
      {day:'Today',icon:'🌧️',cond:'Rainy',hi:20,lo:13,pct:25},
      {day:'Tue',icon:'🌦️',cond:'Showers',hi:19,lo:12,pct:35},
      {day:'Wed',icon:'🌥️',cond:'Cloudy',hi:21,lo:13,pct:40},
      {day:'Thu',icon:'⛅',cond:'Partly Cloudy',hi:22,lo:14,pct:55},
      {day:'Fri',icon:'🌤️',cond:'Mostly Sunny',hi:23,lo:14,pct:70},
      {day:'Sat',icon:'☀️',cond:'Sunny',hi:25,lo:16,pct:88},
      {day:'Sun',icon:'🌤️',cond:'Mostly Sunny',hi:24,lo:15,pct:75},
    ]
  },
  'Moscow': {
    temp:-3,feels:-9,condition:'Heavy Snow',icon:'❄️',theme:'snowy',
    humidity:90,wind:22,uv:1,pressure:1028,visibility:2,dewpoint:-6,
    high:0,low:-7,sunrise:'08:45',sunset:'16:20',
    aqi:22,aqiStatus:'Good',aqiDesc:'Air quality is excellent.',
    pollutants:['PM2.5 ○','CO ○','NO₂ ○'],
    hourly:[
      {t:'Now',icon:'❄️',temp:-3},{t:'13h',icon:'🌨️',temp:-4},{t:'14h',icon:'🌨️',temp:-4},
      {t:'15h',icon:'❄️',temp:-5},{t:'16h',icon:'🌨️',temp:-6},{t:'17h',icon:'🌨️',temp:-6},
      {t:'18h',icon:'🌑',temp:-7},{t:'19h',icon:'🌑',temp:-7}
    ],
    weekly:[
      {day:'Today',icon:'❄️',cond:'Heavy Snow',hi:0,lo:-7,pct:15},
      {day:'Tue',icon:'🌨️',cond:'Snow Showers',hi:-1,lo:-8,pct:20},
      {day:'Wed',icon:'🌨️',cond:'Light Snow',hi:1,lo:-6,pct:30},
      {day:'Thu',icon:'🌥️',cond:'Overcast',hi:2,lo:-5,pct:35},
      {day:'Fri',icon:'⛅',cond:'Partly Cloudy',hi:3,lo:-4,pct:48},
      {day:'Sat',icon:'🌨️',cond:'Snow',hi:0,lo:-6,pct:22},
      {day:'Sun',icon:'❄️',cond:'Blizzard',hi:-2,lo:-9,pct:10},
    ]
  },
  'Miami': {
    temp:29,feels:34,condition:'Thunderstorm',icon:'⛈️',theme:'stormy',
    humidity:91,wind:35,uv:6,pressure:1001,visibility:4,dewpoint:26,
    high:31,low:24,sunrise:'07:00',sunset:'19:50',
    aqi:38,aqiStatus:'Good',aqiDesc:'Air quality is satisfactory.',
    pollutants:['PM2.5 ○','O₃ ○','NO₂ ○'],
    hourly:[
      {t:'Now',icon:'⛈️',temp:29},{t:'13h',icon:'🌩️',temp:28},{t:'14h',icon:'⛈️',temp:27},
      {t:'15h',icon:'🌩️',temp:26},{t:'16h',icon:'🌧️',temp:27},{t:'17h',icon:'🌦️',temp:28},
      {t:'18h',icon:'⛅',temp:27},{t:'19h',icon:'🌙',temp:26}
    ],
    weekly:[
      {day:'Today',icon:'⛈️',cond:'Thunderstorm',hi:31,lo:24,pct:20},
      {day:'Tue',icon:'🌧️',cond:'Heavy Rain',hi:29,lo:23,pct:25},
      {day:'Wed',icon:'🌦️',cond:'Scattered Storms',hi:30,lo:24,pct:35},
      {day:'Thu',icon:'⛅',cond:'Partly Cloudy',hi:31,lo:24,pct:55},
      {day:'Fri',icon:'🌤️',cond:'Mostly Sunny',hi:32,lo:25,pct:72},
      {day:'Sat',icon:'☀️',cond:'Sunny',hi:33,lo:25,pct:88},
      {day:'Sun',icon:'🌤️',cond:'Partly Cloudy',hi:32,lo:25,pct:70},
    ]
  },
  'Barcelona': {
    temp:26,feels:28,condition:'Golden Sunset',icon:'🌅',theme:'sunset',
    humidity:60,wind:15,uv:7,pressure:1016,visibility:20,dewpoint:17,
    high:28,low:19,sunrise:'07:10',sunset:'20:30',
    aqi:32,aqiStatus:'Good',aqiDesc:'Excellent air quality today.',
    pollutants:['PM2.5 ○','CO ○','NO₂ ○'],
    hourly:[
      {t:'Now',icon:'🌅',temp:26},{t:'13h',icon:'☀️',temp:27},{t:'14h',icon:'☀️',temp:28},
      {t:'15h',icon:'🌤️',temp:28},{t:'16h',icon:'🌤️',temp:27},{t:'17h',icon:'🌅',temp:26},
      {t:'18h',icon:'🌆',temp:24},{t:'19h',icon:'🌙',temp:22}
    ],
    weekly:[
      {day:'Today',icon:'🌅',cond:'Sunny',hi:28,lo:19,pct:85},
      {day:'Tue',icon:'☀️',cond:'Sunny',hi:29,lo:20,pct:90},
      {day:'Wed',icon:'🌤️',cond:'Mostly Sunny',hi:27,lo:19,pct:78},
      {day:'Thu',icon:'⛅',cond:'Partly Cloudy',hi:26,lo:18,pct:60},
      {day:'Fri',icon:'🌦️',cond:'PM Showers',hi:24,lo:17,pct:40},
      {day:'Sat',icon:'⛅',cond:'Cloudy',hi:23,lo:17,pct:45},
      {day:'Sun',icon:'☀️',cond:'Sunny',hi:27,lo:18,pct:80},
    ]
  },
};

// ══════════════════════════════════════
//  STATE
// ══════════════════════════════════════
let currentCity = 'Dubai';
let useCelsius = true;

function toF(c){return Math.round(c*9/5+32);}
function tempStr(c){return useCelsius?c+'°':toF(c)+'°';}

// ══════════════════════════════════════
//  RENDER
// ══════════════════════════════════════
function render(cityName){
  currentCity = cityName;
  const d = CITIES[cityName] || CITIES['Dubai'];
  document.getElementById('loadingWrap').style.display='none';
  const content = document.getElementById('content');
  content.style.display='block';

  // Apply theme
  document.body.className = 'theme-'+d.theme;

  // Particles
  setupParticles(d.theme);

  // Calc sun dot position
  const now = new Date();
  const mins = now.getHours()*60+now.getMinutes();
  const [srH,srM] = d.sunrise.split(':').map(Number);
  const [ssH,ssM] = d.sunset.split(':').map(Number);
  const srMins = srH*60+srM, ssMins = ssH*60+ssM;
  const dayProgress = Math.max(0,Math.min(1,(mins-srMins)/(ssMins-srMins)));
  const sunAngle = Math.PI - dayProgress*Math.PI; // 180° arc
  const sunX = 50+50*Math.cos(sunAngle);
  const sunY = 100-50*Math.sin(sunAngle);
  const isDaytime = mins>srMins && mins<ssMins;

  // Date
  const dayNames=['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  const monthNames=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  const today = new Date();
  const dateStr = `${dayNames[today.getDay()]}, ${monthNames[today.getMonth()]} ${today.getDate()}`;

  // Build weekly rows
  const weeklyHTML = d.weekly.map((w,i)=>`
    <div class="day-row fade-in stagger-${Math.min(i+1,5)}">
      <span class="day-name">${w.day}</span>
      <span class="day-icon">${w.icon}</span>
      <span class="day-cond">${w.cond}</span>
      <span class="day-temps">
        <span class="day-high">${tempStr(w.hi)}</span>
        <div class="temp-bar"><div class="temp-bar-fill" style="left:${w.lo/w.hi*100}%;width:${(1-w.lo/w.hi)*100}%"></div></div>
        <span class="day-low">${tempStr(w.lo)}</span>
      </span>
    </div>
  `).join('');

  // Build hourly
  const hourlyHTML = d.hourly.map((h,i)=>`
    <div class="hour-card ${i===0?'active':''}">
      <span class="hour-time">${h.t}</span>
      <span class="hour-icon">${h.icon}</span>
      <span class="hour-temp">${tempStr(h.temp)}</span>
    </div>
  `).join('');

  // AQI
  const aqiPills = d.pollutants.map(p=>`<span class="aqi-pill ${p.includes('●')?'mod':'good'}">${p}</span>`).join('');

  content.innerHTML = `
    <!-- SEARCH -->
    <div class="search-wrap">
      <div class="search-box">
        <span class="search-icon">🔍</span>
        <input class="search-input" id="searchInput" placeholder="Search city…" value="${cityName}"/>
        <button class="search-btn" onclick="doSearch()">Search</button>
      </div>
      <div class="city-chips">
        ${Object.keys(CITIES).map(c=>`<div class="chip" onclick="loadCity('${c}')">${c}</div>`).join('')}
      </div>
    </div>

    <!-- MAIN CARD -->
    <div class="main-card">
      <div class="location-row">
        <div class="location-name">📍 ${cityName}</div>
        <button onclick="toggleUnit()" style="background:var(--glass);border:1px solid var(--border);border-radius:8px;padding:5px 12px;color:var(--text2);font-family:'DM Mono',monospace;font-size:0.78rem;cursor:pointer;">°${useCelsius?'C':'F'}</button>
      </div>
      <div class="date-text">${dateStr} · ${isDaytime?'Daytime':'Nighttime'}</div>

      <div class="temp-hero">
        <div>
          <span class="temp-big">${tempStr(d.temp)}<span class="temp-unit"></span></span>
          <div class="feels-row">Feels like <span class="feels-accent">${tempStr(d.feels)}</span> &nbsp;·&nbsp; H: ${tempStr(d.high)} &nbsp; L: ${tempStr(d.low)}</div>
        </div>
        <div class="weather-icon-wrap">
          <div class="weather-icon">${d.icon}</div>
          <div class="condition-text">${d.condition}</div>
        </div>
      </div>

      <div class="mini-stats">
        <div class="mini-stat fade-in stagger-1">
          <div class="ms-icon">💧</div>
          <div class="ms-val">${d.humidity}%</div>
          <div class="ms-key">Humidity</div>
        </div>
        <div class="mini-stat fade-in stagger-2">
          <div class="ms-icon">💨</div>
          <div class="ms-val">${d.wind}<span style="font-size:0.65rem">km/h</span></div>
          <div class="ms-key">Wind</div>
        </div>
        <div class="mini-stat fade-in stagger-3">
          <div class="ms-icon">👁️</div>
          <div class="ms-val">${d.visibility}<span style="font-size:0.65rem">km</span></div>
          <div class="ms-key">Visibility</div>
        </div>
        <div class="mini-stat fade-in stagger-4">
          <div class="ms-icon">🌡️</div>
          <div class="ms-val">${d.dewpoint}°</div>
          <div class="ms-key">Dew Pt</div>
        </div>
      </div>
    </div>

    <!-- HOURLY -->
    <div class="section-card fade-in stagger-1">
      <div class="section-title">Hourly Forecast</div>
      <div class="hourly-scroll">${hourlyHTML}</div>
    </div>

    <!-- WEEKLY -->
    <div class="section-card fade-in stagger-2">
      <div class="section-title">7-Day Forecast</div>
      ${weeklyHTML}
    </div>

    <!-- DETAILS GRID -->
    <div class="details-grid" style="margin-bottom:14px;">
      <div class="detail-tile fade-in stagger-1">
        <div class="dt-icon">☀️</div>
        <div class="dt-label">UV Index</div>
        <div class="dt-val">${d.uv}</div>
        <div class="dt-sub">${d.uv<=2?'Low':d.uv<=5?'Moderate':d.uv<=7?'High':d.uv<=10?'Very High':'Extreme'}</div>
        <div class="uv-bar"><div class="uv-bar-fill" style="width:${Math.min(d.uv/12*100,100)}%"></div></div>
      </div>
      <div class="detail-tile fade-in stagger-2">
        <div class="dt-icon">🌡️</div>
        <div class="dt-label">Pressure</div>
        <div class="dt-val">${d.pressure}</div>
        <div class="dt-sub">hPa · ${d.pressure>=1013?'High':'Low'} pressure</div>
      </div>
    </div>

    <!-- AIR QUALITY -->
    <div class="section-card fade-in stagger-3">
      <div class="section-title">Air Quality</div>
      <div class="aqi-row">
        <div class="aqi-circle">
          <div class="aqi-num">${d.aqi}</div>
          <div class="aqi-label">AQI</div>
        </div>
        <div class="aqi-info">
          <div class="aqi-status">${d.aqiStatus}</div>
          <div class="aqi-desc">${d.aqiDesc}</div>
          <div class="aqi-pills">${aqiPills}</div>
        </div>
      </div>
    </div>

    <!-- SUN TIMES -->
    <div class="section-card fade-in stagger-4">
      <div class="section-title">Sun Cycle</div>
      <div class="sun-card" style="padding:16px 0;">
        <div class="sun-point">
          <span class="sun-emoji">🌅</span>
          <div class="sun-label">Sunrise</div>
          <div class="sun-time">${d.sunrise} AM</div>
        </div>
        <div style="position:relative;width:120px;height:60px;flex-shrink:0;">
          <div class="sun-arc"></div>
          <div class="sun-dot" style="left:${sunX}%;top:${sunY}%;"></div>
        </div>
        <div class="sun-point">
          <span class="sun-emoji">🌇</span>
          <div class="sun-label">Sunset</div>
          <div class="sun-time">${d.sunset} PM</div>
        </div>
      </div>
    </div>
  `;

  // Bind search enter
  document.getElementById('searchInput').addEventListener('keydown',e=>{
    if(e.key==='Enter') doSearch();
  });
}

function doSearch(){
  const val = document.getElementById('searchInput').value.trim();
  const match = Object.keys(CITIES).find(c=>c.toLowerCase().includes(val.toLowerCase()));
  if(match) loadCity(match);
  else alert('City not found. Try: '+Object.keys(CITIES).join(', '));
}

function loadCity(name){
  document.getElementById('content').innerHTML='';
  document.getElementById('loadingWrap').style.display='flex';
  document.getElementById('loadingWrap').style.flexDirection='flex';
  setTimeout(()=>render(name),400);
}

function toggleUnit(){
  useCelsius=!useCelsius;
  render(currentCity);
}

// ══════════════════════════════════════
//  PARTICLES
// ══════════════════════════════════════
function setupParticles(theme){
  const layer=document.getElementById('particleLayer');
  layer.innerHTML='';

  if(theme==='rainy'||theme==='stormy'){
    for(let i=0;i<40;i++){
      const el=document.createElement('div');
      el.className='rain-drop';
      const h=30+Math.random()*50;
      el.style.cssText=`
        left:${Math.random()*110-5}%;
        height:${h}px;
        top:${-h}px;
        opacity:${0.3+Math.random()*0.4};
        animation-duration:${0.5+Math.random()*0.5}s;
        animation-delay:${Math.random()*2}s;
      `;
      layer.appendChild(el);
    }
  } else if(theme==='snowy'){
    for(let i=0;i<35;i++){
      const el=document.createElement('div');
      el.className='snow-flake';
      const s=2+Math.random()*5;
      el.style.cssText=`
        left:${Math.random()*105}%;
        width:${s}px;height:${s}px;
        opacity:${0.4+Math.random()*0.5};
        animation-duration:${3+Math.random()*4}s;
        animation-delay:${Math.random()*5}s;
      `;
      layer.appendChild(el);
    }
  } else if(theme==='cloudy'){
    for(let i=0;i<5;i++){
      const el=document.createElement('div');
      el.className='cloud-puff';
      const s=100+Math.random()*150;
      el.style.cssText=`
        top:${Math.random()*30}%;
        width:${s}px;height:${s*0.6}px;
        opacity:${0.2+Math.random()*0.3};
        animation-duration:${30+Math.random()*40}s;
        animation-delay:${-Math.random()*40}s;
      `;
      layer.appendChild(el);
    }
  }
}

// ══════════════════════════════════════
//  INIT
// ══════════════════════════════════════
setTimeout(()=>render('Dubai'),600);