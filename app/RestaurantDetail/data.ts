// Dữ liệu mẫu cho menu nhà hàng

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: string;
  image: string;
  category: string;
}

export interface OfferItem {
  id: string;
  title: string;
  discount: string;
  image: string;
}

export const menuCategories = [
  "Offers",
  "Burgers",
  "Fries",
  "Snacks",
  "Salads",
  "Cold drinks",
  "Happy Meal",
  "Desserts",
  "Hot drinks",
  "Sauces",
  "Orbit",
];

export const offers: OfferItem[] = [
  {
    id: "offer-1",
    title: "First Order Discount",
    discount: "-20%",
    image: "https://images.unsplash.com/photo-1561758033-d89a9ad46330?w=400&h=300&fit=crop",
  },
  {
    id: "offer-2",
    title: "Vegan Discount",
    discount: "-20%",
    image: "/vegan-bowl.jpg",
  },
  {
    id: "offer-3",
    title: "Free Ice Cream Offer",
    discount: "-100%",
    image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400&h=300&fit=crop",
  },
];

export const menuItems: MenuItem[] = [
  // Burgers
  {
    id: "burger-1",
    name: "Royal Cheese Burger with extra Fries",
    description: "1 McChicken™, 1 Big Mac™, 1 Royal Cheeseburger, 3 medium sized French Fries, 3 cold drinks",
    price: "₫93,000",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=90",
    category: "Burgers",
  },
  {
    id: "burger-2",
    name: "Big Mac Deluxe",
    description: "Double beef patty, lettuce, cheese, onions, pickles with signature sauce",
    price: "₫85,000",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=90",
    category: "Burgers",
  },
  {
    id: "burger-3",
    name: "McChicken Special",
    description: "Crispy chicken breast, fresh lettuce, mayo in sesame seed bun",
    price: "₫75,000",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=90",
    category: "Burgers",
  },
  {
    id: "burger-4",
    name: "Quarter Pounder",
    description: "Fresh quarter pound beef patty, cheese, onions, pickles, ketchup, mustard",
    price: "₫95,000",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=90",
    category: "Burgers",
  },
  {
    id: "burger-5",
    name: "Fish Burger",
    description: "Crispy fish fillet, cheese, tartar sauce in toasted bun",
    price: "₫70,000",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=90",
    category: "Burgers",
  },
  {
    id: "burger-6",
    name: "Double Cheeseburger",
    description: "Two beef patties, double cheese, pickles, onions, ketchup, mustard",
    price: "₫88,000",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=90",
    category: "Burgers",
  },
  {
    id: "burger-extra-1",
    name: "Gourmet Cheese Burger",
    description: "Fresh lettuce, tomato, melting cheese on toasted bun with special sauce",
    price: "₫65,000",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=90",
    category: "Burgers",
  },
  {
    id: "burger-extra-2",
    name: "Double Beef Burger",
    description: "Two beef patties, cheese, pickles, onions with signature sauce",
    price: "₫82,000",
    image: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=800&q=90",
    category: "Burgers",
  },
  {
    id: "burger-extra-3",
    name: "BBQ Bacon Burger",
    description: "Crispy bacon, BBQ sauce, cheddar cheese, onion rings on sesame bun",
    price: "₫78,000",
    image: "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=800&q=90",
    category: "Burgers",
  },
  // Fries
  {
    id: "fries-1",
    name: "Large French Fries",
    description: "Golden crispy large fries with sea salt seasoning",
    price: "₫45,000",
    image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=800&q=90",
    category: "Fries",
  },
  {
    id: "fries-2",
    name: "Medium French Fries",
    description: "Golden crispy medium fries with sea salt seasoning",
    price: "₫35,000",
    image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=800&q=90",
    category: "Fries",
  },
  {
    id: "fries-3",
    name: "Small French Fries",
    description: "Golden crispy small fries with sea salt seasoning",
    price: "₫25,000",
    image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=800&q=90",
    category: "Fries",
  },
  {
    id: "fries-4",
    name: "Sweet Potato Fries",
    description: "Crispy sweet potato fries with herbs and spices",
    price: "₫50,000",
    image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=800&q=90",
    category: "Fries",
  },
  {
    id: "fries-5",
    name: "Loaded Cheese Fries",
    description: "Large fries topped with melted cheese and bacon bits",
    price: "₫65,000",
    image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=800&q=90",
    category: "Fries",
  },
  {
    id: "fries-6",
    name: "Curly Fries",
    description: "Seasoned curly fries with special spice blend",
    price: "₫40,000",
    image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=800&q=90",
    category: "Fries",
  },
  {
    id: "fries-extra-1",
    name: "Golden Crispy Fries",
    description: "Classic salted fries, perfectly golden and crispy texture",
    price: "₫38,000",
    image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=800&q=90",
    category: "Fries",
  },
  {
    id: "fries-extra-2",
    name: "Cheese Loaded Fries",
    description: "Crispy fries topped with melted cheddar cheese sauce",
    price: "₫48,000",
    image: "https://images.unsplash.com/photo-1576107232684-1279f390859f?w=800&q=90",
    category: "Fries",
  },
  {
    id: "fries-extra-3",
    name: "Curly Fries Basket",
    description: "Seasoned curly fries with special spicy coating",
    price: "₫42,000",
    image: "https://images.unsplash.com/photo-1630384060421-cb20d0e0649d?w=800&q=90",
    category: "Fries",
  },
  // Cold Drinks
  {
    id: "drink-1",
    name: "Coca Cola Large",
    description: "Refreshing large Coca Cola with ice",
    price: "₫30,000",
    image: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=800&q=90",
    category: "Cold drinks",
  },
  {
    id: "drink-2",
    name: "Orange Juice",
    description: "Fresh squeezed orange juice, medium size",
    price: "₫35,000",
    image: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=800&q=90",
    category: "Cold drinks",
  },
  {
    id: "drink-3",
    name: "Iced Coffee",
    description: "Cold brew coffee with ice and milk",
    price: "₫40,000",
    image: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=800&q=90",
    category: "Cold drinks",
  },
  {
    id: "drink-4",
    name: "Sprite Medium",
    description: "Refreshing lemon-lime soda with ice",
    price: "₫25,000",
    image: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=800&q=90",
    category: "Cold drinks",
  },
  {
    id: "drink-5",
    name: "Milkshake Vanilla",
    description: "Creamy vanilla milkshake with whipped cream",
    price: "₫55,000",
    image: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=800&q=90",
    category: "Cold drinks",
  },
  {
    id: "drink-6",
    name: "Smoothie Strawberry",
    description: "Fresh strawberry smoothie with yogurt",
    price: "₫50,000",
    image: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=800&q=90",
    category: "Cold drinks",
  },
  {
    id: "drinks-extra-1",
    name: "Iced Cola Classic",
    description: "Refreshing cola with ice cubes and lemon slice, perfect for summer",
    price: "₫32,000",
    image: "https://images.unsplash.com/photo-1554866585-cd94860890b7?w=800&q=90",
    category: "Cold drinks",
  },
  {
    id: "drinks-extra-2",
    name: "Fresh Lemonade",
    description: "Homemade lemonade with fresh lemon, mint leaves and sparkling water",
    price: "₫45,000",
    image: "https://images.unsplash.com/photo-1581098365948-6a5a912b7a49?w=800&q=90",
    category: "Cold drinks",
  },
  {
    id: "drinks-extra-3",
    name: "Berry Smoothie",
    description: "Mixed berries smoothie with yogurt, fresh and healthy choice",
    price: "₫58,000",
    image: "https://images.unsplash.com/photo-1629203851122-3726ecdf080e?w=800&q=90",
    category: "Cold drinks",
  },
];

export const reviews = [
  {
    id: "review-1",
    name: "St Glx",
    location: "South London",
    avatar: "ST",
    rating: 5,
    date: "24th September, 2023",
    comment: "The positive aspect was undoubtedly the efficiency of the service. The queue moved quickly, the staff was friendly, and the food was up to the usual McDonald's standard – hot and satisfying.",
  },
  {
    id: "review-2",
    name: "St Glx",
    location: "South London",
    avatar: "ST",
    rating: 5,
    date: "24th September, 2023",
    comment: "The positive aspect was undoubtedly the efficiency of the service. The queue moved quickly, the staff was friendly, and the food was up to the usual McDonald's standard – hot and satisfying.",
  },
  {
    id: "review-3",
    name: "St Glx",
    location: "South London",
    avatar: "ST",
    rating: 5,
    date: "24th September, 2023",
    comment: "The positive aspect was undoubtedly the efficiency of the service. The queue moved quickly, the staff was friendly, and the food was up to the usual McDonald's standard – hot and satisfying.",
  },
];
