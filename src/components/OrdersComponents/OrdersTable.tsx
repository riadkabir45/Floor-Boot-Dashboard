/** @format */

"use client";

import React from "react";
import { useRouter } from "next/navigation";
import CustomTable from "@/components/CommonComponents/CustomTable";
import { Order, TableColumn } from "@/types/AllTypes";
import { Eye } from "lucide-react";

interface OrdersTableProps {
  data: Order[];
  onViewDetails?: (order: Order) => void;
}

export const OrdersTable: React.FC<OrdersTableProps> = ({
  data,
  onViewDetails,
}) => {
  const router = useRouter();

  const columns: TableColumn[] = [
    { key: "purchaseOrder", label: "Purchase orders", width: "150px" },
    { key: "productId", label: "Product ID", width: "150px" },
    { key: "orderDate", label: "Order Date", width: "130px" },
    { key: "orderTotal", label: "Order Total", width: "120px" },
    { key: "customer", label: "Customer", width: "160px" },
    { key: "shipMethod", label: "Ship Method", width: "140px" },
    { key: "carrier", label: "Carrier", width: "150px" },
    { key: "trackingNo", label: "Tracking No.", width: "150px" },
    { key: "item", label: "Item", width: "180px" },
    { key: "qty", label: "Qty", width: "70px" },
    { key: "status", label: "Status", width: "120px" },
    { key: "action", label: "Action", width: "120px" },
  ];

  const getStatusStyles = (status: string) => {
    switch (status) {
      case "shipped":
        return "bg-green-100 text-green-700 border-green-200";
      case "unshipped":
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
      case "cancelled":
        return "bg-red-100 text-red-700 border-red-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const renderCell = (item: Order, columnKey: string) => {
    switch (columnKey) {
      case "purchaseOrder":
        return (
          <span className="text-gray-700 text-sm">{item.purchaseOrder}</span>
        );

      case "productId":
        return <span className="text-gray-700 text-sm">{item.productId}</span>;

      case "orderDate":
        return <span className="text-gray-600 text-sm">{item.orderDate}</span>;

      case "orderTotal":
        return (
          <span className="text-gray-900 font-medium text-sm">
            £{item.orderTotal.toFixed(2)}
          </span>
        );

      case "customer":
        return <span className="text-gray-700 text-sm">{item.customer}</span>;

      case "shipMethod":
        return <span className="text-gray-600 text-sm">{item.shipMethod}</span>;

      case "carrier":
        return <span className="text-gray-600 text-sm">{item.carrier}</span>;

      case "trackingNo":
        return (
          <span className="text-blue-600 text-sm hover:underline cursor-pointer">
            {item.trackingNo}
          </span>
        );

      case "item":
        return <span className="text-gray-700 text-sm">{item.item}</span>;

      case "qty":
        return (
          <span className="text-gray-700 font-medium text-sm">{item.qty}</span>
        );

      case "status":
        return (
          <span
            className={`inline-flex px-3 py-1 rounded-full text-xs font-medium border ${getStatusStyles(
              item.status,
            )}`}
          >
            {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
          </span>
        );

      case "action":
        return (
          <button
            onClick={() => {
              if (onViewDetails) {
                onViewDetails(item);
              }
              router.push(`/orders/${item.id}`);
            }}
            className="inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 rounded-lg transition-colors"
          >
            <Eye className="w-4 h-4" />
            Details
          </button>
        );

      default:
        return null;
    }
  };

  return (
    <CustomTable
      columns={columns}
      data={data}
      itemsPerPage={10}
      renderCell={renderCell}
    />
  );
};
