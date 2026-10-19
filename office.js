
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
let ST={},TASKS=[],busyAll=0;
const N={};
const C=A.map(a=>{const c=el('div','ch typing'+(a[9]?' boss':''),layer);const im=el('img','spr',c);
 if(a[3]==='kairo')im.style.filter='hue-rotate(150deg) saturate(1.3)';
 if(a[4]){const b=el('div','badge',c);el('img','',b).src='avatars/'+a[4]+'.png'}
 el('div','tag',c).textContent=a[0];
 const o={a,c,im,x:a[5],y:a[6],busy:0};N[a[0]]=o;place(o);face(o,a[7]);c.style.zIndex=a[8];c.onclick=()=>show(o);return o});
const cls=o=>'ch'+(o.a[9]?' boss':'');
function place(o){o.c.style.left=o.x+'%';o.c.style.top=o.y+'%'}
function face(o,d){o.im.src=`art/chars/${o.a[3]}-${d}.png`}
function dir(dx,dy){return dy<0?(dx>=0?'rear-right':'rear-left'):(dx>=0?'front-right':'front-left')}
function fx(o,n,ms){o.c.querySelector('.fx')?.remove();if(!n)return;const f=el('img','fx',o.c);f.src='art/fx/'+n+'.png';if(ms)setTimeout(()=>f.remove(),ms)}
function bubble(o,t,ms=3400){o.c.querySelector('.bubble')?.remove();const b=el('div','bubble',o.c);b.textContent=t;o.c.style.zIndex=1000;setTimeout(()=>{b.remove();o.c.style.zIndex=o.home?o.a[8]:Math.round(o.y)},ms)}
const wait=ms=>new Promise(r=>setTimeout(r,ms));
function go(o,x,y){o.home=0;face(o,dir(x-o.x,y-o.y));o.c.className=cls(o)+' walk';o.x=x;o.y=y;place(o);o.c.style.zIndex=Math.round(y);return wait(2500).then(()=>o.c.className=cls(o))}
async function home(o){await go(o,o.a[5],o.a[6]);face(o,o.a[7]);o.c.className=cls(o)+' typing';o.c.style.zIndex=o.a[8];o.home=1}
C.forEach(o=>o.home=1);
function night(){const h=+new Date().toLocaleString('en-US',{timeZone:'Asia/Bangkok',hour:'numeric',hour12:false})%24;return h>=20||h<7}
// ---------- chat panel (layout inspired by Claude-Office's Slack-style panel, MIT) ----------
const feed=$('feed'),typing=$('typing');
const DEPT=a=>a[2].includes('ไอที')?['ไอที','#3b82f6']:a[2].includes('คอนเทนต์')?['คอนเทนต์','#ef4444']:a[2].includes('ขาย')?['ขาย','#22c55e']:a[2].includes('ฝึกงาน')?['ฝึกงาน','#a855f7']:['อื่นๆ','#64748b'];
const now=()=>new Date().toLocaleTimeString('th-TH',{timeZone:'Asia/Bangkok',hour:'2-digit',minute:'2-digit'});
let last=null;
function avatarEl(o,p){const av=el('div','av',p);av.style.backgroundColor=o?DEPT(o.a)[1]+'33':'#f59e0b33';av.style.borderColor=o?DEPT(o.a)[1]:'#f59e0b';if(!o){av.textContent='👑';av.classList.add('boss')}else if(o.a[4])av.style.backgroundImage=`url(avatars/${o.a[4]}.png)`;else{av.style.backgroundImage=`url(art/chars/${o.a[3]}-front-left.png)`;av.classList.add('crop')}return av}
function post(o,text,opt={}){const who=o?o.a[0]:'ท่านตี้';const m=el('div','msg'+(opt.sys?' sys':''));
 if(last===who&&!opt.sys){m.classList.add('cont')}else{avatarEl(o,m)}
 const d=el('div','mb',m);
 if(!m.classList.contains('cont')){const h=el('div','mh',d);const n=el('b','',h);n.textContent=o?who:'👑 ท่านตี้';
  const [t,c]=o?DEPT(o.a):['สั่งงาน','#f59e0b'];n.style.color=c;const tg=el('span','rt',h);tg.textContent=t;tg.style.color=c;tg.style.borderColor=c;el('small','',h).textContent=now()}
 if(!o)m.classList.add('bossmsg');
 el('div','mt',d).textContent=text;
 if(opt.react||(!opt.noreact&&Math.random()<.15)){const r=el('div','reacts',d);(opt.react||[['👍','🔥','😂','💯','❤️','👀'][Math.random()*6|0]]).forEach(e=>{const p=el('span','pill',r);p.textContent=e+' '+(1+Math.random()*4|0);p.onclick=()=>p.classList.toggle('me')})}
 if(opt.thread)el('div','thread',d).textContent='💬 '+opt.thread+' ตอบกลับ';
 last=opt.sys?null:who;feed.appendChild(m);while(feed.children.length>80)feed.firstChild.remove();
 if(feed.scrollHeight-feed.scrollTop-feed.clientHeight<160)feed.scrollTop=feed.scrollHeight;
 blip();if($('tab-board').classList.contains('on'))$('dot').hidden=false}
