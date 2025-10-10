import * as React from "react"

interface UseIntersectionOptions {
    threshold?: number
    rootMargin?: string
    once?: boolean
}

export function useIntersection(
    elementRef: React.RefObject<Element>,
    {
        threshold = 0,
        rootMargin = "0px",
        once = true,
    }: UseIntersectionOptions = {}
) {
    const [isVisible, setIsVisible] = React.useState(false)

    React.useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true)
                    if (once && elementRef.current) {
                        observer.unobserve(elementRef.current)
                    }
                } else if (!once) {
                    setIsVisible(false)
                }
            },
            {
                threshold,
                rootMargin,
            }
        )

        const element = elementRef.current
        if (element) {
            observer.observe(element)
        }

        return () => {
            if (element) {
                observer.unobserve(element)
            }
        }
    }, [elementRef, threshold, rootMargin, once])

    return isVisible
}
