# Assets

Original photos and brand files go here. This folder is **not** served by the website directly.
The seed script (step 2) uploads these into the CMS, which makes the AVIF/WebP sizes and stores them on Cloudflare R2.
After launch, new photos are added through the admin at `/admin` instead.

## Folders

| Folder | What goes in it |
|---|---|
| `images/brand/` | SPAN wordmark, ECL circular mark (favicon, social avatar). SVG preferred. |
| `images/home/` | Home hero photo: the best building, landscape, at least 2400px wide. |
| `images/projects/<project-slug>/main.png` | Main image: 3D render, transparent background |
| `images/projects/<project-slug>/exterior/` | Building exterior photos |
| `images/projects/<project-slug>/interior/` | Apartment interiors |
| `images/projects/<project-slug>/construction/` | Construction progress photos |
| `images/projects/<project-slug>/handover/` | Handover photos |
| `images/projects/<project-slug>/floor-plans/` | Floor plans (PDF or image) and the brochure PDF |
| `images/leadership/` | Leadership portraits for the About page |
| `images/partners/` | Landowner partner photos, **only with written permission** |
| `images/office/` | Office photos for the Contact page |

## Per project

1. Copy `images/projects/_example-project/` and rename it to the project's slug, in lowercase with hyphens, e.g. `span-nilachal`.
2. Put the **main image** in the project folder itself as `main.png`: a **3D render of the building with a transparent background** (PNG or WebP with transparency, at least 1600px tall, building standing on the bottom edge, little empty space around it). The project card shows it on a soft background with the building fully visible.
3. Each published project needs **at least 3 gallery photos** (spec §6). Gallery photos are normal photos, not transparent.

The `sample-project-1/2/3` folders hold generated placeholder buildings. Delete them once real projects are in.

## File names and quality

- Lowercase, hyphens, no spaces: `front-elevation-evening.jpg`, not `IMG_2041 (1).JPG`.
- JPG or PNG, as large as you have; the CMS makes smaller copies. Upload limit is 15 MB per file.
- Every photo needs alt text when it goes into the CMS. A short description in the file name helps.
- Only real photos of SPAN's own buildings. No stock photos presented as SPAN projects.
