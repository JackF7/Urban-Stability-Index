// Urban Stability Index — Shared Model & App Logic
// Fordham University · Spring 2026 · Jack Forester
// Shared by index.html (EN) and index-es.html (ES)

// ═══════════════════════════════════════════════════
// MODEL CORE
// ═══════════════════════════════════════════════════
const BASE={pop:8204035,lf:4063000,units:3706562,Pi:3093845,Pn:5164190,H0:(3093845+5164190)/3706562,natInc:34627,domOut:-91239,newUnits:20000,lfp_intl:.70,lfp_avg:.64};
let W={p:.53,l:.30,h:.17};
const SCALE=10;
const SC={
  high:   {mi:200000,label:'High Immigration',      labelES:'Alta inmigración',   color:'#3ecf8e'},
  pre2025:{mi:144098,label:'Pre-2025 Trend',         labelES:'Tendencia pre-2025', color:'#e8c547'},
  current:{mi:66000, label:'Current Policy',         labelES:'Política actual',    color:'#f5a623'},
  restrict:{mi:20000,label:'Sustained Restriction',  labelES:'Restricción sost.',  color:'#f16060'}
};
let P={mi:66000,dom:-91239,units:20000};
let activeSC='current';

// City-level 10-year projection (correct formula)
function project(mi,dom,newU,yrs=10){
  let pop=BASE.pop,lf=BASE.lf,u=BASE.units;
  for(let y=0;y<yrs;y++){pop+=BASE.natInc+mi+dom;lf+=(mi*BASE.lfp_intl)+(dom*BASE.lfp_avg);u+=newU;}
  const Sp=(pop-BASE.pop)/BASE.pop,Sl=(lf-BASE.lf)/BASE.lf;
  const Htf=pop/u,Sh=(Htf-BASE.H0)/BASE.H0;
  return{pop,lf,Htf,Sp,Sl,Sh,usi:SCALE*(W.p*Sp+W.l*Sl-W.h*Sh)};
}
function projectSeries(mi,dom,newU,yrs=10){
  let pop=BASE.pop,lf=BASE.lf;
  const pops=[pop],lfs=[lf];
  for(let y=0;y<yrs;y++){pop+=BASE.natInc+mi+dom;lf+=(mi*BASE.lfp_intl)+(dom*BASE.lfp_avg);pops.push(Math.round(pop));lfs.push(Math.round(lf));}
  return{pops,lfs};
}

// calcDistrictUSI defined after CD data below

// ── COLORS ──────────────────────────────────────────────────────
function fmtUSI(v){const s=v.toFixed(2);return lang==='es'?s.replace('.',','):s;}
function fmtPct(v){const s=v.toFixed(1);return lang==='es'?s.replace('.',','):s;}
function fmtDec(v){const s=(+v).toFixed(2);return lang==='es'?s.replace('.',','):s;}
function usiColor(v){if(v>=0.8)return'#2d8653';if(v>=0.4)return'#9acd32';if(v>=0)return'#e67e22';if(v>=-0.4)return'#e74c3c';return'#8b0000';}
function usiLabel(v,es=false){
  if(es){
    if(v>=0.8)return'Crecimiento demográfico fuerte';
    if(v>=0.4)return'Crecimiento saludable';
    if(v>=0)return'Estabilidad marginal — cerca del umbral';
    if(v>=-0.4)return'Declive demográfico en curso';
    return'Declive severo — contracción estructural';
  }
  if(v>=0.8)return'Strong demographic growth — city expanding rapidly';
  if(v>=0.4)return'Healthy growth — robust population and labor expansion';
  if(v>=0)return'Marginal stability — at or near the break-even threshold';
  if(v>=-0.4)return'Demographic decline — population and labor force contracting';
  return'Severe decline — structural demographic contraction underway';
}

// ═══════════════════════════════════════════════════
// CONTENT DEFINITIONS (EN + ES)
// ═══════════════════════════════════════════════════
const PAGES={
  en:[
    {id:'home',     label:'Home',                  icon:'home'},
    {id:'argument', label:'The Argument',           icon:'info',  badge:'Key'},
    {id:'model',    label:'USI Formula',            icon:'wave',  group:'The Model'},
    {id:'scenarios',label:'Scenarios',              icon:'bars'},
    {id:'explorer', label:'Explorer',               icon:'search',badge:'Live'},
    {id:'map',      label:'Map & Projections',      icon:'map',   group:'Geography'},
    {id:'history',  label:'Historical Validation',  icon:'clock', group:'Context'},
    {id:'about',    label:'About',                  icon:'users'},
    {id:'links',    label:'Helpful Links',           icon:'link',  group:'More'},
  ],
  es:[
    {id:'home',     label:'Inicio',                icon:'home'},
    {id:'argument', label:'El argumento',           icon:'info',  badge:'Clave'},
    {id:'model',    label:'Fórmula IEU',            icon:'wave',  group:'El modelo'},
    {id:'scenarios',label:'Escenarios',             icon:'bars'},
    {id:'explorer', label:'Explorador',             icon:'search',badge:'Live'},
    {id:'map',      label:'Mapa y proyecciones',    icon:'map',   group:'Geografía'},
    {id:'history',  label:'Validación histórica',   icon:'clock', group:'Contexto'},
    {id:'about',    label:'Acerca de',              icon:'users'},
    {id:'links',    label:'Recursos útiles',         icon:'link',  group:'Más'},
  ]
};

