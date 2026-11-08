(()=>{const $=s=>document.querySelector(s),LS=['bn','en','hi'],BNN='০১২৩৪৫৬৭৮৯',LOC={bn:'bn-BD',en:'en-GB',hi:'hi-IN'};
let L='bn';try{const x=localStorage.getItem('lang');if(LS.includes(x))L=x}catch(e){}
window.t=k=>D[k]?D[k][LS.indexOf(L)]:k;window.num=n=>String(n).replace(/\d/g,d=>L==='bn'?BNN[d]:d);window.langHooks=[];
const TH=document.documentElement,ts=$('#th'),lg=$('#lg');
try{const x=localStorage.getItem('th');if(x){ts.value=x;if(x!=='auto')TH.setAttribute('data-theme',x)}}catch(e){}
ts.onchange=()=>{ts.value==='auto'?TH.removeAttribute('data-theme'):TH.setAttribute('data-theme',ts.value);try{localStorage.setItem('th',ts.value)}catch(e){}};
const fmtc=c=>(c.dataset.p||'')+num(c.dataset.n)+(c.dataset.s||'');
function apply(){TH.lang=L;document.querySelectorAll('[data-t]:not(.acc)').forEach(e=>e.innerHTML=t(e.dataset.t));
 document.querySelectorAll('.acc').forEach(e=>{const[a,b]=t(e.dataset.t).split('||');e.innerHTML='<summary>'+a+'</summary><p>'+b+'</p>'});
 document.querySelectorAll('[data-n]').forEach(c=>{if(c.dataset.done)c.textContent=fmtc(c)});
 document.title=t('brand')+' · '+t(document.body.dataset.pk);langHooks.forEach(f=>f())}
lg.value=L;lg.onchange=()=>{L=lg.value;try{localStorage.setItem('lang',L)}catch(e){}apply()};
setInterval(()=>{$('#clk').textContent='🕒 '+new Date().toLocaleTimeString(LOC[L],{hour:'2-digit',minute:'2-digit'});
 const e=typeof end!=='undefined'?end:0,l=e-Date.now(),nt=$('#nt');
 nt.textContent=(e&&l>0)?'⏱ '+t('x_left')+' '+num(String(Math.floor(l/60000)).padStart(2,'0'))+':'+num(String(Math.floor(l/1000)%60).padStart(2,'0')):''},500);
const io=new IntersectionObserver(es=>es.forEach(x=>{if(!x.isIntersecting)return;const el=x.target;el.classList.add('in');io.unobserve(el);
 el.querySelectorAll('[data-n]').forEach(c=>{const n=+c.dataset.n,t0=performance.now(),f=q=>{const k=Math.min(1,(q-t0)/1400),v=Math.round(n*k);c.textContent=(c.dataset.p||'')+num(v)+(c.dataset.s||'');if(k<1)requestAnimationFrame(f);else c.dataset.done=1};requestAnimationFrame(f)})}),{threshold:.15});
document.querySelectorAll('.rv').forEach(e=>io.observe(e));
document.addEventListener('click',e=>{const f=e.target.closest('.flip');if(f)f.classList.toggle('on');
 const b=e.target.closest('.tb');if(b){const g=b.closest('.tabs');g.querySelectorAll('.tb').forEach(x=>x.classList.toggle('on',x===b));g.querySelectorAll('.tp').forEach(x=>x.classList.toggle('on',x.id===b.dataset.tab))}
 const i=e.target.closest('.fig img');if(i){const d=document.createElement('div');d.className='md';d.style.cursor='zoom-out';d.innerHTML='<img src="'+i.src+'" alt="" style="max-width:95vw;max-height:92vh;border-radius:12px">';d.onclick=()=>d.remove();document.body.appendChild(d)}});
document.addEventListener('keydown',e=>{const f=e.target.closest&&e.target.closest('.flip');if(f&&(e.key==='Enter'||e.key===' ')){e.preventDefault();f.classList.toggle('on')}});
const pg=$('#pg');addEventListener('scroll',()=>{const h=document.documentElement;pg.style.width=(h.scrollTop/(h.scrollHeight-h.clientHeight||1)*100)+'%'},{passive:true});apply()})();