async function speak(name,text,opt){const o=N[name];if(!o)return;typing.textContent=name+' กำลังพิมพ์...';typing.classList.add('on');await wait(900+Math.min(1600,text.length*25));typing.classList.remove('on');bubble(o,text);post(o,text,opt);await wait(1700)}
function notice(t){const m=el('div','notice',feed);m.textContent=t;last=null;feed.scrollTop=feed.scrollHeight}
let snd=0,ac;$('snd').onclick=()=>{snd=!snd;$('snd').textContent=snd?'🔊':'🔇'};
function blip(){if(!snd)return;ac=ac||new AudioContext();const o=ac.createOscillator(),g=ac.createGain();o.frequency.value=880;g.gain.setValueAtTime(.05,ac.currentTime);g.gain.exponentialRampToValueAtTime(.001,ac.currentTime+.12);o.connect(g).connect(ac.destination);o.start();o.stop(ac.currentTime+.13)}
function meters(){const T=TASKS,doing=T.filter(t=>t.state==='doing').length,done=T.filter(t=>t.state==='done').length,tot=T.length||1;
 const act=Object.entries(ST).filter(([k,v])=>N[k]&&Date.now()-new Date(v.updated)<864e5).length;
 const card=(l,v,sub,p)=>`<div class="mc"><div class="ml">${l}</div><div class="mv">${v}</div><div class="bar"><i style="width:${Math.round(p*100)}%"></i></div><div class="ms">${sub}</div></div>`;
 $('mcards').innerHTML=card('งานกำลังทำ',doing,'จาก '+T.length+' งาน',doing/tot)+card('เสร็จแล้ว',done,'จาก '+T.length+' งาน',done/tot)+card('ออนไลน์',act+'/'+A.length,'อัปเดตใน 24 ชม.',act/A.length);
 $('mrows').innerHTML=['ไอที','คอนเทนต์','ขาย','ฝึกงาน'].map(d=>{const mem=C.filter(o=>DEPT(o.a)[0]===d),names=mem.map(o=>o.a[0]),open=T.filter(t=>names.includes(t.owner)&&t.state!=='done').length,c=DEPT(mem[0].a)[1];
  return `<div class="mr"><span>${d}</span><div class="bar"><i style="width:${Math.round(mem.length/A.length*100)}%;background:${c}"></i></div><span>${mem.length} คน</span><span>${open} งานค้าง</span></div>`}).join('')}
