import fs from 'fs';
import puppeteer from 'puppeteer';
import { execFileSync } from 'child_process';
const FFMPEG = (await import('ffmpeg-static')).default;
const MAC = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const CHROME = fs.existsSync(MAC) ? MAC : puppeteer.executablePath();
const ROOT = '/Users/akousist_xml7h/學習';
const SCRATCH = '/private/tmp/claude-501/-Users-akousist-xml7h---/887215a6-1695-43b4-a38b-1608b7e877bd/scratchpad';
const MUSIC = `${ROOT}/marketing/background_music.mp3`;
// base names (HTML basename == mp4 basename); tracks overwrite, courses are new
const NAMES = [
  'video-track-agent', 'video-track-rag', 'video-track-system-design',
  'video-course-skills', 'video-course-knowledge-graph', 'video-course-orchestration',
];
const FORMATS = [
  { key: '16x9', w: 1280, h: 720, q: '' },
  { key: '1x1', w: 1080, h: 1080, q: '&ar=1x1' },
];
fs.mkdirSync(`${ROOT}/marketing/mp4`, { recursive: true });

const results = [];
for (const name of NAMES) {
  const html = `${ROOT}/marketing/${name}.html`;
  const durs = (fs.readFileSync(html, 'utf8').match(/const durs\s*=\s*\[([^\]]*)\]/)[1])
    .split(',').map((x) => parseInt(x)).filter((n) => !isNaN(n));
  const total = durs.reduce((a, b) => a + b, 0);
  const totalS = (total / 1000).toFixed(2);
  for (const fmt of FORMATS) {
    const tag = `${name} [${fmt.key}]`;
    const webm = `${SCRATCH}/enc2_${name}_${fmt.key}.webm`;
    const out = `${ROOT}/marketing/mp4/${name}${fmt.key === '1x1' ? '_1x1' : ''}.mp4`;
    try {
      const b = await puppeteer.launch({ executablePath: CHROME, headless: true, args: ['--no-sandbox'] });
      const pg = await b.newPage();
      await pg.setViewport({ width: fmt.w, height: fmt.h });
      await pg.goto('file://' + encodeURI(html) + '?clean=1' + fmt.q, { waitUntil: 'networkidle0' });
      await pg.evaluate(() => document.dispatchEvent(new KeyboardEvent('keydown', { key: 'r' })));
      await new Promise((r) => setTimeout(r, 120));
      const rec = await pg.screencast({ path: webm });
      await new Promise((r) => setTimeout(r, total + 400));
      await rec.stop();
      await b.close();
      execFileSync(FFMPEG, ['-y', '-i', webm, '-stream_loop', '-1', '-i', MUSIC,
        '-map', '0:v:0', '-map', '1:a:0', '-t', totalS,
        '-c:v', 'libx264', '-pix_fmt', 'yuv420p', '-crf', '20', '-preset', 'veryfast', '-r', '30',
        '-c:a', 'aac', '-b:a', '128k', '-movflags', '+faststart', out], { stdio: 'ignore' });
      fs.rmSync(webm, { force: true });
      const mp4Bytes = fs.statSync(out).size;
      results.push({ tag, ok: true, dur: totalS, mp4Bytes });
      console.log(`OK  ${tag}  ${totalS}s  ${(mp4Bytes / 1e6).toFixed(2)}MB`);
    } catch (e) {
      results.push({ tag, ok: false, err: String(e).slice(0, 140) });
      console.log(`ERR ${tag}  ${String(e).slice(0, 140)}`);
    }
  }
}
console.log(`\nDONE ${results.filter((r) => r.ok).length}/${results.length} encoded`);
fs.writeFileSync(`${SCRATCH}/enc2_results.json`, JSON.stringify(results, null, 1));