const ICONS={
  home:`<path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>`,
  info:`<circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>`,
  wave:`<polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>`,
  bars:`<line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>`,
  search:`<circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>`,
  map:`<polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"/><line x1="8" y1="2" x2="8" y2="18"/><line x1="16" y1="6" x2="16" y2="22"/>`,
  clock:`<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>`,
  users:`<path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/>`
};

// ═══════════════════════════════════════════════════
// SPA ROUTER
// ═══════════════════════════════════════════════════
// lang is set by each HTML file via window.SITE_LANG before this script runs
let lang = (typeof window.SITE_LANG !== 'undefined') ? window.SITE_LANG : 'en';
let curPage='home';
let mapInited=false, mapObj=null, geoLayer=null, cachedGeo=null;

function linkIcon(){return`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>`;}
function buildNav(){
  const nav=document.getElementById('sb-nav');
  nav.innerHTML='';
  let lastGroup='';
  PAGES[lang].forEach(p=>{
    if(p.group && p.group!==lastGroup){
      lastGroup=p.group;
      const g=document.createElement('div');g.className='nav-group';g.textContent=p.group;nav.appendChild(g);
    }
    const b=document.createElement('button');
    b.className='ni'+(p.id===curPage?' active':'');
    b.dataset.page=p.id;
    b.onclick=()=>goPage(p.id);
    b.innerHTML=`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">${ICONS[p.icon]||''}</svg>${p.label}${p.badge?`<span class="ni-badge">${p.badge}</span>`:''}`;
    nav.appendChild(b);
  });
}

function buildPages(){
  const main=document.getElementById('main');
  main.innerHTML='';
  // buildPagesEN() or buildPagesES() is defined in the language-specific pages file
  const pages = (lang==='en') ? buildPagesEN() : buildPagesES();
  pages.forEach(html=>{main.insertAdjacentHTML('beforeend',html);});
}

function goPage(id){
  if(id===curPage)return;
  const prev=document.getElementById('pg-'+curPage);
  if(prev)prev.classList.add('exit');
  setTimeout(()=>{if(prev){prev.classList.remove('active','exit');}},300);
  const next=document.getElementById('pg-'+id);
  if(next)setTimeout(()=>{next.classList.add('active');next.scrollTop=0;},40);
  document.querySelectorAll('.ni').forEach(b=>b.classList.toggle('active',b.dataset.page===id));
  curPage=id;
  document.getElementById('sidebar').classList.remove('open');
  if(id==='map'&&!mapInited)setTimeout(initMap,150);
  if(id==='map'&&mapObj)setTimeout(()=>mapObj.invalidateSize(),200);
  if((id==='model'||id==='history')&&typeof renderMathInElement!=='undefined'){
    setTimeout(()=>renderMathInElement(document.getElementById('pg-'+id),{delimiters:[{left:'$$',right:'$$',display:true},{left:'\\(',right:'\\)',display:false}],throwOnError:false}),200);
  }

  // Init page-specific components
  if(id==='map'){
    setTimeout(()=>{renderBoroMini();renderMapCompCards();initMapCharts();updateMapMeter();},120);
  }
  if(id==='scenarios'){
    setTimeout(()=>{initCharts();renderCompCards(activeSC);},120);
  }
}

function setLang(l){
  const path = window.location.pathname;
  if(l==='es' && !path.includes('index-es')){
    window.location.href = path.replace(/index\.html$/, 'index-es.html').replace(/\/$/, '/index-es.html');
  } else if(l==='en' && path.includes('index-es')){
    window.location.href = path.replace('index-es.html', 'index.html');
  }
}
function set(id,v){const e=document.getElementById(id);if(e)e.textContent=v;}

