/** @format */

"use client";

import React, { useEffect, useState } from "react";
import { Stepper, Step } from "@/components/AddNewItemComponents/Stepper";
import { ItemDetailsStep } from "@/components/AddNewItemComponents/ItemDetailsStep";
import { MediaUploadStep } from "@/components/AddNewItemComponents/MediaUploadStep";
import { PricingInventoryStep } from "@/components/AddNewItemComponents/PricingInventoryStep";
import { SpecificationsStep } from "@/components/AddNewItemComponents/SpecificationsStep";
import { ReviewPublishStep } from "@/components/AddNewItemComponents/ReviewPublishStep";
import api from "@/lib/apis";
import { BackendCatalogueResponse, BackendCategoryResponse } from "@/types/AllTypes";

type ItemDetails = {
  productTitle: string;
  brand: string;
  description: string;
  mainCategory: string;
  subCategory: string;
  tags: string[];
};

type UploadedImage = {
  id: string;
  name: string;
  size: string;
  url: string;
};

type Media = {
  images: UploadedImage[];
  primaryImage: string;
};

type Pricing = {
  regularPrice: string;
  salePrice: string;
  productId: string;
  packCoverage: string;
};

type Specifications = {
  length: string;
  width: string;
  thickness: string;
  weight: string;
  installationMethod: string;
  coveragePerPack: string;
  edgeProfile: string;
  pileHeight: string;
  materials: string;
  format: string;
  uniformityRequired: boolean;
  additionalDetails: boolean;
  availableColors: string[];
  patternType: string;
  stockQuantity: string;
};

type FormData = {
  itemDetails: ItemDetails;
  media: Media;
  pricing: Pricing;
  specifications: Specifications;
};

type EditItemPageProps = {
  params: Promise<{
    id: string;
  }>;
};

const steps: Step[] = [
  { id: 1, title: "Item Details", description: "" },
  { id: 2, title: "Upload Images", description: "" },
  { id: 3, title: "Pricing & Inventory", description: "" },
  { id: 4, title: "Specifications", description: "" },
  { id: 5, title: "Review & Publish", description: "" },
];

