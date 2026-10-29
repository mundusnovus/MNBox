# ChristianBox

<img src="src/icons/box-1024.png" alt="" width="96">

A free music maker from **Christian Systems**, built on [BeepBox](https://github.com/johnnesky/beepbox).
Write chiptune or a full band: distorted guitars, bass, organ, strings, choir and a real drum kit.
The **Composer** writes and changes music with you, and every change can be undone.

Use it at **christiansystems.org/box**, install it from there as an app, or download it for macOS,
Windows or Linux.

## What is new since Vigil Box

- **A band.** Twenty of BeepBox's own instruments (guitars, basses, organs, strings, choir, piano, bells),
  a rock kit, and three industrial sounds: an industrial kit, a pulse bass and a metal hit.
- **Riffs.** The Composer can write rhythm guitar as power chords (chug, gallop, push, stab, half, whole)
  and an industrial pulse bass.
- **Auto mix.** One step that listens to each part on its own and sets the volumes against the lead.
- **Mastered MP3.** Even loudness, no clipping, a clean fade, and the title, artist and cover inside the file.
- **Runs anywhere.** In a browser tab, as an installed app that works offline, or in our desktop shells.
  Autosave stays on your device.
- **Your key, your device.** The Composer uses your own Anthropic key. It is stored only on your device
  and sent only to Anthropic.
- **Easier to use.** Light and dark themes in Christian Systems colours, the Chancel typeface, and a layout
  that works on phones and tablets.

## Ask your agent

An AI agent that can run code (Claude in Cowork, ChatGPT in agent mode or Codex) can make things with this app from
the command line. Point it at this repository and ask it to read [AGENTS.md](AGENTS.md).

## Run it from source

It is plain HTML and JavaScript; there is nothing to build. Serve `src/app/` with any web server:

```bash
python3 -m http.server -d src/app 8000
```

Then open http://localhost:8000. Details for developers are in [docs/box.md](docs/box.md).

## License

Free and open source under the **Christian Systems License 1.0** (GPL-3.0-only); see
[LICENSING.md](LICENSING.md). BeepBox is by John Nesky and contributors (MIT), and ChristianBox is not
affiliated with it. The MP3 encoder, lamejs, is under the LGPL. Full notices are in [src/NOTICE](src/NOTICE).
