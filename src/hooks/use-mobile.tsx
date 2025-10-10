import * as React from "react"

const breakpoints = {
  mobile: 640,    // sm
  tablet: 768,    // md
  laptop: 1024,   // lg
  desktop: 1280,  // xl
} as const

type Breakpoint = keyof typeof breakpoints

export function useBreakpoint(breakpoint: Breakpoint) {
  const [isBelow, setIsBelow] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${breakpoints[breakpoint] - 1}px)`)
    const onChange = () => {
      setIsBelow(mql.matches)
    }
    mql.addEventListener("change", onChange)
    setIsBelow(mql.matches)
    return () => mql.removeEventListener("change", onChange)
  }, [breakpoint])

  return !!isBelow
}

export function useIsMobile() {
  return useBreakpoint("mobile")
}

export function useIsTablet() {
  return useBreakpoint("tablet")
}

export function useIsLaptop() {
  return useBreakpoint("laptop")
}
