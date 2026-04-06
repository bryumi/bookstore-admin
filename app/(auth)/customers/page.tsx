"use client";

import ModalDetailsClient from "@/components/ModalDetailsClient";
import { useSnackbar } from "@/hooks/useSnackbar";
import { useAdmin } from "@/lib/admin-context";
import { useDeleteAccount } from "@/services/clients/deleteAccount";
import { useGetClients } from "@/services/clients/getClientData";
import { useActiveOrInactiveClient } from "@/services/clients/toogleStatusClient";
import { formatDate } from "@/utils/masks";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

export default function CustomersPage() {
  const [searchTerm, setSearchTerm] = useState<string | undefined>(undefined);
  const [filterStatus, setFilterStatus] = useState<
    "all" | "active" | "inactive"
  >("all");
  const [openModalDetails, setOpenModalDetails] = useState(false);
  const [selectedId, setSelectedId] = useState("");
  const { data } = useGetClients({ search: searchTerm });

  const { showSnackbar } = useSnackbar();
  const queryClient = useQueryClient();
  const { mutate: mutateSwitch } = useActiveOrInactiveClient({
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["clients"],
      });
    },
    onError: (error) => {
      showSnackbar((error as any).response.data.error as string, "error");
    },
  });
  const { mutate: mutateDelete } = useDeleteAccount({
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["clients"],
      });
      showSnackbar("Cliente excluído com successo!", "success");
    },
    onError: (error) => {
      showSnackbar((error as any).response.data.error as string, "error");
    },
  });
  const toggleCustomerStatus = (customerId: string, bool: boolean) => {
    if (customerId) {
      console.log("Toggling item:", customerId);
      console.log("New isActive value:", bool);
      mutateSwitch({
        documentId: customerId,
        bool: bool,
      });
    }
  };
  const handleDelete = (id: string) => {
    mutateDelete(id);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="animate-fade-in">
        <h1 className="text-4xl font-display font-bold text-white mb-2">
          Clientes
        </h1>
        <p className="text-gray-400">Gerencie a base de clientes da livraria</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div
          className="stat-card card-hover animate-scale-in"
          style={{ animationDelay: "0.1s" }}
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-accent-blue to-accent-cyan"></div>
          <div className="flex items-start justify-between">
            <div>
              <p className="text-gray-400 text-sm mb-1">Total de Clientes</p>
              <h3 className="text-3xl font-display font-bold text-white">
                {data?.count}
              </h3>
            </div>
            <div className="p-3 bg-accent-blue/10 rounded-lg">
              <svg
                className="w-6 h-6 text-accent-blue"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
            </div>
          </div>
        </div>

        <div
          className="stat-card card-hover animate-scale-in"
          style={{ animationDelay: "0.2s" }}
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-accent-green to-accent-cyan"></div>
          <div className="flex items-start justify-between">
            <div>
              <p className="text-gray-400 text-sm mb-1">Clientes Ativos</p>
              <h3 className="text-3xl font-display font-bold text-white">
                {data?.clients?.filter((c) => c.isActive === true).length}
              </h3>
            </div>
            <div className="p-3 bg-accent-green/10 rounded-lg">
              <svg
                className="w-6 h-6 text-accent-green"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </div>
        </div>

        <div
          className="stat-card card-hover animate-scale-in"
          style={{ animationDelay: "0.3s" }}
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-accent-purple to-accent-blue"></div>
          <div className="flex items-start justify-between">
            <div>
              <p className="text-gray-400 text-sm mb-1">Ticket Médio</p>
              <h3 className="text-3xl font-display font-bold text-white">
                R$ 0,00
                {/* {(
                  customers.reduce((sum, c) => sum + c.totalSpent, 0) /
                  customers.length
                ).toFixed(2)} */}
              </h3>
            </div>
            <div className="p-3 bg-accent-purple/10 rounded-lg">
              <svg
                className="w-6 h-6 text-accent-purple"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="card animate-scale-in">
        <div className="grid grid-cols-1 w-full">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Buscar
            </label>
            <input
              type="text"
              placeholder="Buscar por nome, email ou telefone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-field w-full"
            />
          </div>
        </div>
      </div>

      {/* Customers Table */}
      <div className="card overflow-hidden animate-fade-in">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-dark-600">
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Cliente
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Contato
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Total de Pedidos
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Total Gasto
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Data de Cadastro
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Status
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {data?.clients?.map((customer, index) => (
                <tr
                  key={customer.id}
                  className="table-row"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-gradient-to-br from-accent-blue to-accent-purple rounded-full flex items-center justify-center mr-3">
                        <span className="text-white font-bold text-sm">
                          {customer.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")
                            .substring(0, 2)}
                        </span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white">
                          {customer.name}
                        </p>
                        <p className="text-xs text-gray-400">
                          ID: {customer.id}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <p className="text-sm text-gray-300">{customer.email}</p>
                      <p className="text-xs text-gray-500">
                        {customer.phoneNumber}
                      </p>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm font-semibold text-white">
                      {0}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm font-semibold text-accent-green">
                      R$ 0,00
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    {formatDate(customer?.created_at)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() =>
                          toggleCustomerStatus(customer.id, customer.isActive)
                        }
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 focus:outline-none ${
                          customer.isActive ? "bg-accent-green" : "bg-gray-600"
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-md transition-transform duration-300 ${
                            customer.isActive
                              ? "translate-x-6"
                              : "translate-x-1"
                          }`}
                        />
                      </button>
                      <span
                        className={`text-xs font-medium ${
                          customer.isActive
                            ? "text-accent-green"
                            : "text-gray-400"
                        }`}
                      >
                        {customer.isActive ? "Ativo" : "Inativo"}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      className="px-2"
                      onClick={() => handleDelete(customer.id)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
                        <path d="M3 6h18" />
                        <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                      </svg>
                    </button>
                    <button
                      className="px-2"
                      onClick={() => {
                        setSelectedId(customer.id);
                        setOpenModalDetails(true);
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {data?.clients?.length === 0 && (
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
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            <p className="text-gray-400">Nenhum cliente encontrado</p>
          </div>
        )}
      </div>
      {openModalDetails && (
        <ModalDetailsClient
          onClose={() => setOpenModalDetails(false)}
          data={data?.clients?.find((client) => client.id === selectedId)!}
        />
      )}
    </div>
  );
}
