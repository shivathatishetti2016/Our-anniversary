# Bubu & Dudu Images — Drop-in Instructions

Save your Bubu & Dudu images in this folder with the **exact filenames** below.
The app loads them with `<img>` tags, so any of `.png`, `.jpg`, `.jpeg`,
`.webp`, or `.gif` works — just keep the filename (and the `.png` extension
in the markup) matching one of the names below.

## Required files

| Filename (place here)        | Used where                          | Recommended size |
|------------------------------|-------------------------------------|------------------|
| `bubu-dudu-couple.png`       | Heart frame on the login page       | ~400×400 px      |
| `bubu-angry.png` (or `.gif`) | Wrong-password door scene           | ~300×400 px      |

## How the app picks them up

The HTML uses:
- `<img src="assets/bubu-dudu-couple.png" ...>`
- `<img src="assets/bubu-angry.png" ...>`

If you save a GIF instead of PNG, either:
- Rename it to end in `.png` (browsers render it fine regardless of extension), or
- Open `src/surprise/index.html` and change the file extension in the two `<img src="...">` lines.

## Tips for the best look

- **Transparent background (PNG or GIF with alpha)** gives the cleanest result
  since the heart-frame background and door-scene background show through.
- For the "angry" image, a **GIF where the character shakes head / waves fist**
  looks amazing — the door-open + slide-out CSS animation around it will still play.
- Square-ish couple art works best in the heart; tall portrait art works best for the angry scene.

That's it — save your files and reload `index.html`.
