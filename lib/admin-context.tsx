"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface Product {
  id: number;
  title: string;
  author: string;
  price: number;
  stock: number;
  category: string;
  isbn: string;
  description: string;
  image: string;
  width: string;
  height: string;
  length: string;
  weight: string;
  year: string;
  edition: string;
  publisher?: string;
  pages?: number;
  costPrice?: number;
  status: "active" | "inactive";
}

interface Customer {
  id: number;
  name: string;
  email: string;
  phone: string;
  totalOrders: number;
  totalSpent: number;
  joinDate: string;
  status: "active" | "inactive";
}

interface OrderItem {
  productId: number;
  title: string;
  author: string;
  quantity: number;
  price: number;
}

interface Order {
  id: string;
  customerId: number;
  customerName: string;
  items: OrderItem[];
  total: number;
  status:
    | "processing"
    | "shipped"
    | "delivered"
    | "exchange"
    | "exchange_approved";
  date: string;
  shippingAddress: string;
}

interface Return {
  id: string;
  orderId: string;
  customerId: number;
  customerName: string;
  productTitle: string;
  reason: string;
  status: "pending" | "approved" | "rejected" | "refunded";
  date: string;
  refundAmount: number;
}

interface AdminContextType {
  products: Product[];
  customers: Customer[];
  setCustomers: React.Dispatch<React.SetStateAction<Customer[]>>;
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  orders: Order[];
  returns: Return[];
  addProduct: (product: Omit<Product, "id">) => void;
  updateProduct: (id: number, product: Partial<Product>) => void;
  deleteProduct: (id: number) => void;
  updateOrderStatus: (orderId: string, status: Order["status"]) => void;
  updateReturnStatus: (returnId: string, status: Return["status"]) => void;
  getStats: () => {
    totalRevenue: number;
    totalOrders: number;
    totalCustomers: number;
    totalProducts: number;
    pendingOrders: number;
    pendingReturns: number;
  };
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [returns, setReturns] = useState<Return[]>([]);

