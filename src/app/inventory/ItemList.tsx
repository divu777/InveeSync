"use client";

interface Item {
  id: number;
  name: string;
  stock: number;
}

interface ItemListProps {
  items: Item[];
  deleteItem: (itemId: number) => void;
  handleEditItem: (item: Item) => void;
  handleAddItem: () => void;
}

const ItemList = ({
  items,
  deleteItem,
  handleEditItem,
  handleAddItem,
}: ItemListProps) => {
  return (
    <div className="text-black">
      <h2 className="text-black font-bold mb-2 uppercase tracking-wider">
        Item List
      </h2>
      <button
        onClick={handleAddItem}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4 shadow-custom-button-shadow"
      >
        Add Item
      </button>
      <ul>
        {items.map((item) => (
          <li
            key={item.id}
            className="border border-gray-300 p-2 rounded mb-2 flex justify-between items-center shadow-custom-shadow my-6"
          >
            <div>
              <span className="font-bold">{item.name}</span> -{" "}
              <span>Stock: {item.stock}</span>
            </div>
            <div>
              <button
                onClick={() => handleEditItem(item)}
                className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-2 rounded mr-2 shadow-custom-button-shadow"
              >
                Edit
              </button>
              <button
                onClick={() => deleteItem(item.id)}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded shadow-custom-button-shadow"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ItemList;
