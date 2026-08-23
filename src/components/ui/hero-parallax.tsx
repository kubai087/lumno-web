import { useCallback, useEffect, useRef, useState } from "react";
import {
  motion,
  useReducedMotion,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import type { MotionValue, Transition } from "motion/react";
import { cn } from "@/lib/utils";

export interface HeroParallaxProduct {
  title: string;
  link: string;
  thumbnail: string;
}

interface HeroParallaxProps {
  products: readonly HeroParallaxProduct[];
  title: string;
  description: string;
  headingId: string;
}

const SPRING_CONFIG = { stiffness: 300, damping: 30, bounce: 100 };
const HEADER_REVEAL_PROGRESS = 0.12;
const HERO_COPY_HIDDEN = { opacity: 0, y: 22, filter: "blur(10px)" };
const HERO_COPY_VISIBLE = { opacity: 1, y: 0, filter: "blur(0px)" };
const HERO_COPY_EASE = [0.22, 1, 0.36, 1] as const;
const HERO_COPY_TRANSITION: Transition = {
  opacity: { duration: 0.72, ease: "easeOut" },
  y: { duration: 0.82, ease: HERO_COPY_EASE },
  filter: { duration: 0.82, ease: HERO_COPY_EASE },
};
const HERO_DESCRIPTION_TRANSITION: Transition = {
  opacity: { duration: 0.72, delay: 0.13, ease: "easeOut" },
  y: { duration: 0.82, delay: 0.13, ease: HERO_COPY_EASE },
  filter: { duration: 0.82, delay: 0.13, ease: HERO_COPY_EASE },
};
const LOOP_COPY_COUNT = 3;

export function HeroParallax({
  products,
  title,
  description,
  headingId,
}: HeroParallaxProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const [isHeaderRevealed, setIsHeaderRevealed] = useState(false);
  const headerRevealRef = useRef(false);
  const isHeaderVisible = isHeaderRevealed || Boolean(shouldReduceMotion);
  const firstRow = products.slice(0, 5);
  const secondRow = products.slice(5, 10);
  const thirdRow = products.slice(10, 15);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 55%", "end 18%"],
  });

  const translateX = useSpring(
    useTransform(scrollYProgress, [0, 0.72], [0, 820]),
    SPRING_CONFIG,
  );
  const translateXReverse = useSpring(
    useTransform(scrollYProgress, [0, 0.72], [0, -820]),
    SPRING_CONFIG,
  );
  const rotateX = useSpring(
    useTransform(scrollYProgress, [0, 0.18], [15, 0]),
    SPRING_CONFIG,
  );
  const rotateZ = useSpring(
    useTransform(scrollYProgress, [0, 0.18], [20, 0]),
    SPRING_CONFIG,
  );
  const translateY = useSpring(
    useTransform(scrollYProgress, [0, 0.18], [-700, -300]),
    SPRING_CONFIG,
  );
  const revealHeader = useCallback(() => {
    if (headerRevealRef.current) {
      return;
    }

    if (shouldReduceMotion || scrollYProgress.get() >= HEADER_REVEAL_PROGRESS) {
      headerRevealRef.current = true;
      setIsHeaderRevealed(true);
    }
  }, [scrollYProgress, shouldReduceMotion]);

  useMotionValueEvent(scrollYProgress, "change", revealHeader);

  useEffect(() => {
    const frame = window.requestAnimationFrame(revealHeader);
    window.addEventListener("resize", revealHeader);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("resize", revealHeader);
    };
  }, [revealHeader]);

  return (
    <div
      ref={containerRef}
      className="hero-parallax relative flex h-auto flex-col self-auto overflow-hidden py-24 antialiased [perspective:1000px] [transform-style:preserve-3d] md:h-auto md:py-40"
      data-hero-parallax
    >
      <HeroParallaxHeader
        title={title}
        description={description}
        headingId={headingId}
        isRevealed={isHeaderVisible}
      />

      <motion.div
        data-hero-parallax-stage
        style={{
          // Keep the stage subscribed to scroll after the copy reveals. The
          // springs can then finish the current 3D gesture instead of being
          // replaced by a static transform on a fast scroll.
          rotateX: shouldReduceMotion ? 0 : rotateX,
          rotateZ: shouldReduceMotion ? 0 : rotateZ,
          translateY: shouldReduceMotion ? -300 : translateY,
        }}
      >
        <ProductRow
          products={firstRow}
          translate={translateX}
          reverse
          shouldReduceMotion={Boolean(shouldReduceMotion)}
        />
        <ProductRow
          products={secondRow}
          translate={translateXReverse}
          shouldReduceMotion={Boolean(shouldReduceMotion)}
        />
        <ProductRow
          products={thirdRow}
          translate={translateX}
          reverse
          shouldReduceMotion={Boolean(shouldReduceMotion)}
          isLast
        />
      </motion.div>
    </div>
  );
}

