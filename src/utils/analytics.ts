import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

declare global {
  interface Window {
    dataLayer: any[];
    gtag?: (...args: any[]) => void;
  }
}

// Generate or retrieve persistent Session ID
function getSessionId(): string {
  let id = sessionStorage.getItem('startlab_analytics_sid');
  if (!id) {
    id = 'sid_' + Math.random().toString(36).substring(2, 11) + '_' + Date.now().toString(36);
    sessionStorage.setItem('startlab_analytics_sid', id);
  }
  return id;
}

// Initialize Google Analytics if Measurement ID is provided in VITE_GA_MEASUREMENT_ID
function initGoogleAnalytics(measurementId: string) {
  if (!measurementId || typeof window === 'undefined') return;
  if (document.getElementById('ga-gtag-script')) return;

  const script = document.createElement('script');
  script.id = 'ga-gtag-script';
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  function gtag(...args: any[]) {
    window.dataLayer.push(args);
  }
  window.gtag = gtag;
  gtag('js', new Date());
  gtag('config', measurementId, { send_page_view: false });
}

export function useAnalyticsTracker() {
  const location = useLocation();

  useEffect(() => {
    const gaId = import.meta.env.VITE_GA_MEASUREMENT_ID;
    if (gaId && gaId.startsWith('G-')) {
      initGoogleAnalytics(gaId);
    }
  }, []);

  useEffect(() => {
    const sessionId = getSessionId();
    const sessionStartTime = Number(sessionStorage.getItem('startlab_session_start_time') || Date.now());
    if (!sessionStorage.getItem('startlab_session_start_time')) {
      sessionStorage.setItem('startlab_session_start_time', String(sessionStartTime));
    }

    const currentPath = location.pathname + location.search;

    const getDuration = () => Math.floor((Date.now() - sessionStartTime) / 1000);

    const trackEvent = (eventType: 'pageview' | 'heartbeat' | 'leave') => {
      const duration = getDuration();
      const payload = JSON.stringify({
        sessionId,
        path: currentPath,
        duration,
        eventType,
      });

      // Send to server-side analytics API
      if (navigator.sendBeacon) {
        const blob = new Blob([payload], { type: 'application/json' });
        navigator.sendBeacon('/api/analytics/track', blob);
      } else {
        fetch('/api/analytics/track', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: payload,
          keepalive: true,
        }).catch(() => {});
      }

      // Track in Google Analytics if available
      if (window.gtag && eventType === 'pageview') {
        const gaId = import.meta.env.VITE_GA_MEASUREMENT_ID;
        if (gaId) {
          window.gtag('config', gaId, {
            page_path: currentPath,
          });
        }
      }
    };

    // Immediate track for new route pageview
    trackEvent('pageview');

    // Periodic heartbeat every 15 seconds to calculate time spent accurately
    const intervalId = setInterval(() => {
      trackEvent('heartbeat');
    }, 15000);

    // Track on tab hide / unload
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        trackEvent('leave');
      }
    };

    const handleBeforeUnload = () => {
      trackEvent('leave');
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      clearInterval(intervalId);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [location.pathname, location.search]);
}
