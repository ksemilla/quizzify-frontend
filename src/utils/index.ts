import { useEffect, useRef } from "react";

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