# forgot-password-enhancements

## Overview
This repository implements the MA-542 forgot pass enhancement requested in Jira. The React frontend renders the new reference and email fields directly below the Mahesh reference block, while the Express backend validates the extended payload before handing it off to the existing forgot-password workflow.

## Repository Layout
- `frontend/` – A Create React App that renders the enhanced form, performs client-side validation, and posts JSON to the API.
- `backend/` – A lightweight Express.js service that validates the complete payload, logs the incoming request, and responds with consistent success or validation errors.

## Backend Setup
```bash
cd backend
npm install
npm start
```
The backend listens on `http://localhost:4000` by default and exposes:

```
POST /api/forgot-password
{
  "identifier": "...",
  "reference": "...",
  "email": "user@example.com"
}
```

A successful request returns `200` with `{"message": "Password reset request received. Please check your email."}`. Validation failures return `400` with a structured `errors` array.

## Frontend Setup
```bash
cd frontend
npm install
npm start
```
The React form now collects the identifier, reference, and contact email in alignment with the Jira request. It defaults to `http://localhost:4000` for the API base but can be pointed elsewhere via `REACT_APP_API_BASE_URL`.

## Testing & Validation
- Run `npm test` inside `frontend/` to exercise the form validation helpers.
- Use curl/Postman against `POST /api/forgot-password` to verify both 200 and 400 responses.
- Once an identity/email service is available, wire the backend to send the actual communication.

## Next Steps
- Persist the reference/email pair with the reset request in your datastore.
- Extend the backend to send a real reset email or integrate with the existing workflow when ready.
