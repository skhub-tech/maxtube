import { useState, useEffect, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Loader, Download, ShieldCheck, Zap, MinusCircle, Smartphone, Music, Lock, Info, ChevronRight, Play, Wifi } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

import { RealisticBubbles } from "@/components/RealisticBubbles";

// Content interface based on strings.json
interface SiteContent {
  hero: {
    title: string;
    subtitle: string;
    description: string;
    cta_button: string;
  };
  features: {
    section_title: string;
    items: Array<{
      icon: string;
      title: string;
      description: string;
    }>;
  };
  download_section: {
    title: string;
    modal_title: string;
    buttons: {
      "64bit": { icon: string; text: string };
      "32bit": { icon: string; text: string };
    };
  };
  faq: {
    section_title: string;
    items: Array<{
      question: string;
      answer: string;
    }>;
  };
  footer: {
    disclaimer: string;
    copyright: string;
  };
}

interface DownloadLinks {
  apk_links: {
    "64bit": string;
    "32bit": string;
  };
}

// Import static content directly to enable Hot Module Replacement (HMR)
import stringsData from "../sahitya/strings.json";
import downloadsData from "../sahitya/downloads.json";

export default function Landing() {
  const [content] = useState<SiteContent>(stringsData as SiteContent);
  const [links] = useState<DownloadLinks>(downloadsData as DownloadLinks);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [redirecting, setRedirecting] = useState<{ active: boolean; type: string | null }>({
    active: false,
    type: null,
  });

  const handleDownloadClick = (type: "64bit" | "32bit") => {
    if (!links) return;

    setRedirecting({ active: true, type });

    // Simulate a professional redirection experience
    setTimeout(() => {
      const url = links.apk_links[type];
      window.location.href = url;
    }, 2000);
  };

  if (!content) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0D0D0D]">
        <Loader className="h-10 w-10 text-[#FF0000] animate-spin" />
      </div>
    );
  }

  // Feature icons mapped to MaxTube features
  const featureIcons = [
    <MinusCircle className="w-8 h-8 text-[#FF0000]" />,
    <Music className="w-8 h-8 text-[#FF4444]" />,
    <Download className="w-8 h-8 text-[#FF0000]" />,
    <Zap className="w-8 h-8 text-[#FF4444]" />,
    <Lock className="w-8 h-8 text-[#FF0000]" />,
    <Smartphone className="w-8 h-8 text-[#FF4444]" />,
  ];

  return (
    <div className="dark min-h-screen bg-[#0D0D0D] text-white selection:bg-[#FF0000]/30 overflow-x-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {/* Animated Blurry Blobs — YouTube red palette */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={`blob-${i}`}
            className="absolute rounded-full blur-[120px] opacity-15"
            animate={{
              x: [0, 120, -120, 0],
              y: [0, -120, 120, 0],
              scale: [1, 1.3, 0.7, 1],
            }}
            transition={{
              duration: 25 + i * 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{
              width: 700 + i * 100,
              height: 700 + i * 100,
              left: `${-20 + i * 25}%`,
              top: `${-20 + i * 15}%`,
              background: i % 2 === 0 ? "#FF0000" : "#CC0000",
            }}
          />
        ))}

        {/* Realistic 3D Bubbles (Three.js) */}
        <Suspense fallback={null}>
          <RealisticBubbles key="realistic-bubbles" />
        </Suspense>
      </div>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mb-8 inline-block"
          >
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-[#FF0000] to-[#8B0000] blur-2xl opacity-60 group-hover:opacity-90 transition-opacity rounded-full animate-pulse" />
              <div className="relative w-40 h-40 bg-gradient-to-br from-[#FF0000] to-[#8B0000] rounded-[2rem] flex items-center justify-center p-1 shadow-[0_0_50px_rgba(255,0,0,0.5)]">
                <div className="w-full h-full bg-[#0D0D0D] rounded-[1.8rem] flex items-center justify-center text-6xl shadow-inner overflow-hidden">
                  <img
                    src="/maxtube_icon.png"
                    alt="MaxTube"
                    className="w-full h-full object-contain rounded-[22px] p-2"
                  />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-6 inline-flex items-center gap-2 bg-[#FF0000]/10 border border-[#FF0000]/30 rounded-full px-5 py-2 text-sm font-bold text-[#FF4444] uppercase tracking-widest"
          >
            <Play className="w-3.5 h-3.5 fill-[#FF4444]" />
            YouTube — Supercharged
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-6xl md:text-8xl font-black mb-6 tracking-tighter bg-gradient-to-r from-white via-[#FF4444] to-[#FF0000] bg-clip-text text-transparent"
          >
            {content.hero.title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-2xl md:text-3xl font-bold mb-4 text-[#FF4444]"
          >
            {content.hero.subtitle}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed"
          >
            {content.hero.description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button
              id="hero-download-btn"
              onClick={() => setIsModalOpen(true)}
              className="bg-gradient-to-r from-[#FF0000] to-[#CC0000] hover:scale-105 transition-all duration-300 text-white font-black px-12 py-8 rounded-full text-xl shadow-[0_0_40px_rgba(255,0,0,0.45)]"
            >
              {content.hero.cta_button}
            </Button>
            <div className="flex items-center gap-2 text-gray-500 text-sm font-medium">
              <ShieldCheck className="w-4 h-4 text-green-500" />
              Safe · Scanned · Verified
            </div>
          </motion.div>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="mt-16 grid grid-cols-3 gap-6 max-w-lg mx-auto"
          >
            {[
              { label: "Downloads", value: "2M+" },
              { label: "Rating", value: "4.9★" },
              { label: "Version", value: "v18.x" },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-3xl font-black text-white">{stat.value}</div>
                <div className="text-xs text-gray-500 uppercase tracking-widest mt-1">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 px-4 relative z-10">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl md:text-5xl font-black text-center mb-4 tracking-tight">
            {content.features.section_title}
          </h2>
          <p className="text-gray-500 text-center mb-16 text-lg">Everything YouTube should have been.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {content.features.items.map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="bg-[#111111] border-white/5 hover:border-[#FF0000]/40 transition-all duration-500 backdrop-blur-xl group overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#FF0000]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <CardContent className="p-8 relative">
                    <div className="text-4xl mb-6 bg-[#1A1A1A] w-14 h-14 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-500 shadow-xl border border-white/5">
                      {featureIcons[idx] || <span>{feature.icon}</span>}
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-white group-hover:text-[#FF4444] transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-gray-400 leading-relaxed">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How to Install Banner */}
      <section className="py-20 px-4 bg-gradient-to-r from-[#FF0000]/10 via-[#1A0000]/40 to-[#FF0000]/10 border-y border-[#FF0000]/10">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-black mb-12">Install in 3 Simple Steps</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: "01", title: "Download APK", desc: "Tap the download button and choose your device architecture (64-bit recommended)." },
              { step: "02", title: "Enable Unknown Sources", desc: "Go to Settings → Security → enable 'Install from Unknown Sources'." },
              { step: "03", title: "Install & Enjoy", desc: "Open the APK, tap Install, and launch MaxTube. Start streaming, ad-free!" },
            ].map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                viewport={{ once: true }}
                className="relative bg-[#111111] border border-white/5 rounded-2xl p-8 hover:border-[#FF0000]/30 transition-all"
              >
                <div className="text-6xl font-black text-[#FF0000]/20 mb-4">{s.step}</div>
                <h3 className="text-xl font-bold mb-3 text-white">{s.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 px-4 bg-black/20">
        <div className="container mx-auto max-w-3xl">
          <h2 className="text-4xl font-black text-center mb-16 tracking-tight">
            {content.faq.section_title}
          </h2>
          <div className="space-y-6">
            {content.faq.items.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="bg-[#111111] border border-white/5 rounded-2xl p-6 hover:border-[#FF0000]/30 transition-all group"
              >
                <div className="flex items-start gap-4">
                  <div className="mt-1">
                    <Info className="w-6 h-6 text-[#FF0000]/60 group-hover:text-[#FF0000] transition-colors" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-2 text-[#FF4444]/90">
                      {item.question}
                    </h3>
                    <p className="text-gray-400 leading-relaxed">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-white/5 text-center">
        <div className="container mx-auto">
          <div className="flex items-center justify-center gap-2 mb-6">
            <img src="/maxtube_icon.png" alt="MaxTube" className="w-8 h-8 rounded-lg" />
            <span className="font-black text-xl text-white">MaxTube</span>
          </div>
          <p className="text-gray-500 text-sm mb-4 max-w-md mx-auto italic">
            {content.footer.disclaimer}
          </p>
          <p className="text-gray-400 font-medium">
            {content.footer.copyright}
          </p>
        </div>
      </footer>

      {/* Download Modal */}
      <Dialog open={isModalOpen} onOpenChange={(open) => !redirecting.active && setIsModalOpen(open)}>
        <DialogContent className="bg-[#111111] border-white/10 text-white max-w-md rounded-3xl p-8 shadow-[0_0_100px_rgba(255,0,0,0.2)]">
          <AnimatePresence mode="wait">
            {!redirecting.active ? (
              <motion.div
                key="options"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.1 }}
              >
                <DialogHeader>
                  <DialogTitle className="text-3xl font-black text-center mb-2">
                    {content.download_section.modal_title}
                  </DialogTitle>
                  <DialogDescription className="text-center text-gray-400 mb-6 text-base font-medium">
                    Choose the architecture that matches your device for the best performance.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <button
                    id="download-64bit-btn"
                    onClick={() => handleDownloadClick("64bit")}
                    className="w-full flex items-center justify-between p-6 bg-[#1A1A1A] border border-white/5 rounded-2xl hover:border-[#FF0000]/50 hover:bg-[#1A1A1A]/80 transition-all group shadow-inner"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-[#FF0000]/10 rounded-xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                        {content.download_section.buttons["64bit"].icon}
                      </div>
                      <div className="text-left font-bold text-lg">
                        {content.download_section.buttons["64bit"].text}
                        <span className="block text-xs font-medium text-gray-500 uppercase tracking-widest mt-0.5">Recommended for 2018+ devices</span>
                      </div>
                    </div>
                    <ChevronRight className="w-6 h-6 text-gray-600 group-hover:text-[#FF0000] group-hover:translate-x-1 transition-all" />
                  </button>
                  <button
                    id="download-32bit-btn"
                    onClick={() => handleDownloadClick("32bit")}
                    className="w-full flex items-center justify-between p-6 bg-[#1A1A1A] border border-white/5 rounded-2xl hover:border-[#CC0000]/50 hover:bg-[#1A1A1A]/80 transition-all group shadow-inner"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-[#CC0000]/10 rounded-xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                        {content.download_section.buttons["32bit"].icon}
                      </div>
                      <div className="text-left font-bold text-lg">
                        {content.download_section.buttons["32bit"].text}
                        <span className="block text-xs font-medium text-gray-500 uppercase tracking-widest mt-0.5">For older devices</span>
                      </div>
                    </div>
                    <ChevronRight className="w-6 h-6 text-gray-600 group-hover:text-[#CC0000] group-hover:translate-x-1 transition-all" />
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="redirecting"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="py-12 flex flex-col items-center text-center"
              >
                <div className="relative mb-8">
                  <div className="absolute inset-0 bg-[#FF0000]/20 blur-[30px] rounded-full animate-pulse" />
                  <Loader className="w-16 h-16 text-[#FF0000] animate-spin relative z-10" />
                </div>
                <h3 className="text-2xl font-black mb-3">Redirecting to Download...</h3>
                <p className="text-gray-400 font-medium">
                  Securely connecting to download server. <br />
                  <span className="text-[#FF4444]">Arch: {redirecting.type === '64bit' ? 'ARM-v8a (64-bit)' : 'ARM-v7a (32-bit)'}</span>
                </p>
                <div className="mt-8 flex items-center gap-2 text-xs font-bold text-gray-600 uppercase tracking-widest">
                  <ShieldCheck className="w-4 h-4 text-green-500" />
                  Scanned for malware
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </DialogContent>
      </Dialog>
    </div>
  );
}
