/** @format */

"use client";

import React, { useEffect, useState } from "react";
import { CatalogueSearchBar } from "@/components/CatalogueComponsnts/CatalogueSearchBar";
import { CatalogueFilters } from "@/components/CatalogueComponsnts/CatalogueFilters";
import { CatalogueTable } from "@/components/CatalogueComponsnts/CatalogueTable";
import { catalogueData } from "@/data/AllData";
import { BackendCatalogueResponse, BackendCategoryResponse, CatalogueProduct, ProductSummary } from "@/types/AllTypes";
import api from "@/lib/apis";

const CataloguePage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [products,setProducts] = useState<ProductSummary[]>(catalogueData);
  const [categories,setCategories] = useState<BackendCategoryResponse[]>([]);

  useEffect(() => {
    api.get('/users/categories/').then(response => {
      console.log('Categories:',response.data.categories);
      setCategories(response.data.categories);
    })
  },[])
  useEffect(() => {
    api.get('/admins/products/').then(response => {
      console.log(response.data.products);
      const fetchedProducts: ProductSummary[] = response.data.products.map((product:BackendCatalogueResponse,index:number) => ({
        id: index,
        slNo: product.id.toString(),
        itemName: product.product_title,
        productId: product.product_id,
        brand: product.brand_manufacturer,
        category: categories.find(cat => cat.id === product.main_category)?.title || 'Unknown',
        subCategory: product.sub_category,
        price: parseFloat(product.sale_price),
        inStockQty: product.stock_quantity,
      }));
      console.log(catalogueData[0]);
      setProducts(fetchedProducts);
    })
  },[categories])

  const filteredProducts = products.filter(
    (product) =>
      product.itemName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.productId.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleEdit = (product: CatalogueProduct) => {
    console.log("Edit product:", product);
  };

  const handleDelete = (product: CatalogueProduct) => {
    console.log("Delete product:", product);
  };

  return (
    <div className="w-full min-h-screen bg-gray-50">
      <div className="max-w-625 mx-auto px-4 md:px-6 py-6 md:py-8">
        <h1 className="text-black text-2xl md:text-3xl font-semibold mb-6 md:mb-8">
          Catalogue
        </h1>

        {/* Search Bar */}
        <div className="mb-4">
          <CatalogueSearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search inventory by name or ID"
          />
        </div>

        {/* Filters */}
        <div className="mb-6">
          <CatalogueFilters />
        </div>

        {/* Table */}
        <CatalogueTable
          data={filteredProducts}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
};

export default CataloguePage;