// ═══════════════════════════════════════════════════
// METER
// ═══════════════════════════════════════════════════
const BEVEN=56612,MAXMI=250000;
function updateMeter(mi,fillId,threshId,statusId){
  const belowEl=document.getElementById(fillId+'_below'),aboveEl=document.getElementById(fillId+'_above'),dotEl=document.getElementById(fillId+'_dot'),status=document.getElementById(statusId);
  if(!belowEl)return;
  const pct=Math.min(100,mi/MAXMI*100);
  const tPct=BEVEN/MAXMI*100;
  const above=mi-BEVEN;
  const isES=lang==='es';
  // Below portion always fills up to threshold or current, whichever is less
  belowEl.style.width=Math.min(pct,tPct)+'%';
  // Above portion only if mi > BEVEN
  if(aboveEl){
    if(mi>BEVEN){aboveEl.style.width=(pct-tPct)+'%';aboveEl.style.left=tPct+'%';aboveEl.style.display='block';}
    else{aboveEl.style.display='none';}
  }
  // Dot position
  if(dotEl){dotEl.style.left=pct+'%';}
  if(mi>=BEVEN){
    if(status){
      const col=above>50000?'var(--green)':'var(--orange)';
      const bg=above>50000?'rgba(106,191,122,.08)':'rgba(201,168,76,.08)';
      status.style.background=bg;status.style.color=col;status.style.borderLeftColor=col;
      status.innerHTML=isES
        ?`${mi.toLocaleString()} <span style="opacity:.6">(2025)</span> llegadas/año`
        :`${mi.toLocaleString()} <span style="opacity:.6">(2025)</span> arrivals/yr`;
    }
  } else {
    if(status){
      status.style.background='rgba(212,112,106,.08)';status.style.color='var(--red)';status.style.borderLeftColor='var(--red)';
      status.innerHTML=isES
        ?`${mi.toLocaleString()} llegadas/año`
        :`${mi.toLocaleString()} arrivals/yr`;
    }
  }
}

// ═══════════════════════════════════════════════════
// LIVE USI UPDATE
// ═══════════════════════════════════════════════════
function updateLiveUSI(){
  const r=project(P.mi,P.dom,P.units);
  const sign=r.usi>=0?'+':'';
  ['liveUSI','fpUSI'].forEach(id=>{const e=document.getElementById(id);if(e){e.textContent=sign+fmtUSI(r.usi);e.style.color=usiColor(r.usi);}});
  const dl=document.getElementById('liveDesc');if(dl)dl.textContent=usiLabel(r.usi,lang==='es');
  // Interp
  const pd=Math.round(r.pop-BASE.pop),ld=Math.round(r.lf-BASE.lf);
  const fmt=n=>(n>=0?'+':'')+Math.abs(n).toLocaleString();
  const isES=lang==='es';
  const pe=document.getElementById('ip-pop'),le=document.getElementById('ip-lf'),he=document.getElementById('ip-h');
  const ps=document.getElementById('ip-pop-sub'),ls=document.getElementById('ip-lf-sub');
  if(pe){pe.textContent=fmt(pd);pe.className='icard-val '+(pd>=0?'pos':'neg');}
  if(le){le.textContent=fmt(ld);le.className='icard-val '+(ld>=0?'pos':'neg');}
  if(he){he.textContent=(r.Sh>=0?'+':'')+fmtPct(r.Sh*100)+'%';he.className='icard-val '+(r.Sh>0?'neg':'pos');}
  if(ps)ps.textContent=pd>=0?(isES?'residentes ganados en 2034':'residents gained by 2034'):(isES?'residentes perdidos en 2034':'residents lost by 2034');
  if(ls)ls.textContent=ld>=0?(isES?'trabajadores ganados en 2034':'workers gained by 2034'):(isES?'trabajadores perdidos en 2034':'workers lost by 2034');
  // Home stat
  const hs=document.getElementById('home-usi');if(hs){hs.textContent=sign+fmtUSI(r.usi);hs.style.color=usiColor(r.usi);}
  updateMeter(P.mi,'mFill','mThresh','mStatus');
  updateMeter(P.mi,'hMFill','hMThresh','hMStatus');
  if(mapInited&&geoLayer&&mapObj)buildLayer(cachedGeo);
  renderBoroMini();
}

// ═══════════════════════════════════════════════════
// COMP CARDS
// ═══════════════════════════════════════════════════
function renderCompCards(ak){
  const g=document.getElementById('compGrid');if(!g)return;
  g.innerHTML='';
  Object.entries(SC).forEach(([k,sc])=>{
    const r=project(sc.mi,BASE.domOut,BASE.newUnits);
    const sign=r.usi>=0?'+':'',cls=r.usi>0?'pos':r.usi<0?'neg':'neu';
    const c=document.createElement('div');c.className='cc'+(k===ak?' sel':'');
    c.innerHTML=`<div class="cc-name">${lang==='es'?sc.labelES:sc.label}</div><div style="font-size:9px;font-family:'DM Mono',monospace;color:var(--text3);text-transform:uppercase;letter-spacing:.08em;margin-bottom:4px">${lang==='es'?'Proyección 10 años':'10-yr projection'}</div>
      <div class="cc-usi ${cls}" style="color:${usiColor(r.usi)}">${sign}${fmtUSI(r.usi)}</div>
      <div class="cc-mi">${(sc.mi/1000).toFixed(0)}k ${lang==='es'?'llegadas/año':'arrivals/yr'}</div>
      <div class="cc-detail">2034 pop: ${(r.pop/1e6).toFixed(2)}M<br>2034 LF: ${(r.lf/1e6).toFixed(2)}M</div>`;
    g.appendChild(c);
  });
}

