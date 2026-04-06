/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, useScroll, useTransform, useSpring, AnimatePresence, useInView } from "motion/react";
import React, { useRef, cloneElement, ReactElement, useState, useEffect, ReactNode } from "react";
import { 
  ArrowRight, 
  ChevronRight, 
  Layers, 
  Globe, 
  TrendingUp, 
  ShieldCheck,
  Target,
  Users,
  Briefcase,
  Zap,
  BarChart3,
  Network,
  ArrowUp,
  MoveRight,
  Plus,
  ArrowUpRight,
  Clapperboard,
  MonitorPlay,
  Handshake,
  ShoppingBag
} from "lucide-react";

const FadeInSection: React.FC<{ children: ReactNode, delay?: number }> = ({ children, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.8, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
  >
    {children}
  </motion.div>
);

const Navbar = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-brand-black/5" aria-label="Main Navigation">
      <motion.div 
        className="absolute bottom-0 left-0 right-0 h-[1px] bg-brand-red scroll-progress"
        style={{ scaleX }}
      />
      <div className="max-w-7xl mx-auto px-6 h-24 flex items-center justify-between">
        <div className="flex items-center gap-3" role="img" aria-label="Kynzo Media Group Logo">
          <div className="w-10 h-10 bg-brand-black flex items-center justify-center">
            <span className="text-white font-display font-bold text-2xl">K</span>
          </div>
          <div className="flex flex-col">
            <span className="font-display font-bold text-xl tracking-tighter uppercase leading-none">Kynzo</span>
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-red">Media Group</span>
          </div>
        </div>
        <div className="hidden md:flex items-center gap-12 text-[11px] font-bold uppercase tracking-[0.2em]">
          <a href="#capabilities" className="hover:text-brand-red transition-colors relative group" aria-label="Go to Capabilities section">
            Capabilities
            <span className="absolute -bottom-1 left-0 w-0 h-px bg-brand-red transition-all group-hover:w-full"></span>
          </a>
          <a href="#process" className="hover:text-brand-red transition-colors relative group" aria-label="Go to Process section">
            Process
            <span className="absolute -bottom-1 left-0 w-0 h-px bg-brand-red transition-all group-hover:w-full"></span>
          </a>
          <a href="#leadership" className="hover:text-brand-red transition-colors relative group" aria-label="Go to Leadership section">
            Leadership
            <span className="absolute -bottom-1 left-0 w-0 h-px bg-brand-red transition-all group-hover:w-full"></span>
          </a>
          <motion.button 
            whileHover={{ y: -2, backgroundColor: "#D32F2F" }}
            whileTap={{ scale: 0.98 }}
            className="relative bg-brand-black text-white px-8 py-3 transition-all flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] overflow-hidden group"
            aria-label="Start a conversation with Kynzo Media Group"
          >
            <span className="relative z-10">Start a Conversation</span> 
            <ArrowUpRight className="w-3.5 h-3.5 relative z-10 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          </motion.button>
        </div>
      </div>
    </nav>
  );
};

const Counter: React.FC<{ value: number, duration?: number, suffix?: string, delay?: number }> = ({ value, duration = 2, suffix = "", delay = 0 }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      let startTime: number | null = null;
      const start = 0;
      const end = value;
      const totalDuration = duration * 1000;

      const updateCount = (currentTime: number) => {
        if (!startTime) startTime = currentTime;
        const elapsed = currentTime - startTime - (delay * 1000);
        
        if (elapsed < 0) {
          requestAnimationFrame(updateCount);
          return;
        }
        
        const progress = Math.min(elapsed / totalDuration, 1);
        // Ease out quad
        const easedProgress = progress * (2 - progress);
        
        const currentCount = Math.floor(easedProgress * (end - start) + start);
        setCount(currentCount);

        if (progress < 1) {
          requestAnimationFrame(updateCount);
        }
      };

      requestAnimationFrame(updateCount);
    }
  }, [isInView, value, duration, delay]);

  return <span ref={ref}>{count}{suffix}</span>;
};

const TypingText: React.FC<{ children: ReactNode, className?: string, tag?: 'h1' | 'h2' | 'h3' | 'div', delay?: number }> = ({ children, className, tag: Tag = 'h1', delay = 0 }) => {
  const container = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.02, delayChildren: delay },
    },
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: { 
        type: "spring",
        damping: 12,
        stiffness: 200
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
    },
  };

  const renderChildren = (node: ReactNode): ReactNode => {
    if (typeof node === 'string') {
      return node.split(' ').map((word, wordIndex, wordsArray) => (
        <span key={wordIndex} className="inline-block whitespace-nowrap">
          {word.split('').map((char, charIndex) => (
            <motion.span key={charIndex} variants={child} style={{ display: 'inline-block' }}>
              {char}
            </motion.span>
          ))}
          {wordIndex < wordsArray.length - 1 ? '\u00A0' : ''}
        </span>
      ));
    }
    if (React.isValidElement(node)) {
      const element = node as ReactElement;
      if (element.type === 'br') return element;
      return React.cloneElement(element, {
        children: React.Children.map(element.props.children, renderChildren),
      });
    }
    return node;
  };

  return (
    <Tag className={className}>
      <motion.span
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        {React.Children.map(children, renderChildren)}
        <motion.span
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
          className="inline-block w-[4px] h-[0.8em] bg-brand-red ml-1 align-middle"
        />
      </motion.span>
    </Tag>
  );
};

