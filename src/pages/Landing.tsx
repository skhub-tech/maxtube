import { useState, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Loader, Download, ShieldCheck, Zap, MinusCircle,
  Smartphone, Music, Lock, Info, ChevronRight, Play
} from "lucide-react";
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

interface SiteContent {
  hero: {
    title: string;
    subtitle: string;
    description: string;
    cta_button: string;
  };
  features: {
    section_title: string;
    items: Array<{ icon: string; title: string; description: string }>;
  };
  download_section: {
    title: string;
    modal_title: string;
    buttons: {
      "64bit": { icon: string; text: string };
      "32bit": { icon: string; text: string };
      "androidtv": { icon: string; text: string };
    };
  };
  faq: {
    section_title: string;
    items: Array<{ question: string; answer: string }>;
  };
  footer: { disclaimer: string; copyright: string };
}

interface DownloadLinks {
  apk_links: { "64bit": string; "32bit": string; "androidtv": string };
}

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

  const handleDownloadClick = (type: "64bit" | "32bit" | "androidtv") => {
    if (!links) return;
    setRedirecting({ active: true, type });
    setTimeout(() => {
      window.location.href = links.apk_links[type];
    }, 2000);
  };

  if (!content) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0D0D0D]">
        <Loader className="h-10 w-10 text-[#FF0000] animate-spin" />
      </div>
    );
  }

  const featureIcons = [
    <MinusCircle className="w-7 h-7 text-[#FF0000]" />,
    <Music className="w-7 h-7 text-[#FF4444]" />,
    <Download className="w-7 h-7 text-[#FF0000]" />,
    <Zap className="w-7 h-7 text-[#FF4444]" />,
    <Lock className="w-7 h-7 text-[#FF0000]" />,
    <Smartphone className="w-7 h-7 text-[#FF4444]" />,
  ];

  return (
    <div className="dark min-h-screen bg-[#0D0D0D] text-white selection:bg-[#FF0000]/30 overflow-x-hidden">

      {/* ── Background blobs ── */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full blur-[100px]"
            animate={{ x: [0, 80, -80, 0], y: [0, -80, 80, 0], scale: [1, 1.2, 0.8, 1] }}
            transition={{ duration: 28 + i * 6, repeat: Infinity, ease: "easeInOut" }}
            style={{
              width: 500 + i * 100,
              height: 500 + i * 100,
              left: `${-10 + i * 28}%`,
              top: `${-15 + i * 18}%`,
              background: i % 2 === 0 ? "rgba(255,0,0,0.12)" : "rgba(180,0,0,0.10)",
            }}
          />
        ))}
        <Suspense fallback={null}>
          <RealisticBubbles key="realistic-bubbles" />
        </Suspense>
      </div>

      {/* ══════════════════════════════════════
          NAVBAR — Logo centered at top
      ══════════════════════════════════════ */}
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center px-4 py-3
                         bg-[#0D0D0D]/70 backdrop-blur-xl border-b border-white/5">
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-[#FF0000]/40 blur-md rounded-xl" />
            <img
              src="/maxtube_icon.png"
              alt="MaxTube"
              className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-xl object-contain"
            />
          </div>
          <span className="text-xl sm:text-2xl font-black tracking-tight bg-gradient-to-r from-white to-[#FF4444] bg-clip-text text-transparent">
            MaxTube
          </span>
        </motion.div>
      </header>

      {/* ══════════════════════════════════════
          HERO SECTION
      ══════════════════════════════════════ */}
      <section className="relative z-10 pt-28 pb-16 px-4 sm:px-6">
        <div className="mx-auto max-w-3xl text-center">

          {/* App icon */}
          <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="mb-6 flex justify-center"
          >
            <div className="relative group">
              <div className="absolute inset-0 bg-[#FF0000]/50 blur-2xl rounded-full animate-pulse scale-110" />
              <div className="relative w-28 h-28 sm:w-36 sm:h-36 bg-gradient-to-br from-[#FF0000] to-[#8B0000] rounded-[1.8rem] sm:rounded-[2rem] p-[3px] shadow-[0_0_40px_rgba(255,0,0,0.5)]">
                <div className="w-full h-full bg-[#0D0D0D] rounded-[1.6rem] sm:rounded-[1.8rem] overflow-hidden flex items-center justify-center">
                  <img
                    src="/maxtube_icon.png"
                    alt="MaxTube App"
                    className="w-full h-full object-contain p-2"
                  />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="mb-5 inline-flex items-center gap-2 bg-[#FF0000]/10 border border-[#FF0000]/25
                       rounded-full px-4 py-1.5 text-xs sm:text-sm font-bold text-[#FF5555] uppercase tracking-widest"
          >
            <Play className="w-3 h-3 fill-[#FF5555]" />
            YouTube — Supercharged
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-5xl sm:text-7xl md:text-8xl font-black mb-4 tracking-tighter leading-none
                       bg-gradient-to-br from-white via-[#FF5555] to-[#FF0000] bg-clip-text text-transparent"
          >
            {content.hero.title}
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="text-lg sm:text-2xl font-bold mb-3 text-[#FF5555]"
          >
            {content.hero.subtitle}
          </motion.p>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="text-sm sm:text-base md:text-lg text-gray-400 mb-8 max-w-xl mx-auto leading-relaxed px-2"
          >
            {content.hero.description}
          </motion.p>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button
              id="hero-download-btn"
              onClick={() => setIsModalOpen(true)}
              className="w-full sm:w-auto bg-gradient-to-r from-[#FF0000] to-[#CC0000]
                         hover:from-[#FF2222] hover:to-[#EE0000] hover:scale-105
                         transition-all duration-300 text-white font-black
                         px-8 sm:px-12 py-5 sm:py-6 rounded-full text-base sm:text-xl
                         shadow-[0_0_35px_rgba(255,0,0,0.4)]"
            >
              {content.hero.cta_button}
            </Button>
            <div className="flex items-center gap-2 text-gray-500 text-xs sm:text-sm font-medium">
              <ShieldCheck className="w-4 h-4 text-green-500 shrink-0" />
              Safe · Scanned · Verified
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.65 }}
            className="mt-12 grid grid-cols-3 gap-4 max-w-xs sm:max-w-sm mx-auto"
          >
            {[
              { label: "Downloads", value: "2M+" },
              { label: "Rating", value: "4.9★" },
              { label: "Version", value: "v18.x" },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-2xl sm:text-3xl font-black text-white">{stat.value}</div>
                <div className="text-[10px] sm:text-xs text-gray-500 uppercase tracking-widest mt-1">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          FEATURES GRID
      ══════════════════════════════════════ */}
      <section className="relative z-10 py-16 sm:py-24 px-4 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-3 tracking-tight">
              {content.features.section_title}
            </h2>
            <p className="text-gray-500 text-base sm:text-lg">Everything YouTube should have been.</p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {content.features.items.map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                viewport={{ once: true }}
              >
                <Card className="h-full bg-[#111111] border border-white/5 hover:border-[#FF0000]/40
                                 transition-all duration-400 group overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#FF0000]/4 to-transparent
                                  opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <CardContent className="p-6 sm:p-7 relative">
                    <div className="mb-5 w-12 h-12 sm:w-14 sm:h-14 bg-[#1A1A1A] rounded-2xl
                                    flex items-center justify-center border border-white/5
                                    group-hover:scale-110 group-hover:border-[#FF0000]/20
                                    transition-all duration-400 shadow-lg">
                      {featureIcons[idx] ?? <span className="text-2xl">{feature.icon}</span>}
                    </div>
                    <h3 className="text-base sm:text-lg font-bold mb-2 text-white
                                   group-hover:text-[#FF5555] transition-colors duration-300">
                      {feature.title}
                    </h3>
                    <p className="text-gray-400 text-sm leading-relaxed">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          HOW TO INSTALL
      ══════════════════════════════════════ */}
      <section className="relative z-10 py-16 sm:py-20 px-4 sm:px-6
                          bg-gradient-to-r from-[#FF0000]/8 via-[#1A0000]/30 to-[#FF0000]/8
                          border-y border-[#FF0000]/10">
        <div className="mx-auto max-w-4xl text-center">
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-2xl sm:text-3xl md:text-4xl font-black mb-10 sm:mb-12"
          >
            Install in 3 Simple Steps
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-6">
            {[
              { step: "01", title: "Download APK", desc: "Tap the button below and choose 64-bit (recommended) or 32-bit." },
              { step: "02", title: "Enable Sources", desc: "Settings → Security → enable 'Install from Unknown Sources'." },
              { step: "03", title: "Install & Enjoy", desc: "Open the APK, tap Install, launch MaxTube. Ad-free streaming starts now!" },
            ].map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                viewport={{ once: true }}
                className="bg-[#111111] border border-white/5 rounded-2xl p-6 sm:p-7
                           hover:border-[#FF0000]/25 transition-all text-left"
              >
                <div className="text-5xl sm:text-6xl font-black text-[#FF0000]/15 mb-3 leading-none">{s.step}</div>
                <h3 className="text-base sm:text-lg font-bold mb-2 text-white">{s.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* Second CTA */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
            className="mt-10"
          >
            <Button
              onClick={() => setIsModalOpen(true)}
              className="bg-gradient-to-r from-[#FF0000] to-[#CC0000] hover:scale-105
                         transition-all duration-300 text-white font-black
                         px-8 py-5 rounded-full text-base sm:text-lg
                         shadow-[0_0_30px_rgba(255,0,0,0.35)]"
            >
              ⬇️ Download MaxTube Now
            </Button>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          FAQ
      ══════════════════════════════════════ */}
      <section className="relative z-10 py-16 sm:py-24 px-4 sm:px-6">
        <div className="mx-auto max-w-2xl sm:max-w-3xl">
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl font-black text-center mb-10 sm:mb-14 tracking-tight"
          >
            {content.faq.section_title}
          </motion.h2>
          <div className="space-y-4 sm:space-y-5">
            {content.faq.items.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.45, delay: idx * 0.08 }}
                viewport={{ once: true }}
                className="bg-[#111111] border border-white/5 rounded-2xl p-5 sm:p-6
                           hover:border-[#FF0000]/25 transition-all group"
              >
                <div className="flex items-start gap-3 sm:gap-4">
                  <Info className="w-5 h-5 sm:w-6 sm:h-6 text-[#FF0000]/50 group-hover:text-[#FF0000]
                                   transition-colors mt-0.5 shrink-0" />
                  <div>
                    <h3 className="text-sm sm:text-base font-bold mb-1.5 text-[#FF5555]/90">
                      {item.question}
                    </h3>
                    <p className="text-gray-400 text-sm leading-relaxed">{item.answer}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          FOOTER
      ══════════════════════════════════════ */}
      <footer className="relative z-10 py-10 px-4 border-t border-white/5 text-center">
        <div className="mx-auto max-w-lg">
          <div className="flex items-center justify-center gap-2.5 mb-5">
            <img src="/maxtube_icon.png" alt="MaxTube" className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg object-contain" />
            <span className="font-black text-lg sm:text-xl text-white">MaxTube</span>
          </div>
          <p className="text-gray-500 text-xs sm:text-sm mb-3 italic leading-relaxed">
            {content.footer.disclaimer}
          </p>
          <p className="text-gray-500 text-xs sm:text-sm">{content.footer.copyright}</p>
        </div>
      </footer>

      {/* ══════════════════════════════════════
          DOWNLOAD MODAL
      ══════════════════════════════════════ */}
      <Dialog open={isModalOpen} onOpenChange={(open) => !redirecting.active && setIsModalOpen(open)}>
        <DialogContent className="bg-[#111111] border border-white/10 text-white
                                   w-[92vw] max-w-md rounded-3xl p-6 sm:p-8
                                   shadow-[0_0_80px_rgba(255,0,0,0.18)]">
          <AnimatePresence mode="wait">
            {!redirecting.active ? (
              <motion.div
                key="options"
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
              >
                <DialogHeader className="mb-5">
                  <DialogTitle className="text-2xl sm:text-3xl font-black text-center mb-1">
                    {content.download_section.modal_title}
                  </DialogTitle>
                  <DialogDescription className="text-center text-gray-400 text-sm sm:text-base font-medium">
                    Choose the version that matches your device.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-3 sm:space-y-4">

                  {/* 64-bit */}
                  <button
                    id="download-64bit-btn"
                    onClick={() => handleDownloadClick("64bit")}
                    className="w-full flex items-center justify-between p-4 sm:p-5
                               bg-[#1A1A1A] border border-white/5 rounded-2xl
                               hover:border-[#FF0000]/50 hover:bg-[#1E1E1E] transition-all group"
                  >
                    <div className="flex items-center gap-3 sm:gap-4">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#FF0000]/10 rounded-xl
                                      flex items-center justify-center text-xl sm:text-2xl
                                      group-hover:scale-110 transition-transform shrink-0">
                        {content.download_section.buttons["64bit"].icon}
                      </div>
                      <div className="text-left">
                        <div className="font-bold text-sm sm:text-base">
                          {content.download_section.buttons["64bit"].text}
                        </div>
                        <span className="text-[10px] sm:text-xs font-medium text-gray-500 uppercase tracking-widest">
                          Recommended · 2018+ devices
                        </span>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-600 group-hover:text-[#FF0000]
                                             group-hover:translate-x-1 transition-all shrink-0" />
                  </button>

                  {/* 32-bit */}
                  <button
                    id="download-32bit-btn"
                    onClick={() => handleDownloadClick("32bit")}
                    className="w-full flex items-center justify-between p-4 sm:p-5
                               bg-[#1A1A1A] border border-white/5 rounded-2xl
                               hover:border-[#FF0000]/50 hover:bg-[#1E1E1E] transition-all group"
                  >
                    <div className="flex items-center gap-3 sm:gap-4">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#FF0000]/10 rounded-xl
                                      flex items-center justify-center text-xl sm:text-2xl
                                      group-hover:scale-110 transition-transform shrink-0">
                        {content.download_section.buttons["32bit"].icon}
                      </div>
                      <div className="text-left">
                        <div className="font-bold text-sm sm:text-base">
                          {content.download_section.buttons["32bit"].text}
                        </div>
                        <span className="text-[10px] sm:text-xs font-medium text-gray-500 uppercase tracking-widest">
                          For older devices
                        </span>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-600 group-hover:text-[#FF0000]
                                             group-hover:translate-x-1 transition-all shrink-0" />
                  </button>

                  {/* Divider */}
                  <div className="flex items-center gap-3 py-1">
                    <div className="flex-1 h-px bg-white/5" />
                    <span className="text-[10px] text-gray-600 uppercase tracking-widest font-bold">or</span>
                    <div className="flex-1 h-px bg-white/5" />
                  </div>

                  {/* Android TV */}
                  <button
                    id="download-androidtv-btn"
                    onClick={() => handleDownloadClick("androidtv")}
                    className="w-full flex items-center justify-between p-4 sm:p-5
                               bg-gradient-to-r from-[#0f0f0f] to-[#1a1a1a]
                               border border-[#FF0000]/20 rounded-2xl
                               hover:border-[#FF0000]/60 hover:from-[#1a0000] hover:to-[#1a1a1a]
                               transition-all group"
                  >
                    <div className="flex items-center gap-3 sm:gap-4">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#FF0000]/15 rounded-xl
                                      flex items-center justify-center text-xl sm:text-2xl
                                      group-hover:scale-110 transition-transform shrink-0
                                      border border-[#FF0000]/20">
                        {content.download_section.buttons["androidtv"].icon}
                      </div>
                      <div className="text-left">
                        <div className="font-bold text-sm sm:text-base text-white flex items-center gap-2">
                          {content.download_section.buttons["androidtv"].text}
                          <span className="text-[9px] bg-[#FF0000]/20 text-[#FF5555] border border-[#FF0000]/30
                                           px-2 py-0.5 rounded-full uppercase tracking-wider font-black">
                            New
                          </span>
                        </div>
                        <span className="text-[10px] sm:text-xs font-medium text-gray-500 uppercase tracking-widest">
                          Fire TV · Android TV · Google TV
                        </span>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-[#FF0000]/40 group-hover:text-[#FF0000]
                                             group-hover:translate-x-1 transition-all shrink-0" />
                  </button>

                </div>
              </motion.div>
            ) : (
              <motion.div
                key="redirecting"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                className="py-10 flex flex-col items-center text-center"
              >
                <div className="relative mb-7">
                  <div className="absolute inset-0 bg-[#FF0000]/20 blur-[28px] rounded-full animate-pulse" />
                  <Loader className="w-14 h-14 sm:w-16 sm:h-16 text-[#FF0000] animate-spin relative z-10" />
                </div>
                <h3 className="text-xl sm:text-2xl font-black mb-2">Redirecting to Download…</h3>
                <p className="text-gray-400 text-sm font-medium">
                  Securely connecting to download server.<br />
                  <span className="text-[#FF5555]">
                    {redirecting.type === "64bit"
                      ? "Arch: ARM-v8a (64-bit)"
                      : redirecting.type === "32bit"
                      ? "Arch: ARM-v7a (32-bit)"
                      : "Platform: Android TV / Fire TV / Google TV"}
                  </span>
                </p>
                <div className="mt-7 flex items-center gap-2 text-xs font-bold text-gray-600 uppercase tracking-widest">
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
