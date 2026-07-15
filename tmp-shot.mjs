import puppeteer from 'puppeteer-core';
const CHROME = process.env.CHROME_PATH || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const sleep = ms => new Promise(r=>setTimeout(r,ms));
const b = await puppeteer.launch({ executablePath: CHROME, headless:'new', args:['--no-sandbox','--disable-gpu'] });
// 檢查 points 是否還有字面 <b>（bug 驗證）
const chk = async (id,lang)=>{ const p=await b.newPage(); await p.goto(`http://localhost:4195/?iv=${id}&lang=${lang}`,{waitUntil:'networkidle2',timeout:15000}); await sleep(300); const t=await p.$eval('.stage',n=>n.innerText).catch(()=>''); await p.close(); return t.includes('<b>')||t.includes('</b>'); };
let lit=0; for(const id of ['agent-cost','json-output','agent-memory','rag-retrieval']){ for(const l of ['zh','en','ja']){ if(await chk(id,l)){ lit++; console.log('⚠ 字面<b>殘留:',id,l);} } }
console.log(lit===0?'✅ 無字面 <b> 標籤殘留':lit+' 處殘留');
const shot=async(id,lang,name)=>{ const p=await b.newPage(); await p.setViewport({width:1280,height:1050,deviceScaleFactor:2}); await p.goto(`http://localhost:4195/?iv=${id}&lang=${lang}`,{waitUntil:'networkidle2',timeout:15000}); await sleep(400); const c=async t=>{for(const el of await p.$$('.stage button')){if((await p.evaluate(e=>e.textContent,el)).includes(t)){await el.click();return;}}}; await c(lang==='en'?'Show model answer':'模範回答'); await sleep(250); await c(lang==='en'?'Bonus':'加点'); await sleep(250); await p.screenshot({path:`/private/tmp/claude-501/-Users-akousist-xml7h---/df08edf4-3908-449e-91e0-1281a3299e72/scratchpad/${name}.png`,fullPage:true}); await p.close(); };
await shot('json-output','ja','iv-json-ja2');
await b.close(); console.log('shot saved');
