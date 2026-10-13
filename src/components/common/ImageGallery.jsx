import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Maximize2, X } from 'lucide-react';

export default function ImageGallery({ images = [], title = 'Listing Gallery' }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  if (!images || images.length === 0) {
    return (
      <div style={{ width: '100%', height: '360px', backgroundColor: '#E5E7EB', borderRadius: 'var(--radius-lg)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-text-muted)' }}>
        No images available
      </div>
    );
  }

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="image-gallery-component" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      {/* Main Display Image */}
      <div 
        style={{ 
          position: 'relative', 
          height: 'clamp(280px, 45vw, 480px)', 
          borderRadius: 'var(--radius-lg)', 
          overflow: 'hidden', 
          backgroundColor: '#171526' 
        }}
      >
        <img
          src={images[activeIndex]}
          alt={`${title} - view ${activeIndex + 1}`}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />

        {/* Fullscreen Button */}
        <button
          type="button"
          onClick={() => setIsLightboxOpen(true)}
          style={{
            position: 'absolute',
            top: '14px',
            right: '14px',
            background: 'rgba(23, 21, 38, 0.75)',
            color: '#FFFFFF',
            border: 'none',
            borderRadius: 'var(--radius-sm)',
            width: '36px',
            height: '36px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            backdropFilter: 'blur(4px)'
          }}
          aria-label="View Fullscreen"
        >
          <Maximize2 size={16} />
        </button>

        {/* Carousel Prev/Next Buttons (if more than 1 image) */}
        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={handlePrev}
              style={{
                position: 'absolute',
                left: '14px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'rgba(255, 255, 255, 0.9)',
                color: 'var(--color-ink)',
                border: 'none',
                borderRadius: '50%',
                width: '38px',
                height: '38px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                boxShadow: 'var(--shadow-md)'
              }}
              aria-label="Previous Image"
            >
              <ChevronLeft size={20} />
            </button>

            <button
              type="button"
              onClick={handleNext}
              style={{
                position: 'absolute',
                right: '14px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'rgba(255, 255, 255, 0.9)',
                color: 'var(--color-ink)',
                border: 'none',
                borderRadius: '50%',
                width: '38px',
                height: '38px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                boxShadow: 'var(--shadow-md)'
              }}
              aria-label="Next Image"
            >
              <ChevronRight size={20} />
            </button>
          </>
        )}

        {/* Image Counter Badge */}
        <div style={{ position: 'absolute', bottom: '14px', right: '14px', background: 'rgba(23, 21, 38, 0.8)', color: '#FFFFFF', padding: '4px 10px', borderRadius: '999px', fontSize: '0.78rem', fontWeight: 600 }}>
          {activeIndex + 1} / {images.length}
        </div>
      </div>

      {/* Thumbnails Row */}
      {images.length > 1 && (
        <div style={{ display: 'grid', gridTemplateColumns: `repeat(${Math.min(images.length, 6)}, 1fr)`, gap: '10px' }}>
          {images.map((img, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setActiveIndex(idx)}
              style={{
                height: '76px',
                borderRadius: 'var(--radius-sm)',
                overflow: 'hidden',
                border: activeIndex === idx ? '2px solid var(--color-primary)' : '2px solid transparent',
                padding: 0,
                background: '#E5E7EB',
                cursor: 'pointer',
                opacity: activeIndex === idx ? 1 : 0.75,
                transition: 'opacity 0.2s ease, border-color 0.2s ease'
              }}
            >
              <img src={img} alt={`Thumbnail ${idx + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </button>
          ))}
        </div>
      )}

      {/* Lightbox Modal */}
      {isLightboxOpen && (
        <div className="modal-backdrop" onClick={() => setIsLightboxOpen(false)}>
          <div 
            style={{ 
              position: 'relative', 
              maxWidth: '1000px', 
              width: '95vw', 
              maxHeight: '90vh', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center' 
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setIsLightboxOpen(false)}
              style={{
                position: 'absolute',
                top: '-44px',
                right: '0',
                background: 'transparent',
                color: '#FFFFFF',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '0.9rem',
                fontWeight: 600
              }}
            >
              <X size={20} /> Close
            </button>

            <img
              src={images[activeIndex]}
              alt={`${title} - fullscreen view`}
              style={{ maxWidth: '100%', maxHeight: '85vh', objectFit: 'contain', borderRadius: 'var(--radius-md)' }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
