# YourBrand website (Next.js 14, App Router, TypeScript)

## Run
    npm install
    npm run dev        # http://localhost:3000
    npm run build && npm start

## Structure
- app/page.tsx          home page (sections in order)
- app/dashboard/page.tsx  logged-in dashboard (registered courses)
- components/            Header, Hero, Offer, Courses, Booking, Sections, Footer, Modals
- components/AppProvider.tsx  login state, enrolled courses, modals (demo: saved in browser localStorage)
- lib/data.ts            edit course names, prices, services, FAQs, reviews here
- app/globals.css        all styling (orange and white theme)

## To do
- Put your background video at public/hero.mp4
- Replace "YourBrand", brand names, address, phone, email
- Login, purchases and bookings are demo only. For real use, add a backend (for example NextAuth plus a database, and Razorpay for payments).

## Deploy
Push to GitHub and import the repo in Vercel (no settings needed).
