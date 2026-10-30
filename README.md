# LaunchPad API (CSE 341 Project 2)

REST API for managing startup businesses in the LaunchPad dashboard.

## Setup

1. Install dependencies:
	- `npm install`
2. Copy environment template:
	- Copy `.env.example` to `.env`
3. Add your MongoDB connection string in `.env`:
	- `MONGODB_URI=...`
4. (Optional) Set port in `.env`:
	- `PORT=3000`

## Run

- Generate Swagger JSON once:
  - `npm run swagger`
- Start production server:
  - `npm start`
- Start development server (auto-reload):
  - `npm run dev`

## API Docs

After starting the server, open:

- `http://localhost:3000/api-docs`

## Main Endpoints

- `GET /businesses`
- `GET /businesses/:id`
- `POST /businesses`
- `PUT /businesses/:id`
- `DELETE /businesses/:id`