/** @format */

"use client";

import React from "react";
import CustomTable from "@/components/CommonComponents/CustomTable";
import { CatalogueProduct, TableColumn } from "@/types/AllTypes";
import { Pencil, Trash2 } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface CatalogueTableProps {
  data: CatalogueProduct[];
  onEdit?: (product: CatalogueProduct) => void;
  onDelete?: (product: CatalogueProduct) => void;
}

export const CatalogueTable: React.FC<CatalogueTableProps> = ({
  data,
  onEdit,
  onDelete,
}) => {
  const router = useRouter();
  const columns: TableColumn[] = [
    { key: "slNo", label: "Sl No.", width: "60px" },
    { key: "items", label: "Items", width: "300px" },
    { key: "productId", label: "Product ID", width: "180px" },
    { key: "category", label: "Category", width: "120px" },
    { key: "subCategory", label: "Sub-category", width: "120px" },
    { key: "price", label: "Price (USD)", width: "120px" },
    { key: "inStockQty", label: "In Stock Qty", width: "120px" },
    { key: "action", label: "Action", width: "100px" },
  ];

  const handleEditClick = (item: CatalogueProduct) => {
    onEdit?.(item);
    router.push(`/edit-item/${item.slNo}`);
  };

  const renderCell = (item: CatalogueProduct, columnKey: string) => {
    switch (columnKey) {
      case "slNo":
        return <span className="text-gray-700 font-medium">{item.slNo}</span>;

      case "items":
        return (
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gray-200 rounded shrink-0 overflow-hidden">
              {item.imageUrl ? (
                <Image
                  src={item.imageUrl}
                  alt={item.itemName}
                  width={40}
                  height={40}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gray-300" />
              )}
            </div>
            <span className="text-gray-700 text-sm line-clamp-2">
              {item.itemName}
            </span>
          </div>
        );

      case "productId":
        return <span className="text-gray-600 text-sm">{item.productId}</span>;

      case "category":
        return <span className="text-gray-600 text-sm">{item.category}</span>;

      case "subCategory":
        return (
          <span className="text-gray-600 text-sm">{item.subCategory}</span>
        );

      case "price":
        return (
          <div className="flex items-center gap-2">
            <span className="text-gray-700 font-medium">
              £{item.price.toFixed(2)}
            </span>
            <button
              onClick={() => handleEditClick(item)}
              className="p-1 hover:bg-gray-100 rounded transition-colors"
              aria-label="Edit price"
            >
              <Pencil className="w-3.5 h-3.5 text-gray-400" />
            </button>
          </div>
        );

      case "inStockQty":
        return (
          <div className="flex items-center gap-2">
            <span className="text-gray-700 font-medium">{item.inStockQty}</span>
            <button className="p-1 hover:bg-gray-100 rounded transition-colors">
              <span className="text-lg font-bold text-gray-400">+</span>
            </button>
          </div>
        );

      case "action":
        return (
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleEditClick(item)}
              className="p-1.5 hover:bg-gray-100 rounded transition-colors"
              aria-label="Edit"
            >
              <Pencil className="w-4 h-4 text-gray-600" />
            </button>
            <button
              onClick={() => onDelete?.(item)}
              className="p-1.5 hover:bg-red-50 rounded transition-colors"
              aria-label="Delete"
            >
              <Trash2 className="w-4 h-4 text-red-500" />
            </button>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <CustomTable
      columns={columns}
      data={data}
      itemsPerPage={15}
      renderCell={renderCell}
    />
  );
};
