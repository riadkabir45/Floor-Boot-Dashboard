/** @format */

export interface TableColumn {
  key: string;
  label: string;
  width?: string;
}

export interface Feedback {
  id: string;
  name: string;
  message: string;
  productId: string;
  timestamp: string;
  avatar?: string;
}

export interface LinkedAccount {
  id: string;
  provider: string;
  accountNumber: string;
  isConnected: boolean;
  logo?: string;
}

export interface WalletData {
  totalBalance: number;
  pendingAmount: number;
  linkedAccounts: LinkedAccount[];
}

export type PaymentMethodType = "card" | "bank";

export interface CardDetails {
  cardNumber: string;
  expiryDate: string;
  cvc: string;
  nameOnCard: string;
  country: string;
  zipCode: string;
}

export interface CatalogueProduct {
  id: string;
  slNo: string;
  itemName: string;
  productId: string;
  category: string;
  subCategory: string;
  price: number;
  inStockQty: number;
  imageUrl?: string;
}

export type OrderStatus = "shipped" | "unshipped" | "cancelled" | "placed";

export interface Order {
  id: string;
  purchaseOrder: string;
  productId: string;
  orderDate: string;
  orderTotal: number;
  customer: string;
  shipMethod: string;
  carrier: string;
  trackingNo: string;
  item: string;
  qty: number;
  status: OrderStatus;
}

export interface User {
  full_name: string;
  email: string;
  phone: string;
  image: string;
}

export interface UploadedImage {
  id: number;
  image: string;
  title: string;
}

export interface Product {
  id: number;
  product_title: string;
  item_description: string;
  primary_image: string;
  uploaded_images: UploadedImage[];
  regular_price: string;
  sale_price: string;
  product_id: string;
  is_calculate: boolean;
}

export interface Address {
  country_or_region: string;
  address_line_i: string;
  address_line_ii: string;
  suburb: string;
  city: string;
  postal_code: string;
  state: string;
}

export interface BackendOrderResponse {
  id: number;
  user: User;
  product: Product;
  quantity: number;
  delivery_fee: string;
  tax_fee: string;
  order_total: string;
  ship_method: string | null;
  status: OrderStatus;
  carrier: string | null;
  tracking_no: string | null;
  is_paid: boolean;
  is_shiped: boolean;
  address: Address;
  custormer_feedback: string | null;
  is_feedbacked: boolean;
  created_at: string;
}

export interface ProductImage {
  id: number;
  image: string;
  title: string | null;
}

export interface BackendCatalogueResponse {
  id: number;
  product_id: string;
  product_title: string;
  brand_manufacturer: string;
  item_description: string;
  
  main_category: number;
  sub_category: string;
  
  primary_image: string;
  uploaded_images: ProductImage[];
  
  regular_price: string; 
  sale_price: string;
  
  pack_coverage: string;
  length: string;
  width: string;
  thickness: string;
  weight: string;
  pile_height: string;
  
  materials: string;
  format: string;
  installation_method: string;
  available_colors: string;
  pattern_type: string;
  
  is_underlay_required: boolean;
  is_calculate: boolean;
  stock_quantity: number;
}

export interface BackendCategoryResponse {
  id: number;
  title: string;
  image: string;
}

export interface ProductSummary {
  id: string;
  slNo: string;
  itemName: string;
  productId: string;
  category: string;
  subCategory: string;
  price: number;
  inStockQty: number;
}


export interface BackednCreateProduct {
  product_id: string;
  product_title: string;
  brand_manufacturer: string;
  main_category: number;
  sub_category: string;
  regular_price: number;
  sale_price: number;
  length: number;
  width: number;
  thickness: number;
  pile_height: number;
  weight: number;
  materials: string[];
  pattern_type: string;
  format: 'Roll' | 'Tile';
  available_colors: string[];
  is_underlay_required: boolean;
  installation_method: string;
  pack_coverage: number;
  coverage_per_pack: number;
  stock_quantity: number;
}