import React from "react";

/**
 * Elegant animated blue-glassmorphic background for the home page.
 * Uses floating blurred shapes and a blue/gray gradient.
 */
export const AnimatedBackground: React.FC = () => (
  <div
    className="fixed inset-0 -z-10 w-full h-full overflow-hidden pointer-events-none bg-gradient-to-br from-[#F6F9FB] via-[#EAF3FB] to-[#C3D8F2] animate-fade-in"
    aria-hidden="true"
  >
    {/* Floating blue glass shapes - 25% lighter, 50% opacity */}
    <div className="absolute top-[10%] left-[8%] w-40 h-40 rounded-full bg-[rgba(195,216,242,0.5)] blur-2xl animate-float-slower" />
    <div className="absolute top-[60%] left-[80%] w-56 h-56 rounded-full bg-[rgba(195,216,242,0.35)] blur-2xl animate-float-mediumer" />
    <div className="absolute top-[80%] left-[20%] w-28 h-28 rounded-full bg-[rgba(195,216,242,0.25)] blur-2xl animate-float-faster" />
    {/* Subtle glass shine overlay */}
    <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-white/10" />
    <style>{`
      @keyframes float-slower {
        0%, 100% { transform: translateY(0) scale(1); }
        50% { transform: translateY(-18px) scale(1.04); }
      }
      @keyframes float-mediumer {
        0%, 100% { transform: translateY(0) scale(1); }
        50% { transform: translateY(-28px) scale(1.06); }
      }
      @keyframes float-faster {
        0%, 100% { transform: translateY(0) scale(1); }
        50% { transform: translateY(-12px) scale(1.02); }
      }
      .animate-float-slower { animation: float-slower 13s cubic-bezier(0.4,0,0.2,1) infinite; }
      .animate-float-mediumer { animation: float-mediumer 17s cubic-bezier(0.4,0,0.2,1) infinite; }
      .animate-float-faster { animation: float-faster 11s cubic-bezier(0.4,0,0.2,1) infinite; }
      .animate-fade-in { animation: fadeInBg 1.8s cubic-bezier(0.4,0,0.2,1); }
      @keyframes fadeInBg { from { opacity: 0; } to { opacity: 1; } }
    `}</style>
  </div>
);
