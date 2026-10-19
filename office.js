
const $=id=>document.getElementById(id);
const scene=$('scene'),layer=$('layer');
function el(t,c,p){const e=document.createElement(t);if(c)e.className=c;p&&p.appendChild(e);return e}
// Furniture (positions/sizes ported from Claude-Office rooms.ts/assets.ts; % of room, height in cqw)
const F=[['standing-desk-left-rear',42.4,50.4,12.75],['standing-desk-left-front',46.7,53,13.25],['standing-desk-right-front',39.9,55.2,13.25],
['standing-desk-left-rear',31.4,64.8,12.75],['standing-desk-left-front',35.4,67.5,13.25],['standing-desk-right-front',27.9,70,13.25],
['standing-desk-left-rear',59,73.7,12.75],['standing-desk-left-front',62.6,76,13.25],['standing-desk-right-front',55.4,78.7,13.25],['standing-desk-right-rear',66.6,71.1,12.75],
['coffee-on',78.5,50.2,6.4],['filling-closed',45,56.5,7],['monstera-plant',91.9,64.7,8.9],['snake-plant',43.2,37.9,7.9],['money-tree',32,71.2,7.9],['monstera-plant',60.2,80.4,8.9],['printer-working',85.4,56.8,8.6],['snake-plant',14,58,7.9]];
F.forEach(([s,x,y,h])=>{const f=el('div','f',layer);f.style.cssText=`left:${x}%;top:${y}%;height:${h}cqw;z-index:${Math.round(y)}`;el('img','',f).src='art/furn/'+s+'.png'});
const ZL=[['💻 ฝ่ายไอที',43,36,'#3b6fd8'],['🎬 ฝ่ายคอนเทนต์',61,62,'#d8553b'],['🛍️ ขาย & อื่นๆ',30,52,'#2f9e5b'],['🎓 มุมเด็กฝึกงาน',86,52,'#8b52d8'],['☕ มุมกาแฟ',76,41,'#a0703b']];
ZL.forEach(([t,x,y,c])=>{const z=el('div','zl',layer);z.textContent=t;z.style.cssText=`left:${x}%;top:${y}%;background:${c}`});
// name, role, dept, sprite, avatar, seat x,y, facing, z, boss
const A=[
['ซัส','หัวหน้าฝ่ายไอที — สร้างเกม แอป และเว็บ SUDGREEEK','ฝ่ายไอที','sus','sus',38.8,43.6,'front-left',30,1],
['ซันนี่','Born East Solutions — เว็บ KSquad HR Partner','ฝ่ายไอที (Born East Solutions)','sunny','sunny',38.5,55.2,'rear-left',58],
['ซันชาย','Born East Solutions — ออกแบบโปรดักต์/ระบบ','ฝ่ายไอที (Born East Solutions)','sunchai','sunchai',48.9,52.9,'rear-right',70],
['บ.ก ตี้','บรรณาธิการ เขียนสคริปต์ข่าว','ฝ่ายคอนเทนต์','editor',null,55.2,66.8,'front-left',55],
['ตี้ รูป','ทำคลิปวิดีโออีเวนต์','ฝ่ายคอนเทนต์','photo',null,68.7,66.2,'front-right',55],
['ตี้เสียง','พากย์เสียง Voiceover','ฝ่ายคอนเทนต์','voice',null,52.7,78.8,'rear-left',95],
['ตี้โปรดักส์ชัน','ตัดต่อวิดีโอ','ฝ่ายคอนเทนต์','prod',null,65.9,75.8,'rear-right',95],
['ตี้ mkt','โพสต์คลิปลง TikTok','ฝ่ายคอนเทนต์','mkt',null,26.9,59.2,'front-left',40],
['จีซัส','คิดไอเดียสินค้า เตรียมร้าน Etsy','ฝ่ายขาย','jesus','jesus',25.8,71,'rear-left',85],
['จีเนียส','พอร์ตโฟลิโอ เรซูเม่ และหางาน','อื่นๆ','genius','genius',37.9,68.2,'rear-right',85],
['จัส','เลขาท่านตี้ (เด็กฝึกงาน)','อื่นๆ — มุมเด็กฝึกงาน','jas',null,81,63,'rear-left',63],
['ไคโร','เด็กฝึกงาน','อื่นๆ — มุมเด็กฝึกงาน','kairo',null,87,61,'front-right',61]];
const L={
"ซัส":["เกมใหม่ใกล้เสร็จแล้ว 🎮","เว็บ SUDGREEEK ขึ้นแล้ว!","ใครเห็นบั๊กบอกพี่นะ 🐛","รีวิวโค้ดให้หน่อย","deploy เลย! 🚀"],
"ซันนี่":["หน้า KSquad สวยขึ้นแล้ว ✨","แก้ CSS อีกนิด","responsive ok แล้ว 📱","ซันชาย ดูดีไซน์นี้หน่อย"],
"ซันชาย":["ลองวาง flow ใหม่ดู 🧩","สีชมพูนี่แหละ 💗","wireframe เสร็จแล้ว!","ผู้ใช้ต้องกดง่ายขึ้น"],
"บ.ก ตี้":["สคริปต์ข่าววันนี้มาแล้ว 📰","พาดหัวแบบนี้ปังไหม?","ตัดให้สั้นลงอีก 15 วิ","เช็กข้อมูลก่อนนะ"],
"ตี้ รูป":["ได้ฟุตเทจอีเวนต์มาแล้ว 🎥","มุมนี้สวยมาก","แบตกล้องหมด 😅","ส่งไฟล์ให้ตัดต่อแล้ว"],
"ตี้เสียง":["เทสต์ ๆ ไมค์ 1 2 3 🎙️","อัดเสียงใหม่อีกเทค","เสียงแหบนิดหน่อย ☕","พากย์เสร็จแล้ว!"],
"ตี้โปรดักส์ชัน":["เรนเดอร์อยู่... ⏳","ใส่ซับให้แล้ว","จังหวะตัดต้องเป๊ะ ✂️","คลิปพร้อมโพสต์!"],
"ตี้ mkt":["โพสต์ TikTok แล้ว 📈","แฮชแท็กอะไรดี?","ยอดวิวกำลังขึ้น 🔥","ลงคลิปตอนสองทุ่มนะ"],
"จีซัส":["ไอเดียสินค้าใหม่! 💡","ร้าน Etsy เร็ว ๆ นี้ 🛍️","ลูกค้าน่าจะชอบแบบนี้","ทำ mockup ก่อน"],
"จีเนียส":["อัปเดตเรซูเม่แล้ว 📄","เจองานน่าสนใจ 👀","พอร์ตต้องเพิ่มผลงาน","ส่งใบสมัครแล้ว!"],
"จัส":["ท่านตี้มีประชุมบ่ายนี้ค่ะ 📅","จดโน้ตไว้แล้ว","เดี๋ยวเตือนนะคะ ⏰","ตารางวันนี้แน่นมาก"],
"ไคโร":["ขอเรียนรู้ด้วยครับ 🙏","อันนี้ทำยังไงครับ?","ฝึกงานสนุกมาก 😆","ไปชงกาแฟให้ไหมครับ"]};
const GEN=["☕ ขอกาแฟก่อน","😴 ง่วงจัง","🍜 เที่ยงนี้กินอะไรดี","👍 สู้ ๆ","🎉 เย้!","💪 ลุยต่อ"];

