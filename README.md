# The Comfort Inn — Guest House Website

A full-featured, bilingual (English + Urdu), light/dark theme guest house website built with **Next.js 14** and deployed on **Vercel**.

---

## What This Website Does

This is a complete business website for a guest house. It allows potential guests to:

- Browse all available rooms with photos, features, and prices
- Filter rooms by category (Standard, Deluxe, Suite, Executive) and city/branch
- Book a room through a 4-step wizard with fare calculation
- Contact the guest house via WhatsApp, phone, or email
- Read about services, amenities, dining options, house rules
- Explore nearby tourist attractions in each city
- View a full photo gallery with lightbox zoom
- Read FAQ answers with a live search box
- Switch between English and Urdu (with full RTL layout support)
- Switch between Light and Dark theme (preference saved in browser)

---

## Project Structure

```
guest-house-website/
├── src/
│   ├── app/                     ← Next.js App Router pages
│   │   ├── page.js              ← Home page
│   │   ├── layout.js            ← Root layout (Navbar, Footer, WhatsApp button)
│   │   ├── globals.css          ← All CSS (light/dark theme variables, all components)
│   │   ├── rooms/page.js        ← Rooms catalog with category + city filters
│   │   ├── booking/page.js      ← 4-step booking wizard with fare calculation
│   │   ├── contact/page.js      ← Contact form + Google Maps embed
│   │   ├── services/page.js     ← Amenities grid + house rules accordion
│   │   ├── gallery/page.js      ← Photo gallery with category filters + lightbox
│   │   ├── about/page.js        ← About us + team + animated stats
│   │   ├── attractions/page.js  ← Local tourist guide (8 Lahore landmarks)
│   │   ├── locations/page.js    ← All branches (Lahore, Islamabad, Karachi, Murree)
│   │   ├── dining/page.js       ← Food & dining experience
│   │   └── faq/page.js          ← Searchable FAQ accordion (10 questions)
│   ├── components/
│   │   ├── Navbar.jsx           ← Fixed navbar with "More" dropdown, theme + language toggle
│   │   ├── Footer.jsx           ← 4-column footer with links, contact info, social icons
│   │   ├── RoomModal.jsx        ← Room detail popup with image gallery + booking button
│   │   ├── WhatsAppButton.jsx   ← Floating WhatsApp button (bottom-right, with tooltip)
│   │   ├── PageLoader.jsx       ← Brief loading screen on page entry
│   │   └── CustomCursor.jsx     ← Desktop custom cursor animation
│   ├── context/
│   │   └── LanguageContext.js   ← English/Urdu language state + RTL direction
│   └── data/
│       ├── rooms.js             ← ALL ROOM DATA IS HERE (edit this to update rooms)
│       └── translations.js      ← All English and Urdu text strings
├── public/
│   └── images/                  ← All room and property photos
├── package.json
├── next.config.mjs
└── README.md                    ← This file
```

---

## How to Edit Room Data

Open `src/data/rooms.js`

Each room object looks like this:

```js
{
  id: "deluxe",                     // Unique ID (used in booking URL)
  name: "Deluxe Suite",             // Room name
  price: 4000,                      // Price (number only, no comma)
  currency: "PKR",                  // Currency label shown on site
  per: "night",                     // "night" or "month"
  category: "deluxe",              // standard | deluxe | suite | executive
  location: "lahore",              // lahore | islamabad | karachi | murree
  image: "images/deluxe_room.jpg", // Main card image
  gallery: [                        // Up to 3 images for the modal popup
    "images/deluxe_room.jpg",
    "images/deluxe_sitting.jpg",
    "images/deluxe_bath.jpg"
  ],
  description: "...",              // Short description shown on card
  features: ["Queen Size Bed", "Air Conditioning", "Attached Bath", "Free Wi-Fi"],
  available: true,                 // true = bookable | false = greyed out as "Fully Booked"
  highlight: true,                 // true = shows gold "Featured" badge on card
}
```

**To add a new room:** Copy any room block, paste at the end of the array, and change the values.

**To mark a room unavailable:** Set `available: false`.

**To feature a room on the home page:** Set `highlight: true`.

---

## How to Edit Contact Information

Open `src/data/translations.js` and search for these keys under the `en:` block:

```js
footerPhone: "+92 300 0000000",
footerEmail: "info@thecomfortinn.com",
footerAddress: "123 Main Street, Lahore, Pakistan",
footerTimings: "Check-in: 2:00 PM | Check-out: 12:00 PM",
```