// ---------- scripted dialogues: [walker, target, [[speaker,text],...]] ----------
const D=[
['บ.ก ตี้','ตี้เสียง',[['บ.ก ตี้','สคริปต์ข่าวรอบนี้เสร็จแล้ว ฝากพากย์ด้วยนะ 📝'],['ตี้เสียง','รับทราบ! เดี๋ยวเข้าห้องอัดเลย 🎙️'],['ตี้โปรดักส์ชัน','อัดเสร็จส่งไฟล์มาเลย จะได้ตัดต่อต่อ ✂️']]],
['ซัส','ซันนี่',[['ซัส','ขอดูหน้าเว็บ KSquad หน่อย'],['ซันนี่','นี่ครับพี่ ปรับ responsive แล้ว 📱'],['ซัส','ดีมาก! ปุ่มขยายอีกนิดนะ 👍']]],
['ซัส','ซันชาย',[['ซัส','ดีไซน์ระบบใหม่ไปถึงไหนแล้ว?'],['ซันชาย','wireframe เสร็จแล้วค่ะ รอรีวิว 🧩'],['ซัส','flow สวยเลย ลุยต่อ 🚀']]],
['ไคโร','จัส',[['ไคโร','พี่จัส กาแฟอยู่ตรงไหนครับ ☕'],['จัส','มุมขวานะ ข้างปริ้นเตอร์ เดี๋ยวพาไป'],['ไคโร','ขอบคุณครับ 🙏']]],
['จีซัส','ซัส',[['จีซัส','มีไอเดียสินค้าใหม่สำหรับร้าน Etsy 💡'],['ซัส','เล่ามาเลย'],['จีซัส','ของน่ารัก ๆ ทำ mockup ก่อน 🛍️'],['ซัส','น่าสนใจ ทำตัวอย่างมาดูกัน']]],
['ตี้ รูป','ตี้โปรดักส์ชัน',[['ตี้ รูป','ฟุตเทจอีเวนต์มาแล้ว 🎥'],['ตี้โปรดักส์ชัน','เยอะมาก! เลือกช็อตเด็ดให้หน่อย'],['ตี้ รูป','คั่นไว้ในโฟลเดอร์แล้ว 😉']]],
['ตี้โปรดักส์ชัน','ตี้ mkt',[['ตี้โปรดักส์ชัน','คลิปตัดเสร็จแล้ว พร้อมโพสต์ 🎞️'],['ตี้ mkt','เยี่ยม! ลงช่วงหัวค่ำดีกว่า 📈'],['บ.ก ตี้','อย่าลืมแคปชันตามสคริปต์นะ']]],
['ตี้ mkt','บ.ก ตี้',[['ตี้ mkt','คลิปเมื่อวานยอดวิวขึ้นดีเลย 🔥'],['บ.ก ตี้','เยี่ยม! ทำแนวนี้ต่อ'],['ตี้เสียง','เสียงพากย์คงช่วยด้วยแหละ 😆']]],
['จีเนียส','ซันชาย',[['จีเนียส','ช่วยดูพอร์ตโฟลิโอให้หน่อยได้ไหม 📄'],['ซันชาย','ได้เลย เลย์เอาต์อ่านง่ายดี'],['จีเนียส','ขอบคุณมาก! 🙌']]],
['จัส','ซัส',[['จัส','พี่ซัส ท่านตี้ฝากเตือนประชุมนะคะ 📅'],['ซัส','โอเค ขอบใจนะจัส'],['จัส','จดไว้ให้แล้วค่ะ ✍️']]],
['ซันนี่','ซันชาย',[['ซันนี่','สีชมพูธีมนี้โอเคไหม 💗'],['ซันชาย','โอเคมาก เข้ากับผมเราด้วย 😂'],['ซันนี่','งั้นใช้เลย!']]],
['ตี้เสียง','บ.ก ตี้',[['ตี้เสียง','พากย์เสร็จแล้วครับ ✅'],['บ.ก ตี้','ฟังแล้วชัดมาก'],['ตี้โปรดักส์ชัน','รับไฟล์แล้ว เริ่มตัดเลย ✂️']]],
['ไคโร','ซันนี่',[['ไคโร','พี่ซันนี่ CSS คืออะไรครับ 🤔'],['ซันนี่','ตัวแต่งหน้าตาเว็บไง เดี๋ยวสอน'],['ไคโร','ว้าว อยากลองครับ!']]],
['จีซัส','ตี้ mkt',[['จีซัส','ถ้าเปิดร้าน Etsy ช่วยโปรโมตใน TikTok ได้ไหม'],['ตี้ mkt','ได้สิ! ทำคลิปรีวิวสินค้าเลย 📱'],['จีซัส','ดีลนะ 🤝']]],
['บ.ก ตี้','ตี้ รูป',[['บ.ก ตี้','อีเวนต์หน้ามีช็อตไหนต้องเก็บบ้าง?'],['ตี้ รูป','บรรยากาศ คนมาร่วม และช็อตปิด 📷'],['บ.ก ตี้','เยี่ยม จะเขียนสคริปต์ให้ตรงกัน']]],
['จัส','ไคโร',[['จัส','ไคโร ช่วยจัดแฟ้มหน่อยนะ 🗂️'],['ไคโร','ได้ครับพี่!'],['จัส','เก่งมาก 👏']]],
['ซันชาย','ซัส',[['ซันชาย','พี่ซัส ระบบนี้ควรมีหน้า dashboard ไหมคะ'],['ซัส','มีดีกว่า ผู้ใช้ดูง่าย'],['ซันชาย','งั้นออกแบบเพิ่มค่ะ 📐']]],
['ซัส','จีเนียส',[['ซัส','จีเนียส หางานเป็นไงบ้าง'],['จีเนียส','ส่งใบสมัครไปหลายที่แล้วครับ 📨'],['ซัส','สู้ ๆ นะ 💪']]],
['ตี้ mkt','ตี้ รูป',[['ตี้ mkt','ขอภาพปกคลิปหน่อย 🖼️'],['ตี้ รูป','ส่งให้ 3 แบบเลือกได้'],['ตี้ mkt','แบบที่ 2 ปังสุด!']]],
['ไคโร','จีซัส',[['ไคโร','พี่จีซัส Etsy ขายอะไรครับ'],['จีซัส','ของแฮนด์เมดกับดีไซน์น่ารัก ๆ 🎨'],['ไคโร','น่าสนุกจัง!']]],
['ตี้โปรดักส์ชัน','ตี้เสียง',[['ตี้โปรดักส์ชัน','ช่วงกลางเสียงเบาไปนิด อัดใหม่ได้ไหม'],['ตี้เสียง','ได้เลย ขอกาแฟก่อน ☕'],['ตี้โปรดักส์ชัน','ฮ่า ๆ ไม่รีบ 😆']]],
['จีเนียส','จัส',[['จีเนียส','จัส มีปฏิทินว่างช่วงไหนบ้าง'],['จัส','บ่ายพรุ่งนี้ว่างค่ะ 📅'],['จีเนียส','ขอบคุณ ฝากนัดสัมภาษณ์ไว้นะ']]]];
let running=0,qi=Math.random()*D.length|0;
async function dialogue(d){running=1;const [w,t,lines]=d,W=N[w],T=N[t];
 await go(W,T.x+3.2,T.y+1.8);face(W,'rear-left');face(T,'front-right');
 for(const [s,x] of lines)await speak(s,x,Math.random()<.15?{thread:1+Math.random()*3|0}:{});
 await home(W);face(T,T.a[7]);running=0}
