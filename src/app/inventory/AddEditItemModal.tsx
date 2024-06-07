"use client";
import { useState } from "react";

interface Item {
  id: number;
  name: string;
  stock: number;
}

interface AddEditItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: Item | null;
  addItem: (newItem: Item) => void;
  updateItem: (updatedItem: Item) => void;
}

const AddEditItemModal = ({
  isOpen,
  onClose,
  item,
  addItem,
  updateItem,
}: AddEditItemModalProps) => {
  const [itemName, setItemName] = useState(item?.name || "");
  const [itemStock, setItemStock] = useState(item?.stock || 0);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (item) {
      const updatedItem = {
        id: item.id,
        name: itemName,
        stock: itemStock,
      };
      updateItem(updatedItem);
    } else {
      const newItem = {
        id: Date.now(),
        name: itemName,
        stock: itemStock,
      };
      addItem(newItem);
    }
    onClose();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed z-50 inset-0 overflow-y-auto flex items-center justify-center text-black">
      <div className="bg-white rounded-lg shadow-custom-shadow p-6 max-w-md mx-auto border-2">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-black uppercase tracking-wider">
            {item ? "Edit Item" : "Add Item"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors duration-200"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block font-bold mb-2 text-black uppercase tracking-wider"
              htmlFor="itemName"
            >
              Item Name:
            </label>
            <input
              type="text"
              id="itemName"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded shadow-custom-shadow"
            />
          </div>
          <div className="mb-4">
            <label
              className="block font-bold mb-2 text-black uppercase tracking-wider"
              htmlFor="itemStock"
            >
              Stock:
            </label>
            <input
              type="number"
              id="itemStock"
              value={itemStock}
              onChange={(e) => setItemStock(parseInt(e.target.value, 10))}
              required
              min={0}
              className="w-full px-3 py-2 border border-gray-300 rounded shadow-custom-shadow"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2 shadow-custom-button-shadow"
            >
              Save
            </button>
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded shadow-custom-button-shadow"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEditItemModal;
