# formatPrice Helper - Hướng Dẫn Sử Dụng

## 📋 Tổng Quan

`formatPrice` là một helper function giúp định dạng giá tiền theo chuẩn Việt Nam sử dụng `Intl.NumberFormat` API của JavaScript. Nó tự động thêm dấu chấm phân cách hàng nghìn và ký hiệu tiền tệ.

---

## 🛠️ Cấu Trúc Helper Function

### File: `lib/formatPrice.ts`

```typescript
/**
 * Format price to Vietnamese Dong currency format
 * Uses Intl.NumberFormat for proper locale-based formatting
 *
 * @param price - Price in thousands (e.g., 23 for 23,000 VND)
 * @returns Formatted string (e.g., "23.000 ₫")
 */
export function formatPrice(price: number): string { ... }

/**
 * Format price without currency symbol
 * @param price - Price in thousands (e.g., 23 for 23,000 VND)
 * @returns Formatted number string (e.g., "23.000")
 */
export function formatPriceNumber(price: number): string { ... }

/**
 * Format price with custom symbol
 * @param price - Price in thousands (e.g., 23 for 23,000 VND)
 * @param symbol - Currency symbol (default: "₫")
 * @returns Formatted string with custom symbol (e.g., "23.000 ₫")
 */
export function formatPriceWithSymbol(price: number, symbol: string = "₫"): string { ... }
```

---

## 💡 Ví Dụ Sử Dụng

### Input → Output

| Input   | Output        |
| ------- | ------------- |
| `23`    | `23.000 ₫`    |
| `100`   | `100.000 ₫`   |
| `1500`  | `1.500.000 ₫` |
| `99.99` | `99.990 ₫`    |

---

## 🎯 Cách Áp Dụng Trong Component

### 1. Import Helper Function

```typescript
import { formatPriceWithSymbol } from "@/lib/formatPrice";
```

### 2. Sử Dụng trong Component

#### **Item Price (Giá từng món)**

```typescript
// Trước (cũ)
<p className="text-orange-500 font-bold">
  ₫{(item.price * 1000).toLocaleString("vi-VN")}
</p>

// Sau (mới - dùng formatPrice)
<p className="text-orange-500 font-bold">
  {formatPriceWithSymbol(item.price)}
</p>
```

#### **Item Total (Tổng tiền món với số lượng)**

```typescript
// Trước (cũ)
<p className="text-sm text-gray-700 font-medium">
  ₫{(item.price * item.quantity * 1000).toLocaleString("vi-VN")}
</p>

// Sau (mới)
<p className="text-sm text-gray-700 font-medium">
  {formatPriceWithSymbol(item.price * item.quantity)}
</p>
```

#### **Subtotal (Tổng giỏ hàng)**

```typescript
// Trước (cũ)
<span className="font-bold text-orange-500">
  ₫{(getCartTotal() * 1000).toLocaleString("vi-VN")}
</span>

// Sau (mới)
<span className="font-bold text-orange-500">
  {formatPriceWithSymbol(getCartTotal())}
</span>
```

#### **Checkout Button (Nút thanh toán)**

```typescript
// Trước (cũ)
<button>
  Proceed to Checkout • ₫{(getCartTotal() * 1000).toLocaleString("vi-VN")}
</button>

// Sau (mới)
<button>
  Proceed to Checkout • {formatPriceWithSymbol(getCartTotal())}
</button>
```

---

## 📱 Ví Dụ Trong CartSidebar Component

### Cập Nhật Đã Thực Hiện:

```typescript
"use client";

import { useCart } from "@/contexts/CartContext";
import { formatPriceWithSymbol } from "@/lib/formatPrice";

export default function CartSidebar() {
  const { items, getCartTotal, ... } = useCart();

  return (
    <>
      {/* Item Price */}
      <p className="text-orange-500 font-bold">
        {formatPriceWithSymbol(item.price)}
      </p>

      {/* Item Total */}
      <p className="text-sm text-gray-700 font-medium">
        {formatPriceWithSymbol(item.price * item.quantity)}
      </p>

      {/* Subtotal */}
      <div className="flex justify-between items-center text-lg">
        <span className="font-semibold text-gray-900">Subtotal:</span>
        <span className="font-bold text-orange-500">
          {formatPriceWithSymbol(getCartTotal())}
        </span>
      </div>

      {/* Checkout Button */}
      <button className="w-full bg-orange-500 ...">
        Proceed to Checkout • {formatPriceWithSymbol(getCartTotal())}
      </button>
    </>
  );
}
```

---

## 🔧 Tuỳ Chỉnh Thêm

### Nếu muốn sử dụng ký hiệu khác (ví dụ: "VND" thay vì "₫"):

```typescript
// Sử dụng formatPriceWithSymbol với symbol tuỳ chỉnh
{
  formatPriceWithSymbol(item.price, "VND");
}
// Output: "23.000 VND"
```

### Nếu chỉ muốn số mà không có ký hiệu:

```typescript
import { formatPriceNumber } from "@/lib/formatPrice";

{
  formatPriceNumber(item.price);
}
// Output: "23.000"
```

---

## ✅ Lợi Ích Của formatPrice Helper

1. **Code sạch hơn**: Không cần viết lại `toLocaleString()` mỗi lần
2. **Dễ bảo trì**: Nếu cần đổi định dạng, chỉ cập nhật 1 chỗ duy nhất
3. **Chuẩn Intl**: Sử dụng Intl.NumberFormat API chuẩn của JavaScript
4. **Tính nhất quán**: Tất cả giá tiền trong app sẽ hiển thị đúng định dạng
5. **Dễ mở rộng**: Có thể thêm currency khác trong tương lai

---

## 📌 Các Component Đã Cập Nhật

- ✅ **CartSidebar.tsx** - Item price, Item total, Subtotal, Checkout button
- 📝 **Có thể cập nhật thêm**:
  - Header.tsx (cart total display)
  - Body.tsx (featured items prices)
  - RestaurantMenu.tsx (menu items prices)
  - Các component khác có hiển thị giá

---

## 🎨 Hình Ảnh Kết Quả

### Trước Cập Nhật:

```
₫23100 (không có dấu phân cách)
```

### Sau Cập Nhật:

```
23.000 ₫ (có dấu chấm phân cách hàng nghìn)
```

---

## 📞 Hỗ Trợ

Nếu có câu hỏi hoặc cần cập nhật thêm, hãy liên hệ!
