"use client";

import { useEffect, useState, useCallback } from "react";

interface PreloaderOptions {
  basePath: string;
  prefix: string;
  count: number;
  padLength?: number;
  extension?: string;
  startIndex?: number;
}

export function useImagePreloader({
  basePath,
  prefix,
  count,
  padLength = 3,
  extension = "jpg",
  startIndex = 1,
}: PreloaderOptions): {
  images: HTMLImageElement[];
  loadedCount: number;
  progress: number;
  isReady: boolean;
} {
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [loadedCount, setLoadedCount] = useState(0);
  const [isReady, setIsReady] = useState(false);

  const loadImages = useCallback(() => {
    const imgArray: HTMLImageElement[] = new Array(count);
    let loaded = 0;

    for (let i = 0; i < count; i++) {
      const frameNum = (startIndex + i).toString().padStart(padLength, "0");
      const src = `${basePath}/${prefix}${frameNum}.${extension}`;
      const img = new Image();

      img.onload = () => {
        loaded++;
        setLoadedCount(loaded);
        if (loaded === count) {
          setImages([...imgArray]);
          setIsReady(true);
        }
      };

      img.onerror = () => {
        loaded++;
        setLoadedCount(loaded);
        if (loaded === count) {
          setImages([...imgArray]);
          setIsReady(true);
        }
      };

      img.src = src;
      imgArray[i] = img;
    }
  }, [basePath, prefix, count, padLength, extension, startIndex]);

  useEffect(() => {
    loadImages();
  }, [loadImages]);

  return {
    images,
    loadedCount,
    progress: count > 0 ? loadedCount / count : 0,
    isReady,
  };
}
