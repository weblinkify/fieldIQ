# FieldIQ

**FieldIQ** is a modern environmental and site monitoring platform that connects physical sensors with cloud software.

The goal is to help people monitor real-world environments through live sensor data, dashboards, alerts, analytics, and eventually AI-powered insights.

> 🚧 **Early-stage project:** FieldIQ is currently an experimental MVP and learning project.

## What is FieldIQ?

FieldIQ is designed around a simple idea:

**Sensors → Data → Cloud → Dashboard → Insights**

The platform will eventually allow physical devices to collect information such as:

* 🌡️ Temperature
* 💧 Humidity
* 🔊 Noise levels
* 🌫️ Air quality
* 🔋 Battery level
* 📍 Device/site location

The first version uses **simulated sensor data** so we can build and test the software before connecting real hardware.

## Current Features

The initial FieldIQ MVP includes:

* 📊 Monitoring dashboard
* 📍 Monitoring sites
* 🔌 Device monitoring
* 🌡️ Simulated sensor readings
* 📈 Data visualization
* 🚨 Alert system
* 🧠 AI Insights placeholder
* 📱 Responsive web interface

## Development Roadmap

### Phase 1 — Foundation

* Next.js application
* FieldIQ dashboard
* Simulated sensor data
* Basic monitoring interface

### Phase 2 — Data Platform

* Sites
* Devices
* Database
* Historical sensor measurements

### Phase 3 — Monitoring

* Configurable thresholds
* Alerts
* Historical charts
* Analytics

### Phase 4 — Hardware

Connect real devices:

```text
Sensors
   ↓
ESP32
   ↓
Wi-Fi / Cellular
   ↓
FieldIQ API
   ↓
Database
   ↓
FieldIQ Dashboard
```

### Phase 5 — Intelligence

Add AI-powered capabilities such as:

* Anomaly detection
* Environmental event detection
* Pattern analysis
* Automated insights
* Predictive monitoring

## Technology

FieldIQ is currently built with:

* **Next.js**
* **React**
* **TypeScript**
* **Tailwind CSS**
* **Node.js**
* **PostgreSQL** (planned)
* **ESP32** (planned)
* **AI/ML** (planned)

## Getting Started

First, install the dependencies:

```bash
npm install
```

Then start the development server:

```bash
npm run dev
```

Or use:

```bash
yarn dev
```

```bash
pnpm dev
```

```bash
bun dev
```

Open http://localhost:3000 in your browser to see FieldIQ.

You can start editing the application by modifying:

```text
app/page.tsx
```

The page automatically updates as you make changes.

## Project Structure

The project will gradually evolve toward:

```text
fieldiq/
├── app/
│   ├── dashboard/
│   ├── sites/
│   ├── devices/
│   ├── alerts/
│   ├── analytics/
│   ├── ai-insights/
│   └── settings/
│
├── components/
│   ├── dashboard/
│   ├── charts/
│   ├── devices/
│   └── ui/
│
├── lib/
│   ├── sensors/
│   ├── database/
│   └── utils/
│
├── public/
│
└── README.md
```

## Learning Goal

FieldIQ is also a learning project.

The development process follows:

```text
LEARN
  ↓
BUILD
  ↓
TEST
  ↓
TALK TO USERS
  ↓
IMPROVE
  ↓
FIND A REAL PROBLEM
  ↓
BUILD A BUSINESS
```

The goal is not to build a huge application immediately.

The goal is to understand how software, hardware, data, and AI can work together to solve real-world problems.

## Important

FieldIQ is an independent project with its own:

* Brand
* Design
* Code
* Architecture
* Features
* Product direction

It is inspired by the broader concept of environmental and industrial monitoring, but it is not intended to copy another company's proprietary technology, branding, or implementation.

## Deployment

FieldIQ can eventually be deployed using a modern cloud platform such as Vercel or another suitable hosting provider.

Before deploying to production, the project should include:

* Secure environment variables
* Authentication
* Database security
* API validation
* Error handling
* Monitoring
* Production testing

## Future Vision

The long-term vision for FieldIQ is to create a platform that helps people understand what is happening in physical environments through connected devices and intelligent software.

**FieldIQ**

> **Sense the field. Understand the data.**
