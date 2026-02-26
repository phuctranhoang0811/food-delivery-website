# 🎨 formatPrice Implementation Flow Diagram

## 📊 Kiến Trúc (Architecture)

```
┌─────────────────────────────────────────────────────────┐
│              CartSidebar Component                       │
│         (components/CartSidebar.tsx)                     │
└──────────────────────┬──────────────────────────────────┘
                       │
                       │ import
                       │
                       ▼
        ┌──────────────────────────────────┐
        │   formatPriceWithSymbol()        │
        │   (lib/formatPrice.ts)           │
        │                                  │
        │  Input: 23                       │
        │  Processing: 23 × 1000 = 23000  │
        │  Intl.NumberFormat("vi-VN")      │
        │  Output: "23.000 ₫"              │
        └──────────────────────────────────┘
```

---

## 🔄 Data Flow trong CartSidebar

```
Item Data
  │
  └─→ item.price (23)
      │
      └─→ formatPriceWithSymbol(item.price)
          │
          ├─→ fullAmount = 23 × 1000 = 23000
          │
          ├─→ formatter = new Intl.NumberFormat("vi-VN", {...})
          │
          ├─→ formatted = "23.000"
          │
          └─→ result = "23.000 ₫"
              │
              └─→ Display: <span>23.000 ₫</span>
```

---

## 🧩 Component Integration Points

```
CartSidebar.tsx
│
├─ Item Price Display
│  │
│  └─ {formatPriceWithSymbol(item.price)}
│     └─ "23.000 ₫"
│
├─ Item Total (Price × Quantity)
│  │
│  └─ {formatPriceWithSymbol(item.price * item.quantity)}
│     └─ "46.000 ₫"
│
├─ Subtotal Section
│  │
│  └─ {formatPriceWithSymbol(getCartTotal())}
│     └─ "100.000 ₫"
│
└─ Checkout Button
   │
   └─ Proceed to Checkout • {formatPriceWithSymbol(getCartTotal())}
      └─ "Proceed to Checkout • 100.000 ₫"
```

---

## 📈 Intl.NumberFormat Configuration

```typescript
new Intl.NumberFormat("vi-VN", {
  style: "currency",
  currency: "VND",
  minimumFractionDigits: 0,      // Không số thập phân
  maximumFractionDigits: 0,      // Không số thập phân
})

Locale: "vi-VN" (Vietnamese - Vietnam)
│
├─ Dấu phân cách: "." (chấm)
├─ Ký hiệu tiền: "₫"
├─ Định dạng: số.số.số ₫
│
└─ Ví dụ:
   ├─ 1000 → "1.000"
   ├─ 23000 → "23.000"
   ├─ 100000 → "100.000"
   └─ 1500000 → "1.500.000"
```

---

## 🔀 Function Mapping

```
┌─────────────────────────────────────────────────┐
│           formatPrice Functions                 │
├─────────────────────────────────────────────────┤
│                                                 │
│ 1. formatPrice(price)                           │
│    └─ Returns: "23.000 ₫"                      │
│    └ Full currency format                       │
│                                                 │
│ 2. formatPriceNumber(price)                     │
│    └─ Returns: "23.000"                         │
│    └ Number only (no symbol)                    │
│                                                 │
│ 3. formatPriceWithSymbol(price, symbol)        │
│    └─ Returns: "23.000 ₫" (default symbol)     │
│    └ Customizable symbol                        │
│    └ Used in CartSidebar                        │
│                                                 │
└─────────────────────────────────────────────────┘
```

---

## 📁 Project Structure

```
food-delivery-app/
│
├── lib/
│   ├── formatPrice.ts ✨ NEW
│   │   ├─ formatPrice()
│   │   ├─ formatPriceNumber()
│   │   └─ formatPriceWithSymbol()
│   │
│   └── (other utilities)
│
├── components/
│   ├── CartSidebar.tsx 🔄 MODIFIED
│   │   ├─ import { formatPriceWithSymbol }
│   │   ├─ Item Price: formatPriceWithSymbol(item.price)
│   │   ├─ Item Total: formatPriceWithSymbol(item.price * qty)
│   │   ├─ Subtotal: formatPriceWithSymbol(getCartTotal())
│   │   └─ Checkout: formatPriceWithSymbol(getCartTotal())
│   │
│   └── (other components)
│
├── docs/
│   ├── FORMAT_PRICE_GUIDE.md 📖
│   ├── PRICE_FORMAT_UPDATE.md 📊
│   ├── QUICK_REFERENCE.md 📝
│   └── IMPLEMENTATION_SUMMARY.md 📋
│
└── (other files)
```

---

## ⚙️ Processing Pipeline

```
User Adds Item to Cart
        │
        ▼
Item State Updated
(price: 23, quantity: 1)
        │
        ▼
CartSidebar Re-renders
        │
        ├─ Item Price Display
        │  └─ formatPriceWithSymbol(23) → "23.000 ₫"
        │
        ├─ Item Total Display
        │  └─ formatPriceWithSymbol(23 × 1) → "23.000 ₫"
        │
        ├─ Subtotal Display
        │  └─ formatPriceWithSymbol(23) → "23.000 ₫"
        │
        └─ Checkout Button
           └─ "Proceed to Checkout • 23.000 ₫"
                │
                ▼
            User Sees Formatted Price
```

---

## 🎯 Usage Pattern

### Pattern 1: Direct Import and Use

```typescript
import { formatPriceWithSymbol } from "@/lib/formatPrice";

<span>{formatPriceWithSymbol(price)}</span>
```

### Pattern 2: With Calculation

```typescript
<span>{formatPriceWithSymbol(item.price * item.quantity)}</span>
```

### Pattern 3: With Custom Symbol

```typescript
<span>{formatPriceWithSymbol(price, "VND")}</span>
```

### Pattern 4: Without Symbol

```typescript
import { formatPriceNumber } from "@/lib/formatPrice";

<span>{formatPriceNumber(price)}</span>
```

---

## 📊 Example: Cart Display

```
┌─────────────────────────────────────────┐
│          Your Cart                      │
├─────────────────────────────────────────┤
│                                         │
│ Big Mac                                │
│ McDonald's East London                 │
│ Price: 23.000 ₫ ← formatPrice()        │
│                                         │
│ Qty: 1   Subtotal: 23.000 ₫ ← format   │
│                                         │
├─────────────────────────────────────────┤
│                                         │
│ Subtotal:  100.000 ₫ ← formatPrice()   │
│                                         │
│ Delivery: 20-30 minutes                │
│                                         │
│ Proceed to Checkout • 100.000 ₫ ← fmt  │
│                                         │
└─────────────────────────────────────────┘
```

---

## ✅ Quality Checklist

- [x] Uses Intl.NumberFormat (recommended)
- [x] Proper locale: "vi-VN"
- [x] Correct formatting: "23.000 ₫"
- [x] Applied to all price displays in CartSidebar
- [x] Code is DRY (Don't Repeat Yourself)
- [x] Easy to maintain and extend
- [x] Full documentation provided
- [x] No breaking changes

---

**Implementation Status: ✅ COMPLETE AND TESTED**
