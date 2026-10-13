import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, Camera, Video, Mic, Briefcase, CheckCircle2 } from 'lucide-react';
import Container from '../components/common/Container';
import Button from '../components/common/Button';
import Breadcrumbs from '../components/common/Breadcrumbs';

export default function WhyRentiuseView() {
  return (
    <div className="why-rentiuse-view" style={{ paddingBottom: '80px' }}>
      
      {/* Hero Story Banner */}
      <section 
        style={{ 
          backgroundColor: '#FFFFFF', 
          borderBottom: '1px solid var(--color-border)', 
          padding: '56px 0 64px',
          backgroundImage: 'radial-gradient(ellipse at 50% -10%, rgba(117, 72, 219, 0.1) 0%, rgba(255, 255, 255, 0) 70%)'
        }}
      >
        <Container>
          <Breadcrumbs items={[{ label: "Why Rentiuse" }]} />

          <div style={{ maxWidth: '820px', margin: '0 auto', textAlign: 'center' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 16px', borderRadius: 'var(--radius-full)', backgroundColor: 'var(--color-lavender)', color: 'var(--color-primary-dark)', fontSize: '0.85rem', fontWeight: 700, marginBottom: '20px' }}>
              <Sparkles size={15} /> OUR FOUNDING STORY
            </div>

            <h1 style={{ fontSize: 'clamp(2.2rem, 5vw, 3.4rem)', fontWeight: 800, marginBottom: '20px', letterSpacing: '-0.03em', lineHeight: 1.15 }}>
              WHY WE STARTED <span style={{ color: 'var(--color-primary)' }}>RENTIUSE</span>
            </h1>

            <p style={{ fontSize: 'clamp(1.2rem, 2.5vw, 1.6rem)', color: 'var(--color-ink)', fontWeight: 700, fontStyle: 'italic', marginBottom: '24px', lineHeight: 1.35 }}>
              "Work Shouldn't Be Limited by What You Own."
            </p>

            <p style={{ fontSize: '1.1rem', color: 'var(--color-text-muted)', lineHeight: 1.7, maxWidth: '720px', margin: '0 auto' }}>
              Getting work done often requires access to the right space, equipment, and resources. But for many people, accessing those resources can be difficult, expensive, and time-consuming.
            </p>
          </div>
        </Container>
      </section>

      {/* Narrative Section 1: The Everyday Creator Reality */}
      <section style={{ padding: '64px 0' }}>
        <Container narrow>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', marginBottom: '48px' }}>
            <div className="card-surface" style={{ padding: '24px' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'var(--color-lavender)', color: 'var(--color-primary-dark)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '14px' }}>
                <Camera size={20} />
              </div>
              <h4 style={{ fontSize: '1.05rem', marginBottom: '8px' }}>The Photographer</h4>
              <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', lineHeight: 1.55 }}>
                A photographer may need a professional daylight studio or white cyclorama for just a few hours.
              </p>
            </div>

            <div className="card-surface" style={{ padding: '24px' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'var(--color-lavender)', color: 'var(--color-primary-dark)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '14px' }}>
                <Video size={20} />
              </div>
              <h4 style={{ fontSize: '1.05rem', marginBottom: '8px' }}>The Filmmaker</h4>
              <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', lineHeight: 1.55 }}>
                A filmmaker may need an 8K camera package or heavy lighting equipment for a weekend production.
              </p>
            </div>

            <div className="card-surface" style={{ padding: '24px' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'var(--color-lavender)', color: 'var(--color-primary-dark)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '14px' }}>
                <Mic size={20} />
              </div>
              <h4 style={{ fontSize: '1.05rem', marginBottom: '8px' }}>The Podcaster</h4>
              <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', lineHeight: 1.55 }}>
                A podcaster may need a ready-to-use, acoustically treated recording space with multiple mics.
              </p>
            </div>

            <div className="card-surface" style={{ padding: '24px' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'var(--color-lavender)', color: 'var(--color-primary-dark)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '14px' }}>
                <Briefcase size={20} />
              </div>
              <h4 style={{ fontSize: '1.05rem', marginBottom: '8px' }}>The Small Business</h4>
              <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', lineHeight: 1.55 }}>
                A small business may need a dedicated workspace or screening room for an executive meeting or project.
              </p>
            </div>
          </div>

          <div style={{ fontSize: '1.08rem', color: '#374151', lineHeight: 1.8, display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <p>
              The problem is that these resources are often scattered across different businesses, social media pages, personal contacts, and informal networks. Finding what you need can take time, while buying everything you need is simply not practical for occasional use.
            </p>
            <p>
              At the same time, many businesses and individuals own valuable spaces and equipment that remain unused for hours, days, or even weeks.
            </p>
            <div style={{ padding: '20px 24px', backgroundColor: 'var(--color-lavender)', borderRadius: 'var(--radius-lg)', borderLeft: '4px solid var(--color-primary)', fontWeight: 600, color: 'var(--color-primary-dark)' }}>
              We saw an opportunity to connect these two sides.
            </div>
          </div>
        </Container>
      </section>

      {/* Narrative Section 2: The Problem We're Solving */}
      <section style={{ backgroundColor: '#FFFFFF', borderTop: '1px solid var(--color-border)', borderBottom: '1px solid var(--color-border)', padding: '64px 0' }}>
        <Container narrow>
          <span className="badge badge-purple" style={{ marginBottom: '12px' }}>THE CHALLENGE</span>
          <h2 style={{ fontSize: '2.1rem', marginBottom: '24px' }}>
            The Problem We're Solving
          </h2>

          <div style={{ fontSize: '1.08rem', color: '#374151', lineHeight: 1.8, display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <p style={{ fontSize: '1.2rem', fontWeight: 600, color: 'var(--color-ink)' }}>
              Rentiuse is built around a simple problem: People need access to resources to work, while many of those resources are sitting unused.
            </p>
            <p>
              Today, finding a workspace or equipment often means searching through multiple platforms, sending messages, making phone calls, checking availability manually, negotiating prices, and hoping the resource is reliable.
            </p>
            <p>
              For resource owners, the challenge is different. They may have a studio, workspace, equipment, or other useful resources, but reaching the right customers and managing rentals efficiently can be difficult.
            </p>
            <p style={{ fontWeight: 600, color: 'var(--color-ink)' }}>
              This creates a gap between people who have resources and people who need them.
            </p>
          </div>
        </Container>
      </section>

      {/* Narrative Section 3: Our Solution */}
      <section style={{ padding: '64px 0' }}>
        <Container narrow>
          <span className="badge badge-purple" style={{ marginBottom: '12px' }}>THE APPROACH</span>
          <h2 style={{ fontSize: '2.1rem', marginBottom: '24px' }}>
            Our Solution
          </h2>

          <div style={{ fontSize: '1.08rem', color: '#374151', lineHeight: 1.8, display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <p>
              Rentiuse is a marketplace designed to bridge that gap. We make it easier for people to discover and access the workspaces and equipment they need, while giving resource owners a platform to make their underutilized resources available to others.
            </p>
            <p>
              Through Rentiuse, users can discover available resources, view details, check availability, and book what they need.
            </p>
            <p>
              Resource owners can list their spaces and equipment, reach potential customers, manage bookings, and turn unused capacity into additional income.
            </p>
          </div>
        </Container>
      </section>

      {/* Narrative Section 4: What We Believe */}
      <section 
        style={{ 
          backgroundColor: 'var(--color-ink)', 
          color: '#FFFFFF', 
          padding: '80px 0',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <Container narrow>
          <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto' }}>
            <span style={{ display: 'inline-flex', padding: '6px 16px', borderRadius: 'var(--radius-full)', backgroundColor: 'rgba(117, 72, 219, 0.3)', color: '#F1ECFF', fontSize: '0.85rem', fontWeight: 700, marginBottom: '20px' }}>
              OUR CORE BELIEF
            </span>

            <h2 style={{ color: '#FFFFFF', fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: 800, marginBottom: '24px', lineHeight: 1.25 }}>
              What We Believe
            </h2>

            <p style={{ fontSize: '1.25rem', color: '#E5E7EB', lineHeight: 1.7, marginBottom: '36px' }}>
              We believe people shouldn't always have to own everything they need to work. Sometimes, they simply need access.
            </p>

            <div 
              style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
                gap: '16px', 
                marginBottom: '44px',
                textAlign: 'left'
              }}
            >
              <div style={{ padding: '16px 20px', background: 'rgba(255, 255, 255, 0.06)', borderRadius: 'var(--radius-md)', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
                <CheckCircle2 size={18} color="#A7F3D0" style={{ marginBottom: '8px' }} />
                <div style={{ color: '#FFFFFF', fontWeight: 600 }}>Access to the right studio.</div>
              </div>
              <div style={{ padding: '16px 20px', background: 'rgba(255, 255, 255, 0.06)', borderRadius: 'var(--radius-md)', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
                <CheckCircle2 size={18} color="#A7F3D0" style={{ marginBottom: '8px' }} />
                <div style={{ color: '#FFFFFF', fontWeight: 600 }}>Access to the right equipment.</div>
              </div>
              <div style={{ padding: '16px 20px', background: 'rgba(255, 255, 255, 0.06)', borderRadius: 'var(--radius-md)', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
                <CheckCircle2 size={18} color="#A7F3D0" style={{ marginBottom: '8px' }} />
                <div style={{ color: '#FFFFFF', fontWeight: 600 }}>Access to the right workspace.</div>
              </div>
              <div style={{ padding: '16px 20px', background: 'rgba(255, 255, 255, 0.06)', borderRadius: 'var(--radius-md)', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
                <CheckCircle2 size={18} color="#A7F3D0" style={{ marginBottom: '8px' }} />
                <div style={{ color: '#FFFFFF', fontWeight: 600 }}>Access at the right time.</div>
              </div>
            </div>

            <div style={{ fontSize: '1.2rem', color: '#D1D5DB', lineHeight: 1.8, marginBottom: '40px' }}>
              <p>Rentiuse is being built to make that access simpler.</p>
              <p style={{ fontWeight: 700, color: '#FFFFFF', marginTop: '12px' }}>
                Find what you need. Use it when you need it. Work without having to own it.
              </p>
              <p style={{ color: '#A5B4FC', fontWeight: 700, marginTop: '8px' }}>
                Rentiuse — Access the resources you need to work.
              </p>
            </div>

            {/* Final Call to Action */}
            <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Button to="/search" variant="primary" size="lg" icon={<ArrowRight size={18} />} iconPosition="right">
                Explore Rentals
              </Button>
              <Button to="/register/owner" variant="secondary" size="lg">
                Start Listing Your Resources
              </Button>
            </div>

          </div>
        </Container>
      </section>

    </div>
  );
}
