import type { User, Chat, ChatMessage, Product } from './types';
export const MOCK_USERS: User[] = [
  { id: 'u1', name: 'User A' },
  { id: 'u2', name: 'User B' }
];
export const MOCK_CHATS: Chat[] = [
  { id: 'c1', title: 'General' },
];
export const MOCK_CHAT_MESSAGES: ChatMessage[] = [
  { id: 'm1', chatId: 'c1', userId: 'u1', text: 'Hello', ts: Date.now() },
];
export const MOCK_PRODUCTS: Product[] = [
  { id: 'prod_001', name: 'Aura Glow Serum', price: 45.00, sku: 'AGS-001', stock: 150, imageUrl: 'https://picsum.photos/seed/AGS-001/400/400', description: 'A lightweight, fast-absorbing serum that delivers a potent blend of antioxidants and hyaluronic acid for a radiant, dewy finish.' },
  { id: 'prod_002', name: 'Zenith Hydrating Mist', price: 28.50, sku: 'ZHM-002', stock: 200, imageUrl: 'https://picsum.photos/seed/ZHM-002/400/400', description: 'An ultra-fine mist that refreshes and hydrates skin throughout the day. Infused with rosewater and botanical extracts to soothe and tone.' },
  { id: 'prod_003', name: 'Eclipse Toning Water', price: 32.00, sku: 'ETW-003', stock: 120, imageUrl: 'https://picsum.photos/seed/ETW-003/400/400', description: 'A balancing toner that minimizes the appearance of pores and removes residual impurities, leaving skin feeling clean and prepped for moisture.' },
  { id: 'prod_004', name: 'Nova Brightening Cream', price: 55.00, sku: 'NBC-004', stock: 80, imageUrl: 'https://picsum.photos/seed/NBC-004/400/400', description: 'A rich, luxurious cream featuring Vitamin C and licorice root to visibly brighten and even out skin tone for a luminous complexion.' },
  { id: 'prod_005', name: 'Celestial Clay Mask', price: 38.00, sku: 'CCM-005', stock: 100, imageUrl: 'https://picsum.photos/seed/CCM-005/400/400', description: 'A detoxifying clay mask formulated with kaolin and bentonite clays to draw out impurities, refine texture, and purify pores.' },
  { id: 'prod_006', name: 'Solstice Sunscreen SPF 50', price: 25.00, sku: 'SSS-006', stock: 300, imageUrl: 'https://picsum.photos/seed/SSS-006/400/400', description: 'A broad-spectrum SPF 50 sunscreen with a non-greasy, lightweight formula that provides powerful protection against UVA/UVB rays.' },
  { id: 'prod_007', name: 'Lunar Night Oil', price: 62.00, sku: 'LNO-007', stock: 75, imageUrl: 'https://picsum.photos/seed/LNO-007/400/400', description: 'A restorative night oil with retinol and blue tansy to reduce the look of fine lines and calm irritated skin while you sleep.' },
  { id: 'prod_008', name: 'Stardust Exfoliating Scrub', price: 34.50, sku: 'SES-008', stock: 90, imageUrl: 'https://picsum.photos/seed/SES-008/400/400', description: 'A gentle yet effective physical exfoliant that uses fine sugar crystals and fruit enzymes to polish away dead skin cells for a smoother surface.' },
  { id: 'prod_009', name: 'Galaxy Eye Gel', price: 48.00, sku: 'GEG-009', stock: 110, imageUrl: 'https://picsum.photos/seed/GEG-009/400/400', description: 'A cooling eye gel that helps to reduce puffiness and dark circles with caffeine and peptides, for a brighter, more awake look.' },
  { id: 'prod_010', name: 'Cosmic Lip Balm', price: 15.00, sku: 'CLB-010', stock: 250, imageUrl: 'https://picsum.photos/seed/CLB-010/400/400', description: 'An intensely nourishing lip balm with shea butter and jojoba oil to hydrate, soothe, and protect lips from dryness.' },
  { id: 'prod_011', name: 'Orion Peptide Moisturizer', price: 58.00, sku: 'OPM-011', stock: 60, imageUrl: 'https://picsum.photos/seed/OPM-011/400/400', description: 'A daily moisturizer packed with peptides and ceramides to strengthen the skin barrier, improve firmness, and provide lasting hydration.' },
  { id: 'prod_012', name: 'Nebula Foaming Cleanser', price: 29.99, sku: 'NFC-012', stock: 180, imageUrl: 'https://picsum.photos/seed/NFC-012/400/400', description: 'A gentle foaming cleanser that effectively removes makeup and impurities without stripping the skin of its natural moisture.' },
];