# Dineflow - Modern Food Ordering Platform

Dineflow is a comprehensive, modern web application designed for a premium food ordering and dining experience. It features a stunning UI, dynamic food menus, cart functionality, secure authentication, and a dedicated admin interface for managing food items. 

The frontend is built with **Next.js 16 (App Router)** and styled with **Tailwind CSS 4**, delivering exceptional performance and aesthetic user experience.

## ✨ Key Features

- **Dynamic Hero Section:** A beautiful, responsive hero banner with high-quality imagery and engaging micro-animations.
- **Advanced Menu Browsing:** 
  - Dynamic filtering by category (Burgers, Pizzas, Pasta, etc.).
  - Dietary preferences filtering (Veg, Non-Veg, Vegan).
  - Search functionality by food name or description.
  - Sorting options (Newest, Oldest, Price Low/High).
  - Pagination for seamless browsing.
- **Detailed Food Pages:**
  - View food details, preparation time, calories, and spiciness level.
  - Select dynamic variants (e.g., sizes) affecting base price.
  - Add optional add-ons with dynamic price calculation.
  - Real-time cart total calculation based on selected size, add-ons, and quantity.
- **Featured Menu:** A dedicated section on the homepage highlighting signature dishes and discounted items.
- **Review & Rating System:** Customers can leave ratings (stars) and comments on individual food items.
- **Admin/Chef Dashboard (Add Food Form):** 
  - A robust multi-step form to add new food items to the database.
  - Dynamic fields to add/remove variants and add-ons.
  - Multiple image upload capability powered by ImageBB.
- **Secure Authentication:** Integrated with `better-auth` using MongoDB adapter for secure and scalable user login/signup.

## 🛠️ Technology Stack

**Frontend:**
- [Next.js (v16)](https://nextjs.org/) - React Framework (App Router)
- [React (v19)](https://react.dev/) - UI Library
- [Tailwind CSS (v4)](https://tailwindcss.com/) - Utility-first CSS Framework
- [TypeScript](https://www.typescriptlang.org/) - Type-safe JavaScript
- [HeroUI / React Icons](https://react-icons.github.io/react-icons/) - UI Components & Iconography

**Backend Integration / Authentication:**
- [Better Auth](https://better-auth.com) - Authentication and Session Management
- [MongoDB](https://www.mongodb.com/) - NoSQL Database (connected directly for auth and via external API for data)
- External Express.js Backend (Provides REST API for food items)

## 🚀 Getting Started

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed on your machine.

### 1. Clone & Install Dependencies

```bash
# Clone the repository
git clone https://github.com/your-username/dineflow.git
cd dineflow

# Install dependencies
npm install
```

### 2. Environment Variables Setup

Create a `.env` file in the root directory and add the following variables:

```env
# Authentication Keys
BETTER_AUTH_SECRET=your_super_secret_key_here
NEXT_PUBLIC_BETTER_AUTH_URL=http://localhost:3000

# Database Connection (for Auth Adapter)
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/?appName=Cluster0
DB_NAME=foodflow

# External Backend API URL (Ensure no trailing slash)
NEXT_PUBLIC_BASE_URL=http://localhost:5000

# Third-party Services
NEXT_PUBLIC_IMAGEBB_API_KEY=your_imagebb_api_key_here
```

### 3. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application running.

## 📂 Project Structure

- `/src/app` - Next.js App Router pages (Home, Menu, Authentication, Details).
- `/src/Components` - Reusable React components (Banner, Featured, FoodCard, Navbar, UI elements).
- `/src/hooks` - Custom React hooks (e.g., `useFoodForm` for managing complex state).
- `/src/types` - TypeScript interfaces and type definitions.
- `/src/lib` - Utility libraries (e.g., `auth-client.ts` for Better Auth configuration).
- `/public/assets` - Static assets and local placeholder images.

## 🌐 Deployment

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new).

**Important for Vercel Deployment:**
When deploying to Vercel, ensure you configure the environment variables correctly. 
- For `NEXT_PUBLIC_BASE_URL`, make sure to include the `https://` prefix (e.g., `https://dineflow-backend-alpha.vercel.app`).
- For `NEXT_PUBLIC_BETTER_AUTH_URL`, set it to your actual Vercel domain to prevent CORS/Session issues.

## 🤝 Contributing
Contributions, issues, and feature requests are welcome! Feel free to check the issues page.