"use client";

import { useEffect, useRef } from "react";

const VIDEO_URL = "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260328_065045_c44942da-53c6-4804-b734-f9e07fc22e08.mp4";

export function BackgroundVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let animationFrameId: number;
    const FADE_DURATION = 0.5; // seconds

    const handleTimeUpdate = () => {
      if (!video.duration || isNaN(video.duration)) return;
      const currentTime = video.currentTime;
      const duration = video.duration;

      // 0.5s Fade-in at start
      if (currentTime < FADE_DURATION) {
        video.style.opacity = (currentTime / FADE_DURATION).toString();
      } 
      // 0.5s Fade-out at end
      else if (duration - currentTime < FADE_DURATION) {
        video.style.opacity = Math.max(0, (duration - currentTime) / FADE_DURATION).toString();
      } 
      // Full opacity in between
      else {
        video.style.opacity = "1";
      }

      animationFrameId = requestAnimationFrame(handleTimeUpdate);
    };

    const handleEnded = () => {
      cancelAnimationFrame(animationFrameId);
      video.style.opacity = "0";
      // Wait 100ms then replay from 0
      setTimeout(() => {
        video.currentTime = 0;
        video.play().catch(() => {});
        animationFrameId = requestAnimationFrame(handleTimeUpdate);
      }, 100);
    };

    video.addEventListener("play", () => {
      animationFrameId = requestAnimationFrame(handleTimeUpdate);
    });
    video.addEventListener("ended", handleEnded);

    // Initial play attempt
    video.play().catch(() => {});

    return () => {
      cancelAnimationFrame(animationFrameId);
      video.removeEventListener("ended", handleEnded);
    };
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
      {/* Background Video */}
      <video
        ref={videoRef}
        src={VIDEO_URL}
        muted
        playsInline
        autoPlay
        className="absolute inset-0 w-full h-full object-cover transition-opacity duration-100"
        style={{ opacity: 0 }}
      />

      {/* Blurred Overlay Shape (Centered behind content) */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[984px] h-[527px] opacity-90 bg-gray-950 blur-[82px] pointer-events-none"
      />
    </div>
  );
}
