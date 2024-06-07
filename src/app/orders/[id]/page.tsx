import Header from "@/app/Header";
interface Params {
  id: string;
}

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

const OrderDetails = ({ params }: { params: Params }) => {
  const orderId = parseInt(params.id);
  const { orders, items } = Data;

  const order = orders.find((order) => order.id === orderId);

  if (!order) {
    return <div>Order not found</div>;
  }

  return (
    <div className="min-h-screen flex flex-col text-black">
      <Header />
      <div className="flex-grow px-8 py-8 bg-white">
        <h1 className="text-2xl font-bold text-black uppercase tracking-wider mb-4">
          Order Details
        </h1>
        <div className="bg-white rounded-lg shadow-custom-shadow p-6 border-2">
          <div className="mb-4">
            <strong className="text-black uppercase tracking-wider">
              Customer:
            </strong>{" "}
            {order.customer}
          </div>
          <div className="mb-4">
            <strong className="text-black uppercase tracking-wider">
              Status:
            </strong>{" "}
            {order.status}
          </div>
          <div className="mb-4">
            <strong className="text-black uppercase tracking-wider">
              Items:
            </strong>
          </div>
          <ul className="list-disc list-inside">
            {order.items.map((item: Item) => (
              <li
                key={item.id}
                className="flex justify-between items-center mb-2"
              >
                <div>
                  {item.name} (Quantity: {item.quantity})
                </div>
                <div className="text-black">
                  Stock: {items.find((i) => i.id === item.id)?.stock || 0}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
