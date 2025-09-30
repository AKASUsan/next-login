"use client";

import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

export default function DashboardPage() {
  const [data, setData] = useState(null);
  const COLORS = [
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
    "#A020F0",
    "#FF69B4",
  ];

  useEffect(() => {
    fetch("/api/dashboard")
      .then((res) => res.json())
      .then((res) => setData(res));
  }, []);

  if (!data) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-2xl font-bold">📊 Superstore Dashboard</h1>
      {/* 1. Total Sales */}
      <div className="p-4 bg-blue-100 rounded-lg shadow w-fit">
        <h2 className="text-lg font-semibold text-black">Total Sales</h2>
        <p className="text-2xl font-bold text-blue-700">
          ${data.totalSale.toLocaleString()}
        </p>
        
      </div>
       {/* 2. Sales by Segming  */}
      <div className="grid grid-cols-4 mt-3 gap-5">
        {data.salesByCity && data.salesByCity.length > 0 ? (
          data.salesByCity.map((val) => (
            <div
              key={val._id}
              className=" bg-blue-100 shadow-xl my-10 p-10 rounded-xl"
            >
              <h4 className="text-2xl text-black">{val._id}</h4>
              <p className="text-2xl font-bold text-blue-700">
                ${val.total.toLocaleString()}
              </p>
            </div>
          ))
        ) : (
          <p className="bg-gray-300 p-3 mt-3 text-black">You do not have any data yet.</p>
        )}
      </div>

        {/* 2. Sales by Regain (PieChart with currency formatting) */}
      <div>
        <h2 className="text-lg font-semibold mb-2 ">Sales by Region</h2>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data.salesByCity}
              dataKey="total"
              nameKey="_id"
              cx="50%"
              cy="50%"
              outerRadius={120}
              label={({ name, value }) =>
                `${name}: ${new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "USD",
                }).format(value)}`
              }
            >
              {data.salesByCity.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip
              formatter={(value) =>
                new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "USD",
                }).format(value)
              }
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
         {/* 4. Sales by Product ID */}
      <div>
        <h2 className="text-lg font-semibold mb-2">Sales by Product</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data.salesByProduct.slice(0, 10)}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="_id" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="total" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
              
        <div>
        <h2 className="text-lg font-semibold mb-2">Sales Least</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data.leastsales.slice(0, 10)}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="_id" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="total" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>

       <div>
        <h2 className="text-lg font-semibold mb-2">Sales Top Japan</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data.salestopjapan.slice(0, 10)}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="_id" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="total" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      
      
      </div>
  );
}

