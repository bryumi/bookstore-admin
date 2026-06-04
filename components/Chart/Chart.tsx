"use client";
import api from "@/services/api/api";
import { useEffect, useState, useCallback } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// ─── Types ───────────────────────────────────────────────────────────────────

interface CategorySeries {
  category: string;
  data: number[];
}

interface SalesData {
  months: string[];
  series: CategorySeries[];
}

// ─── Constants ───────────────────────────────────────────────────────────────

const CATEGORY_COLORS: Record<string, string> = {
  romance: "#F472B6",
  aventura: "#FB923C",
  fantasia: "#A78BFA",
  suspense: "#38BDF8",
  terror: "#F87171",
  biografia: "#34D399",
};

const CATEGORY_LABELS: Record<string, string> = {
  romance: "Romance",
  aventura: "Aventura",
  fantasia: "Fantasia",
  suspense: "Suspense",
  terror: "Terror",
  biografia: "Biografia",
};

function formatMonthLabel(ym: string): string {
  const [year, month] = ym.split("-");
  const months = [
    "Jan",
    "Fev",
    "Mar",
    "Abr",
    "Mai",
    "Jun",
    "Jul",
    "Ago",
    "Set",
    "Out",
    "Nov",
    "Dez",
  ];
  return `${months[parseInt(month, 10) - 1]}/${year.slice(2)}`;
}

// ─── Custom Tooltip ──────────────────────────────────────────────────────────

