# Pulse Tracker — Real-Time Predictive Risk & Live Telemetry Engine

**Pulse Tracker** is a next-generation enterprise SaaS platform designed for real-time e-commerce risk evaluation, Return-to-Origin (RTO) prediction, and automated customer intervention. 

Built with the AntiGravity weightless spatial design system, it features a fluid spatial canvas with draggable glassmorphic panels, live telemetry order streaming, a dynamic AI risk engine, and custom automated rule triggers.

![Pulse Tracker Platform](public/next.svg)

## Key Features

- **Dark Hero Section & JS Video Loop**: Includes a loop background video with `requestAnimationFrame` opacity fade loop, General Sans typography, and liquid-glass UI utilities.
- **Spatial Canvas Desktop**: Draggable glassmorphic panels (`FloatingPanel`) for an interactive dashboard experience with viewport drag boundaries and animated coordinate snaps.
- **Live Order Telemetry Stream**: Real-time mock order feed with automated order generation, live risk badges, and smooth entrance animations.
- **Risk & Telemetry Engine**: Computes real-time RTO risk scores (0–99%) based on payment method, address completeness, size variant anomalies, historical RTO records, and IP/geolocation mismatches.
- **Automated Intervention Engine**: Configurable risk threshold sliders, prepaid conversion discounts, WhatsApp OTP address verification toggles, and auto-block triggers with real-time toast notifications.
- **Global Keyboard Navigation**: Hotkeys for simulation toggle (`Cmd/Ctrl + S`) and clearing selection (`Escape`).

## Tech Stack

- **Framework**: [Next.js 16 (App Router)](https://nextjs.org/)
- **Language**: TypeScript
- **Styling**: Tailwind CSS & Custom `.liquid-glass` CSS Utilities
- **State Management**: [Zustand](https://github.com/pmndrs/zustand)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Data Visualization**: [Recharts](https://recharts.org/)
- **Icons**: [Lucide React](https://lucide.dev/)

## Getting Started

First, install dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Building for Production

To create an optimized production build:

```bash
npm run build
```

## License

MIT License. Developed with AntiGravity Agentic IDE.
