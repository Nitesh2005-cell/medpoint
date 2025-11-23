# MedPoint

**A lightweight front-end medical appointment booking prototype**

## Overview
MedPoint is a single-page web prototype that lets users book appointments, view the clinic schedule, and check doctor availability. It includes a simple symptom-based recommender that suggests a specialty based on entered keywords. Built with HTML, Tailwind CSS, and vanilla JavaScript; data is persisted in browser `localStorage` for the demo.

## Features
- Responsive single-page UI
- Appointment booking form (name, email, specialist, date, time)
- Live clinic schedule view (sorted by date/time)
- Predefined doctor availability cards (Available / Busy)
- Symptom-to-specialty recommendation and auto-fill
- Client-side persistence using LocalStorage

## Files in this repo
- `index.html` — Main application page
- `style.css` — Styles (Tailwind + custom styles)
- `script.js` — JavaScript application logic
- `README_MedPoint.md` — This file
- `REQUIREMENTS_MedPoint.md` — Project requirements & environment notes

## How to run locally
1. Clone or download the repository.
2. Ensure `index.html` is in the project root along with `style.css` and `script.js`.
3. Open `index.html` in any modern browser (Chrome, Firefox, Edge, Safari).
4. The app will run locally without a server. For a basic static server (optional):
   ```bash
   # Python 3
   python -m http.server 8000
   # then open http://localhost:8000
   ```

## Deploy (GitHub Pages)
1. Push the repo to GitHub (ensure `index.html` is at the root).
2. In repo → Settings → Pages: Source = `main` branch, Folder = `/root`.
3. Save and wait ~1 minute for the live link:
   `https://<your-username>.github.io/<repo-name>/`

## Notes & Next steps
- Currently uses browser `localStorage` (prototype). For production: add a backend (Node/Express or Firebase) and a database (MongoDB/Postgres).  
- Add authentication, prevent double-bookings, and provide doctor-side schedule management in future versions.

## Author
Nitesh Sharma — K.R. Mangalam University
Akash Kandari - K.R. Mangalam University
