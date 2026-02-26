"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler,
  ChartOptions,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler,
);

// ── Mock Data ──────────────────────────────────────────────────────────────────
// Dados mensais de Jan/2022 a Dez/2024
const RAW_DATA: { date: Date; value: number }[] = [
  // 2023
  { date: new Date("2023-01-01"), value: 2100 },
  { date: new Date("2023-02-01"), value: 2600 },
  { date: new Date("2023-03-01"), value: 2900 },
  { date: new Date("2023-04-01"), value: 3200 },
  { date: new Date("2023-05-01"), value: 3500 },
  { date: new Date("2023-06-01"), value: 3100 },
  { date: new Date("2023-07-01"), value: 3900 },
  { date: new Date("2023-08-01"), value: 3700 },
  { date: new Date("2023-09-01"), value: 3300 },
  { date: new Date("2023-10-01"), value: 4100 },
  { date: new Date("2023-11-01"), value: 4700 },
  { date: new Date("2023-12-01"), value: 5400 },
  // 2024
  { date: new Date("2024-01-01"), value: 2800 },
  { date: new Date("2024-02-01"), value: 3100 },
  { date: new Date("2024-03-01"), value: 3400 },
  { date: new Date("2024-04-01"), value: 3900 },
  { date: new Date("2024-05-01"), value: 4200 },
  { date: new Date("2024-06-01"), value: 3800 },
  { date: new Date("2024-07-01"), value: 4500 },
  { date: new Date("2024-08-01"), value: 4300 },
  { date: new Date("2024-09-01"), value: 3950 },
  { date: new Date("2024-10-01"), value: 4700 },
  { date: new Date("2024-11-01"), value: 5300 },
  { date: new Date("2024-12-01"), value: 6100 },
  // 2025
  { date: new Date("2025-01-01"), value: 2100 },
  { date: new Date("2025-02-01"), value: 2600 },
  { date: new Date("2025-03-01"), value: 2900 },
  { date: new Date("2025-04-01"), value: 3200 },
  { date: new Date("2025-05-01"), value: 3500 },
  { date: new Date("2025-06-01"), value: 3100 },
  { date: new Date("2025-07-01"), value: 3900 },
  { date: new Date("2025-08-01"), value: 3700 },
  { date: new Date("2025-09-01"), value: 3300 },
  { date: new Date("2025-10-01"), value: 4100 },
  { date: new Date("2025-11-01"), value: 4700 },
  { date: new Date("2025-12-01"), value: 5400 },
  // 2026
  { date: new Date("2026-01-01"), value: 1820 },
  { date: new Date("2026-02-01"), value: 580 },
];

const MONTH_LABELS: Record<number, string> = {
  0: "Jan",
  1: "Fev",
  2: "Mar",
  3: "Abr",
  4: "Mai",
  5: "Jun",
  6: "Jul",
  7: "Ago",
  8: "Set",
  9: "Out",
  10: "Nov",
  11: "Dez",
};

function formatLabel(date: Date) {
  return `${MONTH_LABELS[date.getMonth()]}/${date.getFullYear()}`;
}

