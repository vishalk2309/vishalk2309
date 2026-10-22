// This file is packaged as scripts/build-profile.cjs in the public starter ZIP.
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname,'..');
const cfg = JSON.parse(fs.readFileSync(path.join(root,'profile.config.json'),'utf8'));
const preview = process.argv.includes('--preview');
if (!preview && (!/^[a-z\d](?:[a-z\d-]{0,37}[a-z\d])?$/i.test(cfg.username) || cfg.username==='YOUR_USERNAME')) {
  throw Error('Set username in profile.config.json to your real GitHub username, then run this command again.');
}
for(const key of ['firstName','lastName','role','focus','status','tagline','summary','website','websiteLabel']) {
  if(typeof cfg[key]!=='string'||!cfg[key].trim())throw Error('Fill in '+key+' in profile.config.json.');
}
if(!/^https?:\/\//i.test(cfg.website))throw Error('website must start with https:// or http://.');
if(cfg.about.length!==3||cfg.toolbox.length!==6||cfg.orbitLabels.length!==6||cfg.projects.length!==2)throw Error('Keep 3 about entries, 6 toolbox entries, 6 orbit labels and 2 project entries.');
for(const p of cfg.projects){if(p.lines.length!==2)throw Error('Each project needs exactly two description lines.');if(p.url&&!/^https?:\/\//i.test(p.url))throw Error('Project URLs must start with https:// or http://.');}
if(cfg.photo.path){
  if(!/\.(jpe?g|png)$/i.test(cfg.photo.path))throw Error('Use a JPG, JPEG or PNG portrait.');
  if(!fs.existsSync(path.resolve(root,cfg.photo.path)))throw Error('Photo not found: '+cfg.photo.path);
  if(!(cfg.photo.width>0&&cfg.photo.height>0))throw Error('Set the photo width and height in pixels.');
  if(cfg.photo.crop!==null&&(!Array.isArray(cfg.photo.crop)||cfg.photo.crop.length!==4||cfg.photo.crop.some(n=>typeof n!=='number')||cfg.photo.crop[2]<=0||cfg.photo.crop[3]<=0))throw Error('Photo crop must be null or [x, y, width, height].');
}
require('./render-artwork.cjs');
const esc=s=>String(s).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
const github='https://github.com/'+cfg.username;
const section=(name,alt)=>`<picture>\n  <source media="(max-width: 600px)" srcset="./assets/${name}-mobile.svg" />\n  <img src="./assets/${name}.svg" width="100%" alt="${esc(alt)}" />\n</picture>`;
let readme='<!-- Generated from profile.config.json. Edit the config and rebuild. -->\n';
readme+=section('01-hero',cfg.firstName+' '+cfg.lastName+' — '+cfg.role)+'\n\n';
readme+=`<p align="center"><strong>${esc(cfg.summary)}</strong></p>\n\n<p align="center">\n`;
for(const [name,url,alt] of [['portfolio',cfg.website,'Visit my portfolio'],['repositories',github+'?tab=repositories','Explore my repositories'],['github',github,'Connect on GitHub']])readme+=`  <a href="${esc(url)}"><img src="./assets/badge-${name}.svg" height="36" alt="${alt}" /></a>\n`;
readme+='</p>\n\n'+section('02-vision',cfg.about.map(a=>a.title+': '+a.description).join('. '))+'\n\n';
readme+=section('03-stack',cfg.toolbox.map(t=>t.name+': '+t.detail).join('. '))+'\n\n';
readme+=section('04-projects',cfg.projects.map(p=>p.name+': '+p.lines.join(' ')).join('. '))+'\n\n';
const projectLinks=cfg.projects.filter(p=>p.url).map(p=>`<a href="${esc(p.url)}">${esc(p.name)} ↗</a>`);
if(projectLinks.length)readme+='<p align="center">'+projectLinks.join(' · ')+'</p>\n\n';
readme+=section('06-activity','Building in the open: GitHub activity')+'\n\n';
if(cfg.showStats&&!preview){
  const style='&amp;hide_border=true&amp;bg_color=0D1728&amp;title_color=178CFF&amp;text_color=F2F5FC';
  readme+=`<p align="center">\n<a href="${github}"><img src="https://github-readme-stats.vercel.app/api?username=${cfg.username}&amp;show_icons=true${style}" width="49%" alt="GitHub statistics" /></a>\n<a href="${github}"><img src="https://github-readme-stats.vercel.app/api/top-langs/?username=${cfg.username}&amp;layout=compact${style}" width="49%" alt="Most-used public-repository languages" /></a>\n</p>\n\n`;
}
readme+=`<p align="center"><a href="${github}">View my repositories and contributions on GitHub ↗</a></p>\n\n`;
readme+=`<a href="${esc(cfg.website)}">\n${section('05-connect','Visit '+cfg.firstName+' '+cfg.lastName+'’s portfolio')}\n</a>\n\n`;
readme+='<p align="center"><sub>Built with curiosity.</sub></p>\n';
fs.writeFileSync(path.join(root,'README.md'),readme);
console.log('Generated README.md and all profile artwork. Upload README.md, assets/, scripts/ and profile.config.json to your profile repository.');
