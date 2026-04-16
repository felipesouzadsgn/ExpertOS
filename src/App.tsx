/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppLayout } from './components/layout/AppLayout';
import { Dashboard } from './pages/Dashboard';

export default function App() {
  return (
    <BrowserRouter>
      <AppLayout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/experts" element={<div className="p-8">Expert Profile (Coming Soon)</div>} />
          <Route path="/knowledge" element={<div className="p-8">Knowledge Base (Coming Soon)</div>} />
          <Route path="/research" element={<div className="p-8">Market Research (Coming Soon)</div>} />
          <Route path="/studio" element={<div className="p-8">Content Studio (Coming Soon)</div>} />
          <Route path="/calendar" element={<div className="p-8">Editorial Calendar (Coming Soon)</div>} />
          <Route path="/kanban" element={<div className="p-8">Kanban Flow (Coming Soon)</div>} />
          <Route path="/agents" element={<div className="p-8">AI Agents (Coming Soon)</div>} />
        </Routes>
      </AppLayout>
    </BrowserRouter>
  );
}