// ── Component ──────────────────────────────────────────────────────────────────
export default function LineChart() {
  const [mounted, setMounted] = useState(false);
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  useEffect(() => {
    setMounted(true);
  }, []);

  const hasFilter = dateFrom !== "" || dateTo !== "";

  const filtered = useMemo(() => {
    if (!hasFilter) return RAW_DATA;
    const from = dateFrom ? new Date(dateFrom) : new Date("2000-01-01");
    const to = dateTo ? new Date(dateTo) : new Date("2099-12-31");
    return RAW_DATA.filter((d) => d.date >= from && d.date <= to);
  }, [dateFrom, dateTo, hasFilter]);

  const labels = filtered.map((d) => formatLabel(d.date));
  const values = filtered.map((d) => d.value);

  const total = values.reduce((a, b) => a + b, 0);
  const peak = values.length ? Math.max(...values) : 0;
  const peakLbl = values.length ? labels[values.indexOf(peak)] : "—";
  const avg = values.length ? Math.round(total / values.length) : 0;

  const chartData = {
    labels,
    datasets: [
      {
        label: "Livros Vendidos",
        data: values,
        borderColor: "#3B82F6",
        backgroundColor: (ctx: any) => {
          const gradient = ctx.chart.ctx.createLinearGradient(
            0,
            0,
            0,
            ctx.chart.height,
          );
          gradient.addColorStop(0, "rgba(59,130,246,0.22)");
          gradient.addColorStop(1, "rgba(59,130,246,0.00)");
          return gradient;
        },
        borderWidth: 2.5,
        pointRadius: filtered.length > 18 ? 3 : 4,
        pointHoverRadius: 7,
        pointBackgroundColor: "#60A5FA",
        pointBorderColor: "#0F1419",
        pointBorderWidth: 2,
        fill: true,
        tension: 0.45,
      },
    ],
  };

  const options: ChartOptions<"line"> = {
    responsive: true,
    maintainAspectRatio: false,
    animation: { duration: 500, easing: "easeInOutQuart" },
    interaction: { mode: "index", intersect: false },
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: "#1A1F2E",
        borderColor: "#313847",
        borderWidth: 1,
        titleColor: "#60A5FA",
        bodyColor: "#9CA3AF",
        titleFont: { family: "JetBrains Mono", size: 12 },
        bodyFont: { family: "JetBrains Mono", size: 12 },
        padding: 12,
        callbacks: {
          label: (ctx) => ` ${ctx?.parsed?.y?.toLocaleString("pt-BR")} livros`,
        },
      },
    },
    scales: {
      x: {
        grid: { color: "rgba(49,56,71,0.5)", drawTicks: false },
        border: { display: false },
        ticks: {
          color: "#4B5563",
          font: { family: "JetBrains Mono", size: 11 },
          padding: 10,
          maxRotation: 45,
        },
      },
      y: {
        grid: { color: "rgba(49,56,71,0.5)", drawTicks: false },
        border: { display: false },
        ticks: {
          color: "#4B5563",
          font: { family: "JetBrains Mono", size: 11 },
          padding: 10,
          callback: (v) => `${(+v / 1000).toFixed(1)}k`,
        },
      },
    },
  };

  if (!mounted) return null;

  return (
    <div
      className="min-h-screen bg-[#0F1419] flex items-center justify-center p-6"
      style={{
        backgroundImage:
          "linear-gradient(to right, #313847 1px, transparent 1px), linear-gradient(to bottom, #313847 1px, transparent 1px)",
        backgroundSize: "32px 32px",
      }}
    >
      <div className="w-full max-w-5xl rounded-2xl border border-[#313847] bg-[#1A1F2E] p-6 shadow-xl">
        {/* Header */}
        <div className="mb-5">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#3B82F6]">
            Livraria · Análise
          </p>
          <h1 className="font-display text-2xl font-bold text-white">
            Volume de Vendas
          </h1>
          <p className="mt-0.5 font-mono text-xs text-[#4B5563]">
            {hasFilter
              ? `${filtered.length} mês${filtered.length !== 1 ? "es" : ""} selecionado${filtered.length !== 1 ? "s" : ""}`
              : "todos os períodos · Jan/2022 – Dez/2024"}
          </p>
        </div>

        {/* Date filter */}
        <div className="mb-5 flex flex-wrap items-end gap-3">
          <div className="flex flex-col gap-1">
            <label className="font-mono text-[10px] uppercase tracking-widest text-[#4B5563]">
              De
            </label>
            <input
              type="date"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
              className="rounded-lg border border-[#313847] bg-[#252B3B] px-3 py-2 font-mono text-sm text-white
                         outline-none transition-all duration-200
                         focus:border-[#3B82F6] focus:ring-1 focus:ring-[#3B82F6]/40
                         [color-scheme:dark]"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="font-mono text-[10px] uppercase tracking-widest text-[#4B5563]">
              Até
            </label>
            <input
              type="date"
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
              className="rounded-lg border border-[#313847] bg-[#252B3B] px-3 py-2 font-mono text-sm text-white
                         outline-none transition-all duration-200
                         focus:border-[#3B82F6] focus:ring-1 focus:ring-[#3B82F6]/40
                         [color-scheme:dark]"
            />
          </div>

          {hasFilter && (
            <button
              onClick={() => {
                setDateFrom("");
                setDateTo("");
              }}
              className="rounded-lg border border-[#313847] bg-[#252B3B] px-3 py-2 font-mono text-xs
                         text-[#4B5563] transition-all duration-200 hover:border-[#EF4444]/60 hover:text-[#EF4444]"
            >
              Limpar
            </button>
          )}
        </div>

        {/* Chart */}
        <div className="h-72">
          {filtered.length > 0 ? (
            <Line data={chartData} options={options} />
          ) : (
            <div className="flex h-full items-center justify-center">
              <p className="font-mono text-sm text-[#4B5563]">
                Nenhum dado para o período selecionado.
              </p>
            </div>
          )}
        </div>

        {/* Footer summary */}
        <div className="mt-5 flex flex-wrap gap-6 border-t border-[#313847] pt-4">
          {[
            { label: "Total", value: total.toLocaleString("pt-BR") },
            {
              label: "Pico",
              value: `${peak.toLocaleString("pt-BR")} · ${peakLbl}`,
            },
            { label: "Média", value: avg.toLocaleString("pt-BR") },
          ].map(({ label, value }) => (
            <div key={label}>
              <p className="font-mono text-[10px] uppercase tracking-widest text-[#4B5563]">
                {label}
              </p>
              <p className="font-display text-base font-bold text-white">
                {value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
