import React from 'react';

const ImpactAnalysis = () => {
  return (
    <div className="min-h-screen bg-[#0A1128] bg-gradient-to-br from-[#0A1128] via-[#101B3A] to-[#0A1128] -m-6 p-6 lg:p-10 relative overflow-hidden font-sans">
      {/* Avant-Garde Blurs */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-emerald-600/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto">
        <header className="mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-emerald-300 tracking-tight drop-shadow-sm mb-3">
            Sustainability & Impact Analytics
          </h1>
          <p className="text-blue-200/60 text-lg max-w-2xl font-light tracking-wide">
            Track your organization's environmental contribution and food redistribution impact.
          </p>
        </header>
        
        <div className="bg-white/[0.03] backdrop-blur-2xl border border-white/[0.05] rounded-3xl shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] p-8">
            <p className="text-blue-100/80">Detailed impact metrics, carbon footprint reduction, and sustainability reports will be displayed here.</p>
        </div>
      </div>
    </div>
  );
};

export default ImpactAnalysis;
