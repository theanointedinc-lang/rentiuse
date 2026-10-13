import React from 'react';
import { 
  Sparkles, 
  Camera, 
  Video, 
  Mic, 
  Briefcase, 
  AlertCircle, 
  CheckCircle2, 
  ArrowRight, 
  Layers, 
  HeartHandshake, 
  ShieldCheck, 
  Clock, 
  Building2,
  Key,
  Compass,
  Zap
} from 'lucide-react';

export default function WhyWeStartedView({ onOpenCreateStore, onExplore }) {
  return (
    <div style={{ background: 'var(--bg-dark)', minHeight: '100vh', color: 'var(--text-white)' }}>
      
      {/* Hero Header Section */}
      <section style={{ 
        position: 'relative', 
        padding: '80px 24px 60px', 
        background: 'radial-gradient(ellipse at 50% 0%, rgba(99, 102, 241, 0.25) 0%, rgba(15, 23, 42, 0) 75%)',
        textAlign: 'center',
        borderBottom: '1px solid var(--border-color)'
      }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 16px', borderRadius: '999px', background: 'rgba(99, 102, 241, 0.15)', border: '1px solid rgba(99, 102, 241, 0.3)', color: '#a5b4fc', fontSize: '0.85rem', fontWeight: 600, marginBottom: '20px' }}>
            <Sparkles size={15} /> OUR STORY & MISSION
          </div>

          <h1 style={{ 
            fontFamily: 'var(--font-heading)', 
            fontSize: 'clamp(2.4rem, 5vw, 3.8rem)', 
            fontWeight: 800, 
            letterSpacing: '-0.03em', 
            lineHeight: 1.15,
            marginBottom: '20px'
          }}>
            WHY WE STARTED <span style={{ background: 'linear-gradient(135deg, #818cf8 0%, #c084fc 50%, #f472b6 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>RENTIUSE</span>
          </h1>

          <p style={{ 
            fontSize: 'clamp(1.2rem, 2.5vw, 1.6rem)', 
            color: '#e2e8f0', 
            fontWeight: 600, 
            maxWidth: '780px', 
            margin: '0 auto 28px',
            lineHeight: 1.4
          }}>
            "Work Shouldn’t Be Limited by What You Own."
          </p>

          <p style={{ 
            fontSize: '1.1rem', 
            color: 'var(--text-muted)', 
            maxWidth: '720px', 
            margin: '0 auto', 
            lineHeight: 1.7 
          }}>
            Getting work done often requires access to the right space, equipment, and resources. But for many people, accessing those resources can be difficult, expensive, and time-consuming.
          </p>
        </div>
      </section>


      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '60px 24px 100px' }}>
        
        {/* USE CASES GRID */}
        <section style={{ marginBottom: '80px' }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <span style={{ color: '#818cf8', fontWeight: 700, letterSpacing: '0.05em', fontSize: '0.85rem', textTransform: 'uppercase' }}>
              Real Creators & Businesses
            </span>
            <h2 style={{ fontSize: '2rem', fontWeight: 800, marginTop: '8px' }}>
              The Challenges We See Every Day
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '24px' }}>
            
            <div className="glass-panel" style={{ padding: '28px', borderRadius: '20px', background: 'rgba(30, 41, 59, 0.4)', border: '1px solid rgba(255,255,255,0.08)', transition: 'transform 0.2s ease' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(99, 102, 241, 0.15)', border: '1px solid rgba(99, 102, 241, 0.3)', color: '#818cf8', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
                <Camera size={24} />
              </div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '10px' }}>Photographers</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.6 }}>
                May need a professional photo studio with specialized cyclorama walls or lighting setups for just a few hours.
              </p>
            </div>

            <div className="glass-panel" style={{ padding: '28px', borderRadius: '20px', background: 'rgba(30, 41, 59, 0.4)', border: '1px solid rgba(255,255,255,0.08)' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(168, 85, 247, 0.15)', border: '1px solid rgba(168, 85, 247, 0.3)', color: '#c084fc', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
                <Video size={24} />
              </div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '10px' }}>Filmmakers</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.6 }}>
                May need high-end cinema cameras, lenses, or specialized lighting equipment for a single 3-day production shoot.
              </p>
            </div>

            <div className="glass-panel" style={{ padding: '28px', borderRadius: '20px', background: 'rgba(30, 41, 59, 0.4)', border: '1px solid rgba(255,255,255,0.08)' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(236, 72, 153, 0.15)', border: '1px solid rgba(236, 72, 153, 0.3)', color: '#f472b6', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
                <Mic size={24} />
              </div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '10px' }}>Podcasters</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.6 }}>
                May need an acoustically treated sound studio with multi-mic setups ready for recording guest interviews.
              </p>
            </div>

            <div className="glass-panel" style={{ padding: '28px', borderRadius: '20px', background: 'rgba(30, 41, 59, 0.4)', border: '1px solid rgba(255,255,255,0.08)' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(16, 185, 129, 0.15)', border: '1px solid rgba(16, 185, 129, 0.3)', color: '#34d399', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
                <Briefcase size={24} />
              </div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '10px' }}>Small Businesses</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.6 }}>
                May need a professional conference room or flexible workspace for an important client meeting or team workshop.
              </p>
            </div>

          </div>
        </section>


        {/* THE PROBLEM VS THE OPPORTUNITY */}
        <section style={{ marginBottom: '80px' }}>
          <div className="glass-panel" style={{ padding: '48px 36px', borderRadius: '24px', background: 'linear-gradient(135deg, rgba(15,23,42,0.95) 0%, rgba(30,41,59,0.85) 100%)', border: '1px solid rgba(99,102,241,0.2)' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '40px', alignItems: 'center' }}>
              <div>
                <span className="badge-pill badge-indigo" style={{ marginBottom: '16px' }}>
                  <AlertCircle size={14} /> The Gap In The Market
                </span>
                <h2 style={{ fontSize: '2.2rem', fontWeight: 800, marginBottom: '18px', lineHeight: 1.25 }}>
                  The Problem We're Solving
                </h2>
                <p style={{ color: '#cbd5e1', fontSize: '1.05rem', lineHeight: 1.7, marginBottom: '16px' }}>
                  The problem is that these resources are often scattered across different businesses, social media pages, personal contacts, and informal networks. Finding what you need can take time, while buying everything you need is simply not practical for occasional use.
                </p>
                <p style={{ color: '#94a3b8', fontSize: '0.98rem', lineHeight: 1.7 }}>
                  At the same time, many businesses and individuals own valuable spaces and equipment that remain unused for hours, days, or even weeks. <strong>We saw an opportunity to connect these two sides.</strong>
                </p>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ background: 'rgba(239, 68, 68, 0.08)', border: '1px solid rgba(239, 68, 68, 0.25)', padding: '20px', borderRadius: '16px' }}>
                  <div style={{ color: '#f87171', fontWeight: 700, fontSize: '1rem', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <AlertCircle size={18} /> For Resource Seekers
                  </div>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.5 }}>
                    Finding a workspace or equipment means searching through multiple platforms, sending DM messages, making manual phone calls, checking availability, negotiating prices, and hoping it's reliable.
                  </p>
                </div>

                <div style={{ background: 'rgba(245, 158, 11, 0.08)', border: '1px solid rgba(245, 158, 11, 0.25)', padding: '20px', borderRadius: '16px' }}>
                  <div style={{ color: '#fbbf24', fontWeight: 700, fontSize: '1rem', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Clock size={18} /> For Resource Owners
                  </div>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.5 }}>
                    Resource owners have studios, workspaces, or high-grade gear sitting unused, but reaching the right customers and managing bookings efficiently is friction-heavy and disorganized.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>


        {/* OUR SOLUTION */}
        <section style={{ marginBottom: '80px' }}>
          <div style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto 48px' }}>
            <span className="badge-pill badge-emerald" style={{ marginBottom: '12px' }}>
              <Zap size={14} /> Bridge The Gap
            </span>
            <h2 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '16px' }}>
              Our Solution
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', lineHeight: 1.6 }}>
              Rentiuse is a marketplace designed to bridge the gap between people who have resources and people who need them.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '28px' }}>
            
            <div className="glass-panel" style={{ padding: '36px', borderRadius: '24px', background: 'rgba(15, 23, 42, 0.6)', border: '1px solid rgba(16, 185, 129, 0.3)' }}>
              <div style={{ width: '52px', height: '52px', borderRadius: '14px', background: 'rgba(16, 185, 129, 0.15)', border: '1px solid rgba(16, 185, 129, 0.4)', color: '#34d399', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
                <Compass size={26} />
              </div>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '14px', color: 'white' }}>
                For People Who Need Work Resources
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.98rem', lineHeight: 1.6, marginBottom: '20px' }}>
                We make it easier for individuals and teams to discover available spaces and equipment, view detailed specifications, check real-time availability, and book what they need in seconds.
              </p>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.92rem', color: '#e2e8f0' }}>
                  <CheckCircle2 size={16} color="#34d399" /> Discover verified studios & gear near you
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.92rem', color: '#e2e8f0' }}>
                  <CheckCircle2 size={16} color="#34d399" /> Transparent pricing & direct online booking
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.92rem', color: '#e2e8f0' }}>
                  <CheckCircle2 size={16} color="#34d399" /> Rent for hours or days without heavy capital investment
                </li>
              </ul>
            </div>

            <div className="glass-panel" style={{ padding: '36px', borderRadius: '24px', background: 'rgba(15, 23, 42, 0.6)', border: '1px solid rgba(99, 102, 241, 0.3)' }}>
              <div style={{ width: '52px', height: '52px', borderRadius: '14px', background: 'rgba(99, 102, 241, 0.15)', border: '1px solid rgba(99, 102, 241, 0.4)', color: '#818cf8', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
                <Building2 size={26} />
              </div>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '14px', color: 'white' }}>
                For Resource Owners & Businesses
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.98rem', lineHeight: 1.6, marginBottom: '20px' }}>
                We give owners a dedicated platform and branded subdomain to list their spaces and equipment, expand customer reach, streamline bookings, and turn unused capacity into reliable income.
              </p>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.92rem', color: '#e2e8f0' }}>
                  <CheckCircle2 size={16} color="#818cf8" /> Custom store subdomain (e.g. rentiuse.com/yourstore)
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.92rem', color: '#e2e8f0' }}>
                  <CheckCircle2 size={16} color="#818cf8" /> Organize listings into collections & set slash prices
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.92rem', color: '#e2e8f0' }}>
                  <CheckCircle2 size={16} color="#818cf8" /> Automatic payouts directly to your Nigerian bank account
                </li>
              </ul>
            </div>

          </div>
        </section>


        {/* WHAT WE BELIEVE MANIFESTO */}
        <section style={{ marginBottom: '60px' }}>
          <div style={{ 
            background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.12) 0%, rgba(168, 85, 247, 0.12) 100%)',
            border: '1px solid rgba(99, 102, 241, 0.3)',
            borderRadius: '28px',
            padding: '56px 40px',
            textAlign: 'center',
            boxShadow: '0 0 40px rgba(99, 102, 241, 0.15)'
          }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 16px', borderRadius: '999px', background: 'rgba(255,255,255,0.08)', fontSize: '0.85rem', fontWeight: 700, color: '#c084fc', marginBottom: '20px' }}>
              <HeartHandshake size={16} /> OUR CORE BELIEF
            </div>

            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: 800, marginBottom: '20px', lineHeight: 1.2 }}>
              What We Believe
            </h2>

            <p style={{ fontSize: '1.2rem', color: '#e2e8f0', maxWidth: '680px', margin: '0 auto 36px', lineHeight: 1.6 }}>
              We believe people shouldn't always have to own everything they need to work. <strong>Sometimes, they simply need access.</strong>
            </p>

            {/* Checklist of beliefs */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', maxWidth: '960px', margin: '0 auto 48px' }}>
              <div style={{ background: 'rgba(255,255,255,0.05)', padding: '16px 20px', borderRadius: '14px', border: '1px solid rgba(255,255,255,0.1)', fontWeight: 600, fontSize: '0.98rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                <Key size={18} color="#818cf8" /> Access to the right studio
              </div>

              <div style={{ background: 'rgba(255,255,255,0.05)', padding: '16px 20px', borderRadius: '14px', border: '1px solid rgba(255,255,255,0.1)', fontWeight: 600, fontSize: '0.98rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                <Key size={18} color="#c084fc" /> Access to the right equipment
              </div>

              <div style={{ background: 'rgba(255,255,255,0.05)', padding: '16px 20px', borderRadius: '14px', border: '1px solid rgba(255,255,255,0.1)', fontWeight: 600, fontSize: '0.98rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                <Key size={18} color="#f472b6" /> Access to the right workspace
              </div>

              <div style={{ background: 'rgba(255,255,255,0.05)', padding: '16px 20px', borderRadius: '14px', border: '1px solid rgba(255,255,255,0.1)', fontWeight: 600, fontSize: '0.98rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                <Key size={18} color="#34d399" /> Access at the right time
              </div>
            </div>

            {/* 3 Steps Banner */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '24px', flexWrap: 'wrap', marginBottom: '40px' }}>
              <span style={{ fontSize: '1.25rem', fontWeight: 800, color: 'white' }}>Find what you need.</span>
              <span style={{ color: '#818cf8', fontWeight: 700 }}>•</span>
              <span style={{ fontSize: '1.25rem', fontWeight: 800, color: 'white' }}>Use it when you need it.</span>
              <span style={{ color: '#818cf8', fontWeight: 700 }}>•</span>
              <span style={{ fontSize: '1.25rem', fontWeight: 800, color: 'white' }}>Work without having to own it.</span>
            </div>

            <p style={{ fontSize: '1.1rem', color: '#a5b4fc', fontWeight: 700 }}>
              Rentiuse — Access the resources you need to work.
            </p>

            {/* Action Buttons */}
            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap', marginTop: '36px' }}>
              <button 
                className="btn-primary" 
                style={{ padding: '14px 32px', fontSize: '1rem' }}
                onClick={onOpenCreateStore}
              >
                <Building2 size={18} /> Create Your Store
              </button>
              
              <button 
                className="btn-secondary" 
                style={{ padding: '14px 28px', fontSize: '1rem' }}
                onClick={onExplore}
              >
                Explore Spaces & Gear <ArrowRight size={18} />
              </button>
            </div>

          </div>
        </section>

      </main>

    </div>
  );
}
