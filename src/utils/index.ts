import { useState, useEffect, useRef } from "react";

export const classNames = (...classes: string[]) => {
  return classes.filter(Boolean).join(' ')
}

export const useIsFirstRender = () => {
  const isMountRef = useRef(true);
  useEffect(() => {
    isMountRef.current = false;
  }, []);
  return isMountRef.current;
};

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height
  };
}

export function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowDimensions;
}

export const useContainerWidth = (id: string) => {
  const { width } = useWindowDimensions()
  const [containerWidth, setContainerWidth] = useState<number>(0)
  useEffect(()=>{
    setContainerWidth(document.getElementById(id)?.clientWidth ?? 0)
  }, [width])
  return containerWidth
}