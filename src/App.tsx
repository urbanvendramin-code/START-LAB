/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Layout from './components/Layout';
import SEOManager from './components/SEOManager';
import { Analytics } from '@vercel/analytics/react';
import { useAnalyticsTracker } from './utils/analytics';

const Home = lazy(() => import('./pages/Home'));
const ProjectPage = lazy(() => import('./pages/ProjectPage'));
const WorkshopsPage = lazy(() => import('./pages/WorkshopsPage'));
const PartnerPage = lazy(() => import('./pages/PartnerPage'));
const MentorPage = lazy(() => import('./pages/MentorPage'));
const CalendarPage = lazy(() => import('./pages/CalendarPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const PrivacyPage = lazy(() => import('./pages/PrivacyPage'));
const TermsPage = lazy(() => import('./pages/TermsPage'));
const AnalyticsPage = lazy(() => import('./pages/AnalyticsPage'));
const DrivingSimulatorPage = lazy(() => import('./pages/DrivingSimulatorPage'));
const PatentsPage = lazy(() => import('./pages/PatentsPage'));

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

function AnalyticsListener() {
  useAnalyticsTracker();
  return null;
}

export default function App() {
  return (
    <Router>
      <SEOManager />
      <ScrollToTop />
      <AnalyticsListener />
      <Analytics />
      <Suspense fallback={<div className="min-h-screen" />}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="o-projektu" element={<ProjectPage />} />
            <Route path="delavnice" element={<WorkshopsPage />} />
            <Route path="patenti" element={<PatentsPage />} />
            <Route path="simulator-voznje" element={<DrivingSimulatorPage />} />
            <Route path="simulator" element={<DrivingSimulatorPage />} />
            <Route path="partner" element={<PartnerPage />} />
            <Route path="mentorji" element={<MentorPage />} />
            <Route path="koledar" element={<CalendarPage />} />
            <Route path="kontakt" element={<ContactPage />} />
            <Route path="zasebnost" element={<PrivacyPage />} />
            <Route path="pogoji-uporabe" element={<TermsPage />} />
            <Route path="analitika" element={<AnalyticsPage />} />
          </Route>
        </Routes>
      </Suspense>
    </Router>
  );
}