const SPOTS={coffee:[[73.5,56.7],[76.2,58.4]],water:[[53.3,46.6],[56,47.7]]};
let ST={};
const C=A.map(a=>{const c=el('div','ch typing'+(a[9]?' boss':''),layer);const im=el('img','spr',c);
 if(a[3]==='kairo')im.style.filter='hue-rotate(150deg) saturate(1.3)';
 if(a[4]){const b=el('div','badge',c);el('img','',b).src='avatars/'+a[4]+'.png'}
 el('div','tag',c).textContent=a[0];
 const o={a,c,im,x:a[5],y:a[6],busy:0};place(o);face(o,a[7]);c.style.zIndex=a[8];c.onclick=()=>show(o);return o});
function place(o){o.c.style.left=o.x+'%';o.c.style.top=o.y+'%'}
function face(o,d){o.im.src=`art/chars/${o.a[3]}-${d}.png`}
function dir(dx,dy){return dy<0?(dx>=0?'rear-right':'rear-left'):(dx>=0?'front-right':'front-left')}
function fx(o,n,ms){o.c.querySelector('.fx')?.remove();if(!n)return;const f=el('img','fx',o.c);f.src='art/fx/'+n+'.png';if(ms)setTimeout(()=>f.remove(),ms)}
function say(o,t){o.c.querySelector('.bubble')?.remove();const b=el('div','bubble',o.c);b.textContent=t;o.c.style.zIndex=1000;setTimeout(()=>{b.remove();if(!o.busy)o.c.style.zIndex=o.a[8]},3200);post(o,t)}
function line(o){const l=L[o.a[0]];return Math.random()<.18?GEN[Math.random()*GEN.length|0]:l[Math.random()*l.length|0]}
function go(o,x,y,cb){face(o,dir(x-o.x,y-o.y));o.c.className='ch walk'+(o.a[9]?' boss':'');o.x=x;o.y=y;place(o);o.c.style.zIndex=Math.round(y);setTimeout(cb,2500)}
function home(o){go(o,o.a[5],o.a[6],()=>{face(o,o.a[7]);o.c.className='ch typing'+(o.a[9]?' boss':'');o.c.style.zIndex=o.a[8];o.busy=0})}
function night(){const h=+new Date().toLocaleString('en-US',{timeZone:'Asia/Bangkok',hour:'numeric',hour12:false})%24;return h>=20||h<7}
function tick(){const o=C[Math.random()*C.length|0];if(o.busy)return;const r=Math.random();
 if(r<.45){say(o,line(o));if(Math.random()<.3)fx(o,['typing','star','thumb-up','rocket','post-it'][Math.random()*5|0],3000)}
 else if(r<.53){o.busy=1;o.c.className='ch';fx(o,'sleeping');say(o,'💤 งีบแป๊บ...');setTimeout(()=>{fx(o);o.c.className='ch typing'+(o.a[9]?' boss':'');o.busy=0},night()?9000:5000)}
 else{o.busy=1;let p,t;
  if(r<.75){p=SPOTS.coffee[Math.random()*2|0];fx(o,'need-coffee',2400);t='☕ เติมพลังหน่อย'}
  else if(r<.83){p=SPOTS.water[Math.random()*2|0];t='💧 ดื่มน้ำก่อน'}
  else{const f=C[Math.random()*C.length|0];if(f===o){o.busy=0;return}p=[f.x+3,f.y+1.5];t=f.a[0]+' — '+line(o)}
  go(o,p[0],p[1],()=>{o.c.className='ch'+(o.a[9]?' boss':'');say(o,t);setTimeout(()=>home(o),3400)})}}
