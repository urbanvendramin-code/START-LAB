/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import WorkshopsPage from './pages/WorkshopsPage';
import PartnerPage from './pages/PartnerPage';
import CalendarPage from './pages/CalendarPage';
import PrivacyPage from './pages/PrivacyPage';
import TermsPage from './pages/TermsPage';
import SEOManager from './components/SEOManager';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const element = document.getElementById(hash.replace('#', ''));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  return null;
}

export default function App() {
  return (
    <Router>
      <SEOManager />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="delavnice" element={<WorkshopsPage />} />
          <Route path="partner" element={<PartnerPage />} />
          <Route path="koledar" element={<CalendarPage />} />
          <Route path="zasebnost" element={<PrivacyPage />} />
          <Route path="pogoji-uporabe" element={<TermsPage />} />
        </Route>
      </Routes>
    </Router>
  );
}