function loadSc(key){
  activeSC=key;
  P.mi=SC[key].mi;
  document.querySelectorAll('.pill').forEach(b=>b.classList.toggle('active',b.dataset.sc===key));
  document.querySelectorAll('.fp-sb').forEach(b=>b.classList.toggle('active',b.dataset.sc===key));
  ['s-mi','fp-s-mi'].forEach(id=>{const e=document.getElementById(id);if(e)e.value=SC[key].mi;});
  ['v-mi','fp-v-mi'].forEach(id=>{const e=document.getElementById(id);if(e)e.textContent=SC[key].mi.toLocaleString();});
  updateLiveUSI();renderCompCards(key);
}

function filterScen(key,btn){
  document.querySelectorAll('.tb').forEach(b=>b.classList.remove('active'));btn.classList.add('active');
  ['high','pre2025','current','restrict'].forEach(c=>{const show=(key==='all'||key===c);document.querySelectorAll('.col-'+c).forEach(el=>el.style.display=show?'':'none');});
}

// ═══════════════════════════════════════════════════
// BOROUGH MINI CARDS (map right panel)
// ═══════════════════════════════════════════════════
const BOROUGH_MAP={
  Manhattan:[101,102,103,104,105,106,107,108,109,110,111,112],
  Bronx:[201,202,203,204,205,206,207,208,209,210,211,212],
  Brooklyn:[301,302,303,304,305,306,307,308,309,310,311,312,313,314,315,316,317,318],
  Queens:[401,402,403,404,405,406,407,408,409,410,411,412,413,414],
  'Staten Island':[501,502,503]
};
const BOROUGH_NAMES_ES={Manhattan:'Manhattan',Bronx:'El Bronx',Brooklyn:'Brooklyn',Queens:'Queens','Staten Island':'Staten Island'};

function calcBoroUSI(name){
  const codes=BOROUGH_MAP[name];
  const agg=codes.reduce((a,c)=>{const d=CD[c];if(!d)return a;a.pop+=d.pop;a.fb+=d.fb;a.units+=d.units;return a;},{pop:0,fb:0,units:0});
  return{...agg,usi:calcDistrictUSI(agg)};
}

function renderBoroMini(){
  const g=document.getElementById('boroMini');if(!g)return;
  const isES=lang==='es';
  const results=Object.keys(BOROUGH_MAP).map(name=>{const b=calcBoroUSI(name);return{name,usi:b.usi,fb:b.fb,pop:b.pop};}).sort((a,b)=>b.usi-a.usi);
  const maxUSI=Math.max(...results.map(r=>Math.abs(r.usi)));
  g.innerHTML='';
  results.forEach(b=>{
    const sign=b.usi>=0?'+':'',cls=b.usi>0?'pos':b.usi<0?'neg':'neu';
    const barPct=Math.min(100,((b.usi+0.5)/1.5)*100);
    const displayName=isES?(BOROUGH_NAMES_ES[b.name]||b.name):b.name;
    const d=document.createElement('div');d.className='boro-mini';
    d.innerHTML=`<div class="boro-mini-name">${displayName}</div>
      <div class="boro-mini-row">
        <div class="boro-mini-usi ${cls}" style="color:${usiColor(b.usi)}">${sign}${fmtUSI(b.usi)}</div>
        <div class="boro-mini-bar"><div class="boro-mini-fill" style="width:${Math.max(0,barPct)}%;background:${usiColor(b.usi)}"></div></div>
        <div class="boro-mini-fb">${(b.fb/b.pop*100).toFixed(0)}% ${isES?'ext.':'fb'}</div>
      </div>`;
    g.appendChild(d);
  });
}

// ═══════════════════════════════════════════════════
// CHARTS
// ═══════════════════════════════════════════════════
const YEARS=Array.from({length:11},(_,i)=>2023+i);
const GRID='rgba(255,255,255,0.04)',TICK='#4a4a58';
const CF={family:"'Inter',sans-serif",size:10};
let popChart,usiChart,lfChart;

function initCharts(){
  const popEl=document.getElementById('popChart'),usiEl=document.getElementById('usiChart'),lfEl=document.getElementById('lfChart');
  if(!popEl)return;
  popChart=new Chart(popEl,{type:'line',data:{labels:YEARS,datasets:Object.entries(SC).map(([k,sc])=>({label:lang==='es'?sc.labelES:sc.label,data:projectSeries(sc.mi,BASE.domOut,BASE.newUnits).pops,borderColor:sc.color,backgroundColor:'transparent',borderWidth:2,pointRadius:0,tension:.3}))},options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{labels:{color:TICK,font:CF}}},scales:{x:{grid:{color:GRID},ticks:{color:TICK,font:CF}},y:{grid:{color:GRID},ticks:{color:TICK,font:CF,callback:v=>(v/1e6).toFixed(1)+'M'}}}}});
  usiChart=new Chart(usiEl,{type:'bar',data:{labels:Object.values(SC).map(sc=>lang==='es'?sc.labelES:sc.label),datasets:[{data:Object.keys(SC).map(k=>+project(SC[k].mi,BASE.domOut,BASE.newUnits).usi.toFixed(2)),backgroundColor:Object.values(SC).map(sc=>sc.color+'44'),borderColor:Object.values(SC).map(sc=>sc.color),borderWidth:1}]},options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false}},scales:{x:{grid:{color:GRID},ticks:{color:TICK,font:CF}},y:{grid:{color:GRID},ticks:{color:TICK,font:CF},min:-0.6,max:1.5}}}});
  lfChart=new Chart(lfEl,{type:'line',data:{labels:YEARS,datasets:Object.entries(SC).map(([k,sc])=>({label:lang==='es'?sc.labelES:sc.label,data:projectSeries(sc.mi,BASE.domOut,BASE.newUnits).lfs,borderColor:sc.color,backgroundColor:'transparent',borderWidth:2,pointRadius:0,tension:.3}))},options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{labels:{color:TICK,font:CF}}},scales:{x:{grid:{color:GRID},ticks:{color:TICK,font:CF}},y:{grid:{color:GRID},ticks:{color:TICK,font:CF,callback:v=>(v/1e6).toFixed(2)+'M'}}}}});
}

