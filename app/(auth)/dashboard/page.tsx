"use client";

import SalesByCategoryChart from "@/components/Chart/Chart";
import { useAdmin } from "@/lib/admin-context";

export default function DashboardPage() {
  const { getStats, orders, products } = useAdmin();
  const stats = getStats();

  const topProducts = [
    { name: "Sapiens", vendas: 145 },
    { name: "1984", vendas: 132 },
    { name: "A Sombra do Vento", vendas: 128 },
    { name: "O Pequeno Príncipe", vendas: 115 },
    { name: "Harry Potter", vendas: 98 },
  ];

  const recentOrders = orders.slice(0, 5);

  const getStatusColor = (status: string) => {
    const colors = {
      pending: "bg-accent-orange/20 text-accent-orange border-accent-orange",
      processing: "bg-accent-blue/20 text-accent-blue border-accent-blue",
      shipped: "bg-accent-cyan/20 text-accent-cyan border-accent-cyan",
      delivered: "bg-accent-green/20 text-accent-green border-accent-green",
      cancelled: "bg-accent-red/20 text-accent-red border-accent-red",
    };
    return colors[status as keyof typeof colors] || colors.pending;
  };

  const getStatusText = (status: string) => {
    const texts = {
      pending: "Pendente",
      processing: "Processando",
      shipped: "Enviado",
      delivered: "Entregue",
      cancelled: "Cancelado",
    };
    return texts[status as keyof typeof texts] || status;
  };

  return (
    <div className="space-y-8">
      <div className="animate-fade-in">
        <h1 className="text-4xl font-display font-bold text-white mb-2">
          Dashboard
        </h1>
        <p className="text-gray-400">Visão geral do desempenho da livraria</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div
          className="stat-card card-hover animate-scale-in"
          style={{ animationDelay: "0.1s" }}
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-accent-blue to-accent-cyan"></div>
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-gray-400 text-sm mb-1">Receita Total</p>
              <h3 className="text-3xl font-display font-bold text-white animate-count">
                R${" "}
                {stats.totalRevenue.toLocaleString("pt-BR", {
                  minimumFractionDigits: 2,
                })}
              </h3>
            </div>
            <div className="p-3 bg-accent-blue/10 rounded-lg">
              <svg className="w-6 h-6 text-accent-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <div className="flex items-center text-sm">
            <span className="text-accent-green flex items-center">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
              +12.5%
            </span>
            <span className="text-gray-500 ml-2">vs. mês anterior</span>
          </div>
        </div>

        <div
          className="stat-card card-hover animate-scale-in"
          style={{ animationDelay: "0.2s" }}
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-accent-purple to-accent-blue"></div>
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-gray-400 text-sm mb-1">Total de Pedidos</p>
              <h3 className="text-3xl font-display font-bold text-white animate-count">
                {stats.totalOrders}
              </h3>
            </div>
            <div className="p-3 bg-accent-purple/10 rounded-lg">
              <svg className="w-6 h-6 text-accent-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
          </div>
          <div className="flex items-center text-sm">
            <span className="text-accent-green flex items-center">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
              +8.3%
            </span>
            <span className="text-gray-500 ml-2">vs. mês anterior</span>
          </div>
        </div>

        <div
          className="stat-card card-hover animate-scale-in"
          style={{ animationDelay: "0.3s" }}
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-accent-green to-accent-cyan"></div>
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-gray-400 text-sm mb-1">Total de Clientes</p>
              <h3 className="text-3xl font-display font-bold text-white animate-count">
                {stats.totalCustomers}
              </h3>
            </div>
            <div className="p-3 bg-accent-green/10 rounded-lg">
              <svg className="w-6 h-6 text-accent-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
          </div>
          <div className="flex items-center text-sm">
            <span className="text-accent-green flex items-center">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
              +15.2%
            </span>
            <span className="text-gray-500 ml-2">vs. mês anterior</span>
          </div>
        </div>

        <div
          className="stat-card card-hover animate-scale-in"
          style={{ animationDelay: "0.4s" }}
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-accent-orange to-accent-red"></div>
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-gray-400 text-sm mb-1">Pedidos Pendentes</p>
              <h3 className="text-3xl font-display font-bold text-white animate-count">
                {stats.pendingOrders}
              </h3>
            </div>
            <div className="p-3 bg-accent-orange/10 rounded-lg">
              <svg className="w-6 h-6 text-accent-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <div className="flex items-center text-sm">
            <span className="text-gray-400">Requer atenção imediata</span>
          </div>
        </div>
      </div>

      <SalesByCategoryChart />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Products */}
        <div className="card animate-fade-in">
          <h3 className="text-xl font-display font-semibold text-white mb-6">
            Produtos Mais Vendidos
          </h3>
          <div className="space-y-4">
            {topProducts.map((product, index) => (
              <div
                key={product.name}
                className="flex items-center justify-between p-4 bg-dark-700/50 rounded-lg hover:bg-dark-700 transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-8 h-8 bg-gradient-to-br from-accent-blue to-accent-purple rounded-lg flex items-center justify-center font-bold text-white">
                    {index + 1}
                  </div>
                  <span className="text-white font-medium">{product.name}</span>
                </div>
                <div className="text-right">
                  <p className="text-white font-semibold">{product.vendas} vendas</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card animate-fade-in">
          <h3 className="text-xl font-display font-semibold text-white mb-6">
            Pedidos Recentes
          </h3>
          <div className="space-y-3">
            {recentOrders.map((order) => (
              <div
                key={order.id}
                className="p-4 bg-dark-700/50 rounded-lg hover:bg-dark-700 transition-colors"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-sm text-accent-blue">{order.id}</span>
                  <span className={`text-xs px-2 py-1 rounded-full border ${getStatusColor(order.status)}`}>
                    {getStatusText(order.status)}
                  </span>
                </div>
                <p className="text-white text-sm mb-1">{order.customerName}</p>
                <div className="flex items-center justify-between">
                  <p className="text-gray-400 text-xs">
                    {new Date(order.date).toLocaleDateString("pt-BR")}
                  </p>
                  <p className="text-white font-semibold">R$ {order.total.toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}