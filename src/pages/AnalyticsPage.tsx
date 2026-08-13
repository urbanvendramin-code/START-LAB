import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'motion/react';
import { Users, Clock, Activity, Eye, BarChart2, RefreshCw, CheckCircle2, AlertTriangle, ShieldCheck, Globe } from 'lucide-react';

interface DailyStat {
  date: string;
  label: string;
  visitors: number;
  pageviews: number;
  avgDurationSeconds: number;
}

interface TopPage {
  path: string;
  views: number;
}

interface AnalyticsStats {
  totalVisitors: number;
  totalPageviews: number;
  avgDurationSeconds: number;
  activeVisitors: number;
  topPages: TopPage[];
  dailyBreakdown: DailyStat[];
  gaMeasurementId: string | null;
  gaConfigured: boolean;
}

export default function AnalyticsPage() {
  const { i18n } = useTranslation();
  const lang = i18n.language || 'sl';
  const isSl = lang === 'sl';
  const isIt = lang === 'it';

  const [stats, setStats] = useState<AnalyticsStats | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [lastRefreshed, setLastRefreshed] = useState<Date | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchStats = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/analytics/stats');
      if (!res.ok) throw new Error('Failed to fetch analytics');
      const data: AnalyticsStats = await res.json();
      setStats(data);
      setLastRefreshed(new Date());
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Napaka pri nalaganju analitike');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
    // Auto refresh every 30 seconds
    const interval = setInterval(fetchStats, 30000);
    return () => clearInterval(interval);
  }, []);

  const formatDuration = (seconds: number) => {
    if (!seconds || seconds <= 0) return '0s';
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    if (mins > 0) {
      return `${mins} min ${secs} s`;
    }
    return `${secs} s`;
  };

  const maxDailyVisitors = stats?.dailyBreakdown
    ? Math.max(...stats.dailyBreakdown.map((d) => d.visitors), 1)
    : 1;

  const maxPageViews = stats?.topPages
    ? Math.max(...stats.topPages.map((p) => p.views), 1)
    : 1;

  return (
    <div className="min-h-screen bg-slate-50 pt-28 pb-20 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 md:p-8 rounded-3xl border border-slate-200/80 shadow-sm">
          <div>
            <div className="flex items-center gap-2 text-brand-red font-display font-black text-xs uppercase tracking-widest mb-1">
              <Activity size={16} className="animate-pulse" />
              <span>{isSl ? 'Analitika v realnem času' : isIt ? 'Analitica in tempo reale' : 'Real-time Analytics'}</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-display font-black uppercase text-slate-900 tracking-tight">
              {isSl ? 'Obisk in zadrževanje na spletni strani' : isIt ? 'Visite e tempo di permanenza' : 'Traffic & Engagement Analytics'}
            </h1>
            <p className="text-slate-500 text-sm mt-1 font-medium">
              {isSl 
                ? 'Spremljajte število obiskovalcev in povprečen čas, ki ga preživijo na vaši spletni strani.' 
                : isIt 
                  ? 'Monitora il numero di visitatori e il tempo medio trascorso sul tuo sito web.' 
                  : 'Track visitor counts and the average time spent exploring your website.'}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={fetchStats}
              disabled={loading}
              className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-display font-bold text-xs uppercase tracking-wider rounded-2xl flex items-center gap-2 transition-all shadow-sm active:scale-95 disabled:opacity-50"
            >
              <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
              <span>{isSl ? 'Osveži podatke' : isIt ? 'Aggiorna' : 'Refresh'}</span>
            </button>
            {lastRefreshed && (
              <span className="text-[11px] font-mono text-slate-400">
                {lastRefreshed.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
              </span>
            )}
          </div>
        </div>

        {/* Error message */}
        {error && (
          <div className="bg-rose-50 border border-rose-200 text-rose-800 p-4 rounded-2xl flex items-center gap-3 text-sm font-semibold">
            <AlertTriangle size={18} className="text-rose-600 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Key Performance Indicators */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* Card 1: Total Visitors */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between text-slate-500 mb-2">
              <span className="text-xs font-display font-black uppercase tracking-wider">{isSl ? 'Skupaj obiskovalcev' : isIt ? 'Visitatori totali' : 'Total Visitors'}</span>
              <div className="w-10 h-10 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center">
                <Users size={20} />
              </div>
            </div>
            <div>
              <div className="text-3xl font-display font-black text-slate-900">
                {loading && !stats ? '...' : stats?.totalVisitors || 0}
              </div>
              <p className="text-slate-400 text-[11px] font-medium mt-1">
                {isSl ? 'Edinstvene seje obiska' : isIt ? 'Sessioni uniche' : 'Unique visit sessions'}
              </p>
            </div>
          </motion.div>

          {/* Card 2: Average Duration */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between text-slate-500 mb-2">
              <span className="text-xs font-display font-black uppercase tracking-wider">{isSl ? 'Povprečni čas na strani' : isIt ? 'Tempo medio' : 'Avg. Duration'}</span>
              <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
                <Clock size={20} />
              </div>
            </div>
            <div>
              <div className="text-3xl font-display font-black text-slate-900">
                {loading && !stats ? '...' : formatDuration(stats?.avgDurationSeconds || 0)}
              </div>
              <p className="text-slate-400 text-[11px] font-medium mt-1">
                {isSl ? 'Povprečno zadrževanje po obisku' : isIt ? 'Permanenza media per sessione' : 'Average time spent on site'}
              </p>
            </div>
          </motion.div>

          {/* Card 3: Active Visitors Now */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between text-slate-500 mb-2">
              <span className="text-xs font-display font-black uppercase tracking-wider">{isSl ? 'Aktivni v tem trenutku' : isIt ? 'Attivi ora' : 'Active Now'}</span>
              <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center relative">
                <span className="absolute top-2 right-2 w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                <Activity size={20} />
              </div>
            </div>
            <div>
              <div className="text-3xl font-display font-black text-emerald-600 flex items-center gap-2">
                {loading && !stats ? '...' : stats?.activeVisitors || 0}
                <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block" />
              </div>
              <p className="text-slate-400 text-[11px] font-medium mt-1">
                {isSl ? 'Zadnje 2 minuti na strani' : isIt ? 'Nelle ultime 2 minuti' : 'Active in the last 2 mins'}
              </p>
            </div>
          </motion.div>

          {/* Card 4: Total Pageviews */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between text-slate-500 mb-2">
              <span className="text-xs font-display font-black uppercase tracking-wider">{isSl ? 'Skupaj ogledov' : isIt ? 'Visualizzazioni' : 'Total Pageviews'}</span>
              <div className="w-10 h-10 rounded-2xl bg-rose-50 text-brand-red flex items-center justify-center">
                <Eye size={20} />
              </div>
            </div>
            <div>
              <div className="text-3xl font-display font-black text-slate-900">
                {loading && !stats ? '...' : stats?.totalPageviews || 0}
              </div>
              <p className="text-slate-400 text-[11px] font-medium mt-1">
                {isSl ? 'Naloženih strani skupaj' : isIt ? 'Pagine caricate in totale' : 'Total pages rendered'}
              </p>
            </div>
          </motion.div>

        </div>

        {/* Daily Visitors Trend Chart */}
        <div className="bg-white p-6 md:p-8 rounded-3xl border border-slate-200/80 shadow-sm space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-display font-black uppercase text-slate-900 text-lg flex items-center gap-2">
                <BarChart2 size={20} className="text-brand-red" />
                {isSl ? 'Dnevni obisk (Zadnjih 14 dni)' : isIt ? 'Visite giornaliere (Ultimi 14 giorni)' : 'Daily Visitors (Past 14 Days)'}
              </h2>
              <p className="text-xs text-slate-500 font-medium">
                {isSl ? 'Pregled dnevnega števila obiskovalcev in povprečnega časa zadrževanja' : isIt ? 'Panoramica giornaliera dei visitatori e del tempo medio' : 'Daily overview of visitor counts and engagement duration'}
              </p>
            </div>
          </div>

          <div className="h-64 pt-6 pb-2 flex items-end gap-2 border-b border-slate-100 overflow-x-auto">
            {stats?.dailyBreakdown.map((item, idx) => {
              const heightPercent = maxDailyVisitors > 0 ? (item.visitors / maxDailyVisitors) * 100 : 0;
              return (
                <div key={idx} className="flex-1 min-w-[32px] flex flex-col items-center gap-2 group relative">
                  {/* Tooltip */}
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute bottom-full mb-2 bg-slate-900 text-white text-[10px] font-mono p-2 rounded-xl pointer-events-none z-10 whitespace-nowrap shadow-lg">
                    <div className="font-bold">{item.date}</div>
                    <div>{item.visitors} {isSl ? 'obiskovalcev' : isIt ? 'visitatori' : 'visitors'}</div>
                    <div>{item.pageviews} {isSl ? 'ogledov' : isIt ? 'viste' : 'pageviews'}</div>
                    <div>{isSl ? 'Čas:' : 'Time:'} {formatDuration(item.avgDurationSeconds)}</div>
                  </div>

                  <div className="text-[10px] font-mono font-bold text-slate-600 mb-1">
                    {item.visitors > 0 ? item.visitors : ''}
                  </div>
                  
                  <div className="w-full bg-slate-100 rounded-t-xl h-44 flex items-end overflow-hidden p-1">
                    <div 
                      className="w-full bg-gradient-to-t from-brand-red to-rose-400 rounded-lg transition-all duration-500"
                      style={{ height: `${Math.max(heightPercent, item.visitors > 0 ? 8 : 2)}%` }}
                    />
                  </div>

                  <span className="text-[10px] font-bold uppercase text-slate-600 truncate max-w-full">
                    {item.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Top Pages Visited */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white p-6 md:p-8 rounded-3xl border border-slate-200/80 shadow-sm space-y-4">
            <h2 className="font-display font-black uppercase text-slate-900 text-lg flex items-center gap-2">
              <Globe size={20} className="text-brand-red" />
              {isSl ? 'Najbolj obiskane podstrani' : isIt ? 'Pagine più visitate' : 'Most Visited Pages'}
            </h2>
            <div className="space-y-3">
              {stats?.topPages && stats.topPages.length > 0 ? (
                stats.topPages.map((page, idx) => {
                  const percent = Math.round((page.views / maxPageViews) * 100);
                  return (
                    <div key={idx} className="p-3 bg-slate-50 rounded-2xl border border-slate-100 space-y-1.5">
                      <div className="flex justify-between items-center text-xs font-bold">
                        <span className="font-mono text-slate-800">{page.path}</span>
                        <span className="text-brand-red font-mono">{page.views} {isSl ? 'ogledov' : isIt ? 'visite' : 'views'}</span>
                      </div>
                      <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                        <div className="bg-brand-red h-full rounded-full transition-all duration-500" style={{ width: `${percent}%` }} />
                      </div>
                    </div>
                  );
                })
              ) : (
                <p className="text-slate-400 text-xs italic font-medium py-4 text-center">
                  {isSl ? 'Še ni podatkov o ogledih podstrani. Obiščite nekaj podstrani!' : 'No page view data recorded yet. Browse around the site!'}
                </p>
              )}
            </div>
          </div>

          {/* Google Analytics 4 Setup Status */}
          <div className="bg-white p-6 md:p-8 rounded-3xl border border-slate-200/80 shadow-sm flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <ShieldCheck size={22} className="text-brand-red" />
                <h3 className="font-display font-black uppercase text-slate-900 text-base">
                  Google Analytics 4 (GA4)
                </h3>
              </div>

              {stats?.gaConfigured ? (
                <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-2xl text-emerald-900 space-y-2">
                  <div className="flex items-center gap-2 font-bold text-xs">
                    <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
                    <span>{isSl ? 'Google Analytics je POVEZAN!' : 'Google Analytics Connected!'}</span>
                  </div>
                  <p className="text-[11px] font-mono text-emerald-800">
                    ID: {stats.gaMeasurementId}
                  </p>
                  <p className="text-xs text-emerald-700 leading-snug">
                    {isSl 
                      ? 'Vsi obiski se samodejno pošiljajo tudi v vaš uradni Google Analytics 4 račun.' 
                      : 'All visits are automatically mirrored to your official GA4 account.'}
                  </p>
                </div>
              ) : (
                <div className="bg-amber-50 border border-amber-200 p-4 rounded-2xl text-amber-900 space-y-2">
                  <div className="flex items-center gap-2 font-bold text-xs">
                    <AlertTriangle size={16} className="text-amber-600 shrink-0" />
                    <span>{isSl ? 'Uradni GA4 ni nastavljen (neobvezno)' : 'GA4 Optional Setup'}</span>
                  </div>
                  <p className="text-xs text-amber-800 leading-relaxed">
                    {isSl
                      ? 'Za povezavo uradnega Google Analytics 4 dodajte svojo Measurement ID kodo (npr. G-XXXXXXXXXX) v datoteko .env kot:'
                      : 'To mirror data to official Google Analytics 4, add your Measurement ID (e.g. G-XXXXXXXXXX) to .env as:'}
                  </p>
                  <code className="block bg-amber-100/80 p-2 rounded-xl text-[11px] font-mono font-bold text-slate-800 select-all">
                    VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
                  </code>
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-slate-100 text-[11px] text-slate-500 leading-relaxed font-medium">
              💡 {isSl 
                ? 'Sistem že samodejno zbira in shranjuje vašo lokalno analitiko v realnem času brez potrebe po zunanjih piškotkih.' 
                : 'The built-in analytics engine is actively capturing first-party privacy-safe session duration and pageview metrics.'}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
