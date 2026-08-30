# 💻 British Smokes — Frontend Application

Modern, highly responsive client & admin dashboard web application built with **Next.js (App Router)**, **React**, **TypeScript**, **Tailwind CSS**, **Ant Design**, and **Redux Toolkit (RTK Query)**.

---

## 🌟 Overview

The frontend serves two primary user experiences:
1. **Storefront & Customer Portal**: Product browsing, age verification, shopping cart, wishlist, Stripe checkout, order tracking, and profile management.
2. **Admin Management Dashboard**: Admin tools for reviewing user KYC identity documents (NID / Driving License with 18+ check), approving accounts, managing catalog products, orders, categories, and brands.

---

## 🚀 Key Modules & Pages

### 1. Authentication & KYC Flow
- `/register`: Registration form requiring Full Name, Email, Password, Phone, DOB (>= 18 validation), ID Document Type (NID / Driving License), and file upload.
- `/account-verify`: 5-digit OTP entry screen for verifying email address.
- `/login`: User login screen with detection of pending admin approval status (`ACCOUNT_UNDER_REVIEW`) and unverified email status.
- `/forgot-password` & `/reset-password`: Full password recovery workflow.

### 2. Admin Dashboard (`(admin)`)
- `/admin-dashboard`: Executive overview, metrics, and quick actions.
- `/admin-users`: Comprehensive user management with:
  - Search by name and email
  - Age calculation display
  - Interactive PDF & Image document preview modal
  - OTP verification status badge
  - One-click account **Approve** action
- `/admin-products`: Products catalog management (CRUD, stock, variants, image upload).
- `/admin-orders`: Customer order processing, filtering, status updates.
- `/admin-categories` & `/admin-brands`: Product taxonomy management.

### 3. Customer Experience (`(client)`)
- `/`: Home page with featured collections, banners, and categories.
- `/shop` & `/products/[id]`: Product catalog with filters, sorting, and detail views.
- `/cart` & `/checkout`: Shopping cart and multi-step checkout with address selection and Stripe payments.
- `/profile`: User profile, order history, and saved shipping addresses.

---

## 🛠️ Tech Stack & Libraries

- **Framework**: [Next.js](https://nextjs.org/) (App Router, Server & Client Components)
- **State Management & Data Fetching**: [Redux Toolkit](https://redux-toolkit.js.org/) & [RTK Query](https://redux-toolkit.js.org/rtk-query/overview)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) & [Ant Design (antd)](https://ant.design/)
- **Alerts & Modals**: [SweetAlert2](https://sweetalert2.github.io/)
- **Icons**: [React Icons](https://react-icons.github.io/react-icons/) & [Lucide React](https://lucide.dev/)

---

## 🏁 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables
Create a `.env.local` file:
```env
NEXT_PUBLIC_BASE_URL=http://localhost:5000/api/v1
NEXT_PUBLIC_IMAGE_URL=http://localhost:5000
```

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser.

---

## 📁 Directory Structure

```text
Fontend/src/
├── app/
│   ├── (admin)/          # Admin-only dashboard routes
│   │   ├── admin-dashboard/
│   │   ├── admin-users/  # KYC ID review and user approval
│   │   ├── admin-products/
│   │   └── admin-orders/
│   ├── (client)/         # Public and customer store routes
│   │   ├── cart/
│   │   ├── checkout/
│   │   └── profile/
│   ├── login/
│   ├── register/
│   ├── account-verify/
│   └── layout.tsx
├── assets/               # Branding assets & images
├── components/           # UI components, layout headers, footers
├── redux/                # RTK Query APIs and Redux slices
│   ├── features/
│   │   ├── auth/         # authApi & authSlice
│   │   ├── user/         # userApi
│   │   ├── product/      # productApi
│   │   └── order/        # orderApi
│   └── store.ts
└── utils/                # Role checks, media resolver, helpers
```