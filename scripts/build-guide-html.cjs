const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname,'..');
const source = fs.readFileSync(path.join(root,'share','GITHUB-PROFILE-GUIDE.md'),'utf8');
const escape = s => s.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
function inline(value) {
  const code=[];
  value=value.replace(/`([^`]+)`/g,(_,s)=>{code.push('<code>'+escape(s)+'</code>');return '@@CODE'+(code.length-1)+'@@';});
  value=escape(value).replace(/\*\*([^*]+)\*\*/g,'<strong>$1</strong>').replace(/\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g,'<a href="$2">$1</a>');
  return value.replace(/@@CODE(\d+)@@/g,(_,n)=>code[n]);
}
const lines=source.split(/\r?\n/);let html='',paragraph=[],list=null;
const flush=()=>{if(paragraph.length){html+='<p>'+inline(paragraph.join(' '))+'</p>\n';paragraph=[];}if(list){html+='</'+list+'>\n';list=null;}};
for(let i=0;i<lines.length;i++){
  const line=lines[i];
  if(line.startsWith('```')){flush();const body=[];while(++i<lines.length&&!lines[i].startsWith('```'))body.push(lines[i]);html+='<pre><code>'+escape(body.join('\n'))+'</code></pre>\n';continue;}
  if(!line.trim()){flush();continue;}
  if(/^#{1,2} /.test(line)){flush();const level=line.startsWith('##')?2:1;const title=line.replace(/^#+ /,'');const pageStart=/^(4\.|6\.|8\.|Troubleshooting)/.test(title)?' class="page-start"':'';html+=`<h${level}${pageStart}>${inline(title)}</h${level}>\n`;continue;}
  if(line.startsWith('|')){flush();const rows=[];while(i<lines.length&&lines[i].startsWith('|'))rows.push(lines[i++]);i--;html+='<table>';rows.forEach((r,n)=>{if(n===1&&/^\|[\s:|-]+\|$/.test(r))return;html+='<tr>'+r.slice(1,-1).split('|').map(c=>`<${n?'td':'th'}>${inline(c.trim())}</${n?'td':'th'}>`).join('')+'</tr>';});html+='</table>\n';continue;}
  const item=line.match(/^(\d+\.|-) (.*)$/);
  if(item){if(paragraph.length){html+='<p>'+inline(paragraph.join(' '))+'</p>';paragraph=[];}const tag=item[1]==='-'?'ul':'ol';if(list!==tag){if(list)html+='</'+list+'>';html+='<'+tag+'>';list=tag;}html+='<li>'+inline(item[2])+'</li>\n';continue;}
  if(list){html+='</'+list+'>';list=null;}paragraph.push(line);
}
flush();
const document=`<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>GitHub Profile Setup Guide</title><style>
@page{size:A4;margin:16mm 15mm 18mm}*{box-sizing:border-box}body{margin:0;background:#e9eef5;color:#182334;font:15px/1.6 'Segoe UI',Arial,sans-serif}main{max-width:850px;margin:36px auto;background:white;padding:42px 48px;box-shadow:0 12px 40px #152d4a18}.eyebrow{color:#156bcc;font:700 12px/1.5 Consolas,monospace;letter-spacing:2px;border-top:5px solid #178cff;padding-top:16px}h1{font-size:38px;line-height:1.12;letter-spacing:-1px;margin:20px 0}h2{font-size:23px;line-height:1.3;color:#105eb0;border-top:1px solid #d8e2ef;padding-top:20px;margin-top:30px;break-after:avoid}p{margin:10px 0}a{color:#125fb2;text-decoration:underline;overflow-wrap:anywhere}code{font:12px/1.5 Consolas,'Liberation Mono',monospace;background:#edf3f9;padding:2px 4px;border-radius:3px;overflow-wrap:anywhere}pre{white-space:pre-wrap;overflow-wrap:anywhere;background:#0c192d;color:#eaf3ff;padding:16px;border-left:4px solid #178cff;border-radius:5px;break-inside:avoid}pre code{background:none;padding:0;color:inherit;font-size:12px}table{width:100%;border-collapse:collapse;margin:16px 0;font-size:13px}th,td{border:1px solid #d6e1ee;padding:9px 11px;text-align:left;vertical-align:top}th{background:#edf3fa;color:#0d559f}tr{break-inside:avoid}li{margin:6px 0}ul,ol{padding-left:24px}.footer{margin-top:32px;padding-top:14px;border-top:2px solid #ff4655;color:#546881;font-size:12px}@media print{body{background:white;font-size:10pt;line-height:1.45}main{max-width:none;margin:0;padding:0;box-shadow:none}h1{font-size:29pt}h2{font-size:16pt;margin-top:20px;padding-top:12px}.page-start{break-before:page}pre{padding:11px}pre code,code{font-size:8.5pt}table{font-size:9pt}th,td{padding:7px}a{color:#105aa8}.eyebrow{font-size:9pt}p,li{orphans:3;widows:3}}
</style></head><body><main><div class="eyebrow">THE GITHUB PROFILE STARTER / STEP-BY-STEP GUIDE</div>${html}<div class="footer">Personalize your details. Preview your artwork. Publish to your own username/username repository.<br>Official reference links are included in the relevant steps.</div></main></body></html>`;
fs.writeFileSync(path.join(root,'share','GITHUB-PROFILE-GUIDE.html'),document);
console.log('Created printable HTML guide.');
