# Compras - Frontend

> A web app that lets you compare grocery prices and find personalized discounts at many different grocery stores

---

## Overview

Compras is a web app that helps people save money by comparing prices on different products at different supermarkets. It also figures out the real final price based on things like their age, location, and whether or not they can get a discount (like with a bank card or digital wallet).

The app solves a big problem: people spend 15–30% more than they need to because they don't know how to easily compare prices at different stores or which discounts apply to them.

### Key Features

- **Personalized Price Calculation**: This feature shows each user's actual price based on their profile (bank, digital wallet, age, location).
- **Online vs. In-Store Separation**: Makes it clear what the differences are between delivery discounts and sales in physical stores
- **Easy to Use Interface**: Made for older people with big fonts, high contrast, and easy navigation
- **Shopping List Comparison**: Look at the total cost of full shopping lists at different supermarkets.
- **Interactive Map**: Google Maps integration shows stores nearby and gives directions.
- **AI Chatbot Assistant**: Helps people use the app and find the best deals
- **Favorite Brands**: Save your favorite brands so they show up first in search results.

---

## Project Structure

```text
frontend/
├── src/
│   ├── lib/                              # Shared utilities and configurations
│   │   ├── components/       # Reusable UI components (Tailwind)
│   │   ├── stores/                  # Svelte stores (state management)
│   │   └── index.ts                # Exports for lib files
│   ├── routes/                       # Pages, layouts, and API routes
│   │   ├── +page.svelte       # Main homepage template
│   │   └── +layout.svelte     # Global app layout
│   └── app.html                   # Main HTML entry template
├── static/                             # Public assets (images, favicons)
├── tests/                              # E2E and Unit testing
├── svelte.config.js              # SvelteKit configuration
├── tailwind.config.ts          # Tailwind CSS configuration
├── vite.config.ts                 # Vite bundler configuration
└── package.json                # Project metadata and dependencies
```

---

## Technology Stack

### Frontend
- **Framework**: SvelteKit 2.x
- **Language**: TypeScript 5.x
- **Styling**: TailwindCSS (mobile-first utility classes)
- **Maps**: Google Maps JavaScript API
- **State Management**: Svelte stores (built-in)

### Authentication
- **OAuth 2.0**: Google Sign-In (integrated with backend)

### Infrastructure
- **Hosting**: [TBD - Vercel/Netlify for frontend]

### Development Tools
- **Design**: Figma
- **Version Control**: Git + GitHub
- **Documentation**: APA 7th edition for reports

---

## Contributing

Right now, only core team members can make contributions.

---

## License

The MIT License covers this project. For more information, see the [LICENSE](./LICENSE) file.

---

**Note**: "Compras" is a temporary name for now. In the next phases of the project, the final application and company names will be chosen.