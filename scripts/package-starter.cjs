// Build the editable starter from the same renderer used by the personal profile.
const fs=require('node:fs'),path=require('node:path'),cp=require('node:child_process');
const root=path.resolve(__dirname,'..');
const staging=path.join(root,'.preview','github-profile-starter');
fs.mkdirSync(path.join(staging,'scripts'),{recursive:true});
fs.mkdirSync(path.join(staging,'assets'),{recursive:true});
const config={
  username:'YOUR_USERNAME',firstName:'Your',lastName:'Name',role:'Software Developer',
  focus:'BACKEND / WEB / AI',status:'OPEN TO COLLABORATE',
  tagline:'Building useful products. Exploring new ideas.',
  summary:'I build practical software and share what I learn.',
  website:'https://example.com',websiteLabel:'your-portfolio.com',
  photo:{path:'',width:1000,height:1000,crop:null},
  toolbelt:['Java','JavaScript','React','Python'],
  about:[
    {title:'What I build',description:'Useful applications and thoughtful interfaces.'},
    {title:'What I explore',description:'New tools, ideas and ways to solve problems.'},
    {title:'What I share',description:'My projects, experiments and learning notes.'}
  ],
  toolLabels:['JAVA','JS','PY','GIT','DB','AI'],
  toolbox:[
    {category:'Backend',name:'Java',detail:'Spring Boot · REST APIs'},
    {category:'Frontend',name:'JavaScript',detail:'React · HTML · CSS'},
    {category:'Data',name:'Python',detail:'SQL'},
    {category:'Workflow',name:'Git & GitHub',detail:'Version control'},
    {category:'Platform',name:'Your platform',detail:'Replace with your tools'},
    {category:'Exploring',name:'Your interest',detail:'Replace with your focus'}
  ],
  projects:[
    {name:'Project One',subtitle:'YOUR PROJECT CATEGORY',lines:['Explain a project you actually built.','Mention who it helps or what it solves.'],tags:'YOUR TECHNOLOGIES',url:''},
    {name:'Project Two',subtitle:'YOUR PROJECT CATEGORY',lines:['Describe your second project here.','Mark unfinished projects as in development.'],tags:'YOUR TECHNOLOGIES',url:''}
  ],
  showStats:false,showCalendar:false
};
fs.writeFileSync(path.join(staging,'profile.config.json'),JSON.stringify(config,null,2)+'\n');
fs.copyFileSync(path.join(root,'scripts','render-artwork.cjs'),path.join(staging,'scripts','render-artwork.cjs'));
fs.copyFileSync(path.join(root,'scripts','starter-build.cjs'),path.join(staging,'scripts','build-profile.cjs'));
for(const [source,target] of [['GITHUB-PROFILE-GUIDE.md','START-HERE.md'],['INSTAGRAM-REEL-KIT.md','REEL-KIT.md'],['GitHub-Profile-Guide.pdf','GitHub-Profile-Guide.pdf']]) {
  const file=path.join(root,'share',source);if(fs.existsSync(file))fs.copyFileSync(file,path.join(staging,target));
}
fs.writeFileSync(path.join(staging,'.gitignore'),'.DS_Store\nThumbs.db\n');
cp.execFileSync(process.execPath,[path.join(staging,'scripts','build-profile.cjs'),'--preview'],{cwd:staging,stdio:'inherit'});
console.log('Staged the burgundy starter at '+staging);
