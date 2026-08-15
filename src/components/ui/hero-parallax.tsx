import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import type { MotionValue } from "motion/react";
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

export function HeroParallax({
  products,
  title,
  description,
  headingId,
}: HeroParallaxProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
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
  const opacity = useSpring(
    useTransform(scrollYProgress, [0, 0.18], [0.2, 1]),
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

  return (
    <div
      ref={containerRef}
      className="hero-parallax relative flex h-[200svh] flex-col self-auto overflow-hidden py-24 antialiased [perspective:1000px] [transform-style:preserve-3d] md:h-[250vh] md:py-40"
      data-hero-parallax
    >
      <HeroParallaxHeader
        title={title}
        description={description}
        headingId={headingId}
      />

      <motion.div
        data-hero-parallax-stage
        style={{
          rotateX: shouldReduceMotion ? 0 : rotateX,
          rotateZ: shouldReduceMotion ? 0 : rotateZ,
          translateY: shouldReduceMotion ? 0 : translateY,
          opacity: shouldReduceMotion ? 1 : opacity,
        }}
      >
        <ProductRow products={firstRow} translate={translateX} reverse shouldReduceMotion={Boolean(shouldReduceMotion)} />
        <ProductRow products={secondRow} translate={translateXReverse} shouldReduceMotion={Boolean(shouldReduceMotion)} />
        <ProductRow products={thirdRow} translate={translateX} reverse shouldReduceMotion={Boolean(shouldReduceMotion)} isLast />
      </motion.div>
    </div>
  );
}

interface HeroParallaxHeaderProps {
  title: string;
  description: string;
  headingId: string;
}

function HeroParallaxHeader({
  title,
  description,
  headingId,
}: HeroParallaxHeaderProps) {
  const chineseCommaIndex = title.indexOf("，");
  const titleLead = chineseCommaIndex >= 0 ? title.slice(0, chineseCommaIndex + 1) : title;
  const titleRest = chineseCommaIndex >= 0 ? title.slice(chineseCommaIndex + 1).trimStart() : "";

  return (
    <div className="hero-parallax__header relative top-0 left-0 z-10 mx-auto w-full max-w-5xl px-4 py-20 text-center md:px-8 md:py-40">
      <h2
        id={headingId}
        className={cn("hero-parallax__title", titleRest && "hero-title-has-break")}
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
      </h2>
      <p className="hero-parallax__description">
        {description}
      </p>
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
  return (
    <motion.div
      className={cn(
        "flex w-max gap-10 md:gap-20",
        reverse ? "flex-row-reverse" : "flex-row",
        isLast ? undefined : "mb-10 md:mb-20",
      )}
    >
      {products.map((product, index) => (
        <ProductCard
          key={`${product.title}-${product.thumbnail}-${index}`}
          product={product}
          translate={translate}
          shouldReduceMotion={shouldReduceMotion}
        />
      ))}
    </motion.div>
  );
}

interface ProductCardProps {
  product: HeroParallaxProduct;
  translate: MotionValue<number>;
  shouldReduceMotion: boolean;
}

export function ProductCard({ product, translate, shouldReduceMotion }: ProductCardProps) {
  return (
    <motion.article
      className="relative h-56 w-[18rem] shrink-0 overflow-hidden rounded-2xl bg-card shadow-xl ring-1 ring-border md:h-96 md:w-[30rem] md:rounded-[20px]"
      style={{ x: shouldReduceMotion ? 0 : translate }}
      whileHover={shouldReduceMotion ? undefined : { y: -18 }}
      data-hero-parallax-card
    >
      <a href={product.link} className="block size-full" aria-label={product.title}>
        <img
          src={product.thumbnail}
          height="960"
          width="1200"
          className="absolute inset-0 size-full object-cover object-left-top"
          alt={product.title}
          loading="lazy"
          decoding="async"
          sizes="(min-width: 768px) 480px, 288px"
        />
      </a>
    </motion.article>
  );
}
