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
}