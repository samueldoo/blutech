'use client'

import { useState } from 'react';
import DepartmentList from './components/DepartmentList';
import Layout from './components/Layout';

export default function Home() {
  const [departments, setDepartments] = useState([]);

  const handleSearchResults = (results) => {
    setDepartments(results);
  };

  return (
    <Layout onSearch={handleSearchResults}>
      <div className="md:flex md:items-center md:justify-between mb-6">
        <div className="flex-1 min-w-0">
          <h2 className="font-semibold lg:text-lg leading-7 text-[#191635] sm:text-3xl sm:truncate">
            Department List
          </h2>
        </div>
        <div className="mt-4 flex md:mt-0 md:ml-4">
          {/* Add any other header elements here */}
        </div>
      </div>
      <DepartmentList />
    </Layout>
  );
}