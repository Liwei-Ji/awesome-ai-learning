import puppeteer from 'puppeteer-core';
const CHROME = process.env.CHROME_PATH || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const sleep = ms => new Promise(r=>setTimeout(r,ms));
const b = await puppeteer.launch({ executablePath: CHROME, headless:'new', args:['--no-sandbox','--disable-gpu'] });
const errs=[];
// console 掃描：抽數張 × 三語
const check=['attention-compute','faster-inference','design-doc-qa','lora','diffusion-not-collage'];
for(const id of check){ for(const l of ['zh','en','ja']){ const p=await b.newPage(); p.on('pageerror',e=>errs.push(id+'/'+l+' PE:'+e.message)); p.on('console',m=>{if(m.type()==='error')errs.push(id+'/'+l+' CE:'+m.text().slice(0,80));}); await p.goto(`http://localhost:4201/?iv=${id}&lang=${l}`,{waitUntil:'networkidle2',timeout:15000}); await sleep(200); await p.close(); } }
console.log('CONSOLE ERRORS:', errs.length?errs.join(' | '):'none');
// 截圖 attention-compute EN（看修正後的 √d/FlashAttention 英文）
const shot=async(id,lang,name)=>{ const p=await b.newPage(); await p.setViewport({width:1280,height:1050,deviceScaleFactor:2}); await p.goto(`http://localhost:4201/?iv=${id}&lang=${lang}`,{waitUntil:'networkidle2',timeout:15000}); await sleep(400); const c=async t=>{for(const el of await p.$$('.stage button')){if((await p.evaluate(e=>e.textContent,el)).includes(t)){await el.click();return;}}}; await c(lang==='en'?'Show model answer':'模範回答'); await sleep(250); await c(lang==='en'?'Bonus':'加点'); await sleep(250); await p.screenshot({path:`/private/tmp/claude-501/-Users-akousist-xml7h---/df08edf4-3908-449e-91e0-1281a3299e72/scratchpad/${name}.png`,fullPage:true}); await p.close(); };
await shot('attention-compute','en','iv29-attn-en');
await b.close(); console.log('shot saved');
