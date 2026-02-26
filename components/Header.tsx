"use client";

import { useState } from "react";

export default function Header() {
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <header className="fixed top-0 right-0 left-64 bg-dark-800/80 backdrop-blur-lg border-b border-dark-600 z-40">
      <div className="flex items-center justify-between px-8 py-4">
        {/* Search */}
        <div className="flex-1 max-w-xl">
          <div className="relative">
            <input
              type="text"
              placeholder="Buscar..."
              className="w-full bg-dark-700 border border-dark-500 rounded-lg pl-10 pr-4 py-2.5 text-gray-100 placeholder-gray-500 focus:outline-none focus:border-accent-blue focus:ring-2 focus:ring-accent-blue/20 transition-all"
            />
            <svg
              className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-4 ml-8">
          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 hover:bg-dark-700 rounded-lg transition-colors"
            >
              <svg
                className="w-6 h-6 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
              <span className="absolute top-1 right-1 w-2 h-2 bg-accent-red rounded-full"></span>
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-dark-700 border border-dark-600 rounded-xl shadow-2xl shadow-black/50 animate-scale-in">
                <div className="p-4 border-b border-dark-600">
                  <h3 className="font-semibold text-white">Notificações</h3>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  <div className="p-4 hover:bg-dark-600 transition-colors cursor-pointer">
                    <p className="text-sm text-white mb-1">
                      Novo pedido recebido
                    </p>
                    <p className="text-xs text-gray-400">Há 5 minutos</p>
                  </div>
                  <div className="p-4 hover:bg-dark-600 transition-colors cursor-pointer">
                    <p className="text-sm text-white mb-1">
                      Solicitação de devolução pendente
                    </p>
                    <p className="text-xs text-gray-400">Há 1 hora</p>
                  </div>
                  <div className="p-4 hover:bg-dark-600 transition-colors cursor-pointer">
                    <p className="text-sm text-white mb-1">
                      Estoque baixo: 1984
                    </p>
                    <p className="text-xs text-gray-400">Há 2 horas</p>
                  </div>
                </div>
                <div className="p-4 border-t border-dark-600">
                  <button className="text-sm text-accent-blue hover:text-accent-blue/80 font-medium">
                    Ver todas
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Settings
          <button className="p-2 hover:bg-dark-700 rounded-lg transition-colors">
            <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </button> */}
        </div>
      </div>
    </header>
  );
}
