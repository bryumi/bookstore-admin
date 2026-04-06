"use client";

import { useSnackbar } from "@/hooks/useSnackbar";
import { useAdmin } from "@/lib/admin-context";
import { useApprovedExchange } from "@/services/orders/approveExchange";
import { useApproveOrRejectOrder } from "@/services/orders/approveRejectOrder";
import { useConfirmExchange } from "@/services/orders/confirmExchange";
import { useDeliveredOrder } from "@/services/orders/deliveredOrder";
import { useGetOrders } from "@/services/orders/getOrders";
import { useSendOrder } from "@/services/orders/sendOrder";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

export default function OrdersPage() {
  const { orders, updateOrderStatus } = useAdmin();
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");

  const { data } = useGetOrders();
  const filteredOrders = data?.filter((order) => {
    const matchesStatus =
      filterStatus === "all" || order.status === filterStatus;
    const matchesSearch =
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.client.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });
  const { showSnackbar } = useSnackbar();
  const queryClient = useQueryClient();
  const { mutate: mutateApproveOrReject } = useApproveOrRejectOrder({
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["orders"],
      });
    },
    onError: (error) => {
      showSnackbar((error as any).response.data.error as string, "error");
    },
  });
  const { mutate: mutateSendOrder } = useSendOrder({
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["orders"],
      });
    },
    onError: (error) => {
      showSnackbar((error as any).response.data.error as string, "error");
    },
  });
  const { mutate: mutateDelivered } = useDeliveredOrder({
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["orders"],
      });
    },
    onError: (error) => {
      showSnackbar((error as any).response.data.error as string, "error");
    },
  });
  const { mutate: mutateApprovedExchange } = useApprovedExchange({
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["orders"],
      });
    },
    onError: (error) => {
      showSnackbar((error as any).response.data.error as string, "error");
    },
  });
  const { mutate: mutateConfirmExchange } = useConfirmExchange({
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["orders"],
      });
    },
    onError: (error) => {
      showSnackbar((error as any).response.data.error as string, "error");
    },
  });
  const getStatusColor = (status: string) => {
    const colors = {
      inProcessing:
        "bg-accent-orange/20 text-accent-orange border-accent-orange",
      inTransportation: "bg-accent-blue/20 text-accent-blue border-accent-blue",
      approved: "bg-accent-green/20 text-accent-green border-accent-green",
      failed: "bg-accent-red/20 text-accent-red border-accent-red",
      delivered: "bg-accent-cyan/20 text-accent-cyan border-accent-cyan",
      InExchange: "bg-accent-yellow/20 text-accent-yellow border-accent-yellow",
      exchanged: "bg-accent-green/20 text-accent-green border-accent-green",
      exchangeApproved: "bg-gray/20 text-gray border-gray",
    };
    return colors[status as keyof typeof colors];
  };

  const getStatusText = (status: string) => {
    const texts = {
      inProcessing: "Em Processamento",
      inTransportation: "Em Trânsito",
      approved: "Aprovado",
      failed: "Rejeitado",
      delivered: "Entregue",
      InExchange: "Em Troca",
      exchangeApproved: "Troca Autorizada",
      exchanged: "Troca Concluida",
    };
    return texts[status as keyof typeof texts];
  };

  const statusOptions = [
    { value: "all", label: "Todos" },
    { value: "inProcessing", label: "Em Processamento" },
    { value: "inTransportation", label: "Em Trânsito" },
    { value: "approved", label: "Aprovado" },
    { value: "failed", label: "Rejeitado" },
    { value: "delivered", label: "Entregue" },
    { value: "inExchange", label: "Em Troca" },
    { value: "exchangeApproved", label: "Troca Autorizada" },
    { value: "exchanged", label: "Troca Concluida" },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between animate-fade-in">
        <div>
          <h1 className="text-4xl font-display font-bold text-white mb-2">
            Pedidos
          </h1>
          <p className="text-gray-400">Gerencie todos os pedidos da livraria</p>
        </div>
      </div>

      {/* Filters */}
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

      {/* Orders Table */}
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
              {filteredOrders?.map((order, index) => (
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
                        {order.client.name}
                      </p>
                      <p className="text-xs text-gray-400">
                        {order?.orderItems?.reduce((acumulador, item) => {
                          return acumulador + item.quantity;
                        }, 0)}{" "}
                        {"iten(s)"}
                      </p>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    {new Date(order.orderDate).toLocaleDateString("pt-BR", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-white">
                    R$ {Number(order.totalPrice).toFixed(2).replace(".", ",")}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-3 py-1 text-xs font-medium rounded-full border ${getStatusColor(order.status)}`}
                    >
                      {getStatusText(order.status)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    {/* <select
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
                    </select> */}
                    {order.status === "inProcessing" && (
                      <div className="flex gap-2">
                        <button
                          className="bg-accent-green border border-accent-green rounded px-2 py-1 text-xs text-white"
                          onClick={() => {
                            mutateApproveOrReject({
                              documentId: order.id,
                              status: "approved",
                            });
                          }}
                        >
                          Aprovar
                        </button>
                        <button
                          className="bg-accent-red border border-accent-red rounded px-2 py-1 text-xs text-white"
                          onClick={() => {
                            mutateApproveOrReject({
                              documentId: order.id,
                              status: "rejected",
                            });
                          }}
                        >
                          Reprovar
                        </button>
                      </div>
                    )}
                    {order.status === "approved" && (
                      <button
                        className="bg-accent-blue border border-accent-blue rounded px-2 py-1 text-xs text-white"
                        onClick={() => mutateSendOrder(order.id)}
                      >
                        Enviar o pedido
                      </button>
                    )}
                    {order.status === "inTransportation" && (
                      <button
                        className="bg-emerald-500 border border-emerald-500 rounded px-2 py-1 text-xs text-white"
                        onClick={() => mutateDelivered(order.id)}
                      >
                        Marcar pedido como entregue
                      </button>
                    )}
                    {order.status === "InExchange" && (
                      <button
                        className="bg-accent-orange border border-accent-orange rounded px-2 py-1 text-xs text-white"
                        onClick={() => mutateApprovedExchange(order.id)}
                      >
                        Aprovar troca
                      </button>
                    )}
                    {order.status === "exchangeApproved" && (
                      <button
                        className="bg-neon-green border border-neon-green rounded px-2 py-1 text-xs text-white"
                        onClick={() => mutateConfirmExchange(order.id)}
                      >
                        Confirmar recebimento
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredOrders?.length === 0 && (
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

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="card bg-gradient-to-br from-accent-blue/10 to-dark-800 border-accent-blue/30">
          <p className="text-gray-400 text-sm mb-1">Em Processamento</p>
          <p className="text-2xl font-bold text-white">
            {data?.filter((o) => o.status === "inProcessing").length}
          </p>
        </div>
        <div className="card bg-gradient-to-br from-accent-cyan/10 to-dark-800 border-accent-cyan/30">
          <p className="text-gray-400 text-sm mb-1">Em Trânsito</p>
          <p className="text-2xl font-bold text-white">
            {data?.filter((o) => o.status === "inTransportation").length}
          </p>
        </div>
        <div className="card bg-gradient-to-br from-accent-green/10 to-dark-800 border-accent-green/30">
          <p className="text-gray-400 text-sm mb-1">Entregue</p>
          <p className="text-2xl font-bold text-white">
            {data?.filter((o) => o.status === "delivered").length}
          </p>
        </div>
        <div className="card bg-gradient-to-br from-accent-purple/10 to-dark-800 border-accent-purple/30">
          <p className="text-gray-400 text-sm mb-1">Em Troca</p>
          <p className="text-2xl font-bold text-white">
            {data?.filter((o) => o.status === "exchanged").length}
          </p>
        </div>
        <div className="card bg-gradient-to-br from-accent-pink/10 to-dark-800 border-accent-pink/30">
          <p className="text-gray-400 text-sm mb-1">Troca Autorizada</p>
          <p className="text-2xl font-bold text-white">
            {data?.filter((o) => o.status === "exchangeApproved").length}
          </p>
        </div>
      </div>
    </div>
  );
}
