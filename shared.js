(()=>{
const COL=['#c8553d','#e08a1e','#a89200','#4f9d4a','#2a8f8f','#5b5fc7'],K=['L1','L2','L3','L4','L5','L6'];
const cnt=(m,s,i)=>m[i]+s[i];
function classify(m,s){let lv=0;for(let i=0;i<6;i++){if(cnt(m,s,i)>=4)lv=i+1;else break}lv=Math.max(lv,1);return{lv,sec:lv<4?'A':'B',grp:lv<4?'A'+lv:'B'+(lv-3)}}
const stat=n=>n>=5?3:n>=4?2:n>=2?1:0;
function radar(series,S=320){const c=S/2,R=c-52,pt=(i,v)=>{const a=(-90+i*60)*Math.PI/180;return[c+R*v/3*Math.cos(a),c+R*v/3*Math.sin(a)]};
 const ring=v=>'<polygon points="'+[0,1,2,3,4,5].map(i=>pt(i,v).join(',')).join(' ')+'" fill="none" stroke="var(--bd)" stroke-width="1.2"/>';
 let h=`<svg class="rad" viewBox="0 0 ${S} ${S}" role="img">`+[1,2,3].map(ring).join('');
 for(let i=0;i<6;i++){const[x,y]=pt(i,3),[lx,ly]=pt(i,3.62);h+=`<line x1="${c}" y1="${c}" x2="${x}" y2="${y}" stroke="var(--bd)"/><text x="${lx}" y="${ly}" text-anchor="middle" dominant-baseline="middle" font-size="13" font-weight="700" fill="${COL[i]}">L${i+1}</text>`}
 series.forEach(o=>{const p=o.v.map((v,i)=>pt(i,v));h+=`<g class="rp" style="transform-origin:${c}px ${c}px"><polygon points="${p.map(q=>q.join(',')).join(' ')}" fill="${o.c}" fill-opacity=".22" stroke="${o.c}" stroke-width="2.5" stroke-linejoin="round"/>${p.map(q=>`<circle cx="${q[0]}" cy="${q[1]}" r="4" fill="${o.c}"/>`).join('')}</g>`});
 return h+'</svg>'}
function donut(p,col){const R=52,C=+(2*Math.PI*R).toFixed(1);return`<svg class="dn" viewBox="0 0 140 140" aria-hidden="true"><circle cx="70" cy="70" r="${R}" fill="none" stroke="rgba(255,255,255,.18)" stroke-width="14"/><circle class="v" cx="70" cy="70" r="${R}" fill="none" stroke="${col}" stroke-width="14" stroke-linecap="round" stroke-dasharray="${C}" stroke-dashoffset="${C}" transform="rotate(-90 70 70)" style="--o:${(C*(1-p/100)).toFixed(1)}"/></svg>`}
function qr(u){try{const q=qrcode(0,'M');q.addData(u);q.make();return q.createSvgTag({cellSize:3,margin:0,scalable:true})}catch(e){return''}}
const ls=()=>{try{return JSON.parse(localStorage.getItem('results')||'[]')}catch(e){return[]}};
async function save(p){try{const r=await fetch('/api/submit',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify(p)});if(!r.ok)throw 0;return'cloud'}catch(e){try{const c=classify(p.m,p.s),a=ls().filter(x=>x.code!==p.code);a.push({...p,...c,attempts:1,at:Date.now()});localStorage.setItem('results',JSON.stringify(a))}catch(_){}return'local'}}
async function load(key){try{const r=await fetch('/api/students',{headers:{'x-teacher-key':key}});if(r.status===401)return{src:'auth'};if(!r.ok)throw 0;return{src:'cloud',rows:(await r.json()).rows}}catch(e){return{src:'local',rows:ls()}}}
window.G={COL,K,classify,stat,radar,donut,qr,save,load};
})();
