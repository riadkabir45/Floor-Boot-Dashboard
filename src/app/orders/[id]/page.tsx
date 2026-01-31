/** @format */

"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ordersData } from "@/data/AllData";
import { OrderHeader } from "@/components/OrdersComponents/OrderHeader";
import { OrderDetailsCards } from "@/components/OrdersComponents/OrderDetailsCards";
import { OrderActionButtons } from "@/components/OrdersComponents/OrderActionButtons";
import { OrderDetailsTable } from "@/components/OrdersComponents/OrderDetailsTable";
import { ArrowLeft } from "lucide-react";
import { BackendOrderResponse, Order } from "@/types/AllTypes";
import api from "@/lib/apis";

export default function OrderDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const orderId = params.id as string;
  const [order, setOrder] = useState<Order|undefined>(ordersData.find((o) => o.id === orderId));

  useEffect(() => {
    api.get(`/admins/orders/${orderId}/`).then(response => {
      console.log('Ordered Item:',response.data.order_data);
      const orderData: BackendOrderResponse = response.data.order_data;

      const fetchedOrder: Order = {
        id: orderId,
        purchaseOrder: `PO-${orderId}`,
        productId: orderData.product.product_id,
        orderDate: new Date().toISOString().split('T')[0],
        orderTotal: parseFloat(orderData.order_total),
        customer: orderData.user.full_name,
        shipMethod: orderData.ship_method || 'Standard',
        carrier: 'DHL',
        trackingNo: `TRK${orderId}`,
        item: orderData.product.product_title,
        qty: orderData.quantity,
        status: orderData.is_shiped ? "shipped" : "unshipped",
      };

      setOrder(fetchedOrder);
      
    });
  },[])

  if (!order) {
    return (
      <div className="w-full min-h-screen bg-gray-50">
        <div className="max-w-625 mx-auto px-4 md:px-6 py-6 md:py-8">
          <div className="text-center">
            <h1 className="text-2xl font-semibold text-gray-900 mb-4">
              Order Not Found
            </h1>
            <button
              onClick={() => router.push("/")}
              className="text-blue-600 hover:underline"
            >
              Return to Orders
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-gray-50">
      <div className="max-w-625 mx-auto px-4 md:px-6 py-6 md:py-8">
        {/* Back Button */}
        <button
          onClick={() => router.push("/")}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="text-sm font-medium">Back to Orders</span>
        </button>

        {/* Order Header */}
        <OrderHeader order={order} />

        {/* Order Details Cards */}
        <OrderDetailsCards order={order} />

        {/* Action Buttons */}
        <OrderActionButtons />

        {/* Order Details Table */}
        <OrderDetailsTable order={order} />
      </div>
    </div>
  );
}
