"use client";

import { useCallback, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

const morphTime = 1;
const cooldownTime = 1;

const useMorphingText = (texts: string[]) => {
  const textIndexRef = useRef(0);
  const morphRef = useRef(0);
  const cooldownRef = useRef(0);
  const timeRef = useRef(new Date());

  const text1Ref = useRef<HTMLSpanElement>(null);
  const text2Ref = useRef<HTMLSpanElement>(null);

  // Add responsive font size calculation
  const calculateFontSize = useCallback(() => {
    if (typeof window === "undefined") return "1rem";
    const width = window.innerWidth;
    if (width < 400) return "1.5rem";
    if (width < 640) return "1.50rem";
    if (width < 768) return "1.5rem";
    return "1.60rem";
  }, []);

  const setStyles = useCallback(
    (fraction: number) => {
      const [current1, current2] = [text1Ref.current, text2Ref.current];
      if (!current1 || !current2) return;

      // Apply responsive font size
      const fontSize = calculateFontSize();
      current1.style.fontSize = fontSize;
      current2.style.fontSize = fontSize;

      // Adjust blur based on screen size
      const blurIntensity = window.innerWidth < 640 ? 4 : 8;

      current2.style.filter = `blur(${Math.min(
        blurIntensity / fraction - blurIntensity,
        100
      )}px)`;
      current2.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;

      const invertedFraction = 1 - fraction;
      current1.style.filter = `blur(${Math.min(
        1 / invertedFraction - 5,
        100
      )}px)`;
      current1.style.opacity = `${Math.pow(invertedFraction, 0.7) * 100}%`;

      current1.textContent = texts[textIndexRef.current % texts.length];
      current2.textContent = texts[(textIndexRef.current + 1) % texts.length];
    },
    [texts, calculateFontSize]
  );

  const doMorph = useCallback(() => {
    morphRef.current -= cooldownRef.current;
    cooldownRef.current = 0;

    let fraction = morphRef.current / morphTime;

    if (fraction > 1) {
      cooldownRef.current = cooldownTime;
      fraction = 1;
    }

    setStyles(fraction);

    if (fraction === 1) {
      textIndexRef.current++;
    }
  }, [setStyles]);

  const doCooldown = useCallback(() => {
    morphRef.current = 0;
    const [current1, current2] = [text1Ref.current, text2Ref.current];
    if (current1 && current2) {
      current2.style.filter = "none";
      current2.style.opacity = "100%";
      current1.style.filter = "none";
      current1.style.opacity = "0%";
    }
  }, []);

  // Add resize handler
  useEffect(() => {
    const handleResize = () => {
      if (text1Ref.current && text2Ref.current) {
        const fontSize = calculateFontSize();
        text1Ref.current.style.fontSize = fontSize;
        text2Ref.current.style.fontSize = fontSize;
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Initial call

    return () => window.removeEventListener("resize", handleResize);
  }, [calculateFontSize]);

  useEffect(() => {
    let animationFrameId: number;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const newTime = new Date();
      const dt = (newTime.getTime() - timeRef.current.getTime()) / 1000;
      timeRef.current = newTime;

      cooldownRef.current -= dt;

      if (cooldownRef.current <= 0) doMorph();
      else doCooldown();
    };

    animate();
    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [doMorph, doCooldown]);

  return { text1Ref, text2Ref };
};

interface MorphingTextProps {
  className?: string;
  texts: string[];
}

const Texts: React.FC<Pick<MorphingTextProps, "texts">> = ({ texts }) => {
  const { text1Ref, text2Ref } = useMorphingText(texts);
  return (
    <>
      <span
        className="absolute inset-x-0 top-1/2 -translate-y-1/2 inline-block w-full"
        ref={text1Ref}
      />
      <span
        className="absolute inset-x-0 top-1/2 -translate-y-1/2 inline-block w-full"
        ref={text2Ref}
      />
    </>
  );
};

const SvgFilters: React.FC = () => (
  <svg id="filters" className="hidden" preserveAspectRatio="xMidYMid slice">
    <defs>
      <filter id="threshold">
        <feColorMatrix
          in="SourceGraphic"
          type="matrix"
          values="1 0 0 0 0
                  0 1 0 0 0
                  0 0 1 0 0
                  0 0 0 255 -140"
        />
      </filter>
    </defs>
  </svg>
);

const MorphingText: React.FC<MorphingTextProps> = ({ texts, className }) => (
  <div
    className={cn(
      "relative mx-auto h-8 w-full text-center font-sans font-bold leading-none [filter:url(#threshold)_blur(0.6px)]",
      className
    )}
  >
    <Texts texts={texts} />
    <SvgFilters />
  </div>
);

export default MorphingText;
