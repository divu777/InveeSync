"use client";
import { useState } from "react";
import ItemList from "./ItemList";
import AddEditItemModal from "./AddEditItemModal";
import Link from "next/link";
import Header from "../Header";

interface Item {
  id: number;
  name: string;
  stock: number;
}

const initialItems: Item[] = [
  { id: 1, name: "Item 1", stock: 20 },
  { id: 2, name: "Item 2", stock: 0 },
  { id: 3, name: "Item 3", stock: 15 },
];

const InventoryPage = () => {
  const [items, setItems] = useState<Item[]>(initialItems);
  const [filterStock, setFilterStock] = useState<
    "all" | "inStock" | "outOfStock"
  >("all");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalItem, setModalItem] = useState<Item | null>(null);

  const addItem = (newItem: Item) => {
    setItems((prevItems) => [...prevItems, newItem]);
  };

  const deleteItem = (itemId: number) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
  };

  const updateItem = (updatedItem: Item) => {
    setItems((prevItems) =>
      prevItems.map((item) => (item.id === updatedItem.id ? updatedItem : item))
    );
  };

  const handleAddItem = () => {
    setIsModalOpen(true);
    setModalItem(null);
  };

  const handleEditItem = (item: Item) => {
    setIsModalOpen(true);
    setModalItem(item);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setModalItem(null);
  };

  const filteredItems =
    filterStock === "all"
      ? items
      : filterStock === "inStock"
      ? items.filter((item) => item.stock > 0)
      : items.filter((item) => item.stock === 0);

  return (
    <div className="flex flex-col min-h-screen text-black">
      <Header />
      <div className="flex-grow px-8 py-8 bg-white">
        <h1 className="text-2xl font-bold mb-4 text-black uppercase tracking-wider">
          Inventory Management
        </h1>
        <div className="mb-4">
          <label className="mr-2 text-black">Filter:</label>
          <select
            value={filterStock}
            onChange={(e) =>
              setFilterStock(e.target.value as typeof filterStock)
            }
            className="px-2 py-1 border border-gray-300 rounded shadow-custom-button-shadow"
          >
            <option value="all">All</option>
            <option value="inStock">In Stock</option>
            <option value="outOfStock">Out of Stock</option>
          </select>
        </div>
        <ItemList
          items={filteredItems}
          deleteItem={deleteItem}
          handleEditItem={handleEditItem}
          handleAddItem={handleAddItem}
        />
        <AddEditItemModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          item={modalItem}
          updateItem={updateItem}
          addItem={addItem}
        />
      </div>
    </div>
  );
};

export default InventoryPage;