  // Initialize with mock data
  useEffect(() => {
    const mockProducts: Product[] = [
      {
        id: 1,
        title: "A Sombra do Vento",
        author: "Carlos Ruiz Zafón",
        price: 45.9,
        stock: 25,
        category: "Ficção",
        isbn: "978-8573025217",
        description: "Um romance literário ambientado na Barcelona pós-guerra.",
        image:
          "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400",
        width: "140cm",
        height: "200cm",
        length: "100cm",
        weight: "250g",
        year: "2015",
        edition: "1ª Edição",
        publisher: "Companhia das Letras",
        pages: 480,
        costPrice: 35.9,
        status: "active",
      },
      {
        id: 2,
        title: "1984",
        author: "George Orwell",
        price: 38.5,
        stock: 30,
        category: "Distopia",
        isbn: "978-8535914849",
        description: "Uma distopia clássica sobre totalitarismo.",
        image:
          "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400",
        width: "140cm",
        height: "200cm",
        length: "100cm",
        weight: "250g",
        year: "2015",
        edition: "1ª Edição",
        publisher: "Companhia das Letras",
        pages: 352,
        costPrice: 28.9,
        status: "active",
      },
      {
        id: 3,
        title: "O Pequeno Príncipe",
        author: "Antoine de Saint-Exupéry",
        price: 29.9,
        stock: 50,
        category: "Infantil",
        isbn: "978-8522008728",
        description: "Uma fábula poética sobre amor e amizade.",
        image:
          "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400",
        width: "140cm",
        height: "200cm",
        length: "100cm",
        weight: "250g",
        year: "2015",
        edition: "1ª Edição",
        publisher: "Agir",
        pages: 96,
        costPrice: 19.9,
        status: "active",
      },
      {
        id: 4,
        title: "Sapiens",
        author: "Yuval Noah Harari",
        price: 54.9,
        stock: 15,
        category: "Não-ficção",
        isbn: "978-8525432629",
        description: "Uma breve história da humanidade.",
        image:
          "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=400",
        width: "140cm",
        height: "200cm",
        length: "100cm",
        weight: "250g",
        year: "2015",
        edition: "1ª Edição",
        publisher: "Companhia das Letras",
        pages: 464,
        costPrice: 44.9,
        status: "active",
      },
    ];

    const mockCustomers: Customer[] = [
      {
        id: 1,
        name: "Maria Silva",
        email: "maria.silva@email.com",
        phone: "(11) 98765-4321",
        totalOrders: 8,
        totalSpent: 567.8,
        joinDate: "2024-01-15",
        status: "active",
      },
      {
        id: 2,
        name: "João Santos",
        email: "joao.santos@email.com",
        phone: "(11) 91234-5678",
        totalOrders: 5,
        totalSpent: 342.5,
        joinDate: "2024-03-20",
        status: "active",
      },
      {
        id: 3,
        name: "Ana Costa",
        email: "ana.costa@email.com",
        phone: "(11) 99876-5432",
        totalOrders: 12,
        totalSpent: 890.3,
        joinDate: "2023-11-10",
        status: "active",
      },
      {
        id: 4,
        name: "Pedro Oliveira",
        email: "pedro.oliveira@email.com",
        phone: "(11) 98123-4567",
        totalOrders: 3,
        totalSpent: 156.7,
        joinDate: "2024-06-05",
        status: "active",
      },
    ];

    const mockOrders: Order[] = [
      {
        id: "ORD-2026-001",
        customerId: 1,
        customerName: "Maria Silva",
        items: [
          {
            productId: 1,
            title: "A Sombra do Vento",
            author: "Carlos Ruiz Zafón",
            quantity: 2,
            price: 45.9,
          },
          {
            productId: 3,
            title: "O Pequeno Príncipe",
            author: "Antoine de Saint-Exupéry",
            quantity: 1,
            price: 29.9,
          },
        ],
        total: 121.7,
        status: "delivered",
        date: "2026-01-15T10:30:00",
        shippingAddress: "Rua das Flores, 123 - São Paulo, SP",
      },
      {
        id: "ORD-2026-002",
        customerId: 2,
        customerName: "João Santos",
        items: [
          {
            productId: 4,
            title: "Sapiens",
            author: "Yuval Noah Harari",
            quantity: 1,
            price: 54.9,
          },
        ],
        total: 54.9,
        status: "shipped",
        date: "2026-02-10T14:20:00",
        shippingAddress: "Av. Paulista, 1000 - São Paulo, SP",
      },
      {
        id: "ORD-2026-003",
        customerId: 3,
        customerName: "Ana Costa",
        items: [
          {
            productId: 2,
            title: "1984",
            author: "George Orwell",
            quantity: 1,
            price: 38.5,
          },
          {
            productId: 3,
            title: "O Pequeno Príncipe",
            author: "Antoine de Saint-Exupéry",
            quantity: 2,
            price: 29.9,
          },
        ],
        total: 98.3,
        status: "processing",
        date: "2026-02-11T09:15:00",
        shippingAddress: "Rua Augusta, 500 - São Paulo, SP",
      },
      {
        id: "ORD-2026-004",
        customerId: 4,
        customerName: "Pedro Oliveira",
        items: [
          {
            productId: 1,
            title: "A Sombra do Vento",
            author: "Carlos Ruiz Zafón",
            quantity: 1,
            price: 45.9,
          },
        ],
        total: 45.9,
        status: "exchange",
        date: "2026-02-12T16:45:00",
        shippingAddress: "Rua Consolação, 250 - São Paulo, SP",
      },
    ];

    const mockReturns: Return[] = [
      {
        id: "RET-001",
        orderId: "ORD-2026-001",
        customerId: 1,
        customerName: "Maria Silva",
        productTitle: "A Sombra do Vento",
        reason: "Produto chegou danificado",
        status: "pending",
        date: "2026-02-08T11:30:00",
        refundAmount: 45.9,
      },
      {
        id: "RET-002",
        orderId: "ORD-2025-150",
        customerId: 3,
        customerName: "Ana Costa",
        productTitle: "Sapiens",
        reason: "Compra duplicada por engano",
        status: "approved",
        date: "2026-01-20T14:15:00",
        refundAmount: 54.9,
      },
    ];

    setProducts(mockProducts);
    setCustomers(mockCustomers);
    setOrders(mockOrders);
    setReturns(mockReturns);
  }, []);

  const addProduct = (product: Omit<Product, "id">) => {
    const newProduct = {
      ...product,
      id: Math.max(0, ...products.map((p) => p.id)) + 1,
    };
    setProducts([...products, newProduct]);
  };

  const updateProduct = (id: number, updatedProduct: Partial<Product>) => {
    setProducts(
      products.map((p) => (p.id === id ? { ...p, ...updatedProduct } : p)),
    );
  };

  const deleteProduct = (id: number) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  const updateOrderStatus = (orderId: string, status: Order["status"]) => {
    setOrders(orders.map((o) => (o.id === orderId ? { ...o, status } : o)));
  };

  const updateReturnStatus = (returnId: string, status: Return["status"]) => {
    setReturns(returns.map((r) => (r.id === returnId ? { ...r, status } : r)));
  };

  const getStats = () => {
    return {
      totalRevenue: orders.reduce((sum, order) => sum + order.total, 0),
      totalOrders: orders.length,
      totalCustomers: customers.length,
      totalProducts: products.length,
      pendingOrders: orders.filter((o) => o.status === "processing").length,
      pendingReturns: returns.filter((r) => r.status === "pending").length,
    };
  };

  return (
    <AdminContext.Provider
      value={{
        products,
        setProducts,
        customers,
        setCustomers,
        orders,
        returns,
        addProduct,
        updateProduct,
        deleteProduct,
        updateOrderStatus,
        updateReturnStatus,
        getStats,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error("useAdmin must be used within an AdminProvider");
  }
  return context;
};
