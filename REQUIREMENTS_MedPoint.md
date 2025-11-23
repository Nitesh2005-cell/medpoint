# MedPoint — Requirements & Environment

## Functional Requirements (short)
- FR1: Validate required fields (name, email, specialist, date, time).
- FR2: Prevent booking for past dates.
- FR3: Save validated appointments to `localStorage`.
- FR4: Render schedule sorted by date and time after booking.
- FR5: Display predefined doctor list with availability status.
- FR6: Suggest specialty based on user-entered symptoms and allow auto-fill.

## Non-functional Requirements (short)
- Performance: UI should load within 1–2 seconds on a typical broadband connection.
- Usability: Clean, responsive interface suitable for demo/college use.
- Portability: Works on latest Chrome, Firefox, Edge, Safari.
- Security: No external APIs or sensitive data stored; localStorage used only for demo.

## Browser & Environment
- Modern browser with HTML5, ES6 JavaScript, and LocalStorage support.
- Tailwind CSS is loaded via CDN (internet required for CDN unless you host locally).
- No server is required for the prototype; optional static server for local testing.

## File Structure (recommended)
/medpoint
  ├─ index.html
  ├─ style.css
  ├─ script.js
  └─ assets/
      ├─ images/
      └─ icons/

## Dependencies (optional for future)
- Node.js + Express (for backend API)
- MongoDB / Firebase / PostgreSQL (for database)
- WebSocket or polling (for real-time updates)
- Authentication service (JWT / OAuth)

## Testing & Validation
- Manual UI testing for form validation and schedule rendering.
- Cross-browser testing on Chrome/Firefox/Edge/Safari.
- Future: Add unit tests for booking logic and E2E tests for UI flows.
