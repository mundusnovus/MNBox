# ChristianBox for developers

## Layout

```
src/
  app/                      what ships; serve this folder
    index.html              the page; data-app="box" tells the host which app it is
    beepbox_editor.min.js   BeepBox's editor, built from the pinned commit with our patches
    beepbox_synth.min.js    BeepBox's synth on its own, for tests
    brand/                  Christian Systems tokens, cs-app.css, cs-host.js, the Chancel font
    box/                    our layer (below)
    manifest.webmanifest, sw.js, icons
  patches/                  our changes to BeepBox's source
  beepbox.lock.json         the pinned BeepBox commit and file hashes
  tools/update-upstream.sh  rebuilds the BeepBox bundle from a new commit
  test/                     tests for the song tools (Node; they load the real synth)
  icons/                    the app icon at full size, .icns and .ico
```

## Our layer, `src/app/box/`

| File | What it does |
| --- | --- |
| `app.js` | Start-up, the toolbar, files, autosave, the export dialogs, mastered MP3 |
| `shell.js` | Files and settings through `window.csHost` |
| `composer.js` | The Composer panel and its tool-use loop |
| `prompt.js` | The Composer's instructions |
| `songtools.js` | The tools the Composer calls: write notes, set instruments, generate parts, auto mix, analyse |
| `theory.js` | Scales, chords, progressions, riffs, drum patterns, presets |
| `presets-band.js` | The band and industrial instruments |
| `audio.js` | Offline rendering, WAV, analysis |
| `export.js` | The game bundle: a seamless loop with its metadata |
| `theme.js` | The Christian Systems colour theme for BeepBox |
| `rpc.js` | Lets a desktop shell drive the app |

## Two hooks into BeepBox

BeepBox fires `amerika-editor-ready` when the editor is built and calls `amerikaSaveBlob` to save an
export. The names come from earlier versions and are kept so the patches stay small.

## Updating BeepBox

`src/tools/update-upstream.sh <commit>` downloads that commit, applies `src/patches/`, builds it, and
updates `beepbox.lock.json`. After that, change `amerika/vendor/lame.min.js` to `box/vendor/lame.min.js`
in `beepbox_editor.min.js`.

## Tests

```bash
node --test src/test/
```
