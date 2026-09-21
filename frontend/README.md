frontend/
├── public/                 # Static assets like site icons (favicons)
├── src/
│   ├── assets/             # Images, logos, and global CSS files
│   ├── components/         # Reusable global UI elements
│   │   ├── Button.jsx
│   │   ├── Navbar.jsx
│   │   └── ProtectedRoute.jsx
│   ├── features/           # Modularized domain-specific code (Crucial for scaling!)
│   │   ├── dashboard/
│   │   │   ├── DashboardPage.jsx
│   │   │   └── FinancialSummaryCard.jsx
│   │   ├── transactions/
│   │   │   ├── TransactionList.jsx
│   │   │   ├── TransactionForm.jsx
│   │   │   └── transactionService.js
│   │   └── auth/
│   │       ├── LoginPage.jsx
│   │       └── authService.js
│   ├── routes/             # Centralized routing configuration
│   │   └── AppRoutes.jsx
│   ├── services/           # Global API base configuration
│   │   └── api.js          # Shared Axios instance with base URL & interceptors
│   ├── App.jsx             # Main application wrapper
│   └── main.jsx            # Application entry point
├── .env.development        # Environment variables for local testing
├── .env.production         # Environment variables for production
└── vite.config.js
