import { motion } from 'framer-motion';
import { useI18n } from '../contexts/I18nContext';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  type ChartData,
  type ChartOptions,
} from 'chart.js';
import { Radar } from 'react-chartjs-2';
import { TrendingUp, Zap, Target, Award } from 'lucide-react';

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

const easeAntigravity: [number, number, number, number] = [0.16, 1, 0.3, 1];

const chartData: ChartData<'radar'> = {
  labels: ['Performance', 'Accessibilité', 'SEO', 'Best Practices', 'PWA', 'Security'],
  datasets: [
    {
      label: 'Score Antigravity',
      data: [98, 100, 100, 100, 95, 98],
      backgroundColor: 'rgba(197, 134, 78, 0.2)',
      borderColor: '#C5864E',
      borderWidth: 2,
      pointBackgroundColor: '#C5864E',
      pointBorderColor: '#F2F2F2',
      pointHoverBackgroundColor: '#F2F2F2',
      pointHoverBorderColor: '#C5864E',
      pointRadius: 4,
      pointHoverRadius: 6,
    },
    {
      label: 'Moyenne Industrie',
      data: [65, 70, 75, 80, 60, 70],
      backgroundColor: 'rgba(161, 161, 170, 0.1)',
      borderColor: '#A1A1AA',
      borderWidth: 1,
      borderDash: [5, 5],
      pointBackgroundColor: '#A1A1AA',
      pointBorderColor: 'transparent',
      pointRadius: 3,
      pointHoverRadius: 5,
    },
  ],
};

const chartOptions: ChartOptions<'radar'> = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      backgroundColor: 'rgba(10, 10, 11, 0.9)',
      titleColor: '#F2F2F2',
      bodyColor: '#C5864E',
      borderColor: 'rgba(197, 134, 78, 0.3)',
      borderWidth: 1,
      padding: 12,
      displayColors: true,
      callbacks: {
        label: (context) => `${context.dataset.label}: ${context.raw}/100`,
      },
    },
  },
  scales: {
    r: {
      angleLines: {
        color: 'rgba(197, 134, 78, 0.1)',
      },
      grid: {
        color: 'rgba(197, 134, 78, 0.1)',
      },
      pointLabels: {
        color: '#A1A1AA',
        font: {
          family: 'Space Mono',
          size: 11,
        },
      },
      ticks: {
        display: false,
        backdropColor: 'transparent',
      },
      suggestedMin: 0,
      suggestedMax: 100,
    },
  },
  animation: {
    duration: 2000,
    easing: 'easeOutQuart' as const,
  },
};

const metrics = [
  { icon: Zap, value: '98', label: 'Performance', suffix: '/100' },
  { icon: Target, value: '100', label: 'Accessibilité', suffix: '/100' },
  { icon: TrendingUp, value: '100', label: 'SEO', suffix: '/100' },
  { icon: Award, value: '100', label: 'Best Practices', suffix: '/100' },
];

export function DataViz() {
  const { t } = useI18n();

  return (
    <section id="dataviz" className="relative py-32 bg-[#0A0A0B] overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute bottom-0 left-1/4 w-[600px] h-[600px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(197, 134, 78, 0.1) 0%, transparent 60%)',
          }}
          animate={{
            y: [0, -30, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1, ease: easeAntigravity }}
        >
          <motion.span
            className="inline-block font-mono text-sm text-[#C5864E] tracking-widest uppercase mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            {t('dataViz.subtitle') as string}
          </motion.span>
          <h2 className="font-serif text-5xl md:text-7xl font-bold text-[#F2F2F2] mb-6">
            {t('dataViz.title') as string}{' '}
            <span className="italic gradient-text">Excellence</span>
          </h2>
          <p className="text-[#A1A1AA] text-lg max-w-2xl mx-auto">
            {t('dataViz.description') as string}
          </p>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Chart Container */}
          <motion.div
            className="chart-container relative"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 1.2, ease: easeAntigravity }}
          >
            {/* Glow Effect */}
            <motion.div
              className="absolute inset-0 rounded-2xl"
              style={{
                background: 'radial-gradient(circle at 50% 50%, rgba(197, 134, 78, 0.2) 0%, transparent 70%)',
              }}
              animate={{
                opacity: [0.5, 0.8, 0.5],
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
            
            <div className="relative h-[400px] md:h-[500px]">
              <Radar data={chartData} options={chartOptions} />
            </div>

            {/* Chart Label */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
              <span className="font-mono text-xs text-[#A1A1AA] tracking-widest uppercase">
                {t('dataViz.chartLabel') as string}
              </span>
            </div>
          </motion.div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-2 gap-6">
            {metrics.map((metric, index) => {
              const Icon = metric.icon;
              return (
                <motion.div
                  key={metric.label}
                  className="glass-card rounded-2xl p-6 relative overflow-hidden group"
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + index * 0.1, duration: 1, ease: easeAntigravity }}
                  whileHover={{ y: -4, transition: { duration: 0.3 } }}
                >
                  {/* Hover Glow */}
                  <motion.div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{
                      background: 'radial-gradient(circle at 50% 0%, rgba(197, 134, 78, 0.2) 0%, transparent 60%)',
                    }}
                  />

                  <div className="relative z-10">
                    <motion.div
                      className="w-12 h-12 rounded-xl bg-[#C5864E]/10 flex items-center justify-center mb-4"
                      whileHover={{ rotate: 10, scale: 1.1 }}
                    >
                      <Icon className="w-6 h-6 text-[#C5864E]" />
                    </motion.div>

                    <div className="flex items-baseline gap-1">
                      <motion.span
                        className="font-mono text-4xl font-bold text-[#F2F2F2]"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5 + index * 0.1, duration: 0.8 }}
                      >
                        {metric.value}
                      </motion.span>
                      <span className="font-mono text-sm text-[#A1A1AA]">{metric.suffix}</span>
                    </div>

                    <p className="text-sm text-[#A1A1AA] mt-2">{metric.label}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Bottom Quote */}
        <motion.div
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 1, ease: easeAntigravity }}
        >
          <div className="inline-block">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-[1px] bg-[#C5864E]/50" />
              <span className="font-mono text-xs text-[#C5864E] tracking-widest uppercase">
                Lighthouse Score
              </span>
              <div className="w-12 h-[1px] bg-[#C5864E]/50" />
            </div>
            <p className="font-serif text-3xl md:text-4xl text-[#F2F2F2] italic">
              "La perfection n'est pas un détail, c'est{' '}
              <span className="text-[#C5864E]">tout</span>"
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
