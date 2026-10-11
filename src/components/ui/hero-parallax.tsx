import { useEffect, useRef, useState, useSyncExternalStore, type Ref } from "react";
import {
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import type { MotionValue, Transition } from "motion/react";
import type { ShortcutKey } from "@/lib/shortcut-keys";
import { splitTitlePair } from "@/lib/title-pair";
import { cn } from "@/lib/utils";
import { Dialog, DialogClose, DialogContent, DialogTitle } from "./dialog";
import { ShortcutKeys } from "./shortcut-keys";
import { XIcon } from "lucide-react";

export interface HeroParallaxProduct {
  title: string;
  /** Full-size render, also what a tap opens on phones. */
  thumbnail: string;
  /** Smaller copies of `thumbnail` for the cards. */
  srcSet?: string;
  /** Tiny inline image painted under the card until `thumbnail` arrives. */
  preview?: string;
}

interface HeroParallaxProps {
  products: readonly HeroParallaxProduct[];
  eyebrow?: string;
  /** Keys that trigger the feature, shown as keycaps after the eyebrow. */
  eyebrowKeys?: readonly ShortcutKey[];
  title: string;
  description: string;
  headingId: string;
  /** Phones: name of the tap that opens a screenshot full size, and of its close button. */
  openLabel: string;
  closeLabel: string;
}

// Below Tailwind's md breakpoint the cards are 224px wide, too small to read, so a tap opens one.
const PHONE_QUERY = "(max-width: 767px)";
const subscribePhone = (onChange: () => void) => {
  const query = window.matchMedia(PHONE_QUERY);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
};
const getIsPhone = () => window.matchMedia(PHONE_QUERY).matches;
const getIsPhoneOnServer = () => false;

const SPRING_CONFIG = { stiffness: 300, damping: 30, bounce: 100 };
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
// Share of the scroll range the 3D tilt takes to flatten out.
const ENTRANCE_END = 0.18;

export function HeroParallax({
  products,
  eyebrow,
  eyebrowKeys,
  title,
  description,
  headingId,
  openLabel,
  closeLabel,
}: HeroParallaxProps) {
  const isPhone = useSyncExternalStore(subscribePhone, getIsPhone, getIsPhoneOnServer);
  const [viewing, setViewing] = useState<HeroParallaxProduct | null>(null);
  const onOpen = isPhone ? setViewing : undefined;
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  // Reveal on visibility rather than scroll progress, so the heading never stays hidden on
  // viewports that can't scroll far enough (or for renderers that don't scroll at all).
  const isHeaderInView = useInView(headerRef, { once: true, amount: 0.4 });
  // A late hydration (a fast fling past the section) would otherwise find the copy
  // already scrolled by, never see it enter, and leave it hidden for good.
  const [isHeaderPassed, setIsHeaderPassed] = useState(false);
  useEffect(() => {
    const header = headerRef.current;
    if (header && header.getBoundingClientRect().top < window.innerHeight * 0.6) {
      setIsHeaderPassed(true);
    }
  }, []);
  const isHeaderVisible = isHeaderInView || isHeaderPassed || Boolean(shouldReduceMotion);
  const firstRow = products.slice(0, 5);
  const secondRow = products.slice(5, 10);
  const thirdRow = products.slice(10, 15);
  // Phones show smaller cards, so a fourth row (a reshuffle of the same renders) fills the stage.
  const fourthRow = products.filter((_, index) => index % 3 === 0);
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
  // The 3D tilt plays once, on the first scroll down. Once the stage has flattened it stays
  // flat for the rest of the page view, so scrolling back up only slides the rows; a reload resets it.
  const hasEnteredRef = useRef(false);
  const entrance = useTransform(scrollYProgress, (progress) => {
    if (progress >= ENTRANCE_END) hasEnteredRef.current = true;
    return hasEnteredRef.current ? 1 : progress / ENTRANCE_END;
  });
  const rotateX = useSpring(useTransform(entrance, [0, 1], [15, 0]), SPRING_CONFIG);
  const rotateZ = useSpring(useTransform(entrance, [0, 1], [20, 0]), SPRING_CONFIG);
  const translateY = useSpring(useTransform(entrance, [0, 1], [-700, -300]), SPRING_CONFIG);
  return (
    <div
      ref={containerRef}
      className="hero-parallax relative flex h-auto flex-col self-auto overflow-hidden py-24 antialiased [perspective:1000px] md:h-auto md:py-40"
      data-hero-parallax
    >
      <HeroParallaxHeader
        ref={headerRef}
        eyebrow={eyebrow}
        eyebrowKeys={eyebrowKeys}
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
          onOpen={onOpen}
          openLabel={openLabel}
        />
        <ProductRow
          products={secondRow}
          translate={translateXReverse}
          shouldReduceMotion={Boolean(shouldReduceMotion)}
          onOpen={onOpen}
          openLabel={openLabel}
        />
        <ProductRow
          products={thirdRow}
          translate={translateX}
          reverse
          shouldReduceMotion={Boolean(shouldReduceMotion)}
          onOpen={onOpen}
          openLabel={openLabel}
          className="md:mb-0"
        />
        <ProductRow
          products={fourthRow}
          translate={translateXReverse}
          shouldReduceMotion={Boolean(shouldReduceMotion)}
          onOpen={onOpen}
          openLabel={openLabel}
          className="md:hidden"
          isLast
        />
      </motion.div>

      <Dialog open={viewing !== null} onOpenChange={(open) => !open && setViewing(null)}>
        <DialogContent
          aria-describedby={undefined}
          showCloseButton={false}
          className="max-w-[calc(100%-2rem)] gap-0 overflow-hidden rounded-[14px] p-1.5 sm:max-w-[calc(100%-2rem)]"
        >
          <DialogTitle className="sr-only">{viewing?.title}</DialogTitle>
          {viewing ? (
            <img
              src={viewing.thumbnail}
              alt={viewing.title}
              width="1280"
              height="800"
              className="block aspect-[8/5] h-auto w-full rounded-[8px]"
            />
          ) : null}
          <DialogClose
            className="absolute top-3 right-3 flex size-8 items-center justify-center rounded-full bg-white/90 text-[#1f2624] shadow-sm outline-none focus-visible:ring-2 focus-visible:ring-black/30"
            aria-label={closeLabel}
          >
            <XIcon aria-hidden="true" className="size-4" />
          </DialogClose>
        </DialogContent>
      </Dialog>
    </div>
  );
}

interface HeroParallaxHeaderProps {
  ref: Ref<HTMLDivElement>;
  eyebrow?: string;
  eyebrowKeys?: readonly ShortcutKey[];
  title: string;
  description: string;
  headingId: string;
  isRevealed: boolean;
}

function HeroParallaxHeader({
  ref,
  eyebrow,
  eyebrowKeys,
  title,
  description,
  headingId,
  isRevealed,
}: HeroParallaxHeaderProps) {
  const pair = splitTitlePair(title);
  const chineseCommaIndex = title.indexOf("，");
  const titleLead = chineseCommaIndex >= 0 ? title.slice(0, chineseCommaIndex + 1) : title;
  const titleRest = chineseCommaIndex >= 0 ? title.slice(chineseCommaIndex + 1).trimStart() : "";

  return (
    <div
      ref={ref}
      className="hero-parallax__header relative -top-20 left-0 z-10 mx-auto w-full max-w-5xl px-4 py-20 text-center md:px-8 md:py-40"
      data-hero-parallax-copy
    >
      {eyebrow ? (
        <motion.p
          className="home-eyebrow"
          initial={HERO_COPY_HIDDEN}
          animate={isRevealed ? HERO_COPY_VISIBLE : HERO_COPY_HIDDEN}
          transition={HERO_COPY_TRANSITION}
        >
          {eyebrow}
          {eyebrowKeys?.length ? <ShortcutKeys keys={eyebrowKeys} className="home-eyebrow__keys" /> : null}
        </motion.p>
      ) : null}
      <motion.h2
        id={headingId}
        className={cn("hero-parallax__title home-h2", titleRest && "hero-title-has-break")}
        initial={HERO_COPY_HIDDEN}
        animate={isRevealed ? HERO_COPY_VISIBLE : HERO_COPY_HIDDEN}
        transition={HERO_COPY_TRANSITION}
      >
        {pair ? (
          <>
            <span className="home-title-lead">{pair.lead}</span>{" "}
            <span className="home-title-accent">{pair.accent}</span>
          </>
        ) : (
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
        )}
      </motion.h2>
      <motion.p
        className="hero-parallax__description"
        initial={HERO_COPY_HIDDEN}
        animate={isRevealed ? HERO_COPY_VISIBLE : HERO_COPY_HIDDEN}
        transition={HERO_DESCRIPTION_TRANSITION}
      >
        {description.split("\n").map((line, index) => (
          <span key={index} className="home-copy-line">
            {line}
          </span>
        ))}
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
  className?: string;
  onOpen?: (product: HeroParallaxProduct) => void;
  openLabel: string;
}

function ProductRow({
  products,
  translate,
  reverse = false,
  isLast = false,
  shouldReduceMotion,
  className,
  onOpen,
  openLabel,
}: ProductRowProps) {
  const accessibleCopyIndex = reverse ? 1 : 0;
  const loopedProducts = Array.from({ length: LOOP_COPY_COUNT }, (_, copyIndex) =>
    products.map((product) => ({ product, copyIndex })),
  ).flat();

  return (
    <motion.div
      className={cn(
        "hero-parallax__row flex w-max gap-6 md:gap-20",
        reverse ? "flex-row-reverse" : "flex-row",
        reverse && "hero-parallax__row--reverse",
        isLast ? undefined : "mb-6 md:mb-20",
        className,
      )}
    >
      {loopedProducts.map(({ product, copyIndex }, index) => (
        <ProductCard
          key={`${product.title}-${product.thumbnail}-${index}`}
          product={product}
          translate={translate}
          shouldReduceMotion={shouldReduceMotion}
          isLoopCopy={copyIndex !== accessibleCopyIndex}
          onOpen={onOpen}
          openLabel={openLabel}
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
  onOpen?: (product: HeroParallaxProduct) => void;
  openLabel: string;
}

export function ProductCard({
  product,
  translate,
  shouldReduceMotion,
  isLoopCopy,
  onOpen,
  openLabel,
}: ProductCardProps) {
  // Every copy opens on a tap; only the accessible copy is a focusable button.
  const isButton = Boolean(onOpen) && !isLoopCopy;
  return (
    <motion.article
      // The screenshots are 1280x800, so 8/5 fills the card edge to edge. Phones get a
      // tighter radius: 12px on a 224px card cut into the bookmark bar along the top.
      className={cn(
        "relative aspect-[8/5] w-[14rem] shrink-0 overflow-hidden rounded-[8px] bg-card bg-cover bg-center md:w-[30rem] md:rounded-[var(--home-radius-md,12px)]",
        onOpen && "cursor-zoom-in",
      )}
      style={{
        x: shouldReduceMotion ? 0 : translate,
        backgroundImage: product.preview ? `url("${product.preview}")` : undefined,
      }}
      aria-hidden={isLoopCopy || undefined}
      data-hero-parallax-card
      onClick={onOpen ? () => onOpen(product) : undefined}
      role={isButton ? "button" : undefined}
      tabIndex={isButton ? 0 : undefined}
      aria-label={isButton ? `${openLabel}: ${product.title}` : undefined}
      onKeyDown={isButton ? (event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onOpen?.(product);
        }
      } : undefined}
    >
      <img
        src={product.thumbnail}
        srcSet={product.srcSet}
        // A failed load would print the alt text over the preview; screen readers still get it.
        className="absolute inset-0 size-full object-contain object-center text-transparent"
        alt={product.title}
        loading="lazy"
        decoding="async"
        sizes="(min-width: 768px) 480px, 224px"
      />
    </motion.article>
  );
}
