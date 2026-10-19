const O=document.getElementById('office');
// zones in % of office
const Z=[["it","💻 ฝ่ายไอที",3,3,94,27],["ct","🎬 ฝ่ายคอนเทนต์",3,32,94,27],["sl","🛍️ ฝ่ายขาย",3,61,44,17],["ot","🎓 อื่นๆ / มุมเด็กฝึกงาน",49,61,48,36],["hall","☕ พักผ่อน",3,80,44,17]];
Z.forEach(([c,l,x,y,w,h])=>{const d=el('div','zone '+c,O);pos(d,x,y);d.style.width=w+'%';d.style.height=h+'%';el('div','lbl',d).textContent=l});
function el(t,c,p){const e=document.createElement(t);e.className=c;p&&p.appendChild(e);return e}
function pos(e,x,y){e.style.left=x+'%';e.style.top=y+'%'}
const A=[ // name,role,dept,desk x,y, avatar|null, hair, shirt, acc, big
["ซัส","หัวหน้าฝ่ายไอที — สร้างเกม แอป และเว็บ SUDGREEEK","ฝ่ายไอที",45,12,"sus","#3b6b3a","#f4f4f4","👑",1],
["ซันนี่","Born East Solutions — เว็บ KSquad HR Partner","ฝ่ายไอที (Born East Solutions)",20,24,"sunny","#e89aa8","#222","💻"],
["ซันชาย","Born East Solutions — ออกแบบโปรดักต์/ระบบ","ฝ่ายไอที (Born East Solutions)",75,24,"sunchai","#f7b2bd","#24305a","📐"],
["บ.ก ตี้","บรรณาธิการ เขียนสคริปต์ข่าว","ฝ่ายคอนเทนต์",15,42,null,"#222","#c0392b","📝"],
["ตี้ รูป","ถ่าย/ทำคลิปวิดีโออีเวนต์","ฝ่ายคอนเทนต์",38,42,null,"#5a3a1a","#2d7dd2","📷"],
["ตี้เสียง","พากย์เสียง Voiceover","ฝ่ายคอนเทนต์",62,42,null,"#111","#8e44ad","🎤"],
["ตี้โปรดักส์ชัน","ตัดต่อวิดีโอ","ฝ่ายคอนเทนต์",85,42,null,"#7a4b2a","#16a085","🎞️"],
["ตี้ mkt","โพสต์คลิปลง TikTok","ฝ่ายคอนเทนต์",50,54,null,"#c0392b","#f39c12","📱"],
["จีซัส","คิดไอเดียสินค้า เตรียมร้าน Etsy","ฝ่ายขาย",25,72,"jesus","#d2691e","#24305a","💡"],
["จีเนียส","พอร์ตโฟลิโอ เรซูเม่ และหางาน","อื่นๆ",62,71,"genius","#d9b04a","#f4f4f4","📄"],
["จัส","เลขาท่านตี้ (เด็กฝึกงาน)","อื่นๆ — มุมเด็กฝึกงาน",62,88,null,"#3d2314","#e84393","📋"],
["ไคโร","เด็กฝึกงาน","อื่นๆ — มุมเด็กฝึกงาน",85,88,null,"#555","#27ae60","🎒"]];
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
// furniture
A.forEach(a=>{const d=el('div','desk'+(a[9]?' big':''),O);pos(d,a[3]-(a[9]?10:6.5),a[4]-4);el('div','mon',d)});
const P=[["🪴",5,26],["🪴",90,5],["🪴",5,55],["🪴",90,55],["☕",8,84],["🛋️",30,90],["🪴",42,82],["🗄️",40,64],["🪴",92,93],["🎬",88,34]];
P.forEach(([e,x,y])=>{const p=el('div','prop',O);p.textContent=e;pos(p,x,y)});
const wb=el('div','wb',O);pos(wb,72,6);wb.style.width='20%';wb.style.height='7%';wb.textContent='TODO: เกม 🎮 / KSquad / SUDGREEEK';
const COFFEE=[11,89];
let ST={};
fetch('status.json?'+Date.now()).then(r=>r.json()).then(j=>ST=j.agents||{}).catch(()=>{});
const C=A.map(a=>{const c=el('div','ch typing',O);const h=el('div','head',c);
 if(a[5]){const i=el('img','',h);i.src='avatars/'+a[5]+'.png';i.alt=a[0]}else{el('div','hair',h).style.background=a[6];el('div','eyes',h)}
 el('div','body',c).style.background=a[7];el('div','legs',c);el('div','acc',c).textContent=a[8];el('div','tag',c).textContent=a[0];
 const o={a,c,x:a[3],y:a[4]+3,busy:0};pos(c,o.x,o.y);c.onclick=()=>show(a);return o});
function say(o,t){o.c.querySelector('.bubble')?.remove();const b=el('div','bubble',o.c);b.textContent=t;setTimeout(()=>b.remove(),3200)}
function line(o){const l=L[o.a[0]];return Math.random()<.2?GEN[Math.random()*GEN.length|0]:l[Math.random()*l.length|0]}
function go(o,x,y,cb){o.c.className='ch walk';o.x=x;o.y=y;pos(o.c,x,y);setTimeout(()=>{o.c.className='ch';cb&&cb()},2600)}
function tick(){const o=C[Math.random()*C.length|0];if(o.busy)return;const r=Math.random();
 if(r<.5){say(o,line(o))}
 else{o.busy=1;let tx,ty,t;if(r<.75){tx=COFFEE[0]+Math.random()*6;ty=COFFEE[1];t="☕ เติมพลังหน่อย"}else{const f=C[Math.random()*C.length|0];tx=f.x+5;ty=f.y+3;t=f===o?line(o):(f.a[0]+" "+line(o))}
  go(o,tx,ty,()=>{say(o,t);setTimeout(()=>go(o,o.a[3],o.a[4]+3,()=>{o.c.className='ch typing';o.busy=0}),3300)})}}
setInterval(tick,1300);
function show(a){const s=ST[a[0]]||{};const f=document.getElementById('cface');f.innerHTML=a[5]?`<img src="avatars/${a[5]}.png">`:a[8];
 cname.textContent=a[0];crole.textContent=a[1];cdept.textContent=a[2];cstatus.textContent='📌 '+(s.status||'กำลังทำงาน');
 cupd.textContent=s.updated?'อัปเดต: '+new Date(s.updated).toLocaleString('th-TH',{timeZone:'Asia/Bangkok'}):'';card.classList.remove('hidden')}
close.onclick=()=>card.classList.add('hidden');card.onclick=e=>{if(e.target===card)card.classList.add('hidden')};
function clockTint(){const n=new Date(),h=+n.toLocaleString('en-US',{timeZone:'Asia/Bangkok',hour:'numeric',hour12:false})%24;
 clock.textContent='🕐 '+n.toLocaleTimeString('th-TH',{timeZone:'Asia/Bangkok',hour:'2-digit',minute:'2-digit'})+' (เวลากรุงเทพฯ) '+(h>=19||h<6?'🌙':'☀️');
 tint.style.background=h>=19||h<6?'rgba(20,20,80,.35)':h>=17?'rgba(255,140,60,.15)':'transparent'}
clockTint();setInterval(clockTint,30000);
