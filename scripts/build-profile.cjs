// Rebuild the self-contained artwork: node scripts/build-profile.cjs
const fs = require('node:fs');
const path = require('node:path');
const output = path.join(__dirname, '..', 'assets');
const portraitData = 'data:image/jpeg;base64,' + fs.readFileSync(path.join(output, 'profile.jpeg')).toString('base64');
const C = { bg: '#080e1a', panel: '#0d1728', line: '#283c57', ink: '#f2f5fc', muted: '#9cacc4', blue: '#178cff', cyan: '#60cfff', red: '#ff4655' };
const esc = s => String(s).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');
const rect = (x,y,w,h,fill=C.panel,stroke=C.line,r=12) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="${fill}" stroke="${stroke}"/>`;
const line = (x,y,x2,y2,color=C.line,width=1) => `<path d="M${x} ${y}H${x2}" fill="none" stroke="${color}" stroke-width="${width}"/>`;
const text = (x,y,label,size=20,color=C.ink,kind='body',extra='') => `<text x="${x}" y="${y}" class="${kind}" font-size="${size}" fill="${color}" ${extra}>${esc(label)}</text>`;
const group = (x,y,body) => `<g transform="translate(${x} ${y})">${body}</g>`;
const slash = (x,y) => group(x,y,`<path d="M0 14L7 0H14L7 14ZM10 14L17 0H24L17 14ZM20 14L27 0H34L27 14Z" fill="${C.red}"/>`);
const label = (x,y,s) => text(x,y,s,16,C.muted,'mono','letter-spacing="2"');
const heading = (x,y,n,kicker,title) => label(x,y,`${n} / ${kicker}`)+text(x,y+49,title,44,C.ink,'display');
const pill = (x,y,w,s,color=C.blue) => rect(x,y,w,30,'#10233b',C.line,4)+text(x+12,y+21,s,14,color,'mono');
// Embed the original JPEG so portraits also render when the SVG is used as an image.
const portrait = (x,y,w,h) => `<svg x="${x}" y="${y}" width="${w}" height="${h}" viewBox="100 0 850 660" preserveAspectRatio="xMidYMid slice" overflow="hidden"><image href="${portraitData}" x="0" y="0" width="1086" height="1448"/></svg>`+rect(x,y,w,h,'none','#315883',0);
const svg = (w,h,title,desc,body) => `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" role="img" aria-labelledby="title desc">
<title id="title">${esc(title)}</title><desc id="desc">${esc(desc)}</desc>
<defs>
  <radialGradient id="glow"><stop stop-color="#0767cf" stop-opacity=".4"/><stop offset="1" stop-color="#0767cf" stop-opacity="0"/></radialGradient>
  <linearGradient id="card" x2="1" y2="1"><stop stop-color="#123a68"/><stop offset="1" stop-color="#0b1729"/></linearGradient>
  <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M40 0H0V40" fill="none" stroke="#1e3655" stroke-width=".7"/></pattern>
  <style>.body{font-family:'Segoe UI',Arial,sans-serif;font-weight:500}.display{font-family:Impact,'Arial Narrow','Liberation Sans Narrow',sans-serif;font-weight:900;letter-spacing:.2px}.mono{font-family:Consolas,'Liberation Mono',monospace;font-weight:600}</style>
