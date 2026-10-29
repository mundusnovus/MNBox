# ChristianBox, for AI agents

You are helping someone make music with ChristianBox, a free music maker built on BeepBox. You can write a song
without a browser: `agent/box.mjs` runs the same song tools the app's own Composer uses, on BeepBox's real
synthesizer, and saves a song file the person can open and change in ChristianBox.

## What you need

Node.js 22 or later. Nothing to install: there are no packages.

## How to make a song

1. See the tools and what each one takes:

   ```bash
   node agent/box.mjs tools
   ```

2. Write a plan: a JSON file listing tool calls in order. `agent/example-plan.json` is a short, working example.

   ```json
   { "name": "anthem", "steps": [ { "tool": "new_song", "input": { "layout": "standard", "key": "E", "scale": "minor", "tempo": 164, "bars": 16 } } ] }
   ```

   To change an existing song, add `"open": "that-song.beepbox"` and leave out `new_song`.

3. Run it:

   ```bash
   node agent/box.mjs run plan.json out
   ```

   It prints what each step did, then saves `out/<name>.beepbox` and `out/<name>.wav`, and prints a loudness report.
   If a step fails, read the message, fix that step and run the plan again.

4. Check a song at any time: `node agent/box.mjs check out/<name>.beepbox`.

5. Give the person the `.beepbox` file (they open it at https://box.christiansystems.org/app/ with Open, or in the
   desktop app) and the `.wav` to listen to.

## Writing music that sounds intentional

- Songs have up to 10 pitch channels and up to 5 drum channels. Channels, patterns, instruments and bars are
  numbered from 1. Times are in beats from the start of each bar (a quarter note is 1 beat).
- One channel plays one note or chord at a time. Chords look like `C4/E4/G4@0+1`. Use another channel for layers.
- `write_track` takes notes as `pitch@start+length` over a stretch of bars; `start` counts beats from the first bar.
- `generate_part` writes a part from a chord progression: `power` (rhythm guitar: chug, gallop, push, stab, half,
  whole), `pulse` (industrial bass), `bass`, `arpeggio`, `pad`, `melody` and `drums`.
- Band presets: distortion, overdrive, clean, steel and nylon guitar, picked and fingered bass, rock and pipe organ,
  brass section, strings, slow strings, tremolo strings, pizzicato strings, choir soprano, grand piano, tubular bell,
  fifth saw lead, guitar harmonics; drums: `rock kit`, `industrial kit`; industrial: `pulse bass`, `metal hit`.
  Give a rhythm guitar `"settings": { "chord": "simultaneous" }` so power chords ring together.
- Repeat motifs, end phrases on chord tones, keep the bass on chord roots, and add a fill every 4 or 8 bars.
- Finish with `auto_mix`, then read the report. Lower anything that clips; raise anything that is lost.
- You cannot hear the song. Say what the report measured, not how it sounds.

## Please

- Work in your own folder (`out/` or the person's). Do not change `src/` unless the person asks you to.
- Keep titles and lyrics kind. No crude, cruel or sacrilegious words.
- ChristianBox is free and open source under the Christian Systems License (GPL-3.0-only). BeepBox is by John
  Nesky (MIT). Songs the person makes are theirs.
