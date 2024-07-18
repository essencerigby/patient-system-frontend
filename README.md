# Super Health Inc. Patient Data Application

## Description

Super Health Inc. is a small regional healthcare company that operates a series of clinics. The company has an existing application for tracking patient data. This application has been in service for a number of years and is in need of a rewrite. Super Health has asked me to rewrite the
application in a modern way. At this point, Super Health Inc. is looking for a proof of concept, and does not require any authentication or authorization.

The intent of this application is for a user in a medical office to create, review, update and delete patient information in the system.

## Pre-requisites

- Code Editor (preferable, VSCode)
- Node.js and npm installed
- React application setup

## Usage

1. Clone the repository.
2. Install dependencies: `npm install`.
3. Start the application: `npm start`. \* Runs the app in the development mode.\
   Open [http://localhost:3000/patients](http://localhost:3000/patients) to view it in your browser.

## External Dependencies

- Super Health Patients-API backend (Open [erigby-finaly-health-project-backend](https://gitlab.ce.catalyte.io/training/cycleworkinggroups/nationwide/associates/essence-rigby/erigby-final-health-project-backend/-/tree/main) to clone)
- React (v.18.2.0)
- ESLint with Airbnb Configuration (v.19.0.4)
- axios (v.1.7.2)

## Running ESLint

To run ESLint with Airbnb's configuration, use the following npm script:

```bash
npm i eslint-config-airbnb
npm run lint
```
