# ☕ Café Billing System

A complete web-based café billing system built with React, TypeScript, and Tailwind CSS. Perfect for café staff to take orders, generate bills, and track sales history.

## ✨ Features

- 📋 **Menu Management** - 22+ items across multiple categories
- 🛒 **Order Taking** - Easy add/remove items with quantity controls
- 💰 **Billing System** - Automatic calculation of totals
- 🧾 **Invoice Generation** - Professional invoices with print/share
- 💾 **Local Database** - Orders stored in browser (works offline)
- 📊 **Sales History** - View all past orders and statistics
- 📱 **Mobile Friendly** - Responsive design for all devices

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and pnpm installed

### Installation

```bash
# Clone the repository
git clone https://github.com/YOUR-USERNAME/YOUR-REPO-NAME.git
cd YOUR-REPO-NAME

# Install dependencies
pnpm install

# Run development server
pnpm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## 📦 Build for Production

```bash
# Build the app
pnpm run build

# Preview the build
pnpm run preview
```

## 🌐 Deploy to GitHub Pages

### Automatic Deployment (Recommended)

1. **Enable GitHub Pages:**
   - Go to your repository settings
   - Navigate to **Pages** section
   - Under **Source**, select **GitHub Actions**

2. **Push to main/master branch:**
   ```bash
   git add .
   git commit -m "Deploy to GitHub Pages"
   git push origin main
   ```

3. **Wait for deployment:**
   - GitHub Actions will automatically build and deploy
   - Check the **Actions** tab to see progress
   - Your app will be live at: `https://YOUR-USERNAME.github.io/YOUR-REPO-NAME/`

### Manual Deployment

```bash
# Build the project
pnpm run build

# Deploy the dist folder to gh-pages branch
git subtree push --prefix dist origin gh-pages
```

## 🔧 Configuration

### Edit Menu Items

Edit `/src/app/data/menu.ts` to customize your café menu:

```typescript
export const MENU_ITEMS: MenuItem[] = [
  {
    id: "1",
    name: "Espresso",
    price: 50,
    category: "Hot Beverages",
  },
  // Add more items...
];
```

### Troubleshooting GitHub Pages Blank Screen

If you see a blank page after deployment:

1. **Check the base path** - We use hash routing (`#/`) which should work automatically
2. **Wait a few minutes** - GitHub Pages can take 5-10 minutes to propagate
3. **Clear browser cache** - Hard refresh with `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)
4. **Check Actions tab** - Make sure the deployment workflow completed successfully

## 📱 Usage

### For Café Staff:

1. **Browse Menu** - View all available items by category
2. **Add to Cart** - Click items to add them, use +/- to adjust quantity
3. **Review Cart** - Click the cart button to review your order
4. **Checkout** - Proceed to checkout to complete the order
5. **View Invoice** - Automatic invoice with print/share options
6. **Sales History** - Access all past orders and statistics

## 🛠️ Tech Stack

- **Frontend:** React 18, TypeScript
- **Routing:** React Router v7 (Hash-based for GitHub Pages)
- **Styling:** Tailwind CSS v4
- **UI Components:** Radix UI, shadcn/ui
- **Icons:** Lucide React
- **Date Formatting:** date-fns
- **Build Tool:** Vite
- **Storage:** Browser LocalStorage

## 📂 Project Structure

```
/src/app/
├── pages/              # Main page components
│   ├── Menu.tsx       # Menu/order screen
│   ├── Cart.tsx       # Cart review
│   ├── Invoice.tsx    # Invoice display
│   ├── SalesHistory.tsx
│   └── OrderDetail.tsx
├── components/        # Reusable components
├── data/
│   └── menu.ts       # ✏️ Edit menu items here
├── services/
│   └── database.ts   # LocalStorage management
└── types/
    └── index.ts      # TypeScript types
```

## 🎯 Future Enhancements

- [ ] SQL Database integration
- [ ] Staff authentication
- [ ] Receipt printer support
- [ ] Payment tracking (cash/card/UPI)
- [ ] Discount system
- [ ] Advanced analytics
- [ ] Multi-device sync
- [ ] Customer management

## 📄 License

MIT License - feel free to use this for your café!

## 🤝 Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## 📧 Support

If you encounter any issues, please check the troubleshooting section above or open an issue on GitHub.

---

**Made with ☕ and ❤️**
