import { useState, useRef, useEffect, useCallback } from 'react';
import { motion } from 'motion/react';
import { ZoomIn, ChevronLeft, ChevronRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import WorkImageLightbox from './WorkImageLightbox';

export interface WorkMediaItem {
  type: 'image' | 'video';
  src: string;
  alt: string;
  poster?: string;
  aspect?: string;
}

export interface WorkProject {
  id: string;
  name: string;
  text: string;
  tags: string[];
  media: WorkMediaItem[];
}

const projects: WorkProject[] = [
  {
    id: 'noctra',
    name: 'Noctra',
    text: "An abaya brand with a strong identity, ready for more than selling through messages. We shaped its online home, from the moodboard and website copy to how each product is described and displayed. We also created visuals to carry the brand across, and shaped the launch strategy, including the announcement video, which we produced in house.",
    tags: [
      'Moodboard',
      'Website',
      'Website copy',
      'Visual assets',
      'Launch strategy',
      'Launch video',
    ],
    media: [
      {
        type: 'image',
        src: '/assets/aistudio/noctra-homepage-cropped.jpg',
        alt: 'Noctra website homepage design showing dark romance abaya collection',
      },
      {
        type: 'image',
        src: '/assets/aistudio/noctra-product-cropped.jpg',
        alt: 'Noctra product detail page for Forest abaya with editorial photography and sizing',
      },
      {
        type: 'image',
        src: '/assets/aistudio/noctra-moodboard.jpg',
        alt: 'Noctra website moodboard with palette, typography, and dark romance art direction',
      },
      {
        type: 'image',
        src: '/assets/aistudio/noctra-pattern.jpg',
        alt: 'Noctra cobweb lace brand pattern asset on dark background',
      },
      {
        type: 'video',
        src: '/assets/aistudio/NOCTRA_VIDEO_561c80aa.mp4',
        poster: '/assets/aistudio/noctra-video-poster.jpg',
        alt: 'Noctra launch announcement video produced in-house',
      },
    ],
  },
  {
    id: 'this-could-work',
    name: 'This Could Work',
    text: "Before working on anyone else's brand, we built our own. This Could Work started as a name and an idea. We built everything around it ourselves: the positioning and voice, the logo and the frosted sticky notes that became our brand assets, and the business cards and documents laid out to match. The bilingual website and its copy followed, alongside social content planned around key moments in the year, produced in house (such as our Pink October reel).",
    tags: [
      'Naming',
      'Positioning',
      'Logo',
      'Brand assets',
      'Business documents',
      'Website',
      'Website copy',
      'Social content',
    ],
    media: [
      {
        type: 'image',
        src: '/assets/aistudio/tcw-sticky-notes.jpg',
        alt: 'This Could Work frosted sticky note brand assets and logo concepts',
      },
      {
        type: 'image',
        src: '/assets/aistudio/tcw-business-card.jpg',
        alt: 'This Could Work minimalist gold business card layout with Brand vision, made clear',
      },
      {
        type: 'image',
        src: '/assets/aistudio/tcw-instagram-feed-cropped.jpg',
        alt: 'This Could Work Instagram editorial feed featuring strategic intervention posts and Pink October reel',
      },
      {
        type: 'image',
        src: '/assets/aistudio/tcw-printed-services-guide.jpg',
        alt: 'This Could Work printed Services Guide booklet on premium cardstock',
      },
      {
        type: 'image',
        src: '/assets/aistudio/tcw-website-homepage.jpg',
        alt: 'This Could Work website homepage showing editorial positioning, ways of working, and studio footer',
      },
    ],
  },
];

interface ProjectInlineCarouselProps {
  project: WorkProject;
  onOpenImage: (src: string) => void;
  isArabic: boolean;
}

function ProjectInlineCarousel({
  project,
  onOpenImage,
  isArabic,
}: ProjectInlineCarouselProps) {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const isDraggingRef = useRef(false);
  const hasDraggedRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftPosRef = useRef(0);

  const checkScrollState = useCallback(() => {
    if (!carouselRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
    if (isArabic) {
      const abs = Math.abs(scrollLeft);
      const max = scrollWidth - clientWidth - 4;
      setCanScrollLeft(abs < max);
      setCanScrollRight(abs > 4);
    } else {
      setCanScrollLeft(scrollLeft > 4);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 4);
    }
  }, [isArabic]);

  useEffect(() => {
    checkScrollState();
    const el = carouselRef.current;
    if (!el) return;
    const handleScroll = () => checkScrollState();
    el.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', checkScrollState);
    return () => {
      el.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', checkScrollState);
    };
  }, [checkScrollState]);

  const handleScrollBy = (dir: 'left' | 'right') => {
    if (!carouselRef.current) return;
    const container = carouselRef.current;
    const amount = container.clientWidth * 0.75;
    const delta = dir === 'left' ? -amount : amount;
    container.scrollBy({ left: delta, behavior: 'smooth' });
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!carouselRef.current) return;
    isDraggingRef.current = true;
    hasDraggedRef.current = false;
    startXRef.current = e.pageX - carouselRef.current.offsetLeft;
    scrollLeftPosRef.current = carouselRef.current.scrollLeft;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingRef.current || !carouselRef.current) return;
    const x = e.pageX - carouselRef.current.offsetLeft;
    const walk = (x - startXRef.current) * 1.5;
    if (Math.abs(walk) > 6) {
      hasDraggedRef.current = true;
    }
    carouselRef.current.scrollLeft = scrollLeftPosRef.current - walk;
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
    setTimeout(() => {
      hasDraggedRef.current = false;
    }, 60);
  };

  return (
    <div className="relative w-full group/carousel select-none">
      {/* Darker Grey Carousel Container */}
      <div className="relative w-full bg-[#E0E0E0] border border-[#0A0A0A]/10 p-3 sm:p-5 md:p-6 overflow-hidden">
        {/* Inline Horizontal Scroll Track */}
        <div
          ref={carouselRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          className="flex flex-row items-stretch gap-4 sm:gap-6 md:gap-8 overflow-x-auto scrollbar-none scroll-smooth snap-x snap-mandatory py-2 px-10 sm:px-14 md:px-16 cursor-grab active:cursor-grabbing"
          style={{ touchAction: 'pan-x pan-y' }}
        >
          {project.media.map((item, mIdx) => (
            <div
              key={mIdx}
              className="h-[360px] sm:h-[440px] md:h-[500px] shrink-0 snap-start flex items-center justify-center"
            >
              {item.type === 'video' ? (
                <video
                  controls
                  playsInline
                  preload="metadata"
                  poster={item.poster}
                  className="h-full w-auto max-w-none block object-contain shadow-sm"
                  aria-label={item.alt}
                >
                  <source src={item.src} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              ) : (
                <div
                  role="button"
                  tabIndex={0}
                  onClick={() => {
                    if (!hasDraggedRef.current) {
                      onOpenImage(item.src);
                    }
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      onOpenImage(item.src);
                    }
                  }}
                  className="group/img relative h-full shrink-0 flex items-center justify-center cursor-zoom-in focus:outline-none focus:ring-1 focus:ring-[#0A0A0A] overflow-hidden"
                  aria-label={
                    isArabic
                      ? `عرض ${item.alt} بحجم كامل`
                      : `Open ${item.alt} in full screen popup`
                  }
                >
                  <img
                    src={item.src}
                    alt={item.alt}
                    loading="lazy"
                    draggable={false}
                    className="h-full w-auto max-w-none block object-contain select-none transition-transform duration-300 group-hover/img:scale-[1.01]"
                  />
                  {/* Small hint on hover like a zoom cursor */}
                  <div
                    aria-hidden="true"
                    className="absolute bottom-3 right-3 opacity-0 group-hover/img:opacity-100 transition-opacity duration-200 bg-[#0A0A0A]/85 text-[#F9F9F9] backdrop-blur-sm px-2.5 py-1 text-[11px] font-mono tracking-wider uppercase pointer-events-none flex items-center gap-1.5 shadow-sm"
                  >
                    <ZoomIn size={12} />
                    <span>{isArabic ? 'تكبير' : 'Expand'}</span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Edge Arrow: Left */}
        <button
          type="button"
          onClick={() => handleScrollBy('left')}
          disabled={!canScrollLeft}
          className="flex absolute left-2 sm:left-3 md:left-4 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-11 sm:h-11 items-center justify-center bg-[#0A0A0A] text-white hover:bg-[#0A0A0A]/85 active:scale-95 shadow-md border border-white/10 transition-all disabled:opacity-20 disabled:cursor-not-allowed disabled:hover:bg-[#0A0A0A] focus:outline-none focus:ring-1 focus:ring-white"
          aria-label={isArabic ? 'التالي في المعرض' : 'Scroll left in carousel'}
        >
          <ChevronLeft size={20} />
        </button>

        {/* Edge Arrow: Right */}
        <button
          type="button"
          onClick={() => handleScrollBy('right')}
          disabled={!canScrollRight}
          className="flex absolute right-2 sm:right-3 md:right-4 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-11 sm:h-11 items-center justify-center bg-[#0A0A0A] text-white hover:bg-[#0A0A0A]/85 active:scale-95 shadow-md border border-white/10 transition-all disabled:opacity-20 disabled:cursor-not-allowed disabled:hover:bg-[#0A0A0A] focus:outline-none focus:ring-1 focus:ring-white"
          aria-label={isArabic ? 'السابق في المعرض' : 'Scroll right in carousel'}
        >
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Under-carousel Controls Bar: Counter and Drag Hint */}
      <div className="flex items-center justify-between pt-3 text-xs font-mono text-[#0A0A0A]/50 tracking-wider">
        <span className="uppercase text-[11px] tracking-widest">
          {project.media.length} {isArabic ? 'عناصر' : 'items'} · {isArabic ? 'اسحب للتصفح' : 'Drag or scroll to browse'}
        </span>
      </div>
    </div>
  );
}

export default function WorkPage() {
  const { isArabic } = useLanguage();
  const [activeLightbox, setActiveLightbox] = useState<{
    projectId: string;
    imageIndex: number;
  } | null>(null);

  const activeProject = activeLightbox
    ? projects.find((p) => p.id === activeLightbox.projectId)
    : null;
  const activeImages = activeProject
    ? activeProject.media.filter((m) => m.type === 'image')
    : [];

  return (
    <>
      <article
        id="work-page"
        aria-label={isArabic ? 'أعمالنا' : 'Work'}
        className="w-full pt-32 sm:pt-40 pb-24 sm:pb-32 px-6 sm:px-12 lg:px-24"
      >
        <div className="max-w-4xl mx-auto">
          {/* Page Title: Same massive editorial serif typography as the hero/services */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="border-b border-[#0A0A0A] pb-12 sm:pb-16"
          >
            <h1
              id="work-title"
              className="font-mono text-sm sm:text-base md:text-lg text-[#0A0A0A] font-medium tracking-widest uppercase block"
            >
              {isArabic ? 'الأعمال' : 'Work'}
            </h1>

            {/* "Plated" sitting underneath Work, styled in the same serif font, in italics, and larger than Work */}
            <div
              id="work-subheading-plated"
              className="font-serif italic text-6xl sm:text-8xl md:text-9xl lg:text-[7.5rem] text-[#0A0A0A] font-normal tracking-[-0.03em] leading-[0.95] mt-3 sm:mt-5"
            >
              {isArabic ? 'أطباق جاهزة' : 'Plated'}
            </div>
          </motion.div>

          {/* Project Sections: One section per project */}
          <div className="divide-y divide-[#0A0A0A]">
            {projects.map((project) => (
              <section
                key={project.id}
                id={`project-${project.id}`}
                aria-labelledby={`heading-${project.id}`}
                className="py-16 sm:py-24"
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-10%' }}
                  transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                  className="space-y-10"
                >
                  {/* 1. Images First: One inline carousel */}
                  {project.media.length > 0 ? (
                    <ProjectInlineCarousel
                      project={project}
                      onOpenImage={(imgSrc) => {
                        const projectImages = project.media.filter(
                          (m) => m.type === 'image'
                        );
                        const imgIdx = projectImages.findIndex(
                          (img) => img.src === imgSrc
                        );
                        setActiveLightbox({
                          projectId: project.id,
                          imageIndex: imgIdx >= 0 ? imgIdx : 0,
                        });
                      }}
                      isArabic={isArabic}
                    />
                  ) : (
                    /* Space reserved for project images */
                    <div
                      aria-label={`Images container for ${project.name}`}
                      className="w-full min-h-[140px] sm:min-h-[180px] border border-dashed border-[#0A0A0A]/20 bg-[#F5F5F5]/60 flex items-center justify-center p-6 text-center"
                    >
                      <span className="font-mono text-xs text-[#0A0A0A]/40 tracking-wider uppercase">
                        [ Images for {project.name} ]
                      </span>
                    </div>
                  )}

                  {/* 2. Project Details: Name (h2), Intro Text, Tags */}
                  <div className="max-w-3xl space-y-6">
                    {/* Project Name (h2) */}
                    <h2
                      id={`heading-${project.id}`}
                      className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#0A0A0A] font-normal tracking-[-0.02em]"
                    >
                      {project.name}
                    </h2>

                    {/* Intro text */}
                    <p className="font-sans text-base sm:text-lg text-[#0A0A0A]/85 leading-relaxed font-light">
                      {project.text}
                    </p>

                    {/* Tags on one line, separated by dots */}
                    <div className="pt-2">
                      <p className="font-mono text-xs sm:text-[13px] text-[#0A0A0A]/60 tracking-wider">
                        {project.tags.join(' · ')}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </section>
            ))}
          </div>
        </div>
      </article>

      {/* Full screen popup lightbox for clicked project images */}
      <WorkImageLightbox
        isOpen={!!activeLightbox && activeImages.length > 0}
        projectName={activeProject?.name || ''}
        images={activeImages}
        currentIndex={activeLightbox?.imageIndex || 0}
        onClose={() => setActiveLightbox(null)}
        onNavigate={(newIdx) => {
          if (activeLightbox) {
            setActiveLightbox({ ...activeLightbox, imageIndex: newIdx });
          }
        }}
        isArabic={isArabic}
      />
    </>
  );
}