</defs>
${rect(0,0,w,h,C.bg,C.bg,0)}<rect width="${w}" height="${h}" fill="url(#grid)" opacity=".24"/>${body}
</svg>\n`;
function identity(x,y,w=320,h=330) {
  let barcode=''; for(let i=0;i<68;i++) barcode+=rect(22+i*4,h-45,(i%3===0?3:1),22,C.muted,'none',0);
  return group(x,y,rect(0,0,w,h,'url(#card)','#3f6897',12)+rect(0,0,w,5,C.red,'none',0)+label(22,34,'VK / DEVELOPER PASS')+slash(w-52,20)+portrait(22,53,w-44,h-158)+text(22,h-78,'VISHAL KUSHWAHA',27,C.ink,'display')+text(22,h-58,'BACKEND / WEB / AI',13,C.cyan,'mono')+barcode);
}
function hero(m) {
  const w=m?600:1200,h=m?790:548;
  let b=`<ellipse cx="${m?370:910}" cy="240" rx="410" ry="320" fill="url(#glow)"/>`;
  b+=label(32,34,'VISHAL KUSHWAHA / SOFTWARE DEVELOPER');
  b+=line(32,52,w-32,52)+pill(32,76,211,'OPEN TO COLLABORATE',C.cyan);
  b+=text(32,153,'Hello there, I’m',23,C.muted,'mono');
  b+=text(26,267,'VISHAL',126,C.ink,'display');
  b+=text(26,382,'KUSHWAHA',m?102:124,C.blue,'display',m?'textLength="536" lengthAdjust="spacingAndGlyphs"':'');
  b+=slash(m?480:669,171)+text(m?480:669,220,'BUILD.',26,C.ink,'display')+text(m?480:669,248,'LEARN.',26,C.ink,'display')+text(m?480:669,276,'SHARE.',26,C.ink,'display');
  b+=text(32,424,'BACKEND ENGINEERING × WEB × AI',m?21:23,C.ink,'mono');
  b+=text(32,456,'Building useful products. Exploring what’s next.',m?18:21,C.muted);
  if(m) {
    b+=rect(32,490,536,214,'url(#card)','#315883',8)+label(54,521,'DEVELOPER / BUILDER / EXPLORER');
    b+=portrait(54,539,154,142)+text(230,570,'> developer.status',19,C.cyan,'mono')+text(230,608,'creating',23,C.ink,'mono')+text(230,642,'learning + sharing',20,C.muted,'mono')+slash(514,669);
  } else {
    b+=`<g transform="rotate(4 1004 270)">${identity(831,98,326,354)}</g>`;
    b+=pill(842,474,314,'> curiosity.into(impact)',C.cyan);
  }
  b+=line(32,h-43,w-32,h-43)+label(32,h-16,'JAVA / SPRING BOOT / REACT / PYTHON');
  return svg(w,h,'Vishal Kushwaha — Software Developer','Building practical software at the intersection of backend engineering, web and AI. Open to collaboration.',b);
}
function vision(m) {
  const w=m?600:1200,cw=m?536:558,h=m?858:510;
  let b=heading(32,40,'01','FROM CURIOSITY TO CREATION','IDEAS INTO IMPACT.');
  const left=rect(0,0,cw,356,C.panel,'#315883')+rect(0,0,cw,5,C.blue,'none',0)+label(24,40,'THE BUILDER’S MINDSET')+text(24,86,'THINK. BUILD. IMPROVE.',36,C.ink,'display')+rect(24,110,cw-48,199,'#081321','#244467',6)+rect(24,110,cw-48,29,'#153151','#244467',6)+`<circle cx="40" cy="125" r="4" fill="${C.red}"/><circle cx="54" cy="125" r="4" fill="#e8b15b"/><circle cx="68" cy="125" r="4" fill="#5bcfa0"/>`+text(88,129,'vishal / workspace',13,C.muted,'mono')+text(44,169,'> turn_curiosity_into_impact()',18,C.cyan,'mono')+pill(44,192,120,'01 / LEARN')+pill(192,192,120,'02 / BUILD')+pill(340,192,142,'03 / SHARE',C.red)+text(44,256,'Reliable APIs. Thoughtful interfaces.',18,C.ink)+text(44,285,'Experiments that become useful software.',17,C.muted)+text(24,339,'// Always a work in progress.',16,C.muted,'mono');
  let right=rect(0,0,cw,356,C.panel,'#64404f')+rect(0,0,cw,5,C.red,'none',0)+label(24,40,'MORE THAN JUST CODE')+text(24,86,'ENGINEERING + COMMUNITY',m?32:34,C.ink,'display');
  [['01','BACKEND & WEB','Java, Spring Boot, React and REST APIs.'],['02','AI WORKHUB','Building tools for project collaboration.'],['03','ENGISYNC','Sharing resources, learning and opportunity.']].forEach((row,i)=>{let y=130+i*73;right+=text(24,y+13,row[0],31,i===2?C.red:C.blue,'display')+text(80,y+7,row[1],21,C.ink,'display')+text(80,y+33,row[2],17,C.muted);if(i<2)right+=line(80,y+47,cw-24,y+47);});
  b+=group(32,124,left)+group(m?32:610,m?502:124,right);
  return svg(w,h,'Ideas into impact','Backend and web engineering, AI Workhub project collaboration, and EngiSync community resources.',b);
}
function stack(m) {
  const w=m?600:1200,h=m?890:534;
  let b=heading(32,40,'02','THE TOOLBOX','TOOLS CHANGE. CURIOSITY DOESN’T.');
  // Keep the longest headline legible on a narrow screen.
  if(m)b=label(32,40,'02 / THE TOOLBOX')+text(32,88,'TOOLS CHANGE.',46,C.ink,'display')+text(32,137,'CURIOSITY DOESN’T.',46,C.ink,'display');
  const ox=m?300:251,oy=m?345:319;
  b+=`<circle cx="${ox}" cy="${oy}" r="205" fill="url(#glow)"/>`;
  [100,155,190].forEach(r=>b+=`<circle cx="${ox}" cy="${oy}" r="${r}" fill="none" stroke="#20466f" stroke-width="1" ${r===190?'stroke-dasharray="3 9"':''}/>`);
  b+=`<path d="M${ox-146} ${oy+51}L${ox+6} ${oy-143}L${ox+148} ${oy+58}L${ox-105} ${oy-111}L${ox-49} ${oy+157}Z" fill="none" stroke="#1765ad" opacity=".7"/>`;
  [[-105,-111,'JAVA'],[6,-143,'JS'],[148,58,'PY'],[-49,157,'SQL'],[-146,51,'GIT'],[144,-99,'AI']].forEach(([x,y,s],i)=>{b+=`<circle cx="${ox+x}" cy="${oy+y}" r="26" fill="#102a47" stroke="${i%2?C.red:C.blue}"/>`+text(ox+x,oy+y+6,s,16,C.ink,'mono','text-anchor="middle"');});
  b+=`<path d="M${ox} ${oy-60}L${ox+53} ${oy-30}V${oy+30}L${ox} ${oy+60}L${ox-53} ${oy+30}V${oy-30}Z" fill="#106ed0" stroke="#4fb4ff" stroke-width="2"/>`+text(ox,oy+14,'VK',44,C.ink,'display','text-anchor="middle"');
  const cards=[['01 / BACKEND','Java','Spring Boot · REST APIs'],['02 / FRONTEND','JavaScript','React · HTML · CSS'],['03 / DATA','Python','SQL'],['04 / WORKFLOW','Git & GitHub','Version control'],['05 / PLATFORM','Supabase','Application backend'],['06 / EXPLORING','Generative AI','Learn · Build · Iterate']];
  cards.forEach(([k,t,d],i)=>{const x=m?32+(i%2)*276:505+(i%2)*337;const y=(m?565:145)+Math.floor(i/2)*100;const cw=m?260:321;b+=rect(x,y,cw,85,'url(#card)',C.line,6)+label(x+16,y+23,k)+text(x+16,y+49,t,24,C.ink,'display')+text(x+16,y+72,d,m?15:17,C.muted);});
  if(!m)b+=text(505,486,'BUILD / REFINE / CREATE / REPEAT',16,C.cyan,'mono','letter-spacing="2"');
  return svg(w,h,'My technology toolbox','Java, Spring Boot, REST APIs, JavaScript, React, HTML, CSS, Python, SQL, Git, GitHub, Supabase and generative AI.',b);
}
function projects(m) {
  const w=m?600:1200,h=m?740:440,cw=m?536:558;
  let b=heading(32,40,'03','SELECTED WORK','REAL PROJECTS. REAL LEARNING.');
  const card=(n,title,subtitle,lines,tags,color)=>rect(0,0,cw,286,C.panel,C.line)+rect(0,0,5,286,color,'none',0)+label(25,35,`${n} / PROJECT FILE`)+text(25,81,title,title==='ENGISYNC'?43:33,C.ink,'display')+text(25,111,subtitle,18,color)+line(25,132,cw-25,132)+text(25,171,lines[0],20,C.ink)+text(25,202,lines[1],20,C.ink)+pill(25,231,cw-50,tags,color)+slash(cw-60,22);
  b+=group(32,124,card('01','ENGISYNC','RESOURCES / CAREERS / COMMUNITY',['A place for practical tech learning,','developer resources and job discovery.'],'COMMUNITY + WEB',C.blue));
  b+=group(m?32:610,m?432:124,card('02','AI WORKHUB','PROJECT MANAGEMENT / IN DEVELOPMENT',['Building a Jira-inspired workspace','for real-time project collaboration.'],'PROJECTS + TEAM COLLABORATION',C.red));
  return svg(w,h,'Selected projects: EngiSync and AI Workhub','EngiSync shares learning resources and job opportunities. AI Workhub is a Jira-inspired project-management workspace currently in development for real-time collaboration.',b);
}
function activity(m) {
  const w=m?600:1200;
  return svg(w,126,'GitHub activity','Live GitHub statistics and contribution calendar follow this heading.',heading(32,36,'04','BUILDING IN THE OPEN','CODE. COMMIT. KEEP GOING.')+slash(w-66,38));
}
function connect(m) {
  const w=m?600:1200,h=m?720:448;
  let b=`<ellipse cx="${m?300:300}" cy="280" rx="300" ry="250" fill="url(#glow)"/>`;
  if(m){b+=heading(32,40,'05','START A CONVERSATION','LET’S BUILD SOMETHING GREAT.');b+=text(32,130,'Ideas, collaborations, meaningful conversations.',19,C.muted)+identity(140,168,320,330)+text(32,560,'BACKEND / WEB / AI',23,C.cyan,'mono')+text(32,604,'vishalworks.co.in ↗',38,C.ink,'display')+text(32,644,'github.com/vishalk2309',21,C.muted,'mono');}
  else {b+=identity(48,40,320,360)+label(425,65,'05 / START A CONVERSATION')+text(420,153,'LET’S BUILD',76,C.ink,'display')+text(420,236,'SOMETHING GREAT.',76,C.blue,'display')+slash(1115,46)+text(425,281,'Ideas, collaborations, meaningful conversations.',23,C.muted)+rect(425,311,728,63,'url(#card)','#345a86',6)+text(447,353,'vishalworks.co.in',29,C.ink,'mono')+text(1107,355,'↗',35,C.cyan)+label(425,407,'BACKEND / WEB / AI · VISHAL KUSHWAHA');}
  b+=line(32,h-27,w-32,h-27);
  return svg(w,h,'Let’s build something great','Vishal Kushwaha. Explore my portfolio at vishalworks.co.in and my GitHub profile at github.com/vishalk2309.',b);
}
fs.mkdirSync(output,{recursive:true});
for(const [name,render] of Object.entries({'01-hero':hero,'02-vision':vision,'03-stack':stack,'04-projects':projects,'05-connect':connect,'06-activity':activity})) {
  for(const mobile of [false,true])fs.writeFileSync(path.join(output,`${name}${mobile?'-mobile':''}.svg`),render(mobile));
}
for (const [name,title,color] of [['portfolio','VISIT PORTFOLIO',C.cyan],['repositories','EXPLORE REPOSITORIES',C.blue],['github','CONNECT ON GITHUB',C.red]]) {
  const width = name === 'repositories' ? 286 : 256;
  const badge = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="44" viewBox="0 0 ${width} 44" role="img" aria-label="${title}"><title>${title}</title>${rect(1,1,width-2,42,'#10233b',C.line,6)}<path d="M13 14L7 22L13 30M27 14L33 22L27 30" fill="none" stroke="${color}" stroke-width="2"/>${text(44,27,title,15,C.ink,'mono','font-family="Consolas,monospace" font-weight="700"')}${rect(width-8,8,3,28,color,'none',1)}</svg>\n`;
  fs.writeFileSync(path.join(output,`badge-${name}.svg`),badge);
}
console.log('Built 12 desktop/mobile profile graphics and 3 local navigation badges.');
