import { NextResponse } from "next/server";

const allProducts = [
  { id: 1, catSlug: 'tshirts', cat: 'T-Shirts', name: 'Classic Crew Tee — Heavy Weight', sku: 'EFL-TS-001', price: '$4.80', weight: '220 GSM', fabric: 'Organic Cotton', sizes: 'XS – 3XL', certs: 'GRS · OEKO-TEX', moq: '50 pcs', desc: 'A bestselling unisex crew-neck T-shirt crafted from 100% certified organic ring-spun cotton. Pre-shrunk, side-seamed for a clean fit, available in 9 colourways with full custom branding options.' },
  { id: 2, catSlug: 'tshirts', cat: 'T-Shirts', name: "Women's Fitted Tee — Bamboo Blend", sku: 'EFL-TS-004', price: '$5.40', weight: '180 GSM', fabric: 'Bamboo / Organic Cotton', sizes: 'XS – 2XL', certs: 'OEKO-TEX · Fair Trade', moq: '50 pcs', desc: 'A feminine fitted silhouette in a luxuriously soft bamboo-cotton blend. Naturally moisture-wicking and odour-resistant — ideal for active lifestyle brands and wellness labels.' },
  { id: 3, catSlug: 'hoodies', cat: 'Hoodies & Sweatshirts', name: 'Pullover Hoodie — Organic Fleece', sku: 'EFL-HD-002', price: '$10.20', weight: '320 GSM', fabric: 'Organic Cotton Fleece', sizes: 'XS – 3XL', certs: 'GRS · OEKO-TEX', moq: '50 pcs', desc: 'A heavyweight pullover hoodie with a double-lined hood, kangaroo pocket, and ribbed cuffs and hem. Perfect for streetwear, outdoor, and corporate gifting programmes.' },
  { id: 4, catSlug: 'bags', cat: 'Bags & Totes', name: 'Circular Tote Bag — Recycled Canvas', sku: 'EFL-BG-007', price: '$3.60', weight: '340 GSM Canvas', fabric: 'RPET Recycled Canvas', sizes: 'One Size', certs: 'GRS · Fair Trade', moq: '100 pcs', desc: 'A spacious and durable tote bag made from recycled PET canvas. Features long carry handles, a flat base, and is available with screen-print or embroidery branding.' },
  { id: 5, catSlug: 'polo', cat: 'Polo Shirts', name: 'Piqué Polo — Organic Cotton', sku: 'EFL-PL-003', price: '$6.90', weight: '220 GSM Piqué', fabric: 'Organic Cotton', sizes: 'XS – 3XL', certs: 'OEKO-TEX · Fair Trade', moq: '50 pcs', desc: 'A classic piqué polo with a 3-button placket, rib collar, and side splits. The go-to for corporate uniforms and sports teams — available in 8 professional colourways.' },
  { id: 6, catSlug: 'jackets', cat: 'Jackets', name: 'Softshell Jacket — Recycled Shell', sku: 'EFL-JK-005', price: '$18.50', weight: '3-Layer Bonded', fabric: 'Recycled Polyester', sizes: 'XS – 2XL', certs: 'GRS Recycled', moq: '50 pcs', desc: 'A windproof, water-resistant softshell jacket built from 3-layer GRS-certified recycled shell. Ideal for outdoor brands, corporate workwear, and branded event apparel.' },
  { id: 7, catSlug: 'caps', cat: 'Caps & Headwear', name: '6-Panel Cap — Organic Twill', sku: 'EFL-CP-001', price: '$4.20', weight: 'Structured Front', fabric: 'Organic Cotton Twill', sizes: 'One Size (adj.)', certs: 'OEKO-TEX · Fair Trade', moq: '50 pcs', desc: 'A clean, structured 6-panel cap with a pre-curved peak, adjustable back strap, and sweatband. Optimised for embroidery branding on the front panel.' },
  { id: 8, catSlug: 'hoodies', cat: 'Hoodies & Sweatshirts', name: 'Zip-Up Hoodie — Hemp Cotton Blend', sku: 'EFL-HD-006', price: '$12.80', weight: '350 GSM', fabric: 'Hemp / Organic Cotton', sizes: 'XS – 2XL', certs: 'GRS · OEKO-TEX', moq: '50 pcs', desc: 'A premium zip-up hoodie in a robust hemp-cotton fleece blend. Hemp fibres add natural antimicrobial properties and a distinctive texture — a standout sustainable choice.' },
  { id: 9, catSlug: 'bags', cat: 'Bags & Totes', name: 'Drawstring Bag — RPET Fabric', sku: 'EFL-BG-010', price: '$1.90', weight: '190T RPET', fabric: 'Recycled PET', sizes: 'One Size', certs: 'GRS Recycled', moq: '100 pcs', desc: 'A lightweight, budget-friendly drawstring bag in 190T RPET fabric. Ideal for event giveaways, gym bags, and retail packaging. Minimum 100 pcs per colourway.' },
];

export async function GET(request: Request) {
  // Extract URL search parameters for filtering and pagination[cite: 4]
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category") || "all";
  const page = parseInt(searchParams.get("page") || "1");
  const limit = 9; 

  let filteredProducts = allProducts;
  
  if (category !== "all") {
    filteredProducts = allProducts.filter(p => p.catSlug === category);
  }

  // Calculate pagination[cite: 4]
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

  // Return the JSON response
  return NextResponse.json({
    products: paginatedProducts,
    total: filteredProducts.length,
    page,
    totalPages: Math.ceil(filteredProducts.length / limit)
  });
}