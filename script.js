/* Leo Cafe menu
   1) MENU DATA: edit names and prices in the list S below.
   2) Everything under "PAGE LOGIC" builds the page and the navigation; usually no edits needed. */

/* ===== MENU DATA (edit here) ===== */
const S=[
{id:"milk",t:"ميلك شيك",s:"اسأل الباريستا عن السعر",price:"15\\12",items:["لوتس","بلوبري","سيريلاك","كورنيتو","فستق حلبي","فراولة","كندر","اوريو","فانيلا","بلوآنجل","نوتيلا","كراميل","فيريرو"]},
{id:"happy",t:"كاسة السعادة",i:[["كاسة حشوة دبي",15],["كاسة كرات سعادة",12],["كاسة فشافيش مع بوظة",15],["كاسة فراولة + نوتيلا",12]]},
{promo:1},
{id:"juice",t:"العصائر",i:[["فراولة",10],["أناناس",10],["مانجا",10],["بسفلورا",12],["بسفلورا و منجا",12],["مانجا وأناناس",12],["مانجا وفراولة",12],["فراولة وليمون",12],["أناناس وفراولة",12]]},
{id:"iced",t:"آيسات",i:[["آيس كوفي دايت",10],["آيس كوفي",8],["آيس بسفلورا",8],["آيس عنب",8],["آيس ليمون ونعنع",8],["آيس فانيل",8],["آيس تي",8]]},
{id:"mojito",t:"موهيتو",i:[["سبرايت",10],["ريدبول",12],["XL",10]]},
{id:"hot",t:"اسبرسو ساخن",i:[["اسبرسو",6],["أمريكانو",7],["لاتيه",8,"إضافة نكهة +2"],["موكا",10],["كابتشينو",8],["أفوخ",8],["سبانيش لاتيه",10],["نسكافي",5]]},
{id:"winter",t:"مشروبات شتوية",i:[["لوتس",8],["فستق حلبي",8],["سحلب",8],["فرنش فانيلا",8],["فرنش بندق",8],["كراميل",8],["كراميل مالح",8],["شاي لاتيه",8],["سيريلاك",8],["شوكو",8],["هوت شوكليت",8]]},
{id:"cold",t:"اسبرسو بارد",i:[["آيس موكا",12],["آيس لاتيه",10,"إضافة نكهة +2"],["آمريكانو مثلج",10],["سبانيش لاتيه",12]]},
{id:"sweet",t:"حلويات",i:[["كريب دبي",20],["فوتو تشيني كريب",18],["كريب",15],["رويال دبي",20],["فيشرز",15],["وافل بابلز",15],["بان كيك",15],["بوكس ميني بان كيك",18],["بوكس وافل بابلز",18],["فشافيش",12]]},
{id:"sweet2",t:"حلويات",s:"اسأل عن صنف اليوم!",i:[["براونيز",15,"اضافة بوظة 3"],["كوكي باي",20],["تشيز كيك مقلوبة",20],["سان سباستيان",18]]},
{id:"mini",t:"حلويات ميني",i:[["دونات",6],["كب كيك",5],["كوكيز",5],["ليزي كيك",4],["ميني تشيز كيك",4],["الفاخوريس",4],["كرات لوتس / دبي",4]]}
];
/* ===== PAGE LOGIC ===== */
const nav=document.getElementById("nav"),menu=document.getElementById("menu");
const el=(t,c,h)=>{const e=document.createElement(t);if(c)e.className=c;if(h!=null)e.innerHTML=h;return e};
const price=p=>`<span class="price">${p}<i>شيكل</i></span>`;
S.forEach(C=>{
  if(C.promo){
    const p=el("section","promo");p.id="ice";
    p.innerHTML='<h3>في عنا بوظة!</h3><p>الطابة 3 شيكل</p><p>+1 شيكل مع خرطوس</p>';
    menu.appendChild(p);return;
  }
  if(C.id!=="sweet2"){const a=el("a","",C.t);a.href="#"+C.id;nav.appendChild(el("li")).appendChild(a);}
  const s=el("section","cat");s.id=C.id;s.appendChild(el("h3","",C.t));
  if(C.s)s.appendChild(el("p","sub",C.s));
  const ul=el("ul","items");
  if(C.items){
    ul.appendChild(el("li","",`<span class="name">السعر</span><span class="dots"></span>${price(C.price)}`));
    C.items.forEach(n=>ul.appendChild(el("li","",`<span class="name">${n}</span>`)));
  }else C.i.forEach(([n,p,note])=>ul.appendChild(el("li","",`<span class="name">${n}${note?`<span class="note">${note}</span>`:""}</span><span class="dots"></span>${price(p)}`)));
  s.appendChild(ul);menu.appendChild(s);
  if(C.id==="happy"){const a=el("a","","بوظة");a.href="#ice";nav.appendChild(el("li")).appendChild(a);}
});

/* nav: instant jump, smooth scroll, stable highlight */
const bar=document.querySelector("nav"),root=document.documentElement,up=document.getElementById("up");
const chips=[...nav.querySelectorAll("a")];
const secs=chips.map(a=>document.getElementById(a.getAttribute("href").slice(1)));
const rm=matchMedia("(prefers-reduced-motion:reduce)");
const beh=()=>rm.matches?"auto":"smooth";
const offset=()=>(parseFloat(getComputedStyle(root).paddingTop)||0)+bar.offsetHeight+8;
let cur=null,lock=false,lt=0,tick=false;
function setOn(a){
  if(a===cur)return;cur=a;
  chips.forEach(c=>{const on=c===a;c.classList.toggle("on",on);on?c.setAttribute("aria-current","true"):c.removeAttribute("aria-current")});
  const r=a.getBoundingClientRect(),b=bar.getBoundingClientRect();
  bar.scrollBy({left:(r.left+r.width/2)-(b.left+b.width/2),behavior:beh()});
}
function release(ms){clearTimeout(lt);lt=setTimeout(()=>{lock=false;spy()},ms)}
chips.forEach((a,i)=>a.addEventListener("click",e=>{
  e.preventDefault();
  const s=secs[i];if(!s)return;
  lock=true;setOn(a);
  scrollTo({top:Math.max(0,s.getBoundingClientRect().top+scrollY-offset()),behavior:beh()});
  s.setAttribute("tabindex","-1");s.focus({preventScroll:true});
  release(700);
}));
function spy(){
  tick=false;
  up.classList.toggle("show",scrollY>600);
  if(lock)return;
  const line=offset()+24;let idx=0,best=-1e9;
  secs.forEach((s,i)=>{const t=s.getBoundingClientRect().top;if(t<=line&&t>best){best=t;idx=i}});
  if(scrollY<10)idx=0;
  else if(innerHeight+scrollY>=root.scrollHeight-4)idx=chips.length-1;
  setOn(chips[idx]);
}
addEventListener("scroll",()=>{if(lock)release(150);if(!tick){tick=true;requestAnimationFrame(spy)}},{passive:true});
addEventListener("resize",spy,{passive:true});
up.addEventListener("click",()=>{lock=true;scrollTo({top:0,behavior:beh()});release(600)});
/* always open at the top */
try{if("scrollRestoration" in history)history.scrollRestoration="manual"}catch(e){}
const top0=()=>{scrollTo(0,0);cur=null;spy()};
top0();
addEventListener("load",()=>setTimeout(top0,0));
addEventListener("pageshow",e=>{if(e.persisted)top0()});
