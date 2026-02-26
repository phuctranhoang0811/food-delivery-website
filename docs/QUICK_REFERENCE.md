# 🎯 Quick Reference: formatPrice Usage

## 📌 3 Functions Có Sẵn

### 1. `formatPrice()` - Full Format (Khuyên dùng)

```typescript
import { formatPrice } from "@/lib/formatPrice";

formatPrice(23); // → "23.000 ₫"
formatPrice(100); // → "100.000 ₫"
```

### 2. `formatPriceNumber()` - Chỉ Số

```typescript
import { formatPriceNumber } from "@/lib/formatPrice";

formatPriceNumber(23); // → "23.000"
formatPriceNumber(100); // → "100.000"
```

### 3. `formatPriceWithSymbol()` - Tuỳ Chỉnh Ký Hiệu (Đã Dùng)

```typescript
import { formatPriceWithSymbol } from "@/lib/formatPrice";

formatPriceWithSymbol(23); // → "23.000 ₫" (mặc định)
formatPriceWithSymbol(23, "VND"); // → "23.000 VND"
formatPriceWithSymbol(23, "$"); // → "23.000 $"
formatPriceWithSymbol(23, "đ"); // → "23.000 đ"
```

---

## 💻 Áp Dụng Trong Components

### Pattern 1: Item Price

```jsx
<span className="font-bold text-orange-500">
  {formatPriceWithSymbol(item.price)}
</span>
```

### Pattern 2: Item Total (Item Price × Quantity)

```jsx
<span className="font-bold">
  {formatPriceWithSymbol(item.price * item.quantity)}
</span>
```

### Pattern 3: Cart Subtotal

```jsx
<span className="font-bold text-orange-500">
  {formatPriceWithSymbol(getCartTotal())}
</span>
```

### Pattern 4: Button with Price

```jsx
<button className="btn-primary">
  Checkout • {formatPriceWithSymbol(getCartTotal())}
</button>
```

---

## 📊 Input/Output Examples

```
Input:         Output (formatPrice)
───────────────────────────────────
0        →     0 ₫
1        →     1.000 ₫
10       →     10.000 ₫
23       →     23.000 ₫
100      →     100.000 ₫
1500     →     1.500.000 ₫
10000    →     10.000.000 ₫
99.99    →     99.990 ₫
```

---

## ✅ Applied Locations (CartSidebar)

- ✅ Item individual price
- ✅ Item total (price × qty)
- ✅ Subtotal section
- ✅ Checkout button

---

## 📖 Full Documentation

See: `docs/FORMAT_PRICE_GUIDE.md`

---

## 🔗 File Location

- Helper: `lib/formatPrice.ts`
- Usage: `components/CartSidebar.tsx`
