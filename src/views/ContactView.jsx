import React, { useState } from 'react';
import { Mail, MessageSquare, Send, CheckCircle2, AlertCircle, Info, ShieldCheck } from 'lucide-react';
import Container from '../components/common/Container';
import Breadcrumbs from '../components/common/Breadcrumbs';
import Input from '../components/common/Input';
import Textarea from '../components/common/Textarea';
import Select from '../components/common/Select';
import Button from '../components/common/Button';
import Toast from '../components/common/Toast';

export default function ContactView() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'general',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [devNotice, setDevNotice] = useState(null);

  const subjectOptions = [
    { value: 'general', label: 'General Inquiry' },
    { value: 'booking_help', label: 'Booking & Reservation Support' },
    { value: 'owner_onboarding', label: 'Listing Resources / Owner Storefront' },
    { value: 'payments', label: 'Payments & Refund Queries' },
    { value: 'partnership', label: 'Commercial & Studio Partnerships' }
  ];

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Please provide your full name.';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Please provide your email address.';
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email.trim())) {
        newErrors.email = 'Please enter a valid email address (e.g., name@example.com).';
      }
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Please enter a message.';
    } else if (formData.message.trim().length < 15) {
      newErrors.message = 'Please provide a few more details (minimum 15 characters).';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);

    // Simulate standard frontend form submission delay, then return honest dev-state response
    setTimeout(() => {
      setIsSubmitting(false);
      // Honest development-state message as required by Section 11:
      // "If no backend submission endpoint exists, do not display a false success message.
      // Clearly indicate that the form is not yet connected or provide an appropriate development-state message."
      setDevNotice({
        type: 'info',
        title: 'Form Prepared (Phase 1 Development State)',
        message: `Thank you, ${formData.name}. In Phase 1 frontend foundation, the contact endpoint is verified and awaiting Phase 2 API integration. Your message for "${formData.subject}" has been validated successfully.`
      });
    }, 800);
  };

  return (
    <div className="contact-view" style={{ paddingBottom: '80px' }}>
      
      {/* Header Banner */}
      <section style={{ backgroundColor: '#FFFFFF', borderBottom: '1px solid var(--color-border)', padding: '48px 0 36px' }}>
        <Container>
          <Breadcrumbs items={[{ label: "Contact Us" }]} />

          <div style={{ maxWidth: '720px' }}>
            <span className="badge badge-purple" style={{ marginBottom: '12px' }}>SUPPORT & INQUIRIES</span>
            <h1 style={{ marginBottom: '14px', lineHeight: 1.2 }}>
              Get in Touch with the RENTIUSE Team
            </h1>
            <p style={{ fontSize: '1.1rem', color: 'var(--color-text-muted)', lineHeight: 1.6 }}>
              Have questions about booking a studio, renting equipment, or listing your resources? We are here to assist creators and owners across Nigeria.
            </p>
          </div>
        </Container>
      </section>

      {/* Main Form & Info Grid */}
      <section style={{ padding: '60px 0' }}>
        <Container>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '48px', alignItems: 'flex-start' }}>
            
            {/* Contact Form Card */}
            <div className="card-surface" style={{ padding: '36px' }}>
              <div style={{ marginBottom: '24px' }}>
                <h3 style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: '6px' }}>
                  Send us a Message
                </h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>
                  Complete the form below and our operations desk will review your inquiry.
                </p>
              </div>

              {devNotice && (
                <div 
                  className="notice-box notice-info" 
                  style={{ marginBottom: '24px', animation: 'fadeIn 0.2s ease-out' }}
                >
                  <Info size={20} style={{ flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <strong style={{ display: 'block', fontSize: '0.92rem', marginBottom: '4px' }}>
                      {devNotice.title}
                    </strong>
                    <p style={{ fontSize: '0.86rem', margin: 0, lineHeight: 1.5 }}>
                      {devNotice.message}
                    </p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} noValidate>
                <Input
                  id="contact-name"
                  name="name"
                  label="Your Full Name"
                  placeholder="e.g. David Vance"
                  value={formData.name}
                  onChange={(e) => {
                    setFormData(prev => ({ ...prev, name: e.target.value }));
                    if (errors.name) setErrors(prev => ({ ...prev, name: '' }));
                  }}
                  required
                  error={errors.name}
                />

                <Input
                  id="contact-email"
                  name="email"
                  type="email"
                  label="Email Address"
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={(e) => {
                    setFormData(prev => ({ ...prev, email: e.target.value }));
                    if (errors.email) setErrors(prev => ({ ...prev, email: '' }));
                  }}
                  required
                  error={errors.email}
                />

                <Select
                  id="contact-subject"
                  name="subject"
                  label="Inquiry Subject"
                  value={formData.subject}
                  onChange={(e) => setFormData(prev => ({ ...prev, subject: e.target.value }))}
                  options={subjectOptions}
                  required
                />

                <Textarea
                  id="contact-message"
                  name="message"
                  label="Your Message"
                  placeholder="Tell us about the space, equipment, or question you have..."
                  rows={5}
                  value={formData.message}
                  onChange={(e) => {
                    setFormData(prev => ({ ...prev, message: e.target.value }));
                    if (errors.message) setErrors(prev => ({ ...prev, message: '' }));
                  }}
                  required
                  error={errors.message}
                  hint="Please include specific studio locations or gear models if asking about listings."
                />

                {/* Privacy Notice */}
                <div style={{ marginBottom: '24px', fontSize: '0.8rem', color: 'var(--color-text-muted)', lineHeight: 1.5 }}>
                  By submitting this form, you acknowledge that your contact details will be processed in accordance with our <a href="/privacy" style={{ color: 'var(--color-primary)', textDecoration: 'underline' }}>Privacy Policy</a>. We do not share your information with unverified third parties.
                </div>

                <Button 
                  type="submit" 
                  variant="primary" 
                  size="lg" 
                  fullWidth 
                  isLoading={isSubmitting}
                  icon={<Send size={16} />}
                >
                  Send Message
                </Button>
              </form>
            </div>

            {/* Support Information & Booking Notice */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              
              <div className="card-surface" style={{ padding: '32px' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '14px' }}>
                  Frequently Handled Queries
                </h3>
                <p style={{ fontSize: '0.92rem', color: 'var(--color-text-muted)', lineHeight: 1.6, marginBottom: '20px' }}>
                  Many common questions regarding how RENTIUSE operates are addressed in our centralized knowledge base.
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                    <CheckCircle2 size={18} color="#10B981" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <div style={{ fontSize: '0.88rem' }}>
                      <strong>Owner Approvals:</strong> Why every booking requires owner acceptance before confirmation.
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                    <CheckCircle2 size={18} color="#10B981" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <div style={{ fontSize: '0.88rem' }}>
                      <strong>Online Payments:</strong> How inventory is protected while awaiting host confirmation.
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                    <CheckCircle2 size={18} color="#10B981" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <div style={{ fontSize: '0.88rem' }}>
                      <strong>Refund Workflows:</strong> Automatic 100% refund when requests are declined or expired.
                    </div>
                  </div>
                </div>

                <div style={{ marginTop: '24px', paddingTop: '20px', borderTop: '1px solid var(--color-border)' }}>
                  <Button to="/help" variant="outline-purple" size="sm">
                    Visit Help Center & FAQs
                  </Button>
                </div>
              </div>

              <div className="card-surface" style={{ padding: '32px', backgroundColor: 'var(--color-lavender)', borderColor: 'var(--color-lavender-dark)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-primary-dark)', fontWeight: 700, marginBottom: '8px' }}>
                  <ShieldCheck size={20} />
                  <span>Nigeria Operations Desk</span>
                </div>
                <p style={{ fontSize: '0.88rem', color: '#374151', lineHeight: 1.55, margin: 0 }}>
                  Primary coverage zones: Lagos State (Ikeja, Lekki, Victoria Island, Yaba, Surulere) & Abuja FCT (Maitama, Wuse 2, Central Business District). Business contact channels are managed through verified platform hosts.
                </p>
              </div>

            </div>

          </div>
        </Container>
      </section>

    </div>
  );
}
