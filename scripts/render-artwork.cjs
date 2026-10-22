// Native SVG artwork shared by the personal profile and downloadable starter.
const fs = require('node:fs');
const path = require('node:path');
const cfg = require('../profile.config.json');
cfg.toolLabels = cfg.toolLabels || cfg.orbitLabels;
const output = path.resolve(__dirname, '..', 'assets');
const fullName = cfg.firstName + ' ' + cfg.lastName;
const initials = (cfg.firstName[0] + cfg.lastName[0]).toUpperCase();
const C = { bg: '#110d12', panel: '#1c1219', line: '#55323e', ink: '#f5eade', muted: '#c3a9ad', rose: '#e2a5b3', gold: '#d1ad7c', wine: '#742d46' };
const esc = s => String(s).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');
const rect = (x,y,w,h,fill=C.panel,stroke=C.line,r=4) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="${fill}" stroke="${stroke}"/>`;
const line = (x,y,w,color=C.line) => `<path d="M${x} ${y}h${w}" fill="none" stroke="${color}"/>`;
const group = (x,y,body) => `<g transform="translate(${x} ${y})">${body}</g>`;
function text(x,y,value,size=20,color=C.ink,kind='body',maxWidth=0,extra='') {
  const estimate=String(value).length*size*(kind==='mono'?.61:kind==='serif'?.57:.55);
  const fit=maxWidth&&estimate>maxWidth?`textLength="${maxWidth}" lengthAdjust="spacingAndGlyphs"`:'';
  return `<text x="${x}" y="${y}" class="${kind}" font-size="${size}" fill="${color}" ${fit} ${extra}>${esc(value)}</text>`;
}
const label = (x,y,value,size=14,maxWidth=0) => text(x,y,value.toUpperCase(),size,C.muted,'mono',maxWidth,'letter-spacing="1.6"');
const diamond = (x,y,size=5,color=C.gold) => `<path d="M${x} ${y-size}l${size} ${size}l-${size} ${size}l-${size}-${size}Z" fill="${color}"/>`;
const pill = (x,y,w,value,color=C.rose) => rect(x,y,w,32,'#321b27','#754455',3)+text(x+12,y+21,value,13,color,'mono',w-24);
const heading = (w,number,kicker,title,m) => label(36,39,number+' / '+kicker,13,w-72)+text(36,99,title,m?43:49,C.ink,'serif',w-72)+diamond(w-42,96,4);
function svg(w,h,title,description,body) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" role="img" aria-labelledby="title desc">
<title id="title">${esc(title)}</title><desc id="desc">${esc(description)}</desc>
<defs>
<radialGradient id="glow"><stop stop-color="#943b58" stop-opacity=".5"/><stop offset="1" stop-color="#943b58" stop-opacity="0"/></radialGradient>
<linearGradient id="card" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#422030"/><stop offset="1" stop-color="#20131e"/></linearGradient>
<pattern id="paper" width="9" height="9" patternUnits="userSpaceOnUse"><circle cx="1" cy="1" r=".45" fill="#d7b8b4" opacity=".08"/></pattern>
<style>.body{font-family:'Segoe UI',Arial,sans-serif;font-weight:400}.serif{font-family:Georgia,'Times New Roman',serif;font-weight:400;letter-spacing:-1px}.mono{font-family:Consolas,'Liberation Mono',monospace;font-weight:400}.italic{font-family:Georgia,'Times New Roman',serif;font-style:italic;font-weight:400}</style>
</defs>
${rect(0,0,w,h,C.bg,'none',0)}<rect width="${w}" height="${h}" fill="url(#paper)"/>${body}
</svg>\n`;
}
let portraitData=null;
if(cfg.photo.path) {
  const extension=/\.png$/i.test(cfg.photo.path)?'png':'jpeg';
  portraitData='data:image/'+extension+';base64,'+fs.readFileSync(path.resolve(output,'..',cfg.photo.path)).toString('base64');
}
function portrait(x,y,w,h) {
  const arch=`M0 ${h}V${w/2}a${w/2} ${w/2} 0 0 1 ${w} 0V${h}Z`;
  const frame=`M-10 ${h+10}V${w/2}a${w/2+10} ${w/2+10} 0 0 1 ${w+20} 0V${h+10}Z`;
  let image;
  if(portraitData) {
    const crop=cfg.photo.crop||[0,0,cfg.photo.width,cfg.photo.height];
    image=`<svg width="${w}" height="${h}" viewBox="${crop.join(' ')}" preserveAspectRatio="xMidYMin slice"><image href="${portraitData}" width="${cfg.photo.width}" height="${cfg.photo.height}"/></svg>`;
  }else image=rect(0,0,w,h,'url(#card)','none')+text(w/2,h*.63,initials,86,C.rose,'serif',0,'text-anchor="middle"');
  return group(x,y,`<defs><clipPath id="portrait-arch"><path d="${arch}"/></clipPath></defs><path d="${frame}" fill="none" stroke="${C.gold}" stroke-opacity=".6"/><g clip-path="url(#portrait-arch)">${image}</g><path d="${arch}" fill="none" stroke="${C.gold}"/>`);
}
function hero(m) {
  const w=m?600:1200,h=m?1020:600;
  let b=`<ellipse cx="${m?300:820}" cy="270" rx="550" ry="370" fill="url(#glow)"/>`;
  b+=rect(18,18,w-36,h-36,'none',C.line,5)+label(38,52,'THE DEVELOPER JOURNAL',13)+label(w-166,52,'VOL. 01',13)+line(38,72,w-76);
  b+=label(38,117,'HELLO, WORLD. I’M',14);
  b+=text(33,211,cfg.firstName,93,C.ink,'serif',m?w-72:735);
  b+=text(33,307,cfg.lastName+'.',93,C.ink,'serif',m?w-72:735);
  b+=label(39,348,cfg.role,16,m?w-78:700);
  if(m) {
    b+=portrait(178,389,244,305);
    b+=text(w/2,740,cfg.tagline,21,C.ink,'italic',w-80,'text-anchor="middle"');
    b+=label(40,790,cfg.focus,16,w-80);
    b+=line(40,817,w-80)+text(40,857,cfg.status,14,C.gold,'mono',w-80);
    b+=label(40,914,'CURRENTLY BUILDING',12)+text(40,951,cfg.projects[1].name,29,C.ink,'serif',245);
    b+=label(328,914,'LEARNING & SHARING',12,230)+text(328,951,cfg.projects[0].name,29,C.ink,'serif',230);
  }else {
    b+=text(39,398,cfg.tagline,24,C.ink,'italic',730);
    b+=portrait(866,119,246,315);
    const areas=cfg.focus.split('/').map(s=>s.trim());
    areas.slice(0,3).forEach((s,i)=>b+=pill(39+i*207,433,190,s));
    b+=label(866,478,'LEARN. BUILD. SHARE.',12,246);
    b+=line(39,507,w-78)+label(39,541,'CURRENTLY BUILDING',12)+text(39,576,cfg.projects[1].name,25,C.ink,'serif',300);
    b+=label(432,541,'LEARNING & SHARING',12)+text(432,576,cfg.projects[0].name,25,C.ink,'serif',300);
    b+=label(815,541,cfg.status,12,340)+text(815,576,cfg.websiteLabel,22,C.rose,'serif',340);
  }
  return svg(w,h,fullName+' — '+cfg.role,cfg.summary+' Portrait of '+fullName+'.',b);
}
function vision(m) {
  const w=m?600:1200,h=m?830:470,cw=m?528:552;
  let b=heading(w,'01','THE PERSON BEHIND THE COMMITS','Hello, I’m '+cfg.firstName+'.',m);
  let left=rect(0,0,cw,300,'#1a121a')+rect(0,0,cw,38,'#2b1923',C.line)+label(22,25,'developer.js',12)+diamond(cw-22,20,3);
  const lines=[['const developer = {',C.rose],['  name: '+JSON.stringify(fullName)+',',C.ink],['  focus: '+JSON.stringify(cfg.focus.split('/').map(s=>s.trim().toLowerCase()))+',',C.ink],["  mindset: 'learn, build, share'",C.gold],['};',C.rose]];
  lines.forEach(([value,color],i)=>left+=text(22,85+i*36,value,19,color,'mono',cw-44));
  left+=line(22,256,cw-44)+text(22,283,'Always curious. Always a work in progress.',18,C.muted,'italic',cw-44);
  let right=rect(0,0,cw,300,'url(#card)')+text(24,47,'A little more than code.',30,C.ink,'serif',cw-48);
  cfg.about.forEach((a,i)=>{const y=91+i*69;right+=text(24,y+3,String(i+1).padStart(2,'0'),17,C.gold,'mono')+text(70,y+2,a.title,24,C.ink,'serif',cw-94)+text(70,y+27,a.description,17,C.muted,'body',cw-94);if(i<2)right+=line(70,y+43,cw-94);});
  b+=group(36,137,left)+group(m?36:612,m?458:137,right);
  return svg(w,h,'About '+fullName,cfg.about.map(a=>a.title+': '+a.description).join('. '),b);
}
function stack(m) {
  const w=m?600:1200,h=m?790:500,cw=m?256:364;
  let b=heading(w,'02','CRAFT & CAPABILITIES','A considered stack.',m);
  const cols=m?2:3;
  cfg.toolbox.forEach((t,i)=>{
    const x=36+(i%cols)*(cw+16),y=137+Math.floor(i/cols)*(m?182:141),ch=m?162:123;
    b+=rect(x,y,cw,ch,i===0?'url(#card)':C.panel)+label(x+20,y+28,t.category,12,cw-80)+text(x+cw-20,y+29,cfg.toolLabels[i],13,C.gold,'mono',48,'text-anchor="end"');
    b+=text(x+20,y+(m?86:73),t.name,m?28:32,C.ink,'serif',cw-40)+text(x+20,y+(m?119:100),t.detail,17,C.muted,'body',cw-40);
    b+=line(x+20,y+ch-16,cw-40,'#50313e');
  });
  b+=text(36,h-35,'Tools evolve. Curiosity stays.',25,C.gold,'italic',w-72)+line(36,h-17,w-72);
  return svg(w,h,'Tools and technologies',cfg.toolbox.map(t=>t.name+': '+t.detail).join('. '),b);
}
function projects(m) {
  const w=m?600:1200,h=m?895:535,cw=m?528:552,ch=352;
  let b=heading(w,'03','SELECTED WORK','A few things I’m building.',m);
  cfg.projects.forEach((p,i)=>{
    const x=m?36:36+i*576,y=m?137+i*374:137;
    let card=rect(0,0,cw,ch,i?'url(#card)':C.panel)+label(24,35,'PROJECT '+String(i+1).padStart(2,'0'),12);
    card+=diamond(cw-30,31,4)+text(24,99,p.name,49,C.ink,'serif',cw-48)+label(24,139,p.subtitle,12,cw-48)+line(24,161,cw-48);
    p.lines.forEach((value,j)=>card+=text(24,211+j*33,value,22,C.ink,'body',cw-48));
    card+=pill(24,285,cw-48,p.tags,C.gold);
    b+=group(x,y,card);
  });
  return svg(w,h,'Selected projects',cfg.projects.map(p=>p.name+': '+p.lines.join(' ')).join('. '),b);
}
function activity(m) {
  const w=m?600:1200,h=m?220:180;
  let b=heading(w,'04','THE COMMIT JOURNAL','The work, in motion.',m);
  b+=text(36,145,'Repositories, contributions, and the habit of showing up.',m?19:22,C.muted,'body',w-72)+line(36,h-18,w-72);
  return svg(w,h,'GitHub activity','Live repository statistics and contributions for '+cfg.username+'.',b);
}
function connect(m) {
  const w=m?600:1200,h=m?460:355;
  let b=rect(18,16,w-36,h-32,'url(#card)',C.line,5)+label(39,56,'05 / OPEN A CONVERSATION',13,w-78);
  if(m){b+=text(36,137,'Good things start',47,C.ink,'serif',w-72)+text(36,195,'with a hello.',47,C.ink,'serif',w-72)+text(39,246,'Ideas. Collaborations. Meaningful conversations.',18,C.muted,'body',w-78);}
  else b+=text(36,142,'Good things start with a hello.',57,C.ink,'serif',w-72)+text(39,187,'Ideas. Collaborations. Meaningful conversations.',22,C.muted,'body',w-78);
  const by=m?287:225;
  b+=rect(39,by,w-78,59,'#3b1e2c','#805164',3)+text(57,by+38,cfg.websiteLabel,m?26:30,C.ink,'serif',w-150)+text(w-70,by+38,'↗',30,C.gold);
  b+=label(39,h-42,'BUILT WITH CURIOSITY',11)+text(w-39,h-42,fullName,23,C.rose,'italic',m?260:500,'text-anchor="end"');
  return svg(w,h,'Let’s build something together','Visit '+fullName+' at '+cfg.website+'.',b);
}
fs.mkdirSync(output,{recursive:true});
for(const [name,render] of Object.entries({'01-hero':hero,'02-vision':vision,'03-stack':stack,'04-projects':projects,'05-connect':connect,'06-activity':activity})) {
  for(const mobile of [false,true])fs.writeFileSync(path.join(output,name+(mobile?'-mobile':'')+'.svg'),render(mobile));
}
for(const [name,title] of [['portfolio','PORTFOLIO'],['repositories','REPOSITORIES'],['github','CONNECT ON GITHUB']]) {
  const w=name==='github'?250:220;
  const b=rect(1,1,w-2,42,'#3b1e2c','#805164',3)+text(17,28,title,14,C.ink,'mono',w-62)+text(w-35,29,'↗',20,C.gold);
  fs.writeFileSync(path.join(output,'badge-'+name+'.svg'),svg(w,44,title,title,b));
}
console.log('Built the burgundy editorial profile: 12 section graphics and 3 navigation badges.');