// ═══════════════════════════════════════════════════
// SLIDERS
// ═══════════════════════════════════════════════════
function bindSliders(){
  [['s-mi','v-mi','fp-s-mi','fp-v-mi',v=>Math.round(v).toLocaleString(),v=>{P.mi=+v;}],
   ['s-dom','v-dom','fp-s-dom','fp-v-dom',v=>(+v).toLocaleString(),v=>{P.dom=+v;}],
   ['s-units','v-units','fp-s-units','fp-v-units',v=>(+v).toLocaleString(),v=>{P.units=+v;}],
   ['s-wp','v-wp','fp-s-wp','fp-v-wp',v=>fmtDec(+v),v=>{W.p=+v;}],
   ['s-wl','v-wl','fp-s-wl','fp-v-wl',v=>fmtDec(+v),v=>{W.l=+v;}],
   ['s-wh','v-wh','fp-s-wh','fp-v-wh',v=>fmtDec(+v),v=>{W.h=+v;}],
  ].forEach(([mId,mVId,fId,fVId,fmt,setter])=>{
    const m=document.getElementById(mId),f=document.getElementById(fId);
    function sync(val){setter(val);[mId,fId].forEach(id=>{const e=document.getElementById(id);if(e)e.value=val;});[mVId,fVId].forEach(id=>{const e=document.getElementById(id);if(e)e.textContent=fmt(val);});updateLiveUSI();}
    if(m)m.addEventListener('input',e=>sync(e.target.value));
    if(f)f.addEventListener('input',e=>sync(e.target.value));
  });
}

// ═══════════════════════════════════════════════════
// FLOAT PANEL
// ═══════════════════════════════════════════════════
let fpOpen=false;
function toggleFP(){fpOpen=!fpOpen;document.getElementById('floatPanel').classList.toggle('open',fpOpen);document.getElementById('floatBtn').classList.toggle('open',fpOpen);}
document.addEventListener('click',e=>{if(fpOpen&&!document.getElementById('floatPanel').contains(e.target)&&!document.getElementById('floatBtn').contains(e.target)){fpOpen=false;document.getElementById('floatPanel').classList.remove('open');document.getElementById('floatBtn').classList.remove('open');}});

const DEFAULTS={mi:66000,dom:-91239,units:20000,wp:0.53,wl:0.30,wh:0.17};
function resetControls(){
  P.mi=DEFAULTS.mi; P.dom=DEFAULTS.dom; P.units=DEFAULTS.units;
  W.p=DEFAULTS.wp; W.l=DEFAULTS.wl; W.h=DEFAULTS.wh;
  activeSC='current';
  const fields=[
    ['s-mi','fp-s-mi','v-mi','fp-v-mi', DEFAULTS.mi, v=>Math.round(v).toLocaleString()],
    ['s-dom','fp-s-dom','v-dom','fp-v-dom', DEFAULTS.dom, v=>(+v).toLocaleString()],
    ['s-units','fp-s-units','v-units','fp-v-units', DEFAULTS.units, v=>(+v).toLocaleString()],
    ['s-wp','fp-s-wp','v-wp','fp-v-wp', DEFAULTS.wp, v=>fmtDec(+v)],
    ['s-wl','fp-s-wl','v-wl','fp-v-wl', DEFAULTS.wl, v=>fmtDec(+v)],
    ['s-wh','fp-s-wh','v-wh','fp-v-wh', DEFAULTS.wh, v=>fmtDec(+v)],
  ];
  fields.forEach(([sId,fpSId,vId,fpVId,val,fmt])=>{
    [sId,fpSId].forEach(id=>{const e=document.getElementById(id);if(e)e.value=val;});
    [vId,fpVId].forEach(id=>{const e=document.getElementById(id);if(e)e.textContent=fmt(val);});
  });
  document.querySelectorAll('.fp-sb,.pill').forEach(b=>b.classList.toggle('active',b.dataset.sc==='current'));
  updateLiveUSI();
  renderCompCards('current');
}

