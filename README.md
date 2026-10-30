# All Saints University Lira

A responsive public university website and interactive admissions demo for All Saints University Lira.

## Demo scope

The current site is a presentation demo. Admissions, payments, student accounts, and administration workflows use sample/demo behavior and are not connected to production university systems. Do not enter real personal or payment information.

## Local development

Requirements: Node.js 20 or later and npm.

```sh
npm install
npm run dev
```

Create a production build with:

```sh
npm run build
```

## Deployment

The project uses TanStack Start and Nitro and is configured for Vercel deployment. Import the GitHub repository in Vercel and keep the detected TanStack Start framework preset and default build settings. A push to the connected production branch will trigger a deployment.

The university favicon and browser identity are served from `public/favicon.ico`.
