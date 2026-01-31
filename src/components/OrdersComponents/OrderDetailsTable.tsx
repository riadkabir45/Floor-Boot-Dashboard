/** @format */

"use client";

import React, { useState, useEffect } from "react";
import { Dialog } from "@headlessui/react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Order } from "@/types/AllTypes";
import api from "@/lib/apis";
import { useRouter } from "next/navigation";

interface OrderDetailsTableProps {
  order: Order;
  usedTracks?: string[];
}

export const OrderDetailsTable: React.FC<OrderDetailsTableProps> = ({
  order,
  usedTracks = [],
}) => {
  const router = useRouter();
  const [trackingNumber, setTrackingNumber] = useState(order.trackingNo || "");
  const [isRegenerating, setIsRegenerating] = useState(false);
  const [carrier, setCarrier] = useState(order.carrier || null);
  const [shipMethod, setShipMethod] = useState(order.shipMethod || null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showCarrierDropdown, setShowCarrierDropdown] = useState(false);
  const [showShipMethodDropdown, setShowShipMethodDropdown] = useState(false);
  const [showCarrierModal, setShowCarrierModal] = useState(false);
  const [showShipMethodModal, setShowShipMethodModal] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        setToast(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  useEffect(() => {
    setCarrier(order.carrier || null);
    setShipMethod(order.shipMethod || null);
    setTrackingNumber(order.trackingNo || "");
  }, [order]);

  const carrierOptions = ["DHL", "FedEx", "UPS", "Royal Mail", "USPS", "Other"];
  const shipMethodOptions = ["Standard", "Express", "Next Day", "Economy"];

  const generateUniqueTrackingNumber = (): string => {
    let attempts = 0;
    const maxAttempts = 100;
    
    while (attempts < maxAttempts) {
      const random11Digit = Math.floor(10000000000 + Math.random() * 90000000000);
      const newTrackingNumber = `TNX-${random11Digit}`;
      
      // Check if this tracking number is already used
      if (!usedTracks.includes(newTrackingNumber)) {
        return newTrackingNumber;
      }
      
      attempts++;
    }
    
    // Fallback with timestamp to ensure uniqueness
    return `TNX-${Date.now()}${Math.floor(Math.random() * 100)}`;
  };

  const handleRegenerateTrackingNumber = async () => {
    setIsRegenerating(true);
    try {
      const newTrackingNumber = generateUniqueTrackingNumber();
      
      // Optional: Make API call to save the new tracking number
      // await api.put(`/orders/${order.id}/tracking`, { trackingNo: newTrackingNumber });
      
      setTrackingNumber(newTrackingNumber);
    } catch (error) {
      console.error("Failed to regenerate tracking number:", error);
    } finally {
      setIsRegenerating(false);
    }
  };

  const handleConfirmShipment = async () => {
    const invalidValues = ['Pending', 'Shipping Pending', 'Not Set', null, undefined, ''];
    if (invalidValues.includes(trackingNumber) || invalidValues.includes(carrier) || invalidValues.includes(shipMethod)) {
      setToast({ message: "Please fill in all required fields: Tracking Number, Carrier, and Ship Method", type: 'error' });
      return;
    }

    setIsSubmitting(true);
    try {
      const payload = {
        quantity: order.qty,
        ship_method: shipMethod,
        status: "in_transit",
        carrier: carrier,
        tracking_no: trackingNumber,
        is_shiped: true
      };

      await api.put(`/admins/orders/${order.id}/`, payload);
      
      setToast({ message: "Shipment confirmed successfully!", type: 'success' });
      setTimeout(() => router.back(), 1500);
    } catch (error) {
      console.error("Failed to confirm shipment:", error);
      setToast({ message: "Failed to confirm shipment. Please try again.", type: 'error' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    router.back();
  };
  return (
    <>
      {toast && (
        <div
          className={`fixed top-4 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded-lg text-white font-medium shadow-lg z-50 animate-in slide-in-from-top-2 duration-300 ${
            toast.type === 'success' ? 'bg-green-500' : 'bg-red-500'
          }`}
        >
          {toast.message}
        </div>
      )}
      <div className="bg-white rounded-lg border border-gray-200" style={{ overflow: 'visible' }}>
      <div style={{ overflow: 'visible' }}>
      <Table className="" style={{ overflow: 'visible' }}>
        <TableHeader>
          <TableRow className="bg-gray-50 border-b border-gray-200">
            <TableHead className="text-gray-600 font-semibold text-sm py-4 pl-6">
              Product ID
            </TableHead>
            <TableHead className="text-gray-600 font-semibold text-sm">
              Item
            </TableHead>
            <TableHead className="text-gray-600 font-semibold text-sm">
              Order Total
            </TableHead>
            <TableHead className="text-gray-600 font-semibold text-sm">
              Ship Method
            </TableHead>
            <TableHead className="text-gray-600 font-semibold text-sm">
              Req Qty
            </TableHead>
            <TableHead className="text-gray-600 font-semibold text-sm">
              Status
            </TableHead>
            <TableHead className="text-gray-600 font-semibold text-sm">
              By Updated
            </TableHead>
            <TableHead className="text-gray-600 font-semibold text-sm">
              Carrier
            </TableHead>
            <TableHead className="text-gray-600 font-semibold text-sm">
              Tracking No.
            </TableHead>
            <TableHead className="text-gray-600 font-semibold text-sm">
              Action
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow className="border-b border-gray-100" style={{ overflow: 'visible' }}>
            <TableCell className="py-4 pl-6">
              <span className="text-blue-600 text-sm hover:underline cursor-pointer">
                {order.productId}
              </span>
            </TableCell>
            <TableCell className="text-gray-700 text-sm">
              {order.item}
            </TableCell>
            <TableCell className="text-gray-900 font-medium text-sm">
              £{order.orderTotal.toFixed(2)}
            </TableCell>
            <TableCell className="text-gray-600 text-sm">
              <button
                onClick={() => setShowShipMethodModal(true)}
                className="flex items-center gap-2 px-2 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50 transition-colors"
              >
                <span>{shipMethod || "Not Set"}</span>
              </button>
            </TableCell>
            <TableCell className="text-gray-700 text-sm">{order.qty}</TableCell>
            <TableCell>
              <span className="inline-flex px-3 py-1 rounded-full text-xs font-medium border bg-gray-100 text-gray-700 border-gray-200">
                Acknowledged
              </span>
            </TableCell>
            <TableCell className="text-gray-600 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-gray-300 flex items-center justify-center text-xs">
                  👤
                </div>
                <span>Value</span>
              </div>
            </TableCell>
            <TableCell className="text-gray-600 text-sm">
              <button
                onClick={() => setShowCarrierModal(true)}
                className="flex items-center gap-2 px-2 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50 transition-colors min-w-[120px]"
              >
                <span>{carrier || "Not Set"}</span>
              </button>
            </TableCell>
            <TableCell>
              <div className="flex flex-row gap-2 w-full justify-center items-center">
                <input
                  type="text"
                  value={trackingNumber}
                  onChange={(e) => setTrackingNumber(e.target.value)}
                  className="px-2 py-1 border border-gray-300 rounded text-sm"
                  placeholder="Enter tracking number"
                />
                <button
                  onClick={handleRegenerateTrackingNumber}
                  disabled={isRegenerating}
                  className="px-2 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  title="Regenerate tracking number"
                >
                  <i
                    className={`nf nf-fa-refresh ${isRegenerating ? 'animate-spin' : ''}`}
                  />
                </button>
              </div>
            </TableCell>
            <TableCell>
              <div className="flex gap-2">
                <button 
                  onClick={handleConfirmShipment}
                  disabled={isSubmitting || !trackingNumber || !carrier || !shipMethod || trackingNumber === 'Shipping Pending' || carrier === 'Pending'}
                  className="px-4 py-1.5 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Submitting..." : "Confirm shipment"}
                </button>
                <button 
                  onClick={handleCancel}
                  disabled={isSubmitting}
                  className="px-4 py-1.5 bg-white text-gray-700 text-sm font-medium rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Cancel
                </button>
              </div>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      </div>
    </div>
    
      {/* Carrier Selection Modal */}
      <Dialog open={showCarrierModal} onClose={() => setShowCarrierModal(false)} className="relative z-50">
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="bg-white rounded-lg shadow-xl max-w-sm w-full">
            <Dialog.Title className="text-lg font-semibold px-6 py-4 border-b border-gray-200">
              Select Carrier
            </Dialog.Title>
            <div className="py-4">
              {carrierOptions.map((carrierOption) => (
                <button
                  key={carrierOption}
                  onClick={() => {
                    setCarrier(carrierOption);
                    setShowCarrierModal(false);
                  }}
                  className="w-full text-left px-6 py-3 hover:bg-gray-100 transition-colors block border-b border-gray-100 last:border-b-0"
                >
                  {carrierOption}
                </button>
              ))}
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
      
      {/* Ship Method Selection Modal */}
      <Dialog open={showShipMethodModal} onClose={() => setShowShipMethodModal(false)} className="relative z-50">
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="bg-white rounded-lg shadow-xl max-w-sm w-full">
            <Dialog.Title className="text-lg font-semibold px-6 py-4 border-b border-gray-200">
              Select Ship Method
            </Dialog.Title>
            <div className="py-4">
              {shipMethodOptions.map((method) => (
                <button
                  key={method}
                  onClick={() => {
                    setShipMethod(method);
                    setShowShipMethodModal(false);
                  }}
                  className="w-full text-left px-6 py-3 hover:bg-gray-100 transition-colors block border-b border-gray-100 last:border-b-0"
                >
                  {method}
                </button>
              ))}
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  );
};
