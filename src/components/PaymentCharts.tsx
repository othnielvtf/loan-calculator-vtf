import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions
} from 'chart.js';
import zoomPlugin from 'chartjs-plugin-zoom';
import { useState, useRef } from 'react';
import { YearlyBreakdown, MonthlyBreakdown } from '../domain/LoanCalculator';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  zoomPlugin
);

interface PaymentChartsProps {
  yearlyBreakdown: YearlyBreakdown[];
  monthlyBreakdown: MonthlyBreakdown[];
  currency: string;
}

type ViewMode = 'yearly' | 'monthly';

export function PaymentCharts({ yearlyBreakdown, monthlyBreakdown, currency }: PaymentChartsProps) {
  const [viewMode, setViewMode] = useState<ViewMode>('yearly');
  const chartRef = useRef<ChartJS<'line'> | null>(null);

  const chartOptions: ChartOptions<'line'> = {
    responsive: true,
    interaction: {
      mode: 'index' as const,
      intersect: false,
    },
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          color: '#fff'
        }
      },
      title: {
        display: false
      },
      zoom: {
        zoom: {
          wheel: {
            enabled: true,
            modifierKey: 'ctrl',
            speed: 0.1
          },
          pinch: {
            enabled: true
          },
          mode: 'xy'
        },
        pan: {
          enabled: true,
          mode: 'xy',
          modifierKey: 'shift'
        },
        limits: {
          y: { min: 0 }
        }
      }
    },
    scales: {
      x: {
        grid: {
          color: '#27272a'
        },
        ticks: {
          color: '#fff'
        }
      },
      y: {
        grid: {
          color: '#27272a'
        },
        ticks: {
          color: '#fff',
          callback: (value) => `${currency} ${value.toLocaleString()}`
        }
      }
    }
  };

  const yearlyData = {
    labels: yearlyBreakdown.map(item => `Year ${item.year}`),
    datasets: [
      {
        label: 'Principal Paid',
        data: yearlyBreakdown.map(item => item.principalPaid),
        borderColor: '#ffffff',
        backgroundColor: '#ffffff',
        tension: 0.4
      },
      {
        label: 'Interest Paid',
        data: yearlyBreakdown.map(item => item.interestPaid),
        borderColor: '#94a3b8',
        backgroundColor: '#94a3b8',
        tension: 0.4
      },
      {
        label: 'Remaining Balance',
        data: yearlyBreakdown.map(item => item.remainingBalance),
        borderColor: '#475569',
        backgroundColor: '#475569',
        tension: 0.4
      }
    ]
  };
  
  const monthlyData = {
    labels: monthlyBreakdown.map(item => `Month ${item.month}, Year ${item.year}`),
    datasets: [
      {
        label: 'Principal Paid',
        data: monthlyBreakdown.map(item => item.principalPaid),
        borderColor: '#ffffff',
        backgroundColor: '#ffffff',
        tension: 0.4
      },
      {
        label: 'Interest Paid',
        data: monthlyBreakdown.map(item => item.interestPaid),
        borderColor: '#94a3b8',
        backgroundColor: '#94a3b8',
        tension: 0.4
      },
      {
        label: 'Remaining Balance',
        data: monthlyBreakdown.map(item => item.remainingBalance),
        borderColor: '#475569',
        backgroundColor: '#475569',
        tension: 0.4
      }
    ]
  };

  const handleResetZoom = () => {
    if (chartRef.current) {
      chartRef.current.resetZoom();
    }
  };

  return (
    <div className="mt-8">
      <div className="bg-zinc-900 p-6 border border-zinc-800">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold">Payment Breakdown</h3>
          <div className="flex items-center gap-4">
            <button
              onClick={handleResetZoom}
              className="px-4 py-2 rounded-lg bg-zinc-800 text-white hover:bg-zinc-700 transition-colors"
            >
              Reset Zoom
            </button>
            <div className="flex gap-2">
              <button
                onClick={() => setViewMode('yearly')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  viewMode === 'yearly'
                    ? 'bg-white text-black'
                    : 'bg-zinc-800 text-white hover:bg-zinc-700'
                }`}
              >
                Yearly
              </button>
              <button
                onClick={() => setViewMode('monthly')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  viewMode === 'monthly'
                    ? 'bg-white text-black'
                    : 'bg-zinc-800 text-white hover:bg-zinc-700'
                }`}
              >
                Monthly
              </button>
            </div>
          </div>
        </div>
        <div className="text-sm text-gray-400 mb-4">
          Hold Ctrl + Mouse wheel to zoom • Hold Shift + Mouse drag to pan • Double click to reset zoom
        </div>
        <Line 
          options={chartOptions} 
          data={viewMode === 'yearly' ? yearlyData : monthlyData}
          ref={chartRef}
        />
      </div>
    </div>
  );
}