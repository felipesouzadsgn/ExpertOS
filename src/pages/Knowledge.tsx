import { UploadCloud, FileText, Search, Filter, MoreVertical, CheckCircle2 } from 'lucide-react';
import { useExpertStore } from '@/store/expertStore';

export function Knowledge() {
  const { activeExpert } = useExpertStore();

  if (!activeExpert) {
    return <div className="p-4 md:p-6 lg:p-8 text-text-main">Please select an expert first.</div>;
  }

  return (
    <div className="p-4 md:p-6 lg:p-8 h-full flex flex-col text-text-main">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="font-serif text-2xl mb-1">Knowledge Base</h1>
          <p className="text-text-muted text-sm">Manage documents, references, and context for <span className="font-semibold" style={{ color: activeExpert.brandColor }}>{activeExpert.name}</span>.</p>
        </div>
        <button className="bg-surface border border-border hover:bg-white/5 text-text-main px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors w-full sm:w-auto justify-center">
          <UploadCloud size={16} />
          Upload Files
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 flex-1 min-h-0">
        {/* Upload & Stats Sidebar */}
        <div className="flex flex-col gap-6">
          <div className="bg-surface border border-border rounded-2xl p-6 text-center border-dashed hover:border-primary/50 transition-colors cursor-pointer group">
            <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform" style={{ backgroundColor: `${activeExpert.brandColor}1A`, color: activeExpert.brandColor }}>
              <UploadCloud size={24} />
            </div>
            <h3 className="font-medium mb-1">Drag & Drop Files</h3>
            <p className="text-xs text-text-muted">PDF, DOCX, CSV, TXT up to 50MB</p>
          </div>

          <div className="bg-surface border border-border rounded-2xl p-6">
            <h3 className="font-serif text-base mb-4">Vector Index Status</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-text-muted">Storage Used</span>
                  <span className="font-medium">45%</span>
                </div>
                <div className="h-1.5 bg-bg rounded-full overflow-hidden">
                  <div className="h-full w-[45%]" style={{ backgroundColor: activeExpert.brandColor }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-text-muted">Indexing Queue</span>
                  <span className="font-medium text-green-400">Clear</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Document List */}
        <div className="lg:col-span-3 bg-surface border border-border rounded-2xl flex flex-col overflow-hidden">
          <div className="p-4 border-b border-border flex gap-4 items-center bg-bg/50">
            <div className="flex-1 relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
              <input 
                type="text" 
                placeholder={`Search ${activeExpert.name}'s documents...`} 
                className="w-full bg-bg border border-border rounded-lg pl-9 pr-4 py-2 text-base md:text-sm focus:outline-none transition-colors"
                style={{ '--tw-ring-color': activeExpert.brandColor } as any}
              />
            </div>
            <button className="p-2 border border-border rounded-lg text-text-muted hover:text-text-main hover:bg-white/5 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center">
              <Filter size={16} />
            </button>
          </div>

          <div className="flex-1 overflow-auto">
            <div className="overflow-x-auto">
            <table className="w-full text-sm text-left min-w-[600px]">
              <thead className="text-xs text-text-muted uppercase bg-bg/30 sticky top-0">
                <tr>
                  <th className="px-6 py-4 font-medium">Document Name</th>
                  <th className="px-6 py-4 font-medium">Type</th>
                  <th className="px-6 py-4 font-medium">Size</th>
                  <th className="px-6 py-4 font-medium">Status</th>
                  <th className="px-6 py-4 font-medium">Date Added</th>
                  <th className="px-6 py-4"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {[
                  { name: 'Brand_Manifesto_2025.pdf', type: 'PDF', size: '2.4 MB', date: 'Oct 12, 2025' },
                  { name: 'Q3_Market_Report_Luxury.docx', type: 'DOCX', size: '1.1 MB', date: 'Oct 10, 2025' },
                  { name: 'ICP_Analysis_Miami.csv', type: 'CSV', size: '45 KB', date: 'Oct 08, 2025' },
                  { name: 'Tone_of_Voice_Guidelines.txt', type: 'TXT', size: '12 KB', date: 'Oct 05, 2025' },
                  { name: 'Competitor_Research_Notes.pdf', type: 'PDF', size: '3.8 MB', date: 'Oct 01, 2025' },
                ].map((doc, i) => (
                  <tr key={i} className="hover:bg-white/[0.02] transition-colors group">
                    <td className="px-6 py-4 font-medium flex items-center gap-3">
                      <FileText size={16} className="text-text-muted" />
                      {doc.name}
                    </td>
                    <td className="px-6 py-4 text-text-muted">{doc.type}</td>
                    <td className="px-6 py-4 text-text-muted">{doc.size}</td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded text-xs md:text-[10px] uppercase tracking-wider bg-green-500/10 text-green-500">
                        <CheckCircle2 size={10} /> Indexed
                      </span>
                    </td>
                    <td className="px-6 py-4 text-text-muted">{doc.date}</td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-text-muted hover:text-text-main opacity-0 group-hover:opacity-100 transition-opacity">
                        <MoreVertical size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
