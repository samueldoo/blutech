"use client";

import Image from "next/image";
import { useState } from "react";
import { useProducts } from "./context/ProductContext";

export default function DepartmentList() {
  const { products, loading, error } = useProducts();
  const [checkedAll, setCheckedAll] = useState(false);
  const [checkedItems, setCheckedItems] = useState([]);

  const handleCheckAll = () => {
    setCheckedAll(!checkedAll);
    setCheckedItems(checkedAll ? [] : products.map((product) => product.id));
  };

  const handleCheckItem = (id) => {
    setCheckedItems((prevCheckedItems) => {
      if (prevCheckedItems.includes(id)) {
        return prevCheckedItems.filter((itemId) => itemId !== id);
      } else {
        return [...prevCheckedItems, id];
      }
    });
    setCheckedAll(checkedItems.length === products.length - 1);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  const availableProducts = products.filter((product) => product.description);

  return (
    <div className="space-y-4">
      <div className="hidden md:block bg-[#F6F6F6] shadow rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-[#F0F4FE]">
              <tr>
                <th className="px-4 py-3 w-10 align-top">
                  <input
                    type="checkbox"
                    checked={checkedAll}
                    onChange={handleCheckAll}
                    className="rounded"
                  />
                </th>
                <th className="px-4 py-3 w-16 text-left lg:text-xs font-medium text-[#262626] uppercase tracking-wider align-top">
                  S/N
                </th>
                <th className="px-4 py-3 w-20 text-left lg:text-xs font-medium text-[#262626] uppercase tracking-wider align-top">
                  Image
                </th>
                <th className="px-4 py-3 w-32 text-left lg:text-xs font-medium text-[#262626] uppercase tracking-wider align-top">
                  SKU
                </th>
                <th className="px-4 py-3 w-40 text-left lg:text-xs font-medium text-[#262626] uppercase tracking-wider align-top">
                  Name
                </th>
                <th className="px-4 py-3 w-48 text-left lg:text-xs font-medium text-[#262626] uppercase tracking-wider align-top">
                  Title
                </th>
                <th className="px-4 py-3 w-96 text-left lg:text-xs font-medium text-[#262626] uppercase tracking-wider align-top">
                  Description
                </th>
                <th className="px-4 py-3 w-32 text-left lg:text-xs font-medium text-[#262626] uppercase tracking-wider align-top">
                  Brand
                </th>
                <th className="px-4 py-3 w-32 text-left lg:text-xs font-medium text-[#262626] uppercase tracking-wider whitespace-nowrap align-top">
                  Cost Price
                </th>
                <th className="px-4 py-3 w-24 text-left lg:text-xs font-medium text-[#262626] uppercase tracking-wider align-top">
                  Quantity
                </th>
                <th className="px-4 py-3 w-24 text-left lg:text-xs font-medium text-[#262626] uppercase tracking-wider align-top">
                  Size
                </th>
              </tr>
            </thead>
          </table>
        </div>
      </div>

      {/* Responsive Layout */}
      <div className="bg-[#8C8C8C] shadow rounded-lg overflow-hidden">
        <div className="md:overflow-x-auto">
          <div className="md:min-w-full">
            <div className="bg-white divide-y divide-gray-200">
              {availableProducts.map((product, index) => (
                <div
                  key={product.id}
                  className="p-4 md:table-row flex flex-wrap"
                >
                  <div className="md:table-cell md:px-4 md:py-4 md:w-10 md:align-top flex items-center mb-2 md:mb-0">
                    <input
                      type="checkbox"
                      checked={checkedItems.includes(product.id)}
                      onChange={() => handleCheckItem(product.id)}
                      className="rounded"
                    />
                  </div>
                  <div className="md:table-cell md:px-4 md:py-4 md:w-16 md:whitespace-nowrap text-sm text-gray-500 md:align-top w-full mb-2 md:mb-0">
                    <span className="md:hidden font-bold mr-2">S/N:</span>
                    {index + 1}
                  </div>
                  <div className="md:table-cell md:px-4 md:py-4 md:w-20 md:whitespace-nowrap md:align-top w-full mb-2 md:mb-0">
                    {product.img && (
                      <Image
                        src={product.img}
                        alt={product.name}
                        width={40}
                        height={40}
                        className="rounded"
                      />
                    )}
                  </div>
                  <div className="md:table-cell md:px-4 md:py-4 md:w-32 lg:text-xs text-[#262626] md:align-top w-full mb-2 md:mb-0">
                    <span className="md:hidden font-bold mr-2">SKU:</span>
                    {product.sku}
                  </div>
                  <div className="md:table-cell md:px-4 md:py-4 md:w-40 lg:text-xs font-medium text-[#262626] md:align-top w-full mb-2 md:mb-0">
                    <span className="md:hidden font-bold mr-2">Name:</span>
                    {product.name}
                  </div>
                  <div className="md:table-cell md:px-4 md:py-4 md:w-48 lg:text-xs text-[#262626] md:align-top w-full mb-2 md:mb-0">
                    <span className="md:hidden font-bold mr-2">Title:</span>
                    <div className="max-h-20 overflow-y-auto">
                      {product.title}
                    </div>
                  </div>
                  <div className="md:table-cell md:px-4 md:py-4 md:w-96 lg:text-xs text-[#262626] md:align-top w-full mb-2 md:mb-0">
                    <span className="md:hidden font-bold mr-2">
                      Description:
                    </span>
                    <div className="max-h-20 overflow-y-auto">
                      {product.description
                        .split(/(?<=\b(?:amet|\ consectetur.))/)
                        .map((part, index) => (
                          <span key={index}>
                            {part.trim()}
                            <br />
                          </span>
                        ))}
                    </div>
                  </div>
                  <div className="md:table-cell md:px-4 md:py-4 md:w-32 lg:text-xs text-[#262626] md:align-top align-top w-full mb-2 md:mb-0">
                    <span className="md:hidden font-bold mr-2">Brand:</span>
                    <div className="max-h-20 overflow-y-auto">
                      {product.brand}
                    </div>
                  </div>
                  <div className="md:table-cell md:px-4 md:py-4 md:w-32 md:whitespace-nowrap lg:text-xs text-[#262626] md:align-top w-full mb-2 md:mb-0">
                    <span className="md:hidden font-bold mr-2">
                      Cost Price:
                    </span>
                    {product.costPrice?.toFixed(2)}
                  </div>
                  <div className="md:table-cell md:px-4 md:py-4 md:w-24 md:whitespace-nowrap lg:text-xs text-[#262626] md:align-top w-full mb-2 md:mb-0">
                    <span className="md:hidden font-bold mr-2">Quantity:</span>
                    {product.quantity}
                  </div>
                  <div className="md:table-cell md:px-4 md:py-4 md:w-24 md:whitespace-nowrap lg:text-xs text-[#262626] md:align-top w-full">
                    <span className="md:hidden font-bold mr-2">Size:</span>
                    {product.size}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