async function solo(){const o=C[Math.random()*C.length|0];if(!o.home||running)return;const r=Math.random();
 if(r<.5){running=1;await go(o,...SPOTS.coffee[Math.random()*2|0]);fx(o,'need-coffee',2400);bubble(o,'☕ เติมพลังหน่อย');await wait(2800);await home(o);running=0}
 else{o.c.className=cls(o);fx(o,'sleeping');bubble(o,'💤');await wait(night()?9000:5000);fx(o);o.c.className=cls(o)+' typing'}}
async function loop(){while(1){await wait(2500+Math.random()*3500);if(busyAll)continue;if(Math.random()<.7){await dialogue(D[qi++%D.length])}else solo()}}
// ---------- status.json ----------
function renderBoard(){['todo','doing','done'].forEach(s=>$('t-'+s).innerHTML='');const T=TASKS.length?TASKS:Object.entries(ST).map(([k,v])=>({text:v.status,owner:k,state:'doing'}));
 T.forEach(t=>{const ul=$('t-'+(t.state||'todo'));if(!ul)return;const li=el('li','',ul);li.textContent=t.text;if(t.owner)el('i','',li).textContent='— '+t.owner})}
let first=1;
function poll(){fetch('status.json?t='+Date.now(),{cache:'no-store'}).then(r=>r.json()).then(j=>{const ag=j.agents||{};
 let ch=Object.entries(ag).filter(([k,v])=>N[k]&&(first||!ST[k]||ST[k].status!==v.status||ST[k].updated!==v.updated)).sort((a,b)=>new Date(a[1].updated)-new Date(b[1].updated));if(first)ch=ch.slice(-3);
 ch.forEach(([k,v])=>post(N[k],(first?'📌 ':'⚡ ')+v.status,{noreact:1}));
 const nt=j.tasks||[];if(!first)nt.forEach(t=>{const o=TASKS.find(x=>x.text===t.text);if(t.state==='done'&&(!o||o.state!=='done'))notice('✅ '+(t.owner?t.owner+' ':'')+t.text+' เสร็จแล้ว')});
 ST=ag;TASKS=j.tasks||[];renderBoard();meters();first=0}).catch(()=>{})}
poll();setInterval(poll,60000);
// ---------- boss composer ----------
const R={gen:['รับทราบครับท่านตี้ 🙏','ได้เลยค่ะ! ✨','จัดให้เลยครับ 💪','ขอบคุณค่ะท่านตี้ 🥰','เข้าใจแล้วครับ 👍'],
 coffee:['ไปชงกาแฟกันเลย ☕','เอาลาเต้ค่ะ! 🥛','ขอบคุณครับท่านตี้ ☕💕'],meet:['ไปห้องประชุมเลยค่ะ 📋','มาแล้วครับ!','พร้อมประชุมครับ 🙋'],
 bye:['บ๊ายบายค่ะท่านตี้ 👋','กลับบ้านปลอดภัยนะครับ 🏠','เจอกันพรุ่งนี้ค่ะ 😊']};
