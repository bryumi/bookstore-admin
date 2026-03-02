'use client';

import { useAdmin } from '@/lib/admin-context';
import { useState } from 'react';

export default function ReturnsPage() {
  const { returns, updateReturnStatus } = useAdmin();
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredReturns = returns.filter(returnItem => {
    const matchesStatus = filterStatus === 'all' || returnItem.status === filterStatus;
    const matchesSearch = returnItem.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         returnItem.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         returnItem.customerName.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const getStatusColor = (status: string) => {
    const colors = {
      pending: 'bg-accent-orange/20 text-accent-orange border-accent-orange',
      approved: 'bg-accent-blue/20 text-accent-blue border-accent-blue',
      rejected: 'bg-accent-red/20 text-accent-red border-accent-red',
      refunded: 'bg-accent-green/20 text-accent-green border-accent-green',
    };
    return colors[status as keyof typeof colors];
  };

  const getStatusText = (status: string) => {
    const texts = {
      pending: 'Pendente',
      approved: 'Aprovado',
      rejected: 'Rejeitado',
      refunded: 'Reembolsado',
    };
    return texts[status as keyof typeof texts];
  };

  const statusOptions = [
    { value: 'all', label: 'Todos' },
    { value: 'pending', label: 'Pendente' },
    { value: 'approved', label: 'Aprovado' },
    { value: 'rejected', label: 'Rejeitado' },
    { value: 'refunded', label: 'Reembolsado' },
  ];

  return (
    <div className="space-y-6">
      <div className="animate-fade-in">
        <h1 className="text-4xl font-display font-bold text-white mb-2">Devoluções</h1>
        <p className="text-gray-400">Gerencie solicitações de devolução e reembolso</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="stat-card card-hover animate-scale-in" style={{ animationDelay: '0.1s' }}>
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-accent-orange to-accent-red"></div>
          <div className="flex items-start justify-between">
            <div>
              <p className="text-gray-400 text-sm mb-1">Pendentes</p>
              <h3 className="text-3xl font-display font-bold text-white">
                {returns.filter(r => r.status === 'pending').length}
              </h3>
            </div>
            <div className="p-3 bg-accent-orange/10 rounded-lg">
              <svg className="w-6 h-6 text-accent-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="stat-card card-hover animate-scale-in" style={{ animationDelay: '0.2s' }}>
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-accent-blue to-accent-cyan"></div>
          <div className="flex items-start justify-between">
            <div>
              <p className="text-gray-400 text-sm mb-1">Aprovados</p>
              <h3 className="text-3xl font-display font-bold text-white">
                {returns.filter(r => r.status === 'approved').length}
              </h3>
            </div>
            <div className="p-3 bg-accent-blue/10 rounded-lg">
              <svg className="w-6 h-6 text-accent-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="stat-card card-hover animate-scale-in" style={{ animationDelay: '0.3s' }}>
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-accent-green to-accent-cyan"></div>
          <div className="flex items-start justify-between">
            <div>
              <p className="text-gray-400 text-sm mb-1">Reembolsados</p>
              <h3 className="text-3xl font-display font-bold text-white">
                {returns.filter(r => r.status === 'refunded').length}
              </h3>
            </div>
            <div className="p-3 bg-accent-green/10 rounded-lg">
              <svg className="w-6 h-6 text-accent-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="stat-card card-hover animate-scale-in" style={{ animationDelay: '0.4s' }}>
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-accent-red to-accent-orange"></div>
          <div className="flex items-start justify-between">
            <div>
              <p className="text-gray-400 text-sm mb-1">Rejeitados</p>
              <h3 className="text-3xl font-display font-bold text-white">
                {returns.filter(r => r.status === 'rejected').length}
              </h3>
            </div>
            <div className="p-3 bg-accent-red/10 rounded-lg">
              <svg className="w-6 h-6 text-accent-red" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="card animate-scale-in">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Buscar</label>
            <input
              type="text"
              placeholder="Buscar por ID, pedido ou cliente..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-field w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Status</label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="input-field w-full"
            >
              {statusOptions.map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Returns Table */}
      <div className="card overflow-hidden animate-fade-in">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-dark-600">
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  ID
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Pedido
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Cliente
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Produto
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Motivo
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Valor
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Data
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
              {filteredReturns.map((returnItem, index) => (
                <tr key={returnItem.id} className="table-row" style={{ animationDelay: `${index * 0.05}s` }}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="font-mono text-sm text-accent-cyan">{returnItem.id}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="font-mono text-sm text-accent-blue">{returnItem.orderId}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <p className="text-sm text-white">{returnItem.customerName}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-white max-w-xs truncate">{returnItem.productTitle}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-gray-300 max-w-xs truncate">{returnItem.reason}</p>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm font-semibold text-accent-green">
                      R$ {returnItem.refundAmount.toFixed(2)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    {new Date(returnItem.date).toLocaleDateString('pt-BR', {
                      day: '2-digit',
                      month: 'short',
                      year: 'numeric'
                    })}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 text-xs font-medium rounded-full border ${getStatusColor(returnItem.status)}`}>
                      {getStatusText(returnItem.status)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    {returnItem.status === 'pending' && (
                      <div className="flex space-x-2">
                        <button
                          onClick={() => updateReturnStatus(returnItem.id, 'approved')}
                          className="text-accent-green hover:text-accent-green/80 transition-colors"
                          title="Aprovar"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </button>
                        <button
                          onClick={() => updateReturnStatus(returnItem.id, 'rejected')}
                          className="text-accent-red hover:text-accent-red/80 transition-colors"
                          title="Rejeitar"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    )}
                    {returnItem.status === 'approved' && (
                      <button
                        onClick={() => updateReturnStatus(returnItem.id, 'refunded')}
                        className="text-accent-blue hover:text-accent-blue/80 text-xs font-medium transition-colors"
                      >
                        Processar Reembolso
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredReturns.length === 0 && (
          <div className="text-center py-12">
            <svg className="w-16 h-16 mx-auto text-gray-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
            </svg>
            <p className="text-gray-400">Nenhuma devolução encontrada</p>
          </div>
        )}
      </div>
    </div>
  );
}
