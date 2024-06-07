"use client";
import Link from "next/link";
import { useState } from "react";
import Header from "./Header";
import AnimatedNumber from "./AnimatedNumber";

interface Item {
  id: number;
  name: string;
  quantity: number;
  stock?: number;
}

interface Order {
  id: number;
  customer: string;
  items: Item[];
  status: string;
}

const Data = {
  orders: [
    {
      id: 1,
      customer: "Customer A",
      items: [
        { id: 1, name: "Item 1", quantity: 5 },
        { id: 2, name: "Item 2", quantity: 3 },
      ],
      status: "Pending",
    },
    {
      id: 2,
      customer: "Customer B",
      items: [
        { id: 1, name: "Item 1", quantity: 2 },
        { id: 3, name: "Item 3", quantity: 1 },
      ],
      status: "Completed",
    },
  ],
  items: [
    { id: 1, name: "Item 1", stock: 20 },
    { id: 2, name: "Item 2", stock: 15 },
    { id: 3, name: "Item 3", stock: 10 },
  ],
};

export default function Home() {
  const [filterStatus, setFilterStatus] = useState<string>("All");

  const filteredOrders = Data.orders.filter(
    (order) => filterStatus === "All" || order.status === filterStatus
  );

  return (
    <div className=" ">
      <Header />
      <div className="flex flex-col  justify-between ">
        <div className="main-body p-8 bg-white">
          <div className="topDisplay mb-8  ">
            <h1 className="text-3xl font-semibold text-black uppercase tracking-wider">
              DashBoard
            </h1>
            <div className=" flex justify-start gap-20 py-8">
              <div className=" w-96  h-52 text-black border-2 rounded-lg shadow-custom-shadow flex flex-col justify-center p-10 gap-2">
                <h1 className="text-lg font-semibold  tracking-wider">
                  New Inventory record (in INR)
                </h1>
                <div className="flex justify-between">
                  <AnimatedNumber value={3834} />
                  <div className=" bg-orange-500 rounded-2xl text-center justify-center p-2">
                    20%
                  </div>
                </div>
              </div>
              <div className="w-96  h-52 text-black border-2 rounded-lg shadow-custom-shadow flex flex-col justify-center p-10 gap-2">
                <h1 className="text-lg font-semibold  tracking-wider">
                  Last Year sales (in INR)
                </h1>
                <div className="flex justify-between">
                  <AnimatedNumber value={2394} />
                  <div className=" rounded-2xl text-center justify-center p-2 bg-green-500">
                    20%
                  </div>
                </div>
              </div>
              <div className="w-96  h-52 text-black border-2 rounded-lg shadow-custom-shadow flex flex-col justify-center p-10 gap-2">
                <h1 className="text-lg font-semibold  tracking-wider">
                  Weekly Average(in INR)
                </h1>
                <div className="flex justify-between">
                  <AnimatedNumber value={3204} />
                  <div className=" bg-pink-500 rounded-2xl text-center justify-center p-2">
                    20%
                  </div>
                </div>
              </div>
            </div>
            <h1 className="text-xl font-semibold text-black uppercase tracking-wider">
              Inventory Updates
            </h1>
          </div>

          <div className=" border-2 border-gray-300 p-4  overflow-y-hidden hover:overflow-y-auto rounded-lg shadow-custom-shadow">
            <div className="flex justify-start gap-10 mb-4">
              <button
                className={`px-4 py-2 rounded-md shadow-custom-button-shadow ${
                  filterStatus === "All"
                    ? "bg-blue-500 text-black  "
                    : "bg-gray-200 text-black"
                }`}
                onClick={() => setFilterStatus("All")}
              >
                All
              </button>
              <button
                className={`px-4 py-2 rounded-md shadow-custom-button-shadow ${
                  filterStatus === "Pending"
                    ? "bg-blue-500 text-black"
                    : "bg-gray-200 text-black"
                }`}
                onClick={() => setFilterStatus("Pending")}
              >
                Pending
              </button>
              <button
                className={`px-4 py-2 rounded-md shadow-custom-button-shadow ${
                  filterStatus === "Completed"
                    ? "bg-blue-500 text-black"
                    : "bg-gray-200 text-black"
                }`}
                onClick={() => setFilterStatus("Completed")}
              >
                Completed
              </button>
            </div>
            <div className="  border border-gray-600 p-4 text-black">
              {filteredOrders.length > 0 ? (
                filteredOrders.map((order: Order) => (
                  <div
                    key={order.id}
                    className="p-2 border-b border-gray-300 flex justify-between items-center"
                  >
                    <div>
                      <div>
                        <strong>Customer:</strong> {order.customer}
                      </div>
                      <div>
                        <strong>Status:</strong> {order.status}
                      </div>
                    </div>
                    <div>
                      <strong>Items:</strong>

                      <ul className="">
                        {order.items.map((item: Item) => (
                          <li key={item.id}>
                            {item.name} (Quantity: {item.quantity})
                          </li>
                        ))}
                      </ul>
                    </div>
                    <Link href={`/orders/${order.id}`}>
                      <button className="mt-2 px-4 py-2 bg-blue-500 text-black rounded">
                        View Details
                      </button>
                    </Link>
                  </div>
                ))
              ) : (
                <div className="p-2">No orders found</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