setInterval(tick,1400);setTimeout(()=>{say(C[0],'อรุณสวัสดิ์ทีม! ☀️');say(C[3],L['บ.ก ตี้'][0])},600);
// chat feed
const feed=$('feed');$('online').textContent='● ออนไลน์ '+A.length+' คน';
function post(o,t){const m=el('div','msg');const av=el('div','av',m);av.style.backgroundImage=o.a[4]?`url(avatars/${o.a[4]}.png)`:`url(art/chars/${o.a[3]}-front-left.png)`;if(!o.a[4]){av.style.backgroundSize='220%';av.style.backgroundPosition='50% 8%'}
 const d=el('div','',m);const n=el('b','',d);n.textContent=o.a[0];const s=el('small','',d);s.textContent=new Date().toLocaleTimeString('th-TH',{timeZone:'Asia/Bangkok',hour:'2-digit',minute:'2-digit'});el('div','',d).textContent=t;
 feed.prepend(m);while(feed.children.length>40)feed.lastChild.remove()}
// status + board
fetch('status.json?'+Date.now()).then(r=>r.json()).then(j=>{ST=j.agents||{};const T=j.tasks||Object.entries(ST).map(([k,v])=>({text:v.status,owner:k,state:'doing'}));
 T.forEach(t=>{const ul=$('t-'+(t.state||'todo'));if(!ul)return;const li=el('li','',ul);li.textContent=t.text;if(t.owner)el('i','',li).textContent='— '+t.owner})}).catch(()=>{});
function show(o){const a=o.a,s=ST[a[0]]||{};const f=$('cface');f.innerHTML='';const i=el('img',a[4]?'':'sp',f);i.src=a[4]?`avatars/${a[4]}.png`:`art/chars/${a[3]}-front-left.png`;
 $('cname').textContent=a[0];$('crole').textContent=a[1];$('cdept').textContent=a[2];$('cstatus').textContent='📌 '+(s.status||'กำลังทำงาน');
 $('cupd').textContent=s.updated?'อัปเดต: '+new Date(s.updated).toLocaleString('th-TH',{timeZone:'Asia/Bangkok'}):'';$('card').classList.remove('hidden')}
$('close').onclick=()=>$('card').classList.add('hidden');$('card').onclick=e=>{if(e.target.id==='card')$('card').classList.add('hidden')};
function clock(){const n=new Date(),h=+n.toLocaleString('en-US',{timeZone:'Asia/Bangkok',hour:'numeric',hour12:false})%24,nt=h>=19||h<6;
 $('clock').textContent='🕐 '+n.toLocaleTimeString('th-TH',{timeZone:'Asia/Bangkok',hour:'2-digit',minute:'2-digit'})+' (เวลากรุงเทพฯ) '+(nt?'🌙':'☀️');
 const want='art/room/'+(nt?'night':'day')+'.jpg';if(!$('room').src.endsWith(want))$('room').src=want;
 $('tint').style.background=nt?'rgba(20,20,70,.25)':h>=17?'rgba(255,140,60,.12)':'transparent'}
clock();setInterval(clock,30000);
const w=$('wrap');requestAnimationFrame(()=>w.scrollLeft=(w.scrollWidth-w.clientWidth)/2);
