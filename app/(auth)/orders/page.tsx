"use client";

import { useAdmin } from "@/lib/admin-context";
import { useState } from "react";

export default function OrdersPage() {
  const { orders, updateOrderStatus } = useAdmin();
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredOrders = orders.filter((order) => {
    const matchesStatus =
      filterStatus === "all" || order.status === filterStatus;
    const matchesSearch =
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerName.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const getStatusColor = (status: string) => {
    const colors = {
      processing: "bg-accent-orange/20 text-accent-orange border-accent-orange",
      shipped: "bg-accent-blue/20 text-accent-blue border-accent-blue",
      delivered: "bg-accent-cyan/20 text-accent-cyan border-accent-cyan",
      exchange: "bg-accent-green/20 text-accent-green border-accent-green",
      exchange_approved: "bg-accent-red/20 text-accent-red border-accent-red",
    };
    return colors[status as keyof typeof colors];
  };

  const getStatusText = (status: string) => {
    const texts = {
      processing: "Em Processamento",
      shipped: "Em Trânsito",
      delivered: "Entregue",
      exchange: "Em Troca",
      exchange_approved: "Troca Autorizada",
    };
    return texts[status as keyof typeof texts];
  };

  const statusOptions = [
    { value: "all", label: "Todos" },
    { value: "processing", label: "Em Processamento" },
    { value: "shipped", label: "Em Trânsito" },
    { value: "delivered", label: "Entregue" },
    { value: "exchange", label: "Em Troca" },
    { value: "exchange_approved", label: "Troca Autorizada" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between animate-fade-in">
        <div>
          <h1 className="text-4xl font-display font-bold text-white mb-2">
            Pedidos
          </h1>
          <p className="text-gray-400">Gerencie todos os pedidos da livraria</p>
        </div>
      </div>

      <div className="card animate-scale-in">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Buscar
            </label>
            <input
              type="text"
              placeholder="Buscar por ID ou cliente..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-field w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Status
            </label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="input-field w-full"
            >
              {statusOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="card overflow-hidden animate-fade-in">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-dark-600">
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  ID do Pedido
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Cliente
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Data
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Total
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order, index) => (
                <tr
                  key={order.id}
                  className="table-row"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="font-mono text-sm text-accent-blue">
                      {order.id}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <p className="text-sm font-medium text-white">
                        {order.customerName}
                      </p>
                      <p className="text-xs text-gray-400">
                        {order.items.length}{" "}
                        {order.items.length === 1 ? "item" : "itens"}
                      </p>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    {new Date(order.date).toLocaleDateString("pt-BR", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-white">
                    R$ {order.total.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-3 py-1 text-xs font-medium rounded-full border ${getStatusColor(order.status)}`}
                    >
                      {getStatusText(order.status)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <select
                      value={order.status}
                      onChange={(e) =>
                        updateOrderStatus(order.id, e.target.value as any)
                      }
                      className="bg-dark-700 border border-dark-500 rounded px-2 py-1 text-xs text-white"
                    >
                      <option value="processing">Em Processamento</option>
                      <option value="shipped">Em Trânsito</option>
                      <option value="delivered">Entregue</option>
                      <option value="exchange">Em Troca</option>
                      <option value="exchange_approved">
                        Troca Autorizada
                      </option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredOrders.length === 0 && (
          <div className="text-center py-12">
            <svg
              className="w-16 h-16 mx-auto text-gray-600 mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
              />
            </svg>
            <p className="text-gray-400">Nenhum pedido encontrado</p>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="card bg-gradient-to-br from-accent-blue/10 to-dark-800 border-accent-blue/30">
          <p className="text-gray-400 text-sm mb-1">Em Processamento</p>
          <p className="text-2xl font-bold text-white">
            {orders.filter((o) => o.status === "processing").length}
          </p>
        </div>
        <div className="card bg-gradient-to-br from-accent-cyan/10 to-dark-800 border-accent-cyan/30">
          <p className="text-gray-400 text-sm mb-1">Em Trânsito</p>
          <p className="text-2xl font-bold text-white">
            {orders.filter((o) => o.status === "shipped").length}
          </p>
        </div>
        <div className="card bg-gradient-to-br from-accent-green/10 to-dark-800 border-accent-green/30">
          <p className="text-gray-400 text-sm mb-1">Entregue</p>
          <p className="text-2xl font-bold text-white">
            {orders.filter((o) => o.status === "delivered").length}
          </p>
        </div>
        <div className="card bg-gradient-to-br from-accent-purple/10 to-dark-800 border-accent-purple/30">
          <p className="text-gray-400 text-sm mb-1">Em Troca</p>
          <p className="text-2xl font-bold text-white">
            {orders.filter((o) => o.status === "exchange").length}
          </p>
        </div>
        <div className="card bg-gradient-to-br from-accent-pink/10 to-dark-800 border-accent-pink/30">
          <p className="text-gray-400 text-sm mb-1">Troca Autorizada</p>
          <p className="text-2xl font-bold text-white">
            {orders.filter((o) => o.status === "exchange_approved").length}
          </p>
        </div>
      </div>
    </div>
  );
}
