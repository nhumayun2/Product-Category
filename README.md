# EFL B2B Portal — Next.js Implementation

This project is a faithful **Next.js implementation** of the EFL B2B Product Category page.
I migrated the provided static HTML prototype into a modern, highly performant Next.js application using the **App Router**, strict **Server/Client component splitting**, and **URL-based state management**.

---

# 🚀 How to Run the App Locally

To get the project up and running on your local machine, follow these steps:

## 1. Clone the Repository

```bash
git clone https://github.com/nhumayun2/Product-Category.git
cd efl-b2b-portal
```

---

## 2. Install Dependencies

```bash
npm install
```

---

## 3. Start the Development Server

```bash
npm run dev
```

---

## 4. View the Application

Open your browser and navigate strictly to:

```bash
http://localhost:3000/products/all
```

> **Note:** The root path `/` is currently unmapped as per the specific routing requirements for the `/products/[category]` route.

---

# 🏗️ Key Architectural Decisions

To ensure the application is scalable, SEO-friendly, and highly performant, I made the following architectural choices based on Next.js best practices:

---

## App Router & Nested Layouts

I utilized the modern `app/` directory structure.

* Placed the global `Navbar` inside `app/layout.tsx` to prevent unnecessary re-renders across the entire site.
* Added a nested `app/products/layout.tsx` for product-specific wrappers and layouts.

---

## Strict Server vs. Client Split

I kept the heavy lifting on the server.

### Server Components

* `page.tsx`
* `ProductGrid`

These are implemented as pure Server Components.

### Client Components

I only used `'use client'` on leaf components that strictly require interactivity or browser APIs, such as:

* `FilterSidebar`
* `CategoryTabs`
* `Toolbar`

---

## URL-Based State Management

Instead of relying on local `useState` for filters, sorting, and pagination, all UI state is mapped to URL search parameters.

Example:

```bash
?category=...&page=...&moq=...
```

### Benefits

* Deep-linking works perfectly
* URLs are shareable
* State survives page refreshes
* Better SEO and browser navigation behavior

---

## API Route Handlers

I built a dedicated Route Handler at:

```bash
app/api/products/route.ts
```

This serves the mock JSON data internally.

### Advantages

* Eliminates client-side `useEffect` data fetching
* Keeps data fetching server-side
* Simplifies architecture
* Improves performance

---

# ⚡ Performance Optimizations

## next/font/google

Replaced standard `<link>` font imports with:

```tsx
next/font/google
```

This eliminates:

* Layout shifts
* Extra network requests

---

## next/image

Used `next/image` for:

* Optimized thumbnails
* Lazy loading
* Responsive image sizing
* Priority loading for above-the-fold content

---

## Dynamic Imports

Used:

```tsx
next/dynamic
```

to lazy-load the `QuickViewModal` with:

```tsx
{ ssr: false }
```

This ensures the JavaScript bundle for the modal is only downloaded when needed.

---

## Streaming & Suspense

Wrapped the product grid inside a `<Suspense>` boundary paired with a Skeleton UI.

### Benefits

* Prevents Cumulative Layout Shift (CLS)
* Improves perceived performance
* Enables progressive rendering

---

## Error Boundaries

Implemented:

```bash
error.tsx
```

to gracefully catch data-fetching failures without crashing the entire application layout.

---

# ⚖️ Trade-offs Made

While building this assessment, I made a few deliberate trade-offs to balance complexity with the rubric requirements.

---

## Plain CSS over CSS Modules / Tailwind

To faithfully recreate the exact visual design of the provided prototype and adhere to the assessment constraints, I ported the existing stylesheet directly into:

```bash
globals.css
```

using CSS variables.

### Why?

While I typically prefer:

* Tailwind CSS
* CSS Modules

for component scoping and maintainability, migrating the entire design system would have been unnecessary over-engineering for this specific assessment.

---

## Mock API vs. Real Database

Instead of setting up:

* PostgreSQL
* Prisma
* Docker
* Environment variables

I implemented the data layer using a lightweight Next.js Route Handler returning static JSON.

### Benefits

* Extremely easy to run locally
* No setup friction for reviewers
* Lightweight repository
* Faster evaluation process