interface HeroParallaxHeaderProps {
  title: string;
  description: string;
  headingId: string;
  isRevealed: boolean;
}

function HeroParallaxHeader({
  title,
  description,
  headingId,
  isRevealed,
}: HeroParallaxHeaderProps) {
  const chineseCommaIndex = title.indexOf("，");
  const titleLead = chineseCommaIndex >= 0 ? title.slice(0, chineseCommaIndex + 1) : title;
  const titleRest = chineseCommaIndex >= 0 ? title.slice(chineseCommaIndex + 1).trimStart() : "";

  return (
    <div
      className="hero-parallax__header relative -top-20 left-0 z-10 mx-auto w-full max-w-5xl px-4 py-20 text-center md:px-8 md:py-40"
      data-hero-parallax-copy
    >
      <motion.h2
        id={headingId}
        className={cn("hero-parallax__title", titleRest && "hero-title-has-break")}
        initial={HERO_COPY_HIDDEN}
        animate={isRevealed ? HERO_COPY_VISIBLE : HERO_COPY_HIDDEN}
        transition={HERO_COPY_TRANSITION}
      >
        <span className="hero-title-line">
          {titleRest ? (
            <>
              <span className="hero-title-segment">{titleLead}</span>
              <span className="hero-title-segment">{titleRest}</span>
            </>
          ) : (
            <span className="hero-title-segment">{title}</span>
          )}
        </span>
      </motion.h2>
      <motion.p
        className="hero-parallax__description"
        initial={HERO_COPY_HIDDEN}
        animate={isRevealed ? HERO_COPY_VISIBLE : HERO_COPY_HIDDEN}
        transition={HERO_DESCRIPTION_TRANSITION}
      >
        {description}
      </motion.p>
    </div>
  );
}

interface ProductRowProps {
  products: readonly HeroParallaxProduct[];
  translate: MotionValue<number>;
  reverse?: boolean;
  isLast?: boolean;
  shouldReduceMotion: boolean;
}

function ProductRow({
  products,
  translate,
  reverse = false,
  isLast = false,
  shouldReduceMotion,
}: ProductRowProps) {
  const accessibleCopyIndex = reverse ? 1 : 0;
  const loopedProducts = Array.from({ length: LOOP_COPY_COUNT }, (_, copyIndex) =>
    products.map((product) => ({ product, copyIndex })),
  ).flat();

  return (
    <motion.div
      className={cn(
        "hero-parallax__row flex w-max gap-10 md:gap-20",
        reverse ? "flex-row-reverse" : "flex-row",
        reverse && "hero-parallax__row--reverse",
        isLast ? undefined : "mb-10 md:mb-20",
      )}
    >
      {loopedProducts.map(({ product, copyIndex }, index) => (
        <ProductCard
          key={`${product.title}-${product.thumbnail}-${index}`}
          product={product}
          translate={translate}
          shouldReduceMotion={shouldReduceMotion}
          isLoopCopy={copyIndex !== accessibleCopyIndex}
        />
      ))}
    </motion.div>
  );
}

interface ProductCardProps {
  product: HeroParallaxProduct;
  translate: MotionValue<number>;
  shouldReduceMotion: boolean;
  isLoopCopy: boolean;
}

export function ProductCard({
  product,
  translate,
  shouldReduceMotion,
  isLoopCopy,
}: ProductCardProps) {
  return (
    <motion.article
      className="relative aspect-[1.585] w-[18rem] shrink-0 overflow-hidden rounded-[8px] bg-card md:w-[30rem] md:rounded-[10px]"
      style={{ x: shouldReduceMotion ? 0 : translate }}
      aria-hidden={isLoopCopy || undefined}
      data-hero-parallax-card
    >
      <a
        href={product.link}
        className="block size-full"
        aria-label={product.title}
        tabIndex={isLoopCopy ? -1 : undefined}
      >
        <img
          src={product.thumbnail}
          className="absolute inset-0 size-full object-contain object-center"
          alt={product.title}
          loading="lazy"
          decoding="async"
          sizes="(min-width: 768px) 480px, 288px"
        />
      </a>
    </motion.article>
  );
}
