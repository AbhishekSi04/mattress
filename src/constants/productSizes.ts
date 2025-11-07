export const PRODUCT_SIZES = {
  Mattress: ['Single', 'Double', 'Queen', 'King', 'Super King'],
  Bolster: ['Small (20x8)', 'Medium (24x9)', 'Large (30x10)', 'Extra Large (36x10)'],
  Cushion: ['Small (12x12)', 'Medium (16x16)', 'Large (18x18)', 'Rectangle (24x16)'],
  Pillow: ['Standard (20x26)', 'Queen (20x30)', 'King (20x36)', 'Contour (Ergonomic)'],
  Quilts: ['Single', 'Double', 'Queen', 'King'],
  Sheet: ['Single', 'Double', 'Queen', 'King', 'Fitted Sheet'],
} as const;

export type ProductCategory = 'Mattress' | 'Bolster' | 'Cushion' | 'Pillow' | 'Quilts' | 'Sheet';