const NetworkVisual = () => {
  const [syncStatus, setSyncStatus] = useState(42.8);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setSyncStatus(prev => {
        const delta = (Math.random() - 0.5) * 0.2;
        return parseFloat((prev + delta).toFixed(1));
      });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const nodes = [
    { id: 0, x: 20, y: 30, size: 4, delay: 0, type: 'core', label: 'IP_CORE' },
    { id: 1, x: 40, y: 70, size: 8, delay: 0.2, type: 'edge', label: 'DIST_NODE' },
    { id: 2, x: 60, y: 20, size: 6, delay: 0.4, type: 'core', label: 'STRAT_HUB' },
    { id: 3, x: 80, y: 60, size: 10, delay: 0.1, type: 'edge', label: 'COMM_ENGINE' },
    { id: 4, x: 50, y: 45, size: 14, delay: 0.3, type: 'hub', label: 'KYNZO_OS' },
    { id: 5, x: 15, y: 80, size: 6, delay: 0.5, type: 'edge', label: 'MEDIA_SYNC' },
    { id: 6, x: 85, y: 15, size: 4, delay: 0.2, type: 'edge', label: 'GLOBAL_REACH' },
    { id: 7, x: 30, y: 15, size: 3, delay: 0.6, type: 'edge', label: 'DATA_FEED' },
    { id: 8, x: 70, y: 85, size: 5, delay: 0.7, type: 'edge', label: 'MONETIZATION' },
    { id: 9, x: 10, y: 50, size: 7, delay: 0.8, type: 'core', label: 'CREATIVE_GEN' },
    { id: 10, x: 90, y: 40, size: 4, delay: 0.9, type: 'edge', label: 'SCALE_UNIT' },
  ];

  const connections = [
    { from: 0, to: 4, type: 'primary', curve: 'M 20 30 Q 35 30 50 45' },
    { from: 1, to: 4, type: 'primary', curve: 'M 40 70 Q 40 55 50 45' },
    { from: 2, to: 4, type: 'primary', curve: 'M 60 20 Q 50 20 50 45' },
    { from: 3, to: 4, type: 'primary', curve: 'M 80 60 Q 65 60 50 45' },
    { from: 5, to: 1, type: 'secondary', curve: 'M 15 80 Q 25 80 40 70' },
    { from: 6, to: 2, type: 'secondary', curve: 'M 85 15 Q 75 15 60 20' },
    { from: 9, to: 0, type: 'secondary', curve: 'M 10 50 Q 15 40 20 30' },
    { from: 10, to: 3, type: 'secondary', curve: 'M 90 40 Q 85 50 80 60' },
    { from: 7, to: 2, type: 'secondary', curve: 'M 30 15 Q 45 15 60 20' },
    { from: 8, to: 3, type: 'secondary', curve: 'M 70 85 Q 75 75 80 60' },
  ];

  return (
    <div className="relative w-full aspect-square lg:aspect-[4/5] group">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-brand-red/5 blur-[120px] rounded-full scale-75 animate-pulse"></div>
      
      {/* Background Grid */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>

      <svg viewBox="0 0 100 100" className="w-full h-full relative z-10">
        <defs>
          <radialGradient id="nodeGradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
            <stop offset="0%" stopColor="#D32F2F" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#D32F2F" stopOpacity="0" />
          </radialGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="1.5" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        
        {/* Connection Paths */}
        {connections.map((conn, i) => (
          <g key={`conn-${i}`}>
            <motion.path
              d={conn.curve}
              fill="none"
              stroke="#D32F2F"
              strokeWidth={conn.type === 'primary' ? "0.25" : "0.15"}
              strokeOpacity={conn.type === 'primary' ? "0.2" : "0.1"}
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ 
                pathLength: 1, 
                opacity: [0.2, 0.4, 0.2]
              }}
              transition={{ 
                pathLength: { duration: 4, delay: i * 0.2, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" },
                opacity: { duration: 3, repeat: Infinity, repeatType: "reverse", ease: "easeInOut", delay: i * 0.3 }
              }}
            />
            {/* Data Flow Particles */}
            <motion.circle
              r={conn.type === 'primary' ? "0.5" : "0.3"}
              fill="#D32F2F"
              initial={{ offsetDistance: "0%", opacity: 0 }}
              animate={{ 
                offsetDistance: "100%", 
                opacity: [0, 1, 0]
              }}
              transition={{ 
                offsetDistance: { duration: conn.type === 'primary' ? 4 : 6, delay: i * 0.5, repeat: Infinity, ease: "linear" },
                opacity: { duration: 2, repeat: Infinity, repeatDelay: 1 }
              }}
              style={{
                offsetPath: `path('${conn.curve}')`,
              }}
            />
          </g>
        ))}

        {/* Nodes */}
        {nodes.map((node, i) => (
          <g key={`node-${i}`}>
            {/* Halo */}
            <motion.circle
              cx={node.x}
              cy={node.y}
              r={node.size / 2}
              fill="url(#nodeGradient)"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ 
                scale: [1, 1.3, 1], 
                opacity: [0.1, 0.3, 0.1]
              }}
              transition={{ 
                duration: node.type === 'hub' ? 4 : 6, 
                delay: node.delay, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
              filter="url(#glow)"
            />
            {/* Core */}
            <motion.circle
              cx={node.x}
              cy={node.y}
              r={node.type === 'hub' ? "0.8" : "0.4"}
              fill={node.type === 'hub' ? "#D32F2F" : "#0A0A0A"}
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: [1, 0.6, 1],
                scale: node.type === 'hub' ? [1, 1.4, 1] : 1
              }}
              transition={{ 
                duration: 3, 
                repeat: Infinity, 
                repeatType: "reverse", 
                ease: "easeInOut", 
                delay: node.delay 
              }}
            />
            {/* Label */}
            <text
              x={node.x}
              y={node.y + (node.size / 2) + 4}
              textAnchor="middle"
              className="font-mono text-[2.5px] fill-brand-black/30 uppercase tracking-[0.2em]"
            >
              {node.label}
            </text>
          </g>
        ))}

        {/* Orbital Rings for Hub */}
        <motion.circle
          cx="50"
          cy="45"
          r="10"
          stroke="#D32F2F"
          strokeWidth="0.05"
          strokeDasharray="1 2"
          fill="none"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        <motion.circle
          cx="50"
          cy="45"
          r="15"
          stroke="#0A0A0A"
          strokeWidth="0.05"
          strokeDasharray="2 4"
          fill="none"
          animate={{ rotate: -360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        />

        {/* Pulsing Radar Wave */}
        <motion.circle
          cx="50"
          cy="45"
          r="0"
          stroke="#D32F2F"
          strokeWidth="0.1"
          fill="none"
          animate={{ r: [0, 80], opacity: [0.4, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeOut" }}
        />
      </svg>
      
      {/* Overlay Text Details */}
      <div className="absolute inset-0 p-10 flex flex-col justify-between pointer-events-none z-20">
        <div className="flex justify-between items-start">
          <div className="font-mono text-[7px] uppercase tracking-[0.4em] text-brand-black/30 leading-loose">
            <span className="text-brand-red">●</span> KYNZO_ECOSYSTEM_MAPPING<br />
            <span className="text-brand-red">●</span> NODE_STATUS: OPTIMAL<br />
            <span className="text-brand-red">●</span> SYNC_FREQ: {syncStatus}Hz
          </div>
          <div className="w-10 h-10 border-t border-r border-brand-red/20"></div>
        </div>
        
        <div className="flex flex-col items-center gap-3">
          <div className="w-px h-20 bg-gradient-to-b from-transparent via-brand-red/30 to-transparent"></div>
          <div className="font-mono text-[7px] uppercase tracking-[1em] text-brand-red/40 translate-x-[0.5em]">Central_Authority</div>
        </div>

        <div className="flex justify-between items-end">
          <div className="w-10 h-10 border-b border-l border-brand-red/20"></div>
          <div className="font-mono text-[7px] uppercase tracking-[0.4em] text-brand-black/30 text-right leading-loose">
            IP_INTEGRATION: ACTIVE<br />
            COMMERCIAL_ENGINE: ONLINE<br />
            © 2026_KYNZO_MEDIA
          </div>
        </div>
      </div>

      {/* Subtle Noise/Texture Overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] mix-blend-multiply"></div>
      
      {/* Scanline Effect */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-brand-black/[0.01] to-transparent h-4 w-full animate-scanline"></div>
    </div>
  );
};

const Hero = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 150]);
  const y2 = useTransform(scrollY, [0, 500], [0, -100]);
  const rotate = useTransform(scrollY, [0, 1000], [0, 45]);

  return (
    <header className="relative min-h-screen flex items-center pt-32 pb-20 overflow-hidden bg-white">
      <div className="absolute inset-0 grid-bg opacity-40"></div>
      
      <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        <div className="lg:col-span-7">
          <FadeInSection>
            <div className="max-w-3xl">
              <div className="flex items-center gap-4 mb-8">
                <span className="w-12 h-px bg-brand-red"></span>
                <span className="text-brand-red font-bold uppercase tracking-[0.4em] text-[10px]">Architects of Entertainment</span>
              </div>
              
              <TypingText className="text-7xl md:text-8xl lg:text-9xl font-display font-bold leading-[0.85] mb-10 tracking-tighter" delay={0.5}>
                Where Entertainment <br />
                <span className="serif italic font-normal text-brand-red">IP Meets</span> <br />
                Commercial <span className="text-brand-black">Momentum.</span>
              </TypingText>
              
              <p className="text-xl text-gray-600 mb-12 leading-relaxed max-w-lg font-light">
                Kynzo Media Group helps rights holders, studios, platforms, brands, and investors turn strong ideas into scalable media and licensing opportunities.
              </p>
              
              <div className="mb-8">
                <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400 mb-4">Strategic partnerships. IP development. Licensing. Production support. Media growth.</p>
                <div className="flex flex-wrap gap-6">
                  <motion.button 
                    whileHover={{ y: -4, backgroundColor: "#D32F2F" }}
                    whileTap={{ scale: 0.98 }}
                    className="relative bg-brand-black text-white px-10 py-5 font-bold uppercase tracking-[0.3em] text-[11px] transition-all shadow-2xl shadow-brand-black/10 flex items-center gap-3 group overflow-hidden"
                  >
                    <span className="relative z-10">Start a Conversation</span>
                    <ArrowUpRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    <div className="absolute inset-0 bg-white/5 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                  </motion.button>
                  <motion.a 
                    href="#capabilities"
                    whileHover={{ x: 5 }}
                    className="relative flex items-center gap-4 px-8 py-5 font-bold uppercase tracking-[0.3em] text-[11px] group border border-brand-black/10 hover:border-brand-red transition-all"
                  >
                    <span className="group-hover:text-brand-red transition-colors">Our Strategic Approach</span>
                    <ArrowRight className="w-4 h-4 text-brand-red group-hover:translate-x-2 transition-transform" />
                  </motion.a>
                </div>
              </div>
            </div>
          </FadeInSection>
        </div>

        <div className="lg:col-span-5 relative lg:h-[600px] flex items-center justify-center">
          <FadeInSection delay={0.2}>
            <motion.div 
              style={{ y: y2 }}
              className="relative w-full max-w-md"
            >
              <NetworkVisual />
              
              {/* Floating Decorative Elements - Reimagined */}
              <motion.div 
                style={{ rotate }}
                className="absolute -top-20 -right-20 w-64 h-64 border border-brand-red/5 rounded-full z-0"
              ></motion.div>
              
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="absolute -bottom-10 -left-10 z-30 flex items-center gap-6"
              >
                <div className="h-24 w-px bg-brand-red"></div>
                <div>
                  <span className="text-brand-black font-display font-bold text-6xl leading-none block tracking-tighter">26<span className="text-brand-red">+</span></span>
                  <span className="text-gray-500 text-[10px] font-bold uppercase tracking-[0.4em] mt-2 block leading-relaxed">Years of <br />Global Expertise</span>
                </div>
              </motion.div>

              {/* Dynamic Floating Nodes - Reimagined as minimalist data points */}
              <motion.div 
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-0 -left-16 z-20 hidden xl:flex items-center gap-4"
              >
                <div className="w-10 h-px bg-brand-red/30"></div>
                <div className="font-mono text-[9px] uppercase tracking-[0.3em] text-brand-black/40">Real_Time_Sync</div>
              </motion.div>

              <motion.div 
                animate={{ y: [0, 15, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute bottom-1/3 -right-16 z-20 hidden xl:flex items-center gap-4"
              >
                <div className="font-mono text-[9px] uppercase tracking-[0.3em] text-brand-black/40">IP_Monetization</div>
                <div className="w-10 h-px bg-brand-red/30"></div>
              </motion.div>
            </motion.div>
          </FadeInSection>
        </div>
      </div>
      
      {/* Background Large Text */}
      <div className="absolute -bottom-20 left-0 right-0 pointer-events-none overflow-hidden whitespace-nowrap opacity-[0.02] select-none">
        <span className="text-[30vw] font-display font-bold uppercase tracking-tighter">STRATEGY • SCALE • SUCCESS • </span>
      </div>
    </header>
  );
};

const SparkField = () => {
  const sparks = Array.from({ length: 20 }).map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2 + 1,
    duration: Math.random() * 10 + 10,
    delay: Math.random() * 5,
  }));

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-20">
      {sparks.map((spark) => (
        <motion.div
          key={spark.id}
          className="absolute bg-brand-red rounded-full blur-[1px]"
          style={{
            left: `${spark.x}%`,
            top: `${spark.y}%`,
            width: spark.size,
            height: spark.size,
          }}
          animate={{
            y: [0, -100, 0],
            x: [0, Math.random() * 40 - 20, 0],
            opacity: [0, 0.5, 0],
          }}
          transition={{
            duration: spark.duration,
            delay: spark.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

const TechnicalFrame = ({ children, title }: { children: ReactNode; title: string }) => (
  <div className="relative group/frame">
    {children}
    <div className="absolute inset-0 pointer-events-none z-30">
      {/* Corner Markers */}
      <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-white/30 m-4 transition-all group-hover/frame:m-2 group-hover/frame:border-brand-red"></div>
      <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-white/30 m-4 transition-all group-hover/frame:m-2 group-hover/frame:border-brand-red"></div>
      <div className="absolute bottom-0 left-0 w-8 h-8 border-b border-l border-white/30 m-4 transition-all group-hover/frame:m-2 group-hover/frame:border-brand-red"></div>
      <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-white/30 m-4 transition-all group-hover/frame:m-2 group-hover/frame:border-brand-red"></div>
      
      {/* Data Readouts */}
      <div className="absolute top-6 left-14 font-mono text-[6px] uppercase tracking-[0.3em] text-white/20 group-hover/frame:text-brand-red/40 transition-colors">
        Object_Ref: {title.replace(/\s+/g, '_').toUpperCase()}
      </div>
      <div className="absolute bottom-6 right-14 font-mono text-[6px] uppercase tracking-[0.3em] text-white/20 group-hover/frame:text-brand-red/40 transition-colors">
        Status: Analyzed_100%
      </div>
      
      {/* Scanning Line */}
      <motion.div 
        className="absolute left-0 right-0 h-px bg-brand-red/20 z-40"
        animate={{ top: ["0%", "100%", "0%"] }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      />
    </div>
  </div>
);

const IntroSection = () => (
  <section className="py-32 px-6 bg-white border-t border-brand-black/5">
    <div className="max-w-7xl mx-auto">
      <FadeInSection>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          <div className="lg:col-span-5">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-px bg-brand-red"></div>
              <span className="text-brand-red font-bold uppercase tracking-[0.4em] text-[10px]">Introduction</span>
            </div>
            <TypingText tag="h2" className="text-5xl md:text-6xl font-bold mb-8 tracking-tighter leading-tight">
              Creative at heart. <br />
              <span className="serif italic font-normal text-brand-red">Powered by intelligence.</span>
            </TypingText>
          </div>
          <div className="lg:col-span-7">
            <div className="space-y-8">
              <p className="text-2xl text-gray-600 font-light leading-relaxed">
                Kynzo Media Group is a strategic and execution partner built for today’s evolving entertainment landscape. We help shape, position, package, produce, and grow IP with a clear focus on commercial readiness, partner alignment, and long-term value creation.
              </p>
              <p className="text-xl text-gray-500 font-light leading-relaxed">
                At the intersection of content, commerce, and connectivity, Kynzo brings together industry insight, strategic thinking, and hands-on execution to move opportunities from concept to scale.
              </p>
            </div>
          </div>
        </div>
      </FadeInSection>
    </div>
  </section>
);

const StrategicInsight = () => {
  return (
    <section className="py-32 bg-brand-black text-white px-6 relative overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-5"></div>
      <SparkField />
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-start">
          <div className="lg:col-span-7">
            <FadeInSection>
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-px bg-brand-red"></div>
                <span className="text-brand-red font-bold uppercase tracking-[0.4em] text-[10px]">Value Proposition</span>
              </div>
              <TypingText tag="h2" className="text-6xl md:text-7xl lg:text-8xl font-display font-bold leading-[0.9] mb-12 tracking-tighter">
                From idea to <br />
                <span className="serif italic font-normal text-brand-red">market-ready</span> <br />
                opportunity.
              </TypingText>
              <p className="text-2xl md:text-3xl text-gray-400 font-light leading-relaxed max-w-2xl">
                Strong content does not automatically become a strong business. The journey from creation to audience to monetisation is often fragmented.
              </p>
            </FadeInSection>
          </div>
          
          <div className="lg:col-span-5 pt-12 lg:pt-32">
            <FadeInSection delay={0.2}>
              <div className="space-y-16">
                <div className="relative pl-12 border-l border-brand-red/30 py-4">
                  <div className="absolute top-0 left-0 w-2 h-2 bg-brand-red -translate-x-[4.5px]"></div>
                  <p className="text-lg text-gray-300 font-light leading-relaxed mb-6">
                    Kynzo helps bridge that gap — aligning strategy, packaging, production, partnerships, and commercial planning to make IP more coherent, scalable, and actionable.
                  </p>
                  <div className="grid grid-cols-2 gap-8">
                    <div>
                      <span className="text-brand-red font-display font-bold text-5xl mb-2 block">
                        <Counter value={40} suffix="%" delay={0.2} />
                      </span>
                      <p className="text-[9px] text-gray-500 uppercase tracking-widest font-bold leading-tight">Unrealised Revenue <br />in Media IP</p>
                    </div>
                    <div>
                      <span className="text-brand-red font-display font-bold text-5xl mb-2 block">
                        <Counter value={85} suffix="%" delay={0.4} />
                      </span>
                      <p className="text-[9px] text-gray-500 uppercase tracking-widest font-bold leading-tight">Fail to Scale <br />Globally</p>
                    </div>
                  </div>
                </div>
                
                <motion.button 
                  whileHover={{ x: 10 }}
                  className="flex items-center gap-4 text-[11px] font-bold uppercase tracking-[0.3em] text-brand-red group"
                >
                  <span>Close the Gap</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                </motion.button>
              </div>
            </FadeInSection>
          </div>
        </div>
      </div>
    </section>
  );
};

const CapabilitiesSection = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(0);

  const capabilities = [
    {
      id: "01",
      title: "IP Strategy & Positioning",
      desc: "Sharper proposition, clearer audience relevance, stronger franchise potential.",
      components: ["Market Analysis", "Brand Positioning", "Audience Profiling", "Competitive Strategy"],
      image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1200",
    },
    {
      id: "02",
      title: "Packaging & Executive Support",
      desc: "Market-facing packaging, executive production support, production management, and turnkey production execution designed to improve readiness, coordination, and delivery.",
      components: ["Production Support", "Market Packaging", "Delivery Management", "Turnkey Execution"],
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1200",
    },
    {
      id: "03",
      title: "Licensing & Strategic Partnerships",
      desc: "Connecting IP with broadcasters, platforms, distributors, licensees, co-production partners, and brands.",
      components: ["Broadcaster Relations", "Platform Deals", "Co-production", "Brand Partnerships"],
      image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80&w=1200",
    },
    {
      id: "04",
      title: "Digital-First IP Development",
      desc: "Building opportunities for a fragmented, multi-platform audience environment with discoverability, financing, and monetisation in mind.",
      components: ["Multi-platform Strategy", "Discoverability", "Digital Financing", "Monetization"],
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200",
    },
    {
      id: "05",
      title: "Brand & Revenue Expansion",
      desc: "Extending value beyond launch through consumer products, brand collaborations, promotional tie-ins, and broader ecosystem growth.",
      components: ["Consumer Products", "Brand Collaborations", "Promotional Tie-ins", "Ecosystem Growth"],
      image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80&w=1200",
    }
  ];

  return (
    <section id="capabilities" className="py-32 px-6 bg-white overflow-hidden border-t border-brand-black/5">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
          {/* Left Column: Context & Visual */}
          <div className="lg:col-span-5">
            <FadeInSection>
              <div className="lg:sticky lg:top-32">
                <div className="flex items-center gap-3 mb-8">
                  <span className="w-8 h-px bg-brand-red"></span>
                  <span className="text-brand-red font-bold uppercase tracking-[0.4em] text-[10px]">What We Do</span>
                </div>
                
                <TypingText tag="h2" className="text-6xl md:text-7xl font-display font-bold tracking-tighter mb-10 leading-[0.9]">
                  Strategic clarity <br />
                  <span className="serif italic font-normal text-brand-red">for entertainment</span> <br />
                  IP.
                </TypingText>
                
                <p className="text-xl text-gray-500 font-light leading-relaxed max-w-md mb-12">
                  We help clients define the right commercial narrative, identify the right partners, and build the right pathways to growth.
                </p>
                
                <TechnicalFrame title={capabilities[hoveredIndex ?? 0].title}>
                  <div className="relative aspect-square md:aspect-[4/5] overflow-hidden bg-brand-black shadow-2xl group/img rounded-3xl">
                    <AnimatePresence mode="wait">
                      <motion.img
                        key={hoveredIndex}
                        initial={{ opacity: 0, scale: 1.1, filter: "grayscale(100%)" }}
                        animate={{ opacity: 0.7, scale: 1, filter: "grayscale(100%)" }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
                        src={capabilities[hoveredIndex ?? 0].image}
                        alt={capabilities[hoveredIndex ?? 0].title}
                        className="absolute inset-0 w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </AnimatePresence>
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-transparent to-transparent opacity-60"></div>
                    
                    <div className="absolute bottom-8 left-8 right-8">
                      <motion.div
                        key={`label-${hoveredIndex}`}
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                      >
                        <p className="text-white/40 font-mono text-[9px] uppercase tracking-[0.3em] mb-2">Strategic Pillar</p>
                        <h3 className="text-white text-3xl font-display font-bold tracking-tight">{capabilities[hoveredIndex ?? 0].title}</h3>
                      </motion.div>
                    </div>
                  </div>
                </TechnicalFrame>
              </div>
            </FadeInSection>
          </div>

          {/* Right Column: Interactive List */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            {capabilities.map((cap, i) => (
              <motion.div
                key={i}
                onMouseEnter={() => setHoveredIndex(i)}
                className={`border-b border-brand-black/10 py-12 group cursor-pointer relative transition-all duration-500 ${hoveredIndex === i ? 'bg-brand-grey/50 -mx-6 px-6' : ''}`}
                layout
              >
                <div className="flex items-start gap-10">
                  <span className="serif italic text-brand-red text-2xl opacity-40 group-hover:opacity-100 transition-opacity pt-1">
                    {cap.id}
                  </span>
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className={`text-4xl md:text-5xl font-display font-bold tracking-tight transition-all duration-500 ${hoveredIndex === i ? 'text-brand-red translate-x-2' : 'text-brand-black'}`}>
                        {cap.title}
                      </h3>
                      <motion.div
                        animate={{ 
                          rotate: hoveredIndex === i ? 45 : 0,
                          backgroundColor: hoveredIndex === i ? "#D32F2F" : "transparent",
                          color: hoveredIndex === i ? "#FFFFFF" : "#0A0A0A"
                        }}
                        className="w-12 h-12 rounded-full border border-brand-black/10 flex items-center justify-center transition-colors"
                      >
                        <Plus className="w-5 h-5" />
                      </motion.div>
                    </div>
                    
                    <AnimatePresence initial={false}>
                      {hoveredIndex === i && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
                          className="overflow-hidden"
                        >
                          <p className="text-xl text-gray-600 font-light leading-relaxed mb-10 max-w-2xl">
                            {cap.desc}
                          </p>
                          
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8">
                            {cap.components.map((comp, idx) => (
                              <motion.div 
                                key={idx}
                                initial={{ x: -10, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ delay: 0.1 + idx * 0.05 }}
                                className="flex items-center gap-4 group/item"
                              >
                                <div className="w-1.5 h-1.5 bg-brand-red rounded-full group-hover/item:scale-150 transition-transform"></div>
                                <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-black/70 group-hover/item:text-brand-red transition-colors">
                                  {comp}
                                </span>
                              </motion.div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </motion.div>
            ))}
            
            {/* Bottom CTA hint */}
            <FadeInSection delay={0.5}>
              <motion.div 
                whileHover={{ x: 10 }}
                className="mt-16 flex items-center gap-6 group cursor-pointer w-fit"
              >
                <div className="w-14 h-14 rounded-full border border-brand-black/10 flex items-center justify-center group-hover:border-brand-red group-hover:bg-brand-red group-hover:text-white transition-all duration-500">
                  <ArrowUpRight className="w-6 h-6 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-brand-red mb-1">Methodology</span>
                  <span className="text-xs font-bold uppercase tracking-[0.2em] text-brand-black group-hover:text-brand-red transition-colors">Explore our full process</span>
                </div>
              </motion.div>
            </FadeInSection>
          </div>
        </div>
      </div>
    </section>
  );
};

const ThoughtLeadership = () => {
  const articles = [
    {
      category: "IP Strategy",
      title: "The Shift from Content to Commerce: Why IP Architecture Matters",
      date: "March 24, 2026",
      excerpt: "In an era of platform saturation, the most successful media properties are those built with a commercial-first mindset.",
      image: "https://images.unsplash.com/photo-1454165833767-027ffea9e778?auto=format&fit=crop&q=80&w=800"
    },
    {
      category: "Market Trends",
      title: "Navigating the Global Streaming Landscape in 2026",
      date: "March 12, 2026",
      excerpt: "How regional IP owners are leveraging niche platforms to bypass traditional distribution bottlenecks.",
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=800"
    },
    {
      category: "Monetization",
      title: "Beyond Licensing: The Future of Ancillary Revenue Streams",
      date: "February 28, 2026",
      excerpt: "Exploring the untapped potential of digital assets and community-driven monetization for legacy IP.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800"
    }
  ];

  return (
    <section className="py-32 px-6 bg-white border-t border-brand-black/5">
      <div className="max-w-7xl mx-auto">
        <FadeInSection>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
            <div className="max-w-2xl">
              <div className="flex items-center gap-3 mb-8">
                <span className="w-8 h-px bg-brand-red"></span>
                <span className="text-brand-red font-bold uppercase tracking-[0.4em] text-[10px]">Thought Leadership</span>
              </div>
              <TypingText tag="h2" className="text-5xl md:text-6xl font-display font-bold tracking-tighter leading-tight">
                Insights for the <br />
                <span className="serif italic font-normal text-brand-red">Modern Ecosystem.</span>
              </TypingText>
            </div>
            <motion.button 
              whileHover={{ x: 10 }}
              className="flex items-center gap-4 text-[11px] font-bold uppercase tracking-[0.3em] text-brand-black group"
            >
              <span>View All Insights</span>
              <ArrowRight className="w-4 h-4 group-hover:text-brand-red transition-colors" />
            </motion.button>
          </div>
        </FadeInSection>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {articles.map((article, i) => (
            <FadeInSection key={i} delay={i * 0.1}>
              <motion.div 
                whileHover={{ y: -10 }}
                className="group cursor-pointer"
              >
                <div className="relative aspect-[16/10] overflow-hidden mb-8 rounded-2xl bg-brand-grey">
                  <img 
                    src={article.image} 
                    alt={article.title}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-white/90 backdrop-blur-md px-4 py-1.5 text-[9px] font-bold uppercase tracking-widest text-brand-black shadow-sm">
                      {article.category}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-brand-red">{article.date}</span>
                  <div className="h-px flex-1 bg-brand-black/5"></div>
                </div>
                <h3 className="text-2xl font-display font-bold mb-4 group-hover:text-brand-red transition-colors leading-snug">
                  {article.title}
                </h3>
                <p className="text-gray-500 font-light leading-relaxed mb-8 line-clamp-2">
                  {article.excerpt}
                </p>
                <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] group-hover:gap-4 transition-all">
                  <span>Read Article</span>
                  <ArrowUpRight className="w-4 h-4 text-brand-red" />
                </div>
              </motion.div>
            </FadeInSection>
          ))}
        </div>
      </div>
    </section>
  );
};

const WhoWeWorkWith = () => {
  const categories = [
    {
      title: "IP Owners and Licensors",
      icon: <ShieldCheck className="w-6 h-6" />,
      desc: "Protecting and positioning creative assets for global commercial scale."
    },
    {
      title: "Studios and Producers",
      icon: <Clapperboard className="w-6 h-6" />,
      desc: "Engineering franchise models and multi-platform revenue streams."
    },
    {
      title: "Broadcasters and Platforms",
      icon: <MonitorPlay className="w-6 h-6" />,
      desc: "Curating and activating high-potential content for global audiences."
    },
    {
      title: "Distributors and Partners",
      icon: <Handshake className="w-6 h-6" />,
      desc: "Bridging the gap between content creation and global market access."
    },
    {
      title: "Brands and Retailers",
      icon: <ShoppingBag className="w-6 h-6" />,
      desc: "Leveraging entertainment IP to drive consumer engagement and growth."
    },
    {
      title: "Strategic Investors",
      icon: <TrendingUp className="w-6 h-6" />,
      desc: "Identifying and de-risking high-value media and entertainment investments."
    }
  ];

  return (
    <section className="py-48 bg-brand-grey px-6 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-1/4 w-px h-full bg-brand-black/5"></div>
      <div className="absolute top-0 right-1/4 w-px h-full bg-brand-black/5"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <FadeInSection>
          <div className="flex flex-col items-center mb-24">
            <div className="flex items-center gap-3 mb-12">
              <span className="w-8 h-px bg-brand-red/30"></span>
              <span className="text-brand-red font-bold uppercase tracking-[0.4em] text-[10px]">Who We Work With</span>
              <span className="w-8 h-px bg-brand-red/30"></span>
            </div>
            
            <TypingText tag="h2" className="text-center text-5xl md:text-6xl lg:text-7xl font-display font-bold tracking-tighter max-w-4xl leading-tight">
              Designed for the full <br />
              <span className="serif italic font-normal text-brand-red">entertainment ecosystem.</span>
            </TypingText>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-brand-black/10 w-full border border-brand-black/10">
            {categories.map((cat, i) => (
              <motion.div 
                key={i}
                whileHover={{ backgroundColor: "#FFFFFF" }}
                className="bg-brand-grey p-12 flex flex-col items-start group transition-all duration-500 cursor-default min-h-[320px] relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity">
                  <span className="font-display font-bold text-9xl leading-none">0{i + 1}</span>
                </div>
                
                <div className="w-14 h-14 bg-white flex items-center justify-center mb-10 shadow-sm group-hover:bg-brand-red group-hover:text-white transition-all duration-500 group-hover:scale-110 group-hover:rotate-3">
                  {cat.icon}
                </div>
                
                <h3 className="text-2xl font-display font-bold text-brand-black mb-4 group-hover:text-brand-red transition-colors leading-tight max-w-[200px]">
                  {cat.title}
                </h3>
                
                <p className="text-gray-500 font-light leading-relaxed text-sm max-w-[240px] opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                  {cat.desc}
                </p>

                <motion.div 
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  className="w-12 h-1 bg-brand-red mt-auto origin-left"
                ></motion.div>
              </motion.div>
            ))}
          </div>
        </FadeInSection>
      </div>
    </section>
  );
};

const ProcessSection = () => {
  const steps = ["Diagnose", "Define", "Package", "Activate", "Extend"];

  return (
    <section id="process" className="py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <FadeInSection>
          <div className="text-center mb-24">
            <span className="text-brand-red font-bold uppercase tracking-widest text-xs mb-4 block">Our Process</span>
            <TypingText tag="h2" className="text-4xl md:text-5xl font-bold">A clear path to growth</TypingText>
          </div>
        </FadeInSection>

        <div className="relative">
          {/* Horizontal Line with Flow Animation */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-px bg-brand-grey -translate-y-1/2 overflow-hidden">
            <motion.div 
              className="absolute inset-0 bg-gradient-to-r from-transparent via-brand-red/40 to-transparent w-1/3"
              animate={{ left: ["-33%", "100%"] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-12 lg:gap-0">
            {steps.map((step, i) => (
              <FadeInSection key={i} delay={i * 0.1}>
                <div className="relative flex flex-col items-center lg:items-start lg:px-8 group">
                  <div className="w-12 h-12 bg-white border border-brand-grey flex items-center justify-center font-display font-bold text-lg mb-8 relative z-10 group-hover:border-brand-red group-hover:bg-brand-red group-hover:text-white transition-all transform group-hover:scale-110">
                    {i + 1}
                  </div>
                  <h3 className="text-xl font-bold mb-2 group-hover:text-brand-red transition-colors">{step}</h3>
                  <p className="text-sm text-gray-500 text-center lg:text-left leading-relaxed">
                    {i === 0 && "In-depth analysis of current IP assets and market position."}
                    {i === 1 && "Strategic roadmap for commercial expansion and brand identity."}
                    {i === 2 && "Creating the commercial assets and pitch for market entry."}
                    {i === 3 && "Executing partnerships and launching into the ecosystem."}
                    {i === 4 && "Scaling revenue through licensing and multi-platform growth."}
                  </p>
                  {i < steps.length - 1 && (
                    <div className="lg:hidden w-px h-12 bg-brand-grey my-4"></div>
                  )}
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const UseCases = () => {
  const cases = [
    { 
      for: "IP Owners", 
      text: "Maximise the commercial potential of your creative assets.",
      subtitle: "From concept to global franchise."
    },
    { 
      for: "Studios", 
      text: "Build scalable franchise models beyond the screen.",
      subtitle: "Multi-platform revenue engineering."
    },
    { 
      for: "Brands", 
      text: "Leverage entertainment IP to drive consumer engagement.",
      subtitle: "Cultural relevance at scale."
    },
    { 
      for: "Investors", 
      text: "Identify and de-risk high-potential media investments.",
      subtitle: "Quantifiable returns on creativity."
    }
  ];

  return (
    <section className="py-32 px-6 bg-brand-black text-white relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full grid-bg opacity-5 pointer-events-none"></div>
      <div className="max-w-7xl mx-auto relative z-10">
        <FadeInSection>
          <div className="flex items-center gap-4 mb-16">
            <div className="w-12 h-px bg-brand-red"></div>
            <TypingText tag="h2" className="text-3xl font-display font-bold tracking-tight">Strategic Solutions</TypingText>
          </div>
        </FadeInSection>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {cases.map((item, i) => (
            <FadeInSection key={i} delay={i * 0.1}>
              <motion.div 
                whileHover={{ y: -12 }}
                className="group p-10 border border-white/10 hover:border-brand-red hover:bg-white/5 transition-all cursor-pointer h-full flex flex-col relative overflow-hidden"
              >
                {/* Decorative background number */}
                <div className="absolute -right-4 -top-4 text-8xl font-display font-bold text-white/[0.03] group-hover:text-brand-red/[0.05] transition-colors pointer-events-none">
                  0{i + 1}
                </div>

                <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-brand-red mb-6 block">For {item.for}</span>
                <p className="text-xl font-display font-bold leading-tight mb-4 group-hover:text-brand-red transition-colors">{item.text}</p>
                
                <motion.p 
                  initial={{ opacity: 0, height: 0 }}
                  whileHover={{ opacity: 0.6, height: "auto" }}
                  className="text-sm text-gray-400 font-light leading-relaxed overflow-hidden"
                >
                  {item.subtitle}
                </motion.p>

                <div className="mt-auto pt-10 flex items-center gap-4 text-[10px] font-bold uppercase tracking-[0.3em] text-white/40 group-hover:text-brand-red transition-all">
                  <span className="group-hover:tracking-[0.5em] transition-all duration-500">Learn More</span>
                  <motion.div
                    animate={{ 
                      x: [0, 5, 0],
                      y: [0, -5, 0]
                    }}
                    transition={{ 
                      duration: 2, 
                      repeat: Infinity, 
                      ease: "easeInOut" 
                    }}
                    className="group-hover:scale-125 transition-transform"
                  >
                    <ArrowUpRight className="w-5 h-5" aria-hidden="true" />
                  </motion.div>
                </div>
              </motion.div>
            </FadeInSection>
          ))}
        </div>
      </div>
    </section>
  );
};

const Leadership = () => (
  <section id="leadership" className="py-48 px-6 bg-brand-grey overflow-hidden relative">
    <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
    <div className="max-w-7xl mx-auto relative z-10">
      <FadeInSection>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-24 items-center">
          <div className="lg:col-span-5 relative group">
            <TechnicalFrame title="Leadership_Vision">
              <div className="aspect-square md:aspect-[4/5] bg-brand-grey overflow-hidden relative shadow-2xl rounded-[40px]">
                <img 
                  src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1000" 
                  alt="Jayakumar Prabhakaran Nair" 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-brand-red/10 mix-blend-multiply opacity-0 group-hover:opacity-100 transition-opacity"></div>
                
                <div className="absolute inset-0 flex items-center justify-center p-12">
                  <div className="relative w-full h-full border border-white/20 flex items-center justify-center">
                    <div className="absolute top-0 left-0 w-20 h-20 border-t-2 border-l-2 border-brand-red"></div>
                    <div className="absolute bottom-0 right-0 w-20 h-20 border-b-2 border-r-2 border-white"></div>
                    <div className="text-center transform group-hover:scale-110 transition-transform">
                      <span className="text-9xl font-display font-bold text-white/10">26+</span>
                      <p className="text-xs font-bold uppercase tracking-[0.4em] text-white/40">Years of Vision</p>
                    </div>
                  </div>
                </div>
              </div>
            </TechnicalFrame>
            <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-brand-black p-12 flex flex-col justify-end text-white shadow-2xl transform group-hover:translate-x-4 group-hover:translate-y-4 transition-transform z-40">
              <span className="text-brand-red text-6xl font-bold mb-4">26+</span>
              <span className="text-[11px] font-bold uppercase tracking-[0.4em] leading-relaxed">Years of Strategic Leadership in Global Media</span>
            </div>
          </div>
          <div className="lg:col-span-7">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-px bg-brand-red"></div>
              <span className="text-brand-red font-bold uppercase tracking-[0.4em] text-[10px]">Leadership Snapshot</span>
            </div>
            <TypingText tag="h2" className="text-6xl md:text-8xl font-bold mb-12 tracking-tighter leading-[0.85]">
              Led by <br />
              <span className="serif italic font-normal text-brand-red">Experience.</span> <br />
              Built on Credibility.
            </TypingText>
            <p className="text-2xl text-gray-600 mb-6 leading-relaxed font-light max-w-2xl">
              Kynzo Media Group is led by <span className="text-brand-black font-bold">Jayakumar Prabhakaran Nair</span>, a senior media and entertainment executive with more than 26 years of experience across animation, kids and family entertainment, licensing, distribution, strategic partnerships, and business growth.
            </p>
            <p className="text-xl text-gray-500 mb-12 leading-relaxed font-light max-w-2xl">
              His experience spans the full value chain of content creation, commercialisation, and long-term franchise building.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="p-10 bg-white border-t-4 border-brand-red shadow-xl hover:shadow-2xl transition-all group">
                <h4 className="text-xl font-bold mb-2 group-hover:text-brand-red transition-colors uppercase tracking-tight">Founder</h4>
                <p className="text-gray-500 font-light leading-relaxed">Kynzo Media Group</p>
              </div>
              <div className="p-10 bg-white border-t-4 border-brand-black shadow-xl hover:shadow-2xl transition-all group">
                <h4 className="text-xl font-bold mb-2 group-hover:text-brand-red transition-colors uppercase tracking-tight">Former CEO</h4>
                <p className="text-gray-500 font-light leading-relaxed">Toonz Media Group</p>
              </div>
            </div>
          </div>
        </div>
      </FadeInSection>
    </div>
  </section>
);

const WhyKynzo = () => {
  const points = [
    { title: "Integrated Thinking", icon: <BarChart3 className="w-5 h-5" />, desc: "A connected view across content, audience, commerce, and rights." },
    { title: "Commercial Perspective", icon: <Users className="w-5 h-5" />, desc: "Real industry experience shaping growth, partnerships, and monetisation." },
    { title: "Execution Flexibility", icon: <Zap className="w-5 h-5" />, desc: "From advisory and packaging to production support and market activation." }
  ];

  return (
    <section className="py-48 px-6 bg-brand-grey border-t border-brand-black/5">
      <div className="max-w-7xl mx-auto">
        <FadeInSection>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-24 items-center">
            <div className="lg:col-span-5">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-px bg-brand-red"></div>
                <span className="text-brand-red font-bold uppercase tracking-[0.4em] text-[10px]">Why Kynzo</span>
              </div>
              <TypingText tag="h2" className="text-5xl md:text-6xl font-bold mb-10 tracking-tighter leading-tight">Built for clients who <br /><span className="serif italic font-normal text-brand-red">need more than advice.</span></TypingText>
              <p className="text-xl text-gray-600 leading-relaxed font-light">Kynzo combines strategic perspective with practical execution support to help entertainment businesses move with clarity and confidence.</p>
            </div>
            <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-1 gap-6">
              {points.map((point, i) => (
                <div key={i} className="bg-white p-10 flex items-start gap-8 hover:shadow-2xl transition-all group border-l-4 border-transparent hover:border-brand-red">
                  <div className="text-brand-red p-4 bg-brand-grey group-hover:bg-brand-red group-hover:text-white transition-colors shrink-0">
                    {cloneElement(point.icon as ReactElement, { "aria-hidden": "true" })}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold group-hover:text-brand-red transition-colors uppercase tracking-tight mb-2">{point.title}</h3>
                    <p className="text-gray-500 font-light">{point.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </FadeInSection>
      </div>
    </section>
  );
};

const Footer = () => (
  <footer className="bg-brand-black text-white pt-24 pb-12 px-6">
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
        <div className="lg:col-span-2">
          <div className="flex items-center gap-2 mb-8">
            <div className="w-8 h-8 bg-brand-red flex items-center justify-center">
              <span className="text-white font-display font-bold text-xl">K</span>
            </div>
            <span className="font-display font-bold text-xl tracking-tighter uppercase">Kynzo Media Group</span>
          </div>
          <p className="text-gray-400 max-w-sm leading-relaxed">
            Strategic partner for the media and entertainment industry. Turning IP into scalable, revenue-driven businesses.
          </p>
        </div>
        <div>
          <h4 className="font-bold mb-6 uppercase tracking-widest text-xs">Navigation</h4>
          <ul className="space-y-4 text-gray-400 text-sm">
            <li><a href="#" className="hover:text-brand-red transition-colors">Capabilities</a></li>
            <li><a href="#" className="hover:text-brand-red transition-colors">Process</a></li>
            <li><a href="#" className="hover:text-brand-red transition-colors">Leadership</a></li>
            <li><a href="#" className="hover:text-brand-red transition-colors">Contact</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-6 uppercase tracking-widest text-xs">Contact</h4>
          <ul className="space-y-4 text-gray-400 text-sm">
            <li>London / New York / Dubai</li>
            <li>info@kynzomedia.com</li>
            <li>+44 (0) 20 7123 4567</li>
          </ul>
        </div>
      </div>
      <div className="pt-12 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6 text-xs text-gray-500 font-bold uppercase tracking-widest">
        <p>© 2026 Kynzo Media Group. All rights reserved.</p>
        <div className="flex gap-8">
          <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
        </div>
      </div>
    </div>
  </footer>
);

const FinalCTA = () => {
  return (
    <section id="contact" className="py-48 px-6 bg-brand-black text-white relative overflow-hidden">
      {/* Generative Background Visual */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute inset-0 grid-bg opacity-10"></div>
        <motion.div 
          animate={{ 
            rotate: [0, 360],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          className="absolute -top-1/2 -right-1/4 w-[150%] aspect-square border border-brand-red/10 rounded-full"
        ></motion.div>
        <motion.div 
          animate={{ 
            rotate: [360, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-1/2 -left-1/4 w-[150%] aspect-square border border-white/5 rounded-full"
        ></motion.div>
      </div>

      <div className="max-w-4xl mx-auto relative z-10 text-center">
        <FadeInSection>
          <div className="flex flex-col items-center">
            <div className="w-20 h-px bg-brand-red mb-12"></div>
            <TypingText tag="h2" className="text-6xl md:text-8xl lg:text-9xl font-display font-bold tracking-tighter leading-[0.85] mb-10">
              Think bigger. <br />
              Package smarter. <br />
              <span className="serif italic font-normal text-brand-red">Grow stronger.</span>
            </TypingText>
            
            <p className="text-xl md:text-2xl text-gray-400 font-light max-w-2xl mb-16 leading-relaxed">
              Kynzo helps entertainment IP become market-ready, partner-ready, and revenue-aware — with the strategic discipline and execution support needed to unlock long-term value.
            </p>

            <motion.button
              whileHover={{ y: -5, backgroundColor: "#FFFFFF", color: "#000000" }}
              whileTap={{ scale: 0.98 }}
              className="group relative px-16 py-6 bg-brand-red overflow-hidden shadow-2xl flex items-center gap-4 mx-auto"
            >
              <div className="absolute inset-0 bg-black/5 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
              <span className="relative z-10 text-[11px] font-bold uppercase tracking-[0.4em] text-white group-hover:text-brand-black transition-colors">Let’s Build What’s Next</span>
              <ArrowUpRight className="w-5 h-5 relative z-10 text-white group-hover:text-brand-black transition-all group-hover:translate-x-1 group-hover:-translate-y-1" />
            </motion.button>
            
            <div className="mt-32 grid grid-cols-1 md:grid-cols-3 gap-12 w-full pt-20 border-t border-white/10">
              <div className="text-left">
                <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-brand-red mb-4 block">Enquiries</span>
                <p className="text-lg font-medium">hello@kynzomedia.com</p>
              </div>
              <div className="text-left">
                <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-brand-red mb-4 block">Location</span>
                <p className="text-lg font-medium">London / Global</p>
              </div>
              <div className="text-left">
                <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-brand-red mb-4 block">Social</span>
                <p className="text-lg font-medium">LinkedIn</p>
              </div>
            </div>
          </div>
        </FadeInSection>
      </div>
    </section>
  );
};

const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: isVisible ? 1 : 0, scale: isVisible ? 1 : 0 }}
      onClick={scrollToTop}
      className="fixed bottom-8 right-8 z-50 w-12 h-12 bg-brand-red text-white flex items-center justify-center shadow-2xl hover:bg-brand-black transition-all"
      aria-label="Back to top"
    >
      <ArrowUp className="w-6 h-6" />
    </motion.button>
  );
};

export default function App() {
  return (
    <div className="min-h-screen noise-bg">
      <Navbar />
      <Hero />
      <IntroSection />
      <StrategicInsight />
      <CapabilitiesSection />
      <ThoughtLeadership />
      <WhoWeWorkWith />
      <ProcessSection />
      <UseCases />
      <Leadership />
      <WhyKynzo />
      <FinalCTA />
      <Footer />
      <BackToTop />
    </div>
  );
}