const EditItemPage = ({ params }: EditItemPageProps) => {
  const { id } = React.use(params);
  const [currentStep, setCurrentStep] = useState(1);
  const [categories,setCategories] = useState<BackendCategoryResponse[]>([]);
  const [formData, setFormData] = useState<FormData>({
    itemDetails: {
      productTitle: "",
      brand: "",
      description: "",
      mainCategory: "",
      subCategory: "",
      tags: [],
    },
    media: {
      images: [],
      primaryImage: "",
    },
    pricing: {
      regularPrice: "",
      salePrice: "",
      productId: "",
      packCoverage: "",
    },
    specifications: {
      length: "",
      width: "",
      thickness: "",
      weight: "",
      installationMethod: "",
      coveragePerPack: "",
      edgeProfile: "",
      pileHeight: "",
      materials: "",
      format: "",
      uniformityRequired: false,
      additionalDetails: false,
      availableColors: [],
      patternType: "",
      stockQuantity: "",
    },
  });

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleStepClick = (step: number) => {
    setCurrentStep(step);
  };

  const handleDataChange = <K extends keyof FormData>(
    section: K,
    data: FormData[K]
  ) => {
    setFormData({ ...formData, [section]: data });
  };

  const handleUpdate = () => {
    console.log("Updating product:", id, formData);
    // Handle update logic here
  };

  useEffect(() => {
    api.get('/users/categories/').then(response => {
      console.log('Categories:',response.data.categories);
      setCategories(response.data.categories);
    })
  },[])
  useEffect(() => {
    api.get('/admins/products/').then(response => {
      const allProducts: BackendCatalogueResponse[] = response.data.products
      const selectedProduct = allProducts.find((product:BackendCatalogueResponse) => product.id.toString() === id);
      if (selectedProduct) {
      const fetchedProducts: FormData = {
            itemDetails: {
            productTitle: selectedProduct.product_title,
            brand: selectedProduct.brand_manufacturer,
            description: selectedProduct.item_description,
            mainCategory: categories.find(cat => cat.id === selectedProduct.main_category)?.title || 'Unknown',
            subCategory: selectedProduct.sub_category,
            tags: [],
            },
            media: {
            images: selectedProduct.uploaded_images.map((img) => ({
                id: img.id.toString(),
                name: img.title || 'Image',
                size: 'Unknown',
                url: img.image,
            })),
            primaryImage: selectedProduct.primary_image,
            },
            pricing: {
            regularPrice: selectedProduct.regular_price,
            salePrice: selectedProduct.sale_price,
            productId: selectedProduct.product_id,
            packCoverage: selectedProduct.pack_coverage,
            },
            specifications: {
            length: selectedProduct.length,
            width: selectedProduct.width,
            thickness: selectedProduct.thickness,
            weight: selectedProduct.weight,
            installationMethod: selectedProduct.installation_method,
            coveragePerPack: selectedProduct.pack_coverage,
            edgeProfile: '',
            pileHeight: selectedProduct.pile_height,
            materials: selectedProduct.materials,
            format: selectedProduct.format,
            uniformityRequired: selectedProduct.is_calculate,
            additionalDetails: false,
            availableColors: selectedProduct.available_colors ? selectedProduct.available_colors.split(',') : [],
            patternType: selectedProduct.pattern_type,
            stockQuantity: selectedProduct.stock_quantity.toString(),
            },
        };
        console.log("Current product:",fetchedProducts);
        
        
        setFormData(fetchedProducts);
      }
    console.log("Fetched products:", response.data.products);
    console.log("Selected product:", selectedProduct);  
    })
  },[id, categories])

  return (
    <div className="w-full min-h-screen bg-gray-50">
      <div className="max-w-625 mx-auto px-4 md:px-6 py-6 md:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Stepper Sidebar */}
          <div className="lg:col-span-3">
            <Stepper
              steps={steps}
              currentStep={currentStep}
              onStepClick={handleStepClick}
            />
          </div>

          {/* Main Content */}
          <div className="lg:col-span-9">
            <div className="bg-white rounded-lg border border-gray-200 p-6 md:p-8 mb-6">
              {currentStep === 1 && (
                <ItemDetailsStep
                  data={formData.itemDetails}
                  onChange={(data) => handleDataChange("itemDetails", data)}
                />
              )}
              {currentStep === 2 && (
                <MediaUploadStep
                  data={formData.media}
                  onChange={(data) => handleDataChange("media", data)}
                />
              )}
              {currentStep === 3 && (
                <PricingInventoryStep
                  data={formData.pricing}
                  onChange={(data) => handleDataChange("pricing", data)}
                />
              )}
              {currentStep === 4 && (
                <SpecificationsStep
                  data={formData.specifications}
                  onChange={(data) => handleDataChange("specifications", data)}
                />
              )}
              {currentStep === 5 && <ReviewPublishStep data={formData} />}
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between items-center">
              <button
                onClick={handleBack}
                disabled={currentStep === 1}
                className={`px-6 py-2.5 border border-gray-300 rounded-lg font-medium text-sm transition-colors ${
                  currentStep === 1
                    ? "text-gray-400 cursor-not-allowed"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                Back
              </button>

              {currentStep < steps.length ? (
                <button
                  onClick={handleNext}
                  className="px-6 py-2.5 bg-gray-900 text-white rounded-lg font-medium text-sm hover:bg-gray-800 transition-colors"
                >
                  Continue
                </button>
              ) : (
                <button
                  onClick={handleUpdate}
                  className="px-6 py-2.5 bg-gray-900 text-white rounded-lg font-medium text-sm hover:bg-gray-800 transition-colors"
                >
                  Update
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditItemPage;
