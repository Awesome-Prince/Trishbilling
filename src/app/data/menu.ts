import { MenuItem } from "../types";

// 🍽️ MENU MANAGEMENT
// Edit this file to add, remove, or modify menu items
// Simply change the name, price, or add new items to the array

export const MENU_ITEMS: MenuItem[] = [
  // ☕ Hot Beverages
  {
    id: "1",
    name: "Espresso",
    price: 50,
    category: "Hot Beverages",
  },
  {
    id: "2",
    name: "Cappuccino",
    price: 80,
    category: "Hot Beverages",
  },
  {
    id: "3",
    name: "Latte",
    price: 90,
    category: "Hot Beverages",
  },
  {
    id: "4",
    name: "Hot Chocolate",
    price: 100,
    category: "Hot Beverages",
  },
  {
    id: "5",
    name: "Masala Chai",
    price: 40,
    category: "Hot Beverages",
  },

  // 🥤 Cold Beverages
  {
    id: "6",
    name: "Iced Coffee",
    price: 100,
    category: "Cold Beverages",
  },
  {
    id: "7",
    name: "Cold Coffee",
    price: 110,
    category: "Cold Beverages",
  },
  {
    id: "8",
    name: "Iced Tea",
    price: 70,
    category: "Cold Beverages",
  },
  {
    id: "9",
    name: "Fresh Lime Soda",
    price: 60,
    category: "Cold Beverages",
  },
  {
    id: "10",
    name: "Mango Shake",
    price: 120,
    category: "Cold Beverages",
  },

  // 🥪 Food Items
  {
    id: "11",
    name: "Veg Sandwich",
    price: 120,
    category: "Food Items",
  },
  {
    id: "12",
    name: "Cheese Sandwich",
    price: 140,
    category: "Food Items",
  },
  {
    id: "13",
    name: "Paneer Sandwich",
    price: 160,
    category: "Food Items",
  },
  {
    id: "14",
    name: "French Fries",
    price: 90,
    category: "Food Items",
  },
  {
    id: "15",
    name: "Veg Burger",
    price: 130,
    category: "Food Items",
  },
  {
    id: "16",
    name: "Pizza (Small)",
    price: 200,
    category: "Food Items",
  },
  {
    id: "17",
    name: "Pasta",
    price: 180,
    category: "Food Items",
  },

  // 🍰 Snacks & Desserts
  {
    id: "18",
    name: "Samosa",
    price: 25,
    category: "Snacks & Desserts",
  },
  {
    id: "19",
    name: "Pakora Plate",
    price: 80,
    category: "Snacks & Desserts",
  },
  {
    id: "20",
    name: "Brownie",
    price: 110,
    category: "Snacks & Desserts",
  },
  {
    id: "21",
    name: "Cheesecake",
    price: 150,
    category: "Snacks & Desserts",
  },
  {
    id: "22",
    name: "Muffin",
    price: 70,
    category: "Snacks & Desserts",
  },
];

export const CATEGORIES = Array.from(
  new Set(MENU_ITEMS.map((item) => item.category))
);
