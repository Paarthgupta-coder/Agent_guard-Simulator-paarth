"use client";

import { useEffect, useState } from "react";
import { useRunsList } from "@/hooks/useRunSocket";
import { ShieldCheck, Calendar, Activity, AlertTriangle, FileText, CheckCircle2, XCircle } from "lucide-react";

export default function ReportPage() {
  const runs = useRunsList();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !runs || runs.length === 0) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center text-gray-500 font-medium">
        Loading Report Data...
      </div>
    );
  }

  const latest = runs[0];
  const allResults = [...latest.results, ...latest.rerunResults];
  const scores = latest.scoresAfter ?? latest.scoresBefore;
  
  const passedCount = allResults.filter(r => r.passed).length;
  const passRate = allResults.length > 0 ? Math.round((passedCount / allResults.length) * 100) : 0;

  return (
    <div className="min-h-screen bg-gray-50/50 print:bg-white text-gray-900 font-sans p-8 md:p-12 lg:p-20 max-w-5xl mx-auto print:max-w-none print:p-0">
      
      {/* Action Bar (Hidden in Print) */}
      <div className="flex justify-end mb-8 print:hidden">
        <button 
          onClick={() => window.print()} 
          className="flex items-center gap-2 bg-black text-white px-6 py-2.5 rounded-lg text-sm font-semibold hover:bg-gray-800 transition-colors shadow-lg"
        >
          <FileText size={16} /> Save as PDF
        </button>
      </div>

      {/* Report Document */}
      <div className="bg-white p-10 md:p-16 border border-gray-200 rounded-2xl shadow-xl print:shadow-none print:border-none print:p-0 print:rounded-none">
        
        {/* Header */}
        <header className="border-b-2 border-gray-100 pb-8 mb-10">
          <div className="flex justify-between items-start mb-6">
            <div>
              <div className="flex items-center gap-2 font-bold text-2xl tracking-tight text-gray-900 mb-1">
                <ShieldCheck size={28} className="text-emerald-600" /> AgentGuard
              </div>
              <div className="text-gray-500 text-sm font-medium tracking-widest uppercase">Automated Security Audit</div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-gray-900 mb-1">SOC2 Readiness</div>
              <div className="text-gray-500 text-sm flex items-center justify-end gap-1">
                <Calendar size={14} /> {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </div>
            </div>
          </div>
          
          <div className="bg-gray-50 rounded-xl p-6 grid grid-cols-2 md:grid-cols-4 gap-6 border border-gray-100">
            <div>
              <div className="text-xs text-gray-400 uppercase tracking-wider font-semibold mb-1">Target Agent</div>
              <div className="font-semibold text-gray-900">v2-production-core</div>
            </div>
            <div>
              <div className="text-xs text-gray-400 uppercase tracking-wider font-semibold mb-1">Session ID</div>
              <div className="font-mono text-sm text-gray-600 truncate">{latest.id.split("-")[0]}</div>
            </div>
            <div>
              <div className="text-xs text-gray-400 uppercase tracking-wider font-semibold mb-1">Vectors Tested</div>
              <div className="font-semibold text-gray-900">{allResults.length} Personas</div>
            </div>
            <div>
              <div className="text-xs text-gray-400 uppercase tracking-wider font-semibold mb-1">Audit Status</div>
              <div className="font-semibold text-emerald-600 flex items-center gap-1">
                <CheckCircle2 size={16} /> Completed
              </div>
            </div>
          </div>
        </header>

        {/* Executive Summary */}
        <section className="mb-12">
          <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Activity size={20} className="text-blue-500" /> Executive Summary
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="border border-gray-100 rounded-xl p-6 bg-white shadow-sm">
              <div className="text-sm text-gray-500 font-medium mb-2">Overall Pass Rate</div>
              <div className="text-5xl font-bold tracking-tight" style={{ color: passRate > 80 ? '#10b981' : '#f59e0b' }}>
                {passRate}%
              </div>
            </div>
            <div className="border border-gray-100 rounded-xl p-6 bg-white shadow-sm">
              <div className="text-sm text-gray-500 font-medium mb-2">Reliability Score</div>
              <div className="text-4xl font-bold text-gray-900 mb-1">{scores?.reliability ?? 0}%</div>
              <div className="text-xs text-gray-400">Policy Adherence</div>
            </div>
            <div className="border border-gray-100 rounded-xl p-6 bg-white shadow-sm">
              <div className="text-sm text-gray-500 font-medium mb-2">Safety Score</div>
              <div className="text-4xl font-bold text-gray-900 mb-1">{scores?.safety ?? 0}%</div>
              <div className="text-xs text-gray-400">Jailbreak / PII Defense</div>
            </div>
          </div>

          {latest.rootCause && (
            <div className="bg-red-50 border border-red-100 rounded-xl p-6 flex gap-4">
              <AlertTriangle className="text-red-500 shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-red-900 mb-1">Critical Vulnerability Detected</h3>
                <p className="text-sm text-red-800 leading-relaxed mb-4">{latest.rootCause.summary}</p>
                {latest.patchApplied && (
                  <div className="bg-white rounded-lg p-4 border border-red-100 shadow-sm">
                    <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">System Patch Applied</div>
                    <p className="text-sm text-gray-700 italic border-l-2 border-emerald-500 pl-3">"{latest.patchApplied}"</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </section>

        {/* Detailed Breakdown */}
        <section className="mb-12 print:break-before-page">
          <h2 className="text-xl font-bold text-gray-900 mb-6 border-b border-gray-100 pb-2">Vector Category Breakdown</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {['JAILBREAK_SUCCESS', 'PII_LEAK', 'POLICY_CONTRADICTION', 'HALLUCINATED_POLICY'].map(cat => {
              const catResults = allResults.filter(r => r.persona.category === cat);
              const cFailed = catResults.filter(r => !r.passed).length;
              return (
                <div key={cat} className="border border-gray-100 rounded-lg p-4">
                  <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 truncate" title={cat}>{cat.replace(/_/g, ' ')}</div>
                  <div className="text-2xl font-semibold text-gray-900">{catResults.length - cFailed} / {catResults.length}</div>
                  <div className="text-xs text-gray-400 mt-1">passed</div>
                </div>
              )
            })}
          </div>
        </section>

        {/* Incident Log */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-6 border-b border-gray-100 pb-2">Incident Log Sample</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="py-3 px-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="py-3 px-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Category</th>
                  <th className="py-3 px-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Attack Prompt</th>
                  <th className="py-3 px-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Agent Response</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {allResults.slice(0, 10).map((r, i) => (
                  <tr key={i} className="align-top">
                    <td className="py-4 px-4">
                      {r.passed ? (
                        <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md border border-emerald-100">
                          <CheckCircle2 size={12} /> PASS
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-xs font-semibold text-red-600 bg-red-50 px-2 py-1 rounded-md border border-red-100">
                          <XCircle size={12} /> FAIL
                        </span>
                      )}
                    </td>
                    <td className="py-4 px-4 text-xs text-gray-600 font-medium">{r.persona.category.replace(/_/g, ' ')}</td>
                    <td className="py-4 px-4 text-xs text-gray-500 line-clamp-3">{r.persona.message}</td>
                    <td className="py-4 px-4 text-xs text-gray-700 line-clamp-3 italic">"{r.response}"</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

      </div>
    </div>
  );
}
