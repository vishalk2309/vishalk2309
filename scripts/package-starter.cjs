// Build a generic, photo-free starter without changing the personal profile.
const fs = require('node:fs');
const path = require('node:path');
const cp = require('node:child_process');
const root = path.resolve(__dirname, '..');
const staging = path.join(root, '.preview', 'github-profile-starter');
fs.mkdirSync(path.join(staging, 'scripts'), { recursive: true });
fs.mkdirSync(path.join(staging, 'assets'), { recursive: true });
let renderer = fs.readFileSync(path.join(__dirname, 'build-profile.cjs'), 'utf8');
renderer = renderer.replace("const portraitData = 'data:image/jpeg;base64,' + fs.readFileSync(path.join(output, 'profile.jpeg')).toString('base64');", [
  "const cfg = require('../profile.config.json');",
  "const fullName = cfg.firstName + ' ' + cfg.lastName;",
  "const initials = (cfg.firstName[0] + cfg.lastName[0]).toUpperCase();",
  "const photoPath = cfg.photo.path ? path.resolve(output, '..', cfg.photo.path) : null;",
  "const portraitData = photoPath ? 'data:image/' + (/\\.png$/i.test(photoPath) ? 'png' : 'jpeg') + ';base64,' + fs.readFileSync(photoPath).toString('base64') : null;"
].join('\n'));
const oldPortrait = renderer.split('\n').find(l => l.startsWith('const portrait ='));
renderer = renderer.replace(oldPortrait, [
  'const portrait = (x,y,w,h) => {',
  '  if (!portraitData) return rect(x,y,w,h,\'#102a47\',\'#315883\',0) + text(x+w/2,y+h/2+25,initials,76,C.ink,\'display\',\'text-anchor="middle"\');',
  '  const crop = cfg.photo.crop || [0, 0, cfg.photo.width, cfg.photo.height];',
  '  return `<svg x="${x}" y="${y}" width="${w}" height="${h}" viewBox="${crop.join(" ")}" preserveAspectRatio="xMidYMid slice" overflow="hidden"><image href="${portraitData}" width="${cfg.photo.width}" height="${cfg.photo.height}"/></svg>` + rect(x,y,w,h,\'none\',\'#315883\',0);',
  '};'
].join('\n'));
const expressions = {
  'VISHAL KUSHWAHA / SOFTWARE DEVELOPER': "fullName.toUpperCase() + ' / ' + cfg.role.toUpperCase()",
  'VK / DEVELOPER PASS': "initials + ' / DEVELOPER PASS'",
  'VISHAL KUSHWAHA': 'fullName.toUpperCase()',
  'VISHAL': 'cfg.firstName.toUpperCase()',
  'KUSHWAHA': 'cfg.lastName.toUpperCase()',
  'VK': 'initials',
  'BACKEND / WEB / AI · VISHAL KUSHWAHA': "cfg.focus.toUpperCase() + ' · ' + fullName.toUpperCase()",
  'BACKEND / WEB / AI': 'cfg.focus.toUpperCase()',
  'BACKEND ENGINEERING × WEB × AI': 'cfg.focus.toUpperCase()',
  'JAVA / SPRING BOOT / REACT / PYTHON': "cfg.toolbelt.join(' / ').toUpperCase()",
  'OPEN TO COLLABORATE': 'cfg.status.toUpperCase()',
  'Building useful products. Exploring what’s next.': 'cfg.tagline',
  'Vishal Kushwaha — Software Developer': "fullName + ' — ' + cfg.role",
  'Building practical software at the intersection of backend engineering, web and AI. Open to collaboration.': 'cfg.summary',
  'BACKEND & WEB': 'cfg.about[0].title',
  'Java, Spring Boot, React and REST APIs.': 'cfg.about[0].description',
  'AI WORKHUB': 'cfg.about[1].title',
  'Building tools for project collaboration.': 'cfg.about[1].description',
  'ENGISYNC': 'cfg.about[2].title',
  'Sharing resources, learning and opportunity.': 'cfg.about[2].description',
  'Backend and web engineering, AI Workhub project collaboration, and EngiSync community resources.': "cfg.about.map(a=>a.title+': '+a.description).join(' ')",
  'Java, Spring Boot, REST APIs, JavaScript, React, HTML, CSS, Python, SQL, Git, GitHub, Supabase and generative AI.': "cfg.toolbox.map(t=>t.name+' '+t.detail).join(', ')",
  'Selected projects: EngiSync and AI Workhub': "'Selected projects: ' + cfg.projects.map(p=>p.name).join(' and ')",
  'EngiSync shares learning resources and job opportunities. AI Workhub is a Jira-inspired project-management workspace currently in development for real-time collaboration.': "cfg.projects.map(p=>p.name+': '+p.lines.join(' ')).join(' ')",
  'vishalworks.co.in ↗': "cfg.websiteLabel + ' ↗'",
  'vishalworks.co.in': 'cfg.websiteLabel',
  'github.com/vishalk2309': "'github.com/' + cfg.username",
  'Vishal Kushwaha. Explore my portfolio at vishalworks.co.in and my GitHub profile at github.com/vishalk2309.': "fullName + '. Portfolio: ' + cfg.website + '. GitHub: github.com/' + cfg.username"
};
// Long literals first, so a full phrase is transformed before its shorter pieces.
for (const [literal, expression] of Object.entries(expressions).sort((a,b)=>b[0].length-a[0].length)) {
  renderer = renderer.replaceAll("'" + literal + "'", '(' + expression + ')');
}
const cardsLine = renderer.split('\n').find(l=>l.trim().startsWith('const cards='));
renderer = renderer.replace(cardsLine,"  const cards=cfg.toolbox.map((t,i)=>[String(i+1).padStart(2,'0')+' / '+t.category.toUpperCase(),t.name,t.detail]);");
const orbitLine = renderer.split('\n').find(l=>l.includes("[[-105,-111,'JAVA']"));
renderer = renderer.replace(orbitLine,orbitLine.replace("[[-105,-111,'JAVA'],[6,-143,'JS'],[148,58,'PY'],[-49,157,'SQL'],[-146,51,'GIT'],[144,-99,'AI']]",'[[ -105,-111],[6,-143],[148,58],[-49,157],[-146,51],[144,-99]].map((p,i)=>[...p,cfg.orbitLabels[i]])'));
const projectLines = renderer.split('\n').filter(l=>l.includes("card('0"));
renderer = renderer.replace(projectLines[0], "  const projectCard=(i)=>{const p=cfg.projects[i];return card(String(i+1).padStart(2,'0'),p.name.toUpperCase(),p.subtitle.toUpperCase(),p.lines,p.tags.toUpperCase(),i?C.red:C.blue);};\n  b+=group(32,124,projectCard(0));");
renderer = renderer.replace(projectLines[1], '  b+=group(m?32:610,m?432:124,projectCard(1));');
renderer = renderer.replace("title===(cfg.about[2].title)?43:33",'36');
renderer = renderer.replace("title==='ENGISYNC'?43:33",'36');
renderer = renderer.replace("'vishal / workspace'", "'developer / workspace'");
if (/vishal|kushwaha|engisync|workhub/i.test(renderer)) throw Error('Personal branding remains in the starter renderer.');
fs.writeFileSync(path.join(staging,'scripts','render-artwork.cjs'),renderer);
const config = {
  username: 'YOUR_USERNAME', firstName: 'YOUR', lastName: 'NAME', role: 'Software Developer',
  focus: 'BACKEND / WEB / AI', status: 'OPEN TO COLLABORATE',
  tagline: 'Building useful products. Exploring new ideas.',
  summary: 'I build practical software and share what I learn.',
  website: 'https://example.com', websiteLabel: 'your-portfolio.com',
  photo: { path: '', width: 1000, height: 1000, crop: null },
  toolbelt: ['Java', 'JavaScript', 'React', 'Python'],
  about: [
    { title: 'WHAT I BUILD', description: 'Useful applications and thoughtful interfaces.' },
    { title: 'WHAT I EXPLORE', description: 'New tools, ideas and ways to solve problems.' },
    { title: 'WHAT I SHARE', description: 'My projects, experiments and learning notes.' }
  ],
  orbitLabels: ['JAVA', 'JS', 'PY', 'SQL', 'GIT', 'AI'],
  toolbox: [
    { category: 'BACKEND', name: 'Java', detail: 'Spring Boot · REST APIs' },
    { category: 'FRONTEND', name: 'JavaScript', detail: 'React · HTML · CSS' },
    { category: 'DATA', name: 'Python', detail: 'SQL' },
    { category: 'WORKFLOW', name: 'Git & GitHub', detail: 'Version control' },
    { category: 'PLATFORM', name: 'Your platform', detail: 'Replace with your tools' },
    { category: 'EXPLORING', name: 'Your interest', detail: 'Replace with your focus' }
  ],
  projects: [
    { name: 'PROJECT ONE', subtitle: 'YOUR PROJECT CATEGORY', lines: ['Explain a project you actually built.', 'Mention who it helps or what it solves.'], tags: 'YOUR TECHNOLOGIES', url: '' },
    { name: 'PROJECT TWO', subtitle: 'YOUR PROJECT CATEGORY', lines: ['Describe your second project here.', 'Mark unfinished projects as in development.'], tags: 'YOUR TECHNOLOGIES', url: '' }
  ],
  showStats: false
};
fs.writeFileSync(path.join(staging,'profile.config.json'),JSON.stringify(config,null,2)+'\n');
fs.copyFileSync(path.join(root,'scripts','starter-build.cjs'),path.join(staging,'scripts','build-profile.cjs'));
for (const [source,target] of [['GITHUB-PROFILE-GUIDE.md','START-HERE.md'],['INSTAGRAM-REEL-KIT.md','REEL-KIT.md']]) {
  fs.copyFileSync(path.join(root,'share',source),path.join(staging,target));
}
const pdf = path.join(root,'share','GitHub-Profile-Guide.pdf');
if(fs.existsSync(pdf))fs.copyFileSync(pdf,path.join(staging,'GitHub-Profile-Guide.pdf'));
fs.writeFileSync(path.join(staging,'.gitignore'),'.DS_Store\nThumbs.db\n');
cp.execFileSync(process.execPath,[path.join(staging,'scripts','build-profile.cjs'),'--preview'],{cwd:staging,stdio:'inherit'});
console.log('Starter staged at ' + staging);