Update both the `en:` and `ur:` blocks with your real details.

---

## How to Update the WhatsApp Number

The WhatsApp number appears in two places:

1. **Floating button** → `src/components/WhatsAppButton.jsx`, line 7:
   ```js
   const WHATSAPP_NUMBER = "923000000000";
   ```
   Format: country code + number, no `+` or spaces. Example: `923001234567`

2. **CTA section & Locations page** → Search the whole project for `923000000000` and replace all instances.

---

## How to Add Google Maps

Open `src/app/contact/page.js` — there is already an `<iframe>` map embed near the bottom.

To get your real embed link:
1. Open Google Maps → search your exact address
2. Click Share → Embed a map → Copy HTML
3. Replace the `src="..."` value in the existing `<iframe>` with your new embed URL

---

## How to Add Real Photos

Place your photos inside `public/images/`. Then reference them in `rooms.js` as:
```js
image: "images/your-photo.jpg"
```

For best quality, use images at least **800×600 pixels**. Room photos look best at **4:3 ratio**. Hero/lobby photos should be **landscape** (minimum 1200×700).

---

## How to Change the Guest House Name

Search the entire project for `The Comfort Inn` and replace it with your actual name. Key places:
- `src/data/translations.js` → `heroTitle` key (both `en` and `ur`)
- `src/app/layout.js` → the `metadata.title` and `metadata.description` fields

---

## Features at a Glance

| Feature | Status |
|--------|--------|
| Responsive design (mobile, tablet, desktop) | Done |
| Light / Dark theme toggle (saved in browser) | Done |
| English / Urdu language toggle (full RTL layout) | Done |
| Rooms catalog with category + city filters | Done |
| Room detail modal with image gallery | Done |
| 4-step online booking wizard with fare calculation | Done |
| Pakistani payment options (Cash, Easypaisa, JazzCash, Bank) | Done |
| WhatsApp floating button (every page) | Done |
| Quick booking bar on home page | Done |
| Google Maps embed on Contact page | Done |
| Searchable FAQ page (10 questions) | Done |
| Photo gallery with lightbox + keyboard navigation | Done |
| Lahore tourist attractions guide (8 locations) | Done |
| 4 branch locations with contact details | Done |
| Full dining & food menu page | Done |
| Services & amenities page with house rules | Done |
| GSAP scroll animations on all pages | Done |
| Trust strip (no hidden charges, free cancellation) | Done |
| SEO meta tags (title, description, keywords) | Done |

---

## How to Deploy on Vercel

### Option A — Via GitHub (Recommended)

1. Create a GitHub account and a new repository
2. Push this folder to that repository:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/YOUR_USERNAME/guest-house-website.git
   git push -u origin main
   ```
3. Go to [vercel.com](https://vercel.com) and sign in with GitHub
4. Click **"Add New → Project"** and select your repository
5. Framework will auto-detect as **Next.js**
6. Click **"Deploy"** — your website will be live in about 60 seconds

### Option B — Direct Upload (No GitHub Needed)

1. Run `npm run build` in this folder to generate the production build
2. Go to [vercel.com](https://vercel.com) → sign up free → click **Deploy**
3. Drag and drop the entire project folder
4. Vercel detects Next.js and deploys automatically

Your live website URL will look like:
```
https://the-comfort-inn.vercel.app
```
You can customize the URL or connect your own domain from the Vercel dashboard.

---

## After Deploying — Google Maps Visibility

To make your website appear when people search on Google Maps:

1. Go to [Google Business Profile](https://business.google.com)
2. Find your guest house listing or create a new one
3. Paste your Vercel website URL into the **Website** field
4. Upload real photos of your rooms and property
5. Ask guests to leave Google Reviews — this is the biggest factor for appearing in search results

---

## Running the Website Locally (For Development)

```bash
# Step 1: Install all packages
npm install

# Step 2: Start the development server
npm run dev

# Step 3: Open in your browser
http://localhost:3000
```

Any changes you make to the files will update instantly in the browser.

---

## Tech Stack

| Tool | Purpose |
|------|---------|
| Next.js 14 (App Router) | React framework, routing, page rendering |
| GSAP + ScrollTrigger | Scroll animations and hero text reveal |
| FontAwesome 6 | Icons throughout the site (loaded via CDN) |
| Google Fonts | Playfair Display (headings), Outfit (body), Noto Nastaliq Urdu |
| CSS Custom Properties | Light/dark theme switching system |
| React Context API | Global language and translation state |
| Vercel | Free hosting and automatic deployment |