// ═══════════════════════════════════════════════════
// MAP
// ═══════════════════════════════════════════════════
const BOROCD_KEY=p=>p.BoroCD??p.borocd??p.BOROCD??p.boro_cd??null;
function initMap(){
  if(mapInited)return;mapInited=true;
  mapObj=L.map('map',{center:[40.7128,-74.006],zoom:10,minZoom:9,maxZoom:13});
  L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',{attribution:'&copy; OpenStreetMap &copy; CARTO',subdomains:'abcd',maxZoom:20}).addTo(mapObj);
  const urls=['https://raw.githubusercontent.com/dwillis/nyc-maps/master/community_districts.geojson','https://data.cityofnewyork.us/api/geospatial/jp9i-3b7y?method=export&type=GeoJSON'];
  function tryFetch(i){if(i>=urls.length)return;fetch(urls[i]).then(r=>{if(!r.ok)throw 0;return r.json();}).then(g=>{cachedGeo=g;buildLayer(g);}).catch(()=>tryFetch(i+1));}
  tryFetch(0);
}
function buildLayer(geo){
  if(!mapObj||!geo)return;
  if(geoLayer)mapObj.removeLayer(geoLayer);
  const isES=lang==='es';
  geoLayer=L.geoJSON(geo,{
    style:feat=>{const bc=BOROCD_KEY(feat.properties);if(!bc)return{fillColor:'#1a1a2e',weight:1,opacity:.3,color:'#333',fillOpacity:.3};const d=CD[parseInt(bc)];return{fillColor:d?usiColor(calcDistrictUSI(d)):'#333',weight:1,opacity:1,color:'rgba(255,255,255,.08)',fillOpacity:.75};},
    onEachFeature:(feat,layer)=>{
      const bc=BOROCD_KEY(feat.properties);if(!bc)return;
      const cd=parseInt(bc),d=CD[cd];if(!d)return;
      const usi=calcDistrictUSI(d),sign=usi>=0?'+':'';
      layer.bindPopup(`<div class="pop-title">${d.name}</div><div class="pop-usi" style="background:${usiColor(usi)};color:#fff">${sign}${usi.toFixed(2)}</div><div class="pop-row"><span class="pop-label">${isES?'Población':'Population'}</span><span class="pop-val">${d.pop.toLocaleString()}</span></div><div class="pop-row"><span class="pop-label">${isES?'Nac. extranjero':'Foreign-Born'}</span><span class="pop-val">${(d.fb/d.pop*100).toFixed(1)}%</span></div><div class="pop-row"><span class="pop-label">${isES?'Personas/unidad':'People/Unit'}</span><span class="pop-val">${(d.pop/d.units).toFixed(2)}</span></div>`);
      layer.on('mouseover',()=>layer.setStyle({weight:2,color:'rgba(232,197,71,.5)',fillOpacity:.9}));
      layer.on('mouseout',()=>geoLayer.resetStyle(layer));
    }
  }).addTo(mapObj);
}

// ═══════════════════════════════════════════════════
// PAGE HTML BUILDERS
// ═══════════════════════════════════════════════════
function mkPage(id,active,html){return`<div class="page${active?' active':''}" id="pg-${id}">${html}</div>`;}
function scLabel(k){return lang==='es'?SC[k].labelES:SC[k].label;}
function pill(k,active){return`<button class="pill${active?' active':''}" data-sc="${k}" onclick="loadSc('${k}')">${scLabel(k)} — ${(SC[k].mi/1000).toFixed(0)}k/${lang==='es'?'año':'yr'}</button>`;}

