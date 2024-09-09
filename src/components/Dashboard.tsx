import React from 'react';
import Charts from './Charts';
import Map from './Map';

const Dashboard: React.FC = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center">Dashboard</h1>
      <div className="flex flex-col md:flex-row md:space-x-6 space-y-6 md:space-y-0">
        <div className="bg-white shadow-md rounded-lg p-4 flex-1">
          <h2 className="text-xl font-semibold mb-4">COVID-19 Trends</h2>
          <Charts />
        </div>
        <div className="bg-white shadow-md rounded-lg p-4 flex-1">
          <h2 className="text-xl font-semibold mb-4">Global COVID-19 Map</h2>
          <Map />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

