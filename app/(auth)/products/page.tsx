"use client";

import { useAdmin } from "@/lib/admin-context";
import { useState } from "react";

export default function ProductsPage() {
  const { products, addProduct, updateProduct, deleteProduct, setProducts } =
    useAdmin();
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingProduct, setEditingProduct] = useState<number | null>(null);

  const [formData, setFormData] = useState({
    title: "",
    author: "",
    price: "",
    stock: "",
    category: "",
    isbn: "",
    description: "",
    width: "",
    height: "",
    length: "",
    weight: "",
    year: "",
    edition: "",
    publisher: "",
    pages: "",
    costPrice: "",
    image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400",
  });

  const filteredProducts = products.filter(
    (product) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.isbn.includes(searchTerm),
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingProduct !== null) {
      updateProduct(editingProduct, {
        ...formData,
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock),
        costPrice: parseFloat(formData.costPrice),
        pages: parseInt(formData.pages),
      });
      setEditingProduct(null);
    } else {
      addProduct({
        ...formData,
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock),
        costPrice: parseFloat(formData.costPrice),
        pages: parseInt(formData.pages),
        status: "active",
      });
    }
    setFormData({
      title: "",
      author: "",
      price: "",
      stock: "",
      category: "",
      isbn: "",
      width: "",
      height: "",
      length: "",
      weight: "",
      year: "",
      edition: "",
      description: "",
      publisher: "",
      pages: "",
      costPrice: "",
      image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400",
    });
    setShowAddModal(false);
  };

  const handleEdit = (product: any) => {
    setFormData({
      title: product.title,
      author: product.author,
      price: product.price.toString(),
      stock: product.stock.toString(),
      category: product.category,
      isbn: product.isbn,
      width: product.width,
      height: product.height,
      length: product.length,
      weight: product.weight,
      year: product.year,
      edition: product.edition,
      description: product.description,
      publisher: product.publisher,
      pages: product.pages,
      costPrice: product.costPrice,
      image: product.image,
    });
    setEditingProduct(product.id);
    setShowAddModal(true);
  };

  const handleDelete = (id: number) => {
    if (confirm("Tem certeza que deseja excluir este produto?")) {
      deleteProduct(id);
    }
  };

  const getStockStatus = (stock: number) => {
    if (stock === 0) return { text: "Esgotado", color: "text-accent-red" };
    if (stock < 10)
      return { text: "Estoque Baixo", color: "text-accent-orange" };
    return { text: "Em Estoque", color: "text-accent-green" };
  };
  const handleToggleStatus = (id: number) => {
    setProducts((prev) =>
      prev.map((product) =>
        product.id === id
          ? {
              ...product,
              status: product.status === "active" ? "inactive" : "active",
            }
          : product,
      ),
    );
  };
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between animate-fade-in">
        <div>
          <h1 className="text-4xl font-display font-bold text-white mb-2">
            Produtos
          </h1>
          <p className="text-gray-400">Gerencie o catálogo de livros</p>
        </div>
        <button
          onClick={() => {
            setShowAddModal(true);
            setEditingProduct(null);
            setFormData({
              title: "",
              author: "",
              year: "",
              edition: "",
              width: "",
              height: "",
              length: "",
              weight: "",
              publisher: "",
              pages: "",
              costPrice: "",
              price: "",
              stock: "",
              category: "",
              isbn: "",
              description: "",
              image:
                "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400",
            });
          }}
          className="btn-primary flex items-center space-x-2"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
          <span>Adicionar Produto</span>
        </button>
      </div>

      <div className="card animate-scale-in">
        <input
          type="text"
          placeholder="Buscar por título, autor ou ISBN..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="input-field w-full"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map((product, index) => {
          const stockStatus = getStockStatus(product.stock);
          return (
            <div
              key={product.id}
              className="card card-hover animate-fade-in"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <div className="relative h-64 mb-4 rounded-lg overflow-hidden bg-dark-700">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2 bg-dark-900/90 backdrop-blur-sm px-2 py-1 rounded text-xs font-medium text-white">
                  {product.category}
                </div>
              </div>
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-display font-semibold text-lg text-white mb-1 line-clamp-2">
                  {product.title}
                </h3>
                <button
                  onClick={() => handleToggleStatus(product.id)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 focus:outline-none ${
                    product.status === "active"
                      ? "bg-accent-green"
                      : "bg-gray-600"
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-md transition-transform duration-300 ${
                      product.status === "active"
                        ? "translate-x-6"
                        : "translate-x-1"
                    }`}
                  />
                </button>
                <span
                  className={`text-xs font-medium ${
                    product.status === "active"
                      ? "text-accent-green"
                      : "text-gray-400"
                  }`}
                >
                  {product.status === "active" ? "Ativo" : "Inativo"}
                </span>
              </div>

              <p className="text-sm text-gray-400 mb-2 italic">
                por {product.author}
              </p>
              <p className="text-xs text-gray-500 mb-3 font-mono">
                ISBN: {product.isbn}
              </p>

              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-2xl font-bold text-accent-blue">
                    R$ {product.price.toFixed(2)}
                  </p>
                </div>
                <div className="text-right">
                  <p className={`text-sm font-medium ${stockStatus.color}`}>
                    {stockStatus.text}
                  </p>
                  <p className="text-xs text-gray-500">
                    {product.stock} unidades
                  </p>
                </div>
              </div>

              <div className="flex space-x-2">
                <button
                  onClick={() => handleEdit(product)}
                  className="flex-1 bg-accent-blue/10 text-accent-blue px-3 py-2 rounded-lg text-sm font-medium hover:bg-accent-blue/20 transition-colors"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(product.id)}
                  className="flex-1 bg-accent-red/10 text-accent-red px-3 py-2 rounded-lg text-sm font-medium hover:bg-accent-red/20 transition-colors"
                >
                  Excluir
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {filteredProducts.length === 0 && (
        <div className="card text-center py-12">
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
              d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
            />
          </svg>
          <p className="text-gray-400">Nenhum produto encontrado</p>
        </div>
      )}

      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-dark-800 border border-dark-600 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-scale-in">
            <div className="p-6 border-b border-dark-600">
              <h2 className="text-2xl font-display font-bold text-white">
                {editingProduct !== null
                  ? "Editar Produto"
                  : "Adicionar Produto"}
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Título *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    className="input-field w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Autor *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.author}
                    onChange={(e) =>
                      setFormData({ ...formData, author: e.target.value })
                    }
                    className="input-field w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Ano *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.year}
                    onChange={(e) =>
                      setFormData({ ...formData, year: e.target.value })
                    }
                    className="input-field w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Editora*
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.publisher}
                    onChange={(e) =>
                      setFormData({ ...formData, publisher: e.target.value })
                    }
                    className="input-field w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Edição*
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.edition}
                    onChange={(e) =>
                      setFormData({ ...formData, edition: e.target.value })
                    }
                    className="input-field w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Número de páginas*
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.pages}
                    onChange={(e) =>
                      setFormData({ ...formData, pages: e.target.value })
                    }
                    className="input-field w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Preço de venda (R$) *
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={formData.price}
                    onChange={(e) =>
                      setFormData({ ...formData, price: e.target.value })
                    }
                    className="input-field w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Preço de custo (R$) *
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={formData.costPrice}
                    onChange={(e) =>
                      setFormData({ ...formData, costPrice: e.target.value })
                    }
                    className="input-field w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Estoque *
                  </label>
                  <input
                    type="number"
                    required
                    value={formData.stock}
                    onChange={(e) =>
                      setFormData({ ...formData, stock: e.target.value })
                    }
                    className="input-field w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Categoria *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                    className="input-field w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    ISBN *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.isbn}
                    onChange={(e) =>
                      setFormData({ ...formData, isbn: e.target.value })
                    }
                    className="input-field w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Altura (cm) *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.height}
                    onChange={(e) =>
                      setFormData({ ...formData, height: e.target.value })
                    }
                    className="input-field w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Largura (cm) *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.width}
                    onChange={(e) =>
                      setFormData({ ...formData, width: e.target.value })
                    }
                    className="input-field w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Comprimento (cm) *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.length}
                    onChange={(e) =>
                      setFormData({ ...formData, length: e.target.value })
                    }
                    className="input-field w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Peso (g) *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.weight}
                    onChange={(e) =>
                      setFormData({ ...formData, weight: e.target.value })
                    }
                    className="input-field w-full"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Descrição *
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  className="input-field w-full resize-none"
                />
              </div>

              <div className="flex space-x-3 pt-4">
                <button type="submit" className="btn-success flex-1">
                  {editingProduct !== null
                    ? "Salvar Alterações"
                    : "Adicionar Produto"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowAddModal(false);
                    setEditingProduct(null);
                  }}
                  className="btn-secondary flex-1"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
