/** @format */

"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Dialog } from "@headlessui/react";

interface CatalogueFiltersProps {
  categories: Array<{ id: number; title: string }>;
  subcategories: string[];
  onFilterChange: (filters: { category?: number; subcategory?: string; inStock?: boolean }) => void;
}

export const CatalogueFilters: React.FC<CatalogueFiltersProps> = ({ categories, subcategories, onFilterChange }) => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [showSubcategoryModal, setShowSubcategoryModal] = useState(false);
  const [showStockModal, setShowStockModal] = useState(false);

  const handleFilterChange = (filters: any) => {
    onFilterChange(filters);
  };

  const handleCategorySelect = (categoryId: number) => {
    setSelectedCategory(categoryId);
    setShowCategoryModal(false);
    handleFilterChange({ category: categoryId, subcategory: selectedSubcategory, inStock: inStockOnly });
  };

  const handleSubcategorySelect = (subcategory: string) => {
    setSelectedSubcategory(subcategory);
    setShowSubcategoryModal(false);
    handleFilterChange({ category: selectedCategory, subcategory, inStock: inStockOnly });
  };

  const handleStockToggle = (inStock: boolean) => {
    setInStockOnly(inStock);
    setShowStockModal(false);
    handleFilterChange({ category: selectedCategory, subcategory: selectedSubcategory, inStock });
  };

  const handleClearFilters = () => {
    setActiveFilter("all");
    setSelectedCategory(null);
    setSelectedSubcategory(null);
    setInStockOnly(false);
    handleFilterChange({});
  };

  const categoryName = categories.find(c => c.id === selectedCategory)?.title;

  return (
    <>
      <div className="flex flex-wrap gap-2 md:gap-3">
        {/* All Filter */}
        <button
          onClick={handleClearFilters}
          className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
            activeFilter === "all"
              ? "bg-lime-400 text-black hover:bg-lime-500"
              : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
          }`}
        >
          All
        </button>

        {/* By category dropdown */}
        <button
          onClick={() => setShowCategoryModal(true)}
          className="px-4 py-2 bg-white border border-gray-300 rounded-lg font-medium text-sm text-gray-700 hover:bg-gray-50 transition-all flex items-center gap-2"
        >
          {categoryName || "By category"}
          <ChevronDown className="w-4 h-4" />
        </button>

        {/* By subcategory dropdown */}
        <button
          onClick={() => setShowSubcategoryModal(true)}
          className="px-4 py-2 bg-white border border-gray-300 rounded-lg font-medium text-sm text-gray-700 hover:bg-gray-50 transition-all flex items-center gap-2"
        >
          {selectedSubcategory || "By subcategory"}
          <ChevronDown className="w-4 h-4" />
        </button>

        {/* In stock dropdown */}
        <button
          onClick={() => setShowStockModal(true)}
          className="px-4 py-2 bg-white border border-gray-300 rounded-lg font-medium text-sm text-gray-700 hover:bg-gray-50 transition-all flex items-center gap-2"
        >
          {inStockOnly ? "In stock only" : "In stock"}
          <ChevronDown className="w-4 h-4" />
        </button>
      </div>

      {/* Category Modal */}
      <Dialog open={showCategoryModal} onClose={() => setShowCategoryModal(false)} className="relative z-50">
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="bg-white rounded-lg shadow-xl max-w-sm w-full">
            <Dialog.Title className="text-lg font-semibold px-6 py-4 border-b border-gray-200">
              Select Category
            </Dialog.Title>
            <div className="py-4">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => handleCategorySelect(category.id)}
                  className="w-full text-left px-6 py-3 hover:bg-gray-100 transition-colors block border-b border-gray-100 last:border-b-0"
                >
                  {category.title}
                </button>
              ))}
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>

      {/* Subcategory Modal */}
      <Dialog open={showSubcategoryModal} onClose={() => setShowSubcategoryModal(false)} className="relative z-50">
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="bg-white rounded-lg shadow-xl max-w-sm w-full">
            <Dialog.Title className="text-lg font-semibold px-6 py-4 border-b border-gray-200">
              Select Subcategory
            </Dialog.Title>
            <div className="py-4">
              {subcategories.length > 0 ? (
                subcategories.map((subcategory) => (
                  <button
                    key={subcategory}
                    onClick={() => handleSubcategorySelect(subcategory)}
                    className="w-full text-left px-6 py-3 hover:bg-gray-100 transition-colors block border-b border-gray-100 last:border-b-0"
                  >
                    {subcategory}
                  </button>
                ))
              ) : (
                <div className="px-6 py-3 text-gray-500 text-center">No subcategories available</div>
              )}
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>

      {/* Stock Modal */}
      <Dialog open={showStockModal} onClose={() => setShowStockModal(false)} className="relative z-50">
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="bg-white rounded-lg shadow-xl max-w-sm w-full">
            <Dialog.Title className="text-lg font-semibold px-6 py-4 border-b border-gray-200">
              Filter by Stock
            </Dialog.Title>
            <div className="py-4">
              <button
                onClick={() => handleStockToggle(false)}
                className="w-full text-left px-6 py-3 hover:bg-gray-100 transition-colors block border-b border-gray-100"
              >
                All Products
              </button>
              <button
                onClick={() => handleStockToggle(true)}
                className="w-full text-left px-6 py-3 hover:bg-gray-100 transition-colors block"
              >
                In Stock Only
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  );
};