// ═══════════════════════════════════════════════════
// CD DATA
// ═══════════════════════════════════════════════════
const CD={
  101:{name:'MN 1 – Financial District',pop:60421,fb:13800,units:33200},
  102:{name:'MN 2 – Greenwich Village/SoHo',pop:79041,fb:11900,units:42800},
  103:{name:'MN 3 – Lower East Side/Chinatown',pop:167985,fb:66200,units:64900},
  104:{name:'MN 4 – Clinton/Chelsea',pop:96340,fb:21700,units:52500},
  105:{name:'MN 5 – Midtown',pop:80400,fb:22800,units:52100},
  106:{name:'MN 6 – Stuyvesant Town/Turtle Bay',pop:108220,fb:22900,units:54800},
  107:{name:'MN 7 – Upper West Side',pop:109984,fb:18000,units:57100},
  108:{name:'MN 8 – Upper East Side',pop:115301,fb:20300,units:60400},
  109:{name:'MN 9 – Morningside Hts/Hamilton Hts',pop:109931,fb:36200,units:42300},
  110:{name:'MN 10 – Central Harlem',pop:116516,fb:23300,units:49800},
  111:{name:'MN 11 – East Harlem',pop:121589,fb:35400,units:48600},
  112:{name:'MN 12 – Washington Heights/Inwood',pop:209531,fb:82200,units:77400},
  201:{name:'BX 1 – Mott Haven/Melrose',pop:104787,fb:41000,units:35900},
  202:{name:'BX 2 – Hunts Point/Longwood',pop:69971,fb:25500,units:22400},
  203:{name:'BX 3 – Morrisania/Crotona',pop:106688,fb:34900,units:34500},
  204:{name:'BX 4 – Concourse/Highbridge',pop:133950,fb:54800,units:45900},
  205:{name:'BX 5 – University Hts/Fordham',pop:128913,fb:57600,units:41800},
  206:{name:'BX 6 – East Tremont/Belmont',pop:103758,fb:45900,units:33700},
  207:{name:'BX 7 – Kingsbridge/Riverdale',pop:119849,fb:46800,units:47700},
  208:{name:'BX 8 – Riverdale/Fieldston',pop:107472,fb:28600,units:44200},
  209:{name:'BX 9 – Parkchester/Soundview',pop:132899,fb:55400,units:46000},
  210:{name:'BX 10 – Throgs Neck/Co-op City',pop:119592,fb:32700,units:43900},
  211:{name:'BX 11 – Morris Park/Bronxdale',pop:118494,fb:45700,units:41000},
  212:{name:'BX 12 – Williamsbridge/Wakefield',pop:133868,fb:59500,units:47400},
  301:{name:'BK 1 – Williamsburg/Greenpoint',pop:168755,fb:50700,units:72200},
  302:{name:'BK 2 – Brooklyn Heights/Fort Greene',pop:104699,fb:17900,units:46000},
  303:{name:'BK 3 – Bedford Stuyvesant',pop:152670,fb:28100,units:53800},
  304:{name:'BK 4 – Bushwick',pop:120568,fb:48600,units:41300},
  305:{name:'BK 5 – East New York/Starrett City',pop:170519,fb:58800,units:55400},
  306:{name:'BK 6 – Park Slope/Carroll Gardens',pop:109513,fb:17700,units:47700},
  307:{name:'BK 7 – Sunset Park',pop:126106,fb:65800,units:44200},
  308:{name:'BK 8 – Crown Heights/Prospect Hts',pop:128052,fb:38700,units:48500},
  309:{name:'BK 9 – Crown Heights South',pop:105374,fb:41200,units:38800},
  310:{name:'BK 10 – Bay Ridge/Dyker Heights',pop:110726,fb:39800,units:43100},
  311:{name:'BK 11 – Bensonhurst/Bath Beach',pop:160143,fb:76200,units:62900},
  312:{name:'BK 12 – Borough Park',pop:118131,fb:45500,units:42100},
  313:{name:'BK 13 – Coney Island/Brighton Beach',pop:113672,fb:46300,units:44900},
  314:{name:'BK 14 – Flatbush/Midwood',pop:148419,fb:65900,units:53200},
  315:{name:'BK 15 – Sheepshead Bay/Gravesend',pop:162578,fb:66600,units:62700},
  316:{name:'BK 16 – Brownsville',pop:90408,fb:18900,units:30400},
  317:{name:'BK 17 – East Flatbush/Farragut',pop:148600,fb:60500,units:51200},
  318:{name:'BK 18 – Canarsie/Flatlands',pop:163793,fb:53700,units:62200},
  401:{name:'QN 1 – Astoria',pop:217578,fb:107400,units:86900},
  402:{name:'QN 2 – Sunnyside/Woodside',pop:132758,fb:74800,units:52000},
  403:{name:'QN 3 – Jackson Heights',pop:175620,fb:119400,units:63400},
  404:{name:'QN 4 – Elmhurst/Corona',pop:181990,fb:125900,units:63200},
  405:{name:'QN 5 – Ridgewood/Maspeth',pop:181990,fb:92700,units:72600},
  406:{name:'QN 6 – Rego Park/Forest Hills',pop:119654,fb:55500,units:49100},
  407:{name:'QN 7 – Flushing/Whitestone',pop:224127,fb:127400,units:81800},
  408:{name:'QN 8 – Hillcrest/Fresh Meadows',pop:163862,fb:80700,units:59900},
  409:{name:'QN 9 – Woodhaven/Richmond Hill',pop:164819,fb:90600,units:57500},
  410:{name:'QN 10 – Howard Beach/Ozone Park',pop:153585,fb:58300,units:56900},
  411:{name:'QN 11 – Bayside/Little Neck',pop:115455,fb:43500,units:42300},
  412:{name:'QN 12 – Jamaica/St. Albans',pop:202190,fb:82900,units:68500},
  413:{name:'QN 13 – Queens Village/Rosedale',pop:176754,fb:77800,units:61100},
  414:{name:'QN 14 – Rockaway/Broad Channel',pop:118040,fb:25700,units:44200},
  501:{name:'SI 1 – St. George/Stapleton',pop:177340,fb:48200,units:68200},
  502:{name:'SI 2 – New Springville/South Beach',pop:154065,fb:34900,units:60200},
  503:{name:'SI 3 – Tottenville/Great Kills',pop:161329,fb:29200,units:64800}
};

