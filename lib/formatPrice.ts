/**
 * Format price to Vietnamese Dong currency format
 * Uses Intl.NumberFormat for proper locale-based formatting
 * 
 * @param price - Price in thousands (e.g., 23 for 23,000 VND)
 * @returns Formatted string (e.g., "23.000 ₫")
 */
export function formatPrice(price: number): string {
  // Convert to full amount (multiply by 1000)
  const fullAmount = price * 1000;

  // Use Intl.NumberFormat for Vietnamese locale formatting
  const formatter = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  return formatter.format(fullAmount);
}

/**
 * Format price without currency symbol (just the number with separators)
 * @param price - Price in thousands (e.g., 23 for 23,000 VND)
 * @returns Formatted number string (e.g., "23.000")
 */
export function formatPriceNumber(price: number): string {
  const fullAmount = price * 1000;

  const formatter = new Intl.NumberFormat("vi-VN", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  return formatter.format(fullAmount);
}

/**
 * Format price with custom symbol
 * @param price - Full price amount (e.g., 50000 for 50,000 VND)
 * @param symbol - Currency symbol (default: "VND")
 * @returns Formatted string with custom symbol (e.g., "50,000 VND")
 */
export function formatPriceWithSymbol(
  price: number,
  symbol: string = "VND"
): string {
  // Use price as is (already full amount)
  const fullAmount = price;

  const formatter = new Intl.NumberFormat("vi-VN", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  return `${formatter.format(fullAmount)} ${symbol}`;
}

/**
 * Parse price string and format it (e.g., "₫693,000" -> "693.000 VND")
 * @param priceString - Price string (e.g., "₫693,000" or "693,000")
 * @param symbol - Currency symbol (default: "VND")
 * @returns Formatted string (e.g., "693.000 VND")
 */
export function formatPriceFromString(
  priceString: string,
  symbol: string = "VND"
): string {
  // Extract only digits from the price string
  const numericPrice = parseInt(priceString.replace(/[^0-9]/g, ""), 10);
  
  if (isNaN(numericPrice)) {
    return "0 VND";
  }

  // Format using Intl.NumberFormat
  const formatter = new Intl.NumberFormat("vi-VN", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  return `${formatter.format(numericPrice)} ${symbol}`;
}
