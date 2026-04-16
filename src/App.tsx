/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppLayout } from './components/layout/AppLayout';
import { Dashboard } from './pages/Dashboard';
import { Experts } from './pages/Experts';
import { ExpertDetail } from './pages/ExpertDetail';
import { Knowledge } from './pages/Knowledge';
import { Research } from './pages/Research';
import { Studio } from './pages/Studio';
import { VideoStudio } from './pages/VideoStudio';
import { Calendar } from './pages/Calendar';
import { Kanban } from './pages/Kanban';
import { Agents } from './pages/Agents';
import { ExpertBlog } from './pages/ExpertBlog';
import { Avatars } from './pages/Avatars';

export default function App() {
  return (
    <BrowserRouter>
      <AppLayout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/experts" element={<Experts />} />
          <Route path="/experts/:id" element={<ExpertDetail />} />
          <Route path="/avatars" element={<Avatars />} />
          <Route path="/knowledge" element={<Knowledge />} />
          <Route path="/research" element={<Research />} />
          <Route path="/studio" element={<Studio />} />
          <Route path="/video-studio" element={<VideoStudio />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/kanban" element={<Kanban />} />
          <Route path="/agents" element={<Agents />} />
          <Route path="/blog" element={<ExpertBlog />} />
        </Routes>
      </AppLayout>
    </BrowserRouter>
  );
}
