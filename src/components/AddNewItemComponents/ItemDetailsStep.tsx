/** @format */

"use client";

import React, { useState } from "react";

interface ItemDetailsStepProps {
  data: {
    productTitle: string;
    brand: string;
    description: string;
    mainCategory: string;
    subCategory: string;
    tags: string[];
  };
  onChange: (data: any) => void;
  categories?: Array<{ id: number; title: string }>;
}

export const ItemDetailsStep: React.FC<ItemDetailsStepProps> = ({
  data,
  onChange,
  categories = [],
}) => {
  const [tagInput, setTagInput] = useState("");

  const handleChange = (field: string, value: any) => {
    onChange({ ...data, [field]: value });
  };

  const addTag = (tag: string) => {
    if (tag && !data.tags.includes(tag)) {
      handleChange("tags", [...data.tags, tag]);
    }
    setTagInput("");
  };

  const removeTag = (tagToRemove: string) => {
    handleChange(
      "tags",
      data.tags.filter((tag) => tag !== tagToRemove),
    );
  };

  return (
    <div className="space-y-4 md:space-y-5">
      {/* Product Title */}
      <div>
        <label className="block text-sm font-medium text-gray-900 mb-2">
          Product Title*
        </label>
        <input
          type="text"
          value={data.productTitle}
          onChange={(e) => handleChange("productTitle", e.target.value)}
          placeholder="Write title name describe your product"
          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all text-sm"
        />
      </div>

      {/* Brand/Manufacturer */}
      <div>
        <label className="block text-sm font-medium text-gray-900 mb-2">
          Brand/Manufacturer*
        </label>
        <input
          type="text"
          value={data.brand}
          onChange={(e) => handleChange("brand", e.target.value)}
          placeholder="Enter brand or manufacturer name"
          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all text-sm"
        />
      </div>

      {/* Item Description */}
      <div>
        <label className="block text-sm font-medium text-gray-900 mb-2">
          Item Description*
        </label>
        <textarea
          value={data.description}
          onChange={(e) => handleChange("description", e.target.value)}
          placeholder="Write your product/item description"
          rows={4}
          maxLength={250}
          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all text-sm resize-none"
        />
        <div className="flex justify-end mt-1">
          <span className="text-xs text-gray-500">
            {data.description.length}/250
          </span>
        </div>
      </div>

      {/* Main Category */}
      <div>
        <label className="block text-sm font-medium text-gray-900 mb-2">
          Main category*
        </label>
        <select
          value={data.mainCategory}
          onChange={(e) => handleChange("mainCategory", e.target.value)}
          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all text-sm bg-white"
        >
          <option value="">Select...</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id.toString()}>
              {category.title}
            </option>
          ))}
        </select>
      </div>

      {/* Sub-category (Optional) */}
      <div>
        <label className="block text-sm font-medium text-gray-900 mb-2">
          Sub-category (Optional)
        </label>
        <input
          type="text"
          value={data.subCategory}
          onChange={(e) => handleChange("subCategory", e.target.value)}
          placeholder="Choose a subcategory to help customers find your product easily"
          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all text-sm"
        />
      </div>

      {/* Tags */}
      <div>
        <div className="flex flex-wrap gap-2 mb-3">
          {data.tags.map((tag, index) => (
            <span
              key={index}
              className="inline-flex items-center gap-2 px-4 py-2 bg-lime-400 text-black rounded-full text-sm font-medium"
            >
              {tag}
              <button
                onClick={() => removeTag(tag)}
                className="hover:text-gray-700"
              >
                ×
              </button>
            </span>
          ))}
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addTag(tagInput);
              }
            }}
            placeholder="Add tags..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all text-sm"
          />
          <button
            type="button"
            onClick={() => addTag(tagInput)}
            className="px-4 py-2 bg-lime-400 text-black rounded-lg hover:bg-lime-500 transition-colors text-sm font-medium"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};
