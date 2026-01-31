/** @format */

"use client";

import React, { useEffect, useState } from "react";
import { OrderTabs } from "@/components/OrdersComponents/OrderTabs";
import { OrdersTable } from "@/components/OrdersComponents/OrdersTable";
import { OrderSearchBar } from "@/components/OrdersComponents/OrderSearchBar";
import { ordersData } from "@/data/AllData";
import { BackendOrderResponse, Order, OrderStatus } from "@/types/AllTypes";
import api from "@/lib/apis";

export default function Home() {
  const [activeTab, setActiveTab] = useState<"all" | OrderStatus>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [totalData, setTotalData] = useState<Order[]>(ordersData);

  useEffect(() => {
    api.get('/admins/admin-orders/').then(response => {
      const test: Order[] = response.data.data.orders.map((order:BackendOrderResponse) => ({
        id: order.id.toString(),
        purchaseOrder: `PO-${1000 + order.id}`,
        productId: order.product.product_id,
        orderDate: order.created_at,
        orderTotal: parseFloat(order.order_total),
        customer: order.user.full_name,
        shipMethod: order.ship_method || 'Standard',
        carrier: order.carrier || 'Pending',
        trackingNo: order.tracking_no || 'Shipping Pending',
        item: order.product.product_title,
        qty: order.quantity,
        status: order.status === "cancelled" ? "cancelled" : order.is_shiped ? "shipped" : "unshipped",
      }));
      setTotalData(test);
    })
  },[])

  // Filter orders based on active tab
  const getFilteredOrders = () => {
    
    let filtered = totalData;

    // Filter by tab
    if (activeTab !== "all") {
      filtered = filtered.filter((order) => order.status === activeTab);
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(
        (order) =>
          order.purchaseOrder
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          order.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
          order.trackingNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
          order.item.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }

    return filtered;
  };

  const filteredOrders = getFilteredOrders();

  // Calculate counts for each tab
  const counts = {
    all: totalData.length,
    shipped: totalData.filter((o) => o.status === "shipped").length,
    unshipped: totalData.filter((o) => o.status === "unshipped").length,
    cancelled: totalData.filter((o) => o.status === "cancelled").length,
  };  

  const handleViewDetails = (order: Order) => {
    console.log("View details for order:", order);
    // Navigate to order details page or show modal
  };

  return (
    <div className="w-full min-h-screen bg-gray-50">
      <div className="max-w-625 mx-auto px-4 md:px-6 py-6 md:py-8">
        {/* Page Title */}
        <h1 className="text-black text-2xl md:text-3xl font-semibold mb-6">
          Orders
        </h1>

        {/* Search Bar */}
        <div className="mb-4">
          <OrderSearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search orders by ID or customer name"
          />
        </div>

        {/* Tabs */}
        <OrderTabs
          activeTab={activeTab}
          onTabChange={setActiveTab}
          counts={counts}
        />

        {/* Orders Table */}
        <OrdersTable data={filteredOrders} onViewDetails={handleViewDetails} />
      </div>
    </div>
  );
}