const pick=a=>a[Math.random()*a.length|0];
$('composer').onsubmit=async e=>{e.preventDefault();const inp=$('msgin'),t=inp.value.trim();if(!t)return;inp.value='';
 post(null,t);busyAll=1;C.forEach(o=>{if(o.home){face(o,'rear-right');bubble(o,'👀',1500)}});await wait(1200);
 const named=C.filter(o=>t.includes(o.a[0]));let who=named.length?named:[...C].sort(()=>Math.random()-.5).slice(0,1+Math.random()*3|0);
 if(/กาแฟ/.test(t)){for(const o of who)speak(o.a[0],pick(R.coffee));await Promise.all(who.map((o,i)=>go(o,SPOTS.coffee[i%2][0]+i*1.5,SPOTS.coffee[i%2][1]+i)));await wait(2500);await Promise.all(who.map(home))}
 else if(/ประชุม/.test(t)){const ps=C.map((o,i)=>{const a=i/C.length*6.28;return go(o,58+Math.cos(a)*9,58+Math.sin(a)*6)});for(const o of who.slice(0,2))await speak(o.a[0],pick(R.meet));await Promise.all(ps);C.forEach(o=>face(o,o.x<58?'front-right':'front-left'));await wait(4000);await Promise.all(C.map(home))}
 else if(/กลับบ้าน|บาย/.test(t)){C.forEach(o=>bubble(o,'👋',3000));for(const o of who)await speak(o.a[0],pick(R.bye))}
 else for(const o of who)await speak(o.a[0],named.length?`ครับ/ค่ะท่านตี้ ${pick(['รับทราบ 🙏','กำลังทำอยู่เลย 💪','เดี๋ยวจัดการให้ ✨'])}`:pick(R.gen));
 C.forEach(o=>{if(o.home)face(o,o.a[7])});busyAll=0};
// ---------- card / clock / tabs ----------
function show(o){const a=o.a,s=ST[a[0]]||{};const f=$('cface');f.innerHTML='';const i=el('img',a[4]?'':'sp',f);i.src=a[4]?`avatars/${a[4]}.png`:`art/chars/${a[3]}-front-left.png`;
 $('cname').textContent=a[0];$('crole').textContent=a[1];$('cdept').textContent=a[2];$('cstatus').textContent='📌 '+(s.status||'กำลังทำงาน');
 $('cupd').textContent=s.updated?'อัปเดต: '+new Date(s.updated).toLocaleString('th-TH',{timeZone:'Asia/Bangkok'}):'';$('card').classList.remove('hidden')}
$('close').onclick=()=>$('card').classList.add('hidden');$('card').onclick=e=>{if(e.target.id==='card')$('card').classList.add('hidden')};
function clock(){const n=new Date(),h=+n.toLocaleString('en-US',{timeZone:'Asia/Bangkok',hour:'numeric',hour12:false})%24,nt=h>=19||h<6;
 $('clock').textContent='🕐 '+n.toLocaleTimeString('th-TH',{timeZone:'Asia/Bangkok',hour:'2-digit',minute:'2-digit'})+' (เวลากรุงเทพฯ) '+(nt?'🌙':'☀️');
 const want='art/room/'+(nt?'night':'day')+'.jpg';if(!$('room').src.endsWith(want))$('room').src=want;
 $('tint').style.background=nt?'rgba(20,20,70,.25)':h>=17?'rgba(255,140,60,.12)':'transparent'}
clock();setInterval(clock,30000);
document.querySelectorAll('.tab').forEach(b=>b.onclick=()=>{document.querySelectorAll('.tab').forEach(x=>x.classList.toggle('on',x===b));$('v-chat').hidden=b.id!=='tab-chat';$('v-board').hidden=b.id!=='tab-board';if(b.id==='tab-chat'){$('dot').hidden=true;feed.scrollTop=feed.scrollHeight}});
$('members').textContent=A.length;
const w=$('wrap');requestAnimationFrame(()=>w.scrollLeft=(w.scrollWidth-w.clientWidth)/2);
setTimeout(()=>speak('ซัส','อรุณสวัสดิ์ทีม! ☀️ วันนี้ลุยกัน',{react:['☀️','💪']}),800);setTimeout(loop,4000);
