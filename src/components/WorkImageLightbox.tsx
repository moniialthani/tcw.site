import React, { useEffect, useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';
import { WorkMediaItem } from './WorkPage';

interface WorkImageLightboxProps {
  isOpen: boolean;
  projectName: string;
  images: WorkMediaItem[];
  currentIndex: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
  isArabic?: boolean;
}

export default function WorkImageLightbox({
  isOpen,
  projectName,
  images,
  currentIndex,
  onClose,
  onNavigate,
  isArabic = false,
}: WorkImageLightboxProps) {
  const [scale, setScale] = useState<number>(1);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Touch gesture state
  const touchStartRef = useRef<{ x: number; y: number; time: number } | null>(null);
  const touchDistanceRef = useRef<number | null>(null);
  const initialScaleRef = useRef<number>(1);

  const currentImage = images[currentIndex] || null;

  // Reset scale when image changes
  useEffect(() => {
    setScale(1);
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = 0;
      scrollContainerRef.current.scrollLeft = 0;
    }
  }, [currentIndex]);

  // Lock body scroll while popup is open
  useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isOpen]);

  const handlePrev = useCallback(() => {
    if (images.length <= 1) return;
    const nextIdx = (currentIndex - 1 + images.length) % images.length;
    onNavigate(nextIdx);
  }, [currentIndex, images.length, onNavigate]);

  const handleNext = useCallback(() => {
    if (images.length <= 1) return;
    const nextIdx = (currentIndex + 1) % images.length;
    onNavigate(nextIdx);
  }, [currentIndex, images.length, onNavigate]);

  // Keyboard controls: Escape, Left, Right, +, -
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        if (isArabic) {
          handleNext();
        } else {
          handlePrev();
        }
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        if (isArabic) {
          handlePrev();
        } else {
          handleNext();
        }
      } else if (e.key === '+' || e.key === '=') {
        e.preventDefault();
        setScale((prev) => Math.min(prev + 0.5, 3));
      } else if (e.key === '-') {
        e.preventDefault();
        setScale((prev) => Math.max(prev - 0.5, 1));
      } else if (e.key === '0') {
        e.preventDefault();
        setScale(1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, handleNext, handlePrev, onClose, isArabic]);

  // Touch handlers for mobile swipe & pinch zoom
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      touchStartRef.current = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY,
        time: Date.now(),
      };
      touchDistanceRef.current = null;
    } else if (e.touches.length === 2) {
      // Pinch start
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      touchDistanceRef.current = Math.hypot(dx, dy);
      initialScaleRef.current = scale;
      touchStartRef.current = null;
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length === 2 && touchDistanceRef.current !== null) {
      // Pinch move
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      const newDist = Math.hypot(dx, dy);
      const ratio = newDist / touchDistanceRef.current;
      const newScale = Math.min(Math.max(initialScaleRef.current * ratio, 1), 3);
      setScale(newScale);
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartRef.current && e.changedTouches.length === 1 && scale === 1) {
      const endX = e.changedTouches[0].clientX;
      const endY = e.changedTouches[0].clientY;
      const diffX = endX - touchStartRef.current.x;
      const diffY = endY - touchStartRef.current.y;
      const duration = Date.now() - touchStartRef.current.time;

      // Only horizontal swipe if diffX is significantly larger than diffY
      if (Math.abs(diffX) > 40 && Math.abs(diffX) > Math.abs(diffY) * 1.4 && duration < 500) {
        if (diffX < 0) {
          // Swipe left -> next image (or prev in Arabic)
          if (isArabic) {
            handlePrev();
          } else {
            handleNext();
          }
        } else {
          // Swipe right -> prev image (or next in Arabic)
          if (isArabic) {
            handleNext();
          } else {
            handlePrev();
          }
        }
      }
    }
    touchStartRef.current = null;
    touchDistanceRef.current = null;
  };

  const handleToggleZoom = (e: React.MouseEvent) => {
    e.stopPropagation();
    setScale((prev) => (prev > 1 ? 1 : 2));
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen || !currentImage) return null;

  return (
    <AnimatePresence>
      <motion.div
        key="work-image-lightbox"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        className="fixed inset-0 z-[100] bg-[#0A0A0A]/95 backdrop-blur-md text-[#F9F9F9] flex flex-col select-none overflow-hidden"
        role="dialog"
        aria-modal="true"
        aria-label={`${projectName} gallery image popup`}
      >
        {/* Top Control Bar */}
        <header className="w-full flex items-center justify-between px-4 sm:px-8 py-4 border-b border-white/10 z-20 bg-[#0A0A0A]/60 backdrop-blur-sm">
          {/* Project & Counter */}
          <div className="flex items-center gap-3">
            <span className="font-serif italic text-base sm:text-lg text-white">
              {projectName}
            </span>
            <span className="font-mono text-xs sm:text-[13px] text-white/50 tracking-widest">
              [ {String(currentIndex + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')} ]
            </span>
          </div>

          {/* Zoom controls & Close button */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Zoom Controls */}
            <div className="flex items-center gap-1 bg-white/5 border border-white/10 px-2 py-1">
              <button
                type="button"
                onClick={() => setScale((prev) => Math.max(prev - 0.5, 1))}
                disabled={scale <= 1}
                className="p-1 hover:text-white text-white/60 disabled:opacity-30 disabled:hover:text-white/60 transition-colors"
                aria-label="Zoom out"
                title="Zoom out (-)"
              >
                <ZoomOut size={16} />
              </button>
              <button
                type="button"
                onClick={() => setScale(1)}
                className="font-mono text-[11px] sm:text-xs text-white/80 px-1.5 hover:text-white transition-colors"
                aria-label="Reset zoom"
                title="Reset zoom (0)"
              >
                {Math.round(scale * 100)}%
              </button>
              <button
                type="button"
                onClick={() => setScale((prev) => Math.min(prev + 0.5, 3))}
                disabled={scale >= 3}
                className="p-1 hover:text-white text-white/60 disabled:opacity-30 disabled:hover:text-white/60 transition-colors"
                aria-label="Zoom in"
                title="Zoom in (+)"
              >
                <ZoomIn size={16} />
              </button>
              {scale > 1 && (
                <button
                  type="button"
                  onClick={() => setScale(1)}
                  className="p-1 hover:text-white text-white/60 transition-colors"
                  aria-label="Reset zoom"
                  title="Reset (100%)"
                >
                  <RotateCcw size={14} />
                </button>
              )}
            </div>

            {/* Close button with X */}
            <button
              type="button"
              onClick={onClose}
              className="p-2 text-white/70 hover:text-white hover:bg-white/10 transition-colors border border-white/10 focus:outline-none focus:ring-1 focus:ring-white"
              aria-label={isArabic ? 'إغلاق' : 'Close popup'}
              title={isArabic ? 'إغلاق (Esc)' : 'Close (Esc)'}
            >
              <X size={20} />
            </button>
          </div>
        </header>

        {/* Previous Button (Desktop) */}
        {images.length > 1 && (
          <button
            type="button"
            onClick={isArabic ? handleNext : handlePrev}
            className="hidden sm:flex absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 bg-black/60 hover:bg-white/15 text-white/70 hover:text-white border border-white/10 transition-all focus:outline-none"
            aria-label={isArabic ? 'الصورة التالية' : 'Previous image'}
            title="Previous (Left arrow)"
          >
            <ChevronLeft size={24} />
          </button>
        )}

        {/* Next Button (Desktop) */}
        {images.length > 1 && (
          <button
            type="button"
            onClick={isArabic ? handlePrev : handleNext}
            className="hidden sm:flex absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 bg-black/60 hover:bg-white/15 text-white/70 hover:text-white border border-white/10 transition-all focus:outline-none"
            aria-label={isArabic ? 'الصورة السابقة' : 'Next image'}
            title="Next (Right arrow)"
          >
            <ChevronRight size={24} />
          </button>
        )}

        {/* Image Scroll & Viewport Area */}
        <div
          ref={scrollContainerRef}
          onClick={handleBackdropClick}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          style={{ touchAction: scale > 1 ? 'auto' : 'pan-y pinch-zoom' }}
          className="flex-1 w-full min-h-0 overflow-y-auto overflow-x-auto flex flex-col items-center p-3 sm:p-6 md:p-10 cursor-default"
        >
          {/* Inner container centered with my-auto so smaller images center vertically, while tall images scroll smoothly from top to bottom */}
          <div
            onClick={handleBackdropClick}
            className="my-auto flex flex-col items-center justify-center max-w-full"
          >
            <div
              style={{
                transform: `scale(${scale})`,
                transformOrigin: 'top center',
                transition: 'transform 0.15s ease-out',
              }}
              className="relative max-w-full inline-block"
            >
              <img
                src={currentImage.src}
                alt={currentImage.alt}
                onClick={handleToggleZoom}
                className={`max-w-[min(94vw,1200px)] h-auto block select-none shadow-2xl transition-all duration-150 ${
                  scale > 1 ? 'cursor-zoom-out' : 'cursor-zoom-in'
                }`}
                title={
                  scale > 1
                    ? isArabic
                      ? 'انقر للعودة للحجم الطبيعي'
                      : 'Click to reset zoom'
                    : isArabic
                    ? 'انقر للتكبير مرتين'
                    : 'Click to zoom in 2x'
                }
                draggable={false}
              />
            </div>
          </div>
        </div>

        {/* Mobile Navigation Footer Bar */}
        {images.length > 1 && (
          <footer className="sm:hidden w-full flex items-center justify-between px-6 py-3 border-t border-white/10 bg-[#0A0A0A]/80 backdrop-blur-sm z-20">
            <button
              type="button"
              onClick={isArabic ? handleNext : handlePrev}
              className="flex items-center gap-1 text-xs font-mono text-white/70 hover:text-white py-1 px-2 border border-white/10"
              aria-label={isArabic ? 'الصورة التالية' : 'Previous image'}
            >
              <ChevronLeft size={16} />
              <span>{isArabic ? 'السابق' : 'Prev'}</span>
            </button>

            <span className="font-mono text-xs text-white/50">
              {currentIndex + 1} / {images.length}
            </span>

            <button
              type="button"
              onClick={isArabic ? handlePrev : handleNext}
              className="flex items-center gap-1 text-xs font-mono text-white/70 hover:text-white py-1 px-2 border border-white/10"
              aria-label={isArabic ? 'الصورة السابقة' : 'Next image'}
            >
              <span>{isArabic ? 'التالي' : 'Next'}</span>
              <ChevronRight size={16} />
            </button>
          </footer>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