function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-dark-800 border border-white/10 rounded-xl p-4 shadow-2xl backdrop-blur-sm min-w-[160px]">
      <p className="text-gray-400 text-xs font-mono mb-3 uppercase tracking-widest">
        {label}
      </p>
      {payload.map((entry: any) => (
        <div
          key={entry.name}
          className="flex items-center justify-between gap-4 mb-1"
        >
          <div className="flex items-center gap-2">
            <span
              className="w-2 h-2 rounded-full flex-shrink-0"
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-gray-300 text-xs capitalize">
              {CATEGORY_LABELS[entry.name] ?? entry.name}
            </span>
          </div>
          <span className="text-white text-xs font-bold tabular-nums">
            {entry.value}
          </span>
        </div>
      ))}
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function SalesByCategoryChart() {
  const today = new Date();
  const thirteenMonthsAgo = new Date(today);
  thirteenMonthsAgo.setMonth(today.getMonth() - 12);

  const [startDate, setStartDate] = useState(
    thirteenMonthsAgo.toISOString().split("T")[0],
  );
  const [endDate, setEndDate] = useState(today.toISOString().split("T")[0]);
  const [salesData, setSalesData] = useState<SalesData | null>(null);
  const [selectedCategories, setSelectedCategories] = useState<Set<string>>(
    new Set(Object.keys(CATEGORY_COLORS)),
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams({ startDate, endDate });
      // depois
      const { data } = await api.get<SalesData>(
        `/orders/sales/by-category?${params}`,
      );
      console.log("Resposta da API:", JSON.stringify(data));
      setSalesData(data);

      // Inicializa todas as categorias retornadas como selecionadas
      setSelectedCategories(new Set(data.series.map((s) => s.category)));
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [startDate, endDate]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const chartData = salesData
    ? salesData.months.map((month, i) => {
        const point: Record<string, any> = { month: formatMonthLabel(month) };
        salesData.series.forEach((s) => {
          point[s.category] = s.data[i] ?? 0;
        });
        return point;
      })
    : [];

  const toggleCategory = (cat: string) => {
    setSelectedCategories((prev) => {
      const next = new Set(prev);
      next.has(cat) ? next.delete(cat) : next.add(cat);
      return next;
    });
  };

  const allCategories = salesData?.series.map((s) => s.category) ?? [];

  return (
    <div className="card animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-6">
        <div>
          <h3 className="text-xl font-display font-semibold text-white">
            Vendas por Categoria
          </h3>
          <p className="text-gray-500 text-sm mt-1">
            Volume de livros vendidos no período
          </p>
        </div>

        {/* Period filters */}
        <div className="flex items-center gap-3 flex-wrap">
          <div className="flex flex-col gap-1">
            <label className="text-gray-500 text-[10px] uppercase tracking-widest">
              De
            </label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="bg-dark-700 border border-white/10 text-white text-sm rounded-lg px-3 py-2
                         focus:outline-none focus:border-accent-blue/60 transition-colors cursor-pointer"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-gray-500 text-[10px] uppercase tracking-widest">
              Até
            </label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="bg-dark-700 border border-white/10 text-white text-sm rounded-lg px-3 py-2
                         focus:outline-none focus:border-accent-blue/60 transition-colors cursor-pointer"
            />
          </div>
        </div>
      </div>

      {/* Category toggles */}
      {allCategories.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-6">
          {allCategories.map((cat) => {
            const active = selectedCategories.has(cat);
            const color = CATEGORY_COLORS[cat] ?? "#94A3B8";
            return (
              <button
                key={cat}
                onClick={() => toggleCategory(cat)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium
                            border transition-all duration-200
                            ${
                              active
                                ? "border-transparent text-white"
                                : "border-white/10 text-gray-500 bg-transparent"
                            }`}
                style={
                  active
                    ? {
                        backgroundColor: `${color}22`,
                        borderColor: `${color}66`,
                        color,
                      }
                    : {}
                }
              >
                <span
                  className="w-2 h-2 rounded-full flex-shrink-0 transition-opacity duration-200"
                  style={{ backgroundColor: active ? color : "#4B5563" }}
                />
                {CATEGORY_LABELS[cat] ?? cat}
              </button>
            );
          })}
        </div>
      )}
      {/* Chart area */}
      <div className="relative">
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <div className="flex flex-col items-center gap-3">
              <div className="w-8 h-8 border-2 border-accent-blue/30 border-t-accent-blue rounded-full animate-spin" />
              <span className="text-gray-500 text-sm">Carregando dados…</span>
            </div>
          </div>
        )}

        {error && !loading && (
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <div className="text-center">
              <p className="text-accent-red text-sm mb-3">{error}</p>
              <button
                onClick={fetchData}
                className="text-accent-blue text-xs underline underline-offset-2"
              >
                Tentar novamente
              </button>
            </div>
          </div>
        )}

        <div
          className={loading || error ? "opacity-20 pointer-events-none" : ""}
        >
          <LineChart
            width={800}
            height={320}
            data={chartData}
            margin={{ top: 4, right: 8, left: -16, bottom: 0 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="rgba(255,255,255,0.05)"
              vertical={false}
            />
            <XAxis
              dataKey="month"
              tick={{ fill: "#6B7280", fontSize: 11, fontFamily: "monospace" }}
              axisLine={false}
              tickLine={false}
              interval="preserveStartEnd"
            />
            <YAxis
              tick={{ fill: "#6B7280", fontSize: 11 }}
              axisLine={false}
              tickLine={false}
              allowDecimals={false}
            />
            <Tooltip
              content={<CustomTooltip />}
              cursor={{ stroke: "rgba(255,255,255,0.08)", strokeWidth: 1 }}
            />
            {allCategories
              .filter((cat) => selectedCategories.has(cat))
              .map((cat) => (
                <Line
                  key={cat}
                  type="monotone"
                  dataKey={cat}
                  stroke={CATEGORY_COLORS[cat] ?? "#94A3B8"}
                  strokeWidth={2}
                  dot={{
                    r: 3,
                    fill: CATEGORY_COLORS[cat] ?? "#94A3B8",
                    strokeWidth: 0,
                  }}
                  activeDot={{ r: 5, strokeWidth: 0 }}
                  animationDuration={600}
                />
              ))}
          </LineChart>
        </div>

        {!loading && !error && chartData.length === 0 && (
          <p className="text-center text-gray-600 text-sm py-12">
            Nenhum dado encontrado para o período selecionado.
          </p>
        )}
      </div>
    </div>
  );
}
