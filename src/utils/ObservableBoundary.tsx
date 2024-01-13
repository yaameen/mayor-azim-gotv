import { useEffect, useRef } from "react";
import { twMerge } from "tailwind-merge";

function debounce(func: Function, timeout = 300) {
  let timer: string | number | NodeJS.Timeout | undefined = undefined;
  return (...args: any[]) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      // @ts-ignore
      func.apply(this, args);
    }, timeout);
  };
}

type UserObserverProps = {
  onShown?: () => void;
  onHidden?: () => void;
  className?: string;
};
export default function ObservableBoundary(props: UserObserverProps) {
  const observerTarget = useRef(null);

  useEffect(() => {
    if (![props.onHidden || !props.onShown]) return;

    const obEl = observerTarget.current;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          props.onShown && debounce(props.onShown, 100)();
        } else {
          props.onHidden && debounce(props.onHidden, 100)();
        }
      },
      {
        threshold: 0,
        // rootMargin: "0px 0px 0px 0px",
        // root: null,
      }
    );

    if (obEl) {
      observer.observe(obEl);
    }

    return () => {
      if (obEl) {
        observer.unobserve(obEl);
        observer.disconnect();
      }
    };
  }, [observerTarget.current]);

  return (
    <div
      className={twMerge("h-4 bg-yellow-200 w-full", props.className)}
      ref={observerTarget}
    ></div>
  );
}
