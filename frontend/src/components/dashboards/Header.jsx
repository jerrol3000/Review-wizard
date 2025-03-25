import React from 'react';

export const Header = ({ onImport }) => (
  <div className="bg-white shadow-md p-4 rounded-md mb-6 flex justify-between">
    <h1 className="text-2xl font-semibold text-gray-800">Dashboard</h1>
    <label className="bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer">
      Import Reviews
      <input
        type="file"
        accept=".csv"
        onChange={onImport}
        className="hidden"
      />
    </label>
  </div>
);
