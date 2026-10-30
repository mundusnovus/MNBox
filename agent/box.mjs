#!/usr/bin/env node
// MNBox for agents: the same song tools the Composer uses, run from the command line with Node 22+, on
// BeepBox's real synthesizer.
//   node agent/box.mjs tools                     list every tool with its input schema (JSON)
//   node agent/box.mjs run plan.json [out-dir]   run a plan; save the song (.beepbox, opens in MNBox) and a WAV
//   node agent/box.mjs check song.beepbox        loudness, balance and advice for a saved song
// A plan: { "name": "anthem", "open": "earlier.beepbox", "wav": true,
//           "steps": [ { "tool": "new_song", "input": { ... } }, ... ] }
// See AGENTS.md.
import { createRequire } from 'node:module';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const require = createRequire(import.meta.url);
const APP = join(dirname(fileURLToPath(import.meta.url)), '..', 'src', 'app');
const { loadBeepBox, makeHost } = require(join(APP, '..', 'test', 'harness.js'));
const theory = require(join(APP, 'box', 'theory.js')), audio = require(join(APP, 'box', 'audio.js'));
globalThis.CBox = { theory };
require(join(APP, 'box', 'presets-band.js')); // the band and industrial instruments join theory's presets
const B = loadBeepBox();
const [cmd, arg, outArg] = process.argv.slice(2);

function tools(json) {
  const host = makeHost(B, json);
  return { host, tools: require(join(APP, 'box', 'songtools.js')).create(B, host) };
}
async function run(planPath, out) {
  const plan = JSON.parse(readFileSync(planPath, 'utf8'));
  const { host, tools: t } = tools(plan.open ? JSON.parse(readFileSync(resolve(dirname(planPath), plan.open), 'utf8')) : undefined);
  const name = (plan.name || 'song').replace(/[^\w-]+/g, '-');
  mkdirSync(out, { recursive: true });
  let n = 0;
  for (const step of plan.steps || []) {
    n++;
    try {
      const r = await t.run(step.tool, step.input || {});
      console.log(`${n}. ${step.tool}: ${(r && (r.message || r.text)) || 'ok'}`.split('\n')[0] + (r && r.warnings ? ' (warnings: ' + r.warnings.join('; ') + ')' : ''));
    } catch (e) {
      console.error(`${n}. ${step.tool} failed: ${e.message}`);
      process.exitCode = 1;
      break;
    }
  }
  const song = host.getSong(), file = join(out, name + '.beepbox');
  writeFileSync(file, JSON.stringify(song.toJsonObject(), null, 1) + '\n');
  console.log('saved ' + file);
  if (plan.wav !== false) {
    const r = await audio.renderSong(B, song, { sampleRate: 44100, loops: 1, intro: true, outro: true });
    writeFileSync(join(out, name + '.wav'), audio.encodeWav(r.L, r.R, r.sampleRate));
    console.log('saved ' + join(out, name + '.wav') + ' (' + r.seconds.toFixed(1) + ' s)');
  }
  const a = await t.run('analyze_audio', { per_channel: true, max_seconds: 240 });
  console.log(a.text);
}

if (cmd === 'tools') console.log(JSON.stringify(tools().tools.definitions.map((d) => ({ name: d.name, description: d.description, input_schema: d.input_schema })), null, 1));
else if (cmd === 'run' && arg) await run(arg, resolve(outArg || 'out'));
else if (cmd === 'check' && arg) { const { tools: t } = tools(JSON.parse(readFileSync(arg, 'utf8'))); console.log((await t.run('analyze_audio', { per_channel: true, max_seconds: 240 })).text); }
else { console.log(readFileSync(fileURLToPath(import.meta.url), 'utf8').split('\n').slice(1, 9).map((l) => l.replace(/^\/\/ ?/, '')).join('\n')); process.exitCode = cmd ? 1 : 0; }