// Now fix the placeholder reference in calcDistrictUSI
const TOTAL_POP=Object.values(CD).reduce((s,d)=>s+d.pop,0);
const TOTAL_FB=Object.values(CD).reduce((s,d)=>s+d.fb,0);

function calcDistrictUSI(d,yrs=10){
  const mi_share=P.mi*(d.fb/TOTAL_FB);
  const dom_share=P.dom*(d.pop/TOTAL_POP);
  const nat_share=BASE.natInc*(d.pop/BASE.pop);
  const newU_share=P.units*(d.units/BASE.units);
  let pop=d.pop,lf=d.pop*0.65,u=d.units;
  for(let y=0;y<yrs;y++){pop+=nat_share+mi_share+dom_share;lf+=(mi_share*BASE.lfp_intl)+(dom_share*BASE.lfp_avg);u+=newU_share;}
  const Sp=(pop-d.pop)/d.pop;
  const lf0=d.pop*0.65,Sl=(lf-lf0)/lf0;
  const Htf=pop/u,H0=d.pop/d.units,Sh=(Htf-H0)/H0;
  return SCALE*(W.p*Sp+W.l*Sl-W.h*Sh);
}

// ═══════════════════════════════════════════════════
// MAP CHARTS (duplicate canvases for map page)
// ═══════════════════════════════════════════════════
let mapPopChart,mapLFChart;
function initMapCharts(){
  const mpEl=document.getElementById('mapPopChart'),mlEl=document.getElementById('mapLFChart');
  if(!mpEl||!mlEl)return;
  const GRID='rgba(255,255,255,0.04)',TICK='#4a4a58',CF={family:"'Inter',sans-serif",size:10};
  mapPopChart=new Chart(mpEl,{type:'line',data:{labels:YEARS,datasets:Object.entries(SC).map(([k,sc])=>({label:lang==='es'?sc.labelES:sc.label,data:projectSeries(sc.mi,BASE.domOut,BASE.newUnits).pops,borderColor:sc.color,backgroundColor:'transparent',borderWidth:2,pointRadius:0,tension:.3}))},options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{labels:{color:TICK,font:CF}}},scales:{x:{grid:{color:GRID},ticks:{color:TICK,font:CF}},y:{grid:{color:GRID},ticks:{color:TICK,font:CF,callback:v=>(v/1e6).toFixed(1)+'M'}}}}});
  mapLFChart=new Chart(mlEl,{type:'line',data:{labels:YEARS,datasets:Object.entries(SC).map(([k,sc])=>({label:lang==='es'?sc.labelES:sc.label,data:projectSeries(sc.mi,BASE.domOut,BASE.newUnits).lfs,borderColor:sc.color,backgroundColor:'transparent',borderWidth:2,pointRadius:0,tension:.3}))},options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{labels:{color:TICK,font:CF}}},scales:{x:{grid:{color:GRID},ticks:{color:TICK,font:CF}},y:{grid:{color:GRID},ticks:{color:TICK,font:CF,callback:v=>(v/1e6).toFixed(2)+'M'}}}}});
}

// Render comp grid for map page
function renderMapCompCards(){
  const g=document.getElementById('mapCompGrid');if(!g)return;
  g.innerHTML='';
  Object.entries(SC).forEach(([k,sc])=>{
    const r=project(sc.mi,BASE.domOut,BASE.newUnits);
    const sign=r.usi>=0?'+':'',cls=r.usi>0?'pos':r.usi<0?'neg':'neu';
    const c=document.createElement('div');c.className='cc'+(k===activeSC?' sel':'');
    c.innerHTML=`<div class="cc-name">${lang==='es'?sc.labelES:sc.label}</div><div style="font-size:9px;font-family:'DM Mono',monospace;color:var(--text3);text-transform:uppercase;letter-spacing:.08em;margin-bottom:4px">${lang==='es'?'Proyección 10 años':'10-yr projection'}</div><div class="cc-usi ${cls}" style="color:${usiColor(r.usi)}">${sign}${fmtUSI(r.usi)}</div><div class="cc-mi">${(sc.mi/1000).toFixed(0)}k/yr</div><div class="cc-detail">Pop: ${(r.pop/1e6).toFixed(2)}M · LF: ${(r.lf/1e6).toFixed(2)}M</div>`;
    g.appendChild(c);
  });
}
function updateMapMeter(){updateMeter(P.mi,'mapMFill',null,null);}


// ═══════════════════════════════════════════════════
// INIT
// ═══════════════════════════════════════════════════
window.addEventListener('load',()=>{
  buildPages();
  buildNav();
  bindSliders();
  renderCompCards(activeSC);
  renderBoroMini();
  updateLiveUSI();
  initCharts();
  setTimeout(()=>{
    updateMeter(66000,'mFill','mThresh','mStatus');
    updateMeter(66000,'hMFill','hMThresh','hMStatus');
  },500);
});