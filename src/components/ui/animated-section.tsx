import * as React from "react"
import { useIntersection } from "@/hooks/use-intersection"
import { cn } from "@/lib/utils"

interface AnimatedSectionProps extends React.HTMLAttributes<HTMLElement> {
    as?: React.ElementType
    delay?: number
    threshold?: number
    animation?: "fade-up" | "fade-down" | "fade-left" | "fade-right" | "zoom-in" | "zoom-out"
}

export function AnimatedSection({
    as: Component = "section",
    children,
    className,
    delay = 0,
    threshold = 0.1,
    animation = "fade-up",
    ...props
}: AnimatedSectionProps) {
    const ref = React.useRef<HTMLElement>(null)
    const isVisible = useIntersection(ref, { threshold })

    const baseStyle = "transition-all duration-700"
    const animations = {
        "fade-up": "opacity-0 translate-y-8",
        "fade-down": "opacity-0 -translate-y-8",
        "fade-left": "opacity-0 translate-x-8",
        "fade-right": "opacity-0 -translate-x-8",
        "zoom-in": "opacity-0 scale-95",
        "zoom-out": "opacity-0 scale-105",
    }

    const visibleStyle = "opacity-100 translate-x-0 translate-y-0 scale-100"
    const animationStyle = animations[animation]

    return (
        <Component
            ref={ref}
            className={cn(
                baseStyle,
                isVisible ? visibleStyle : animationStyle,
                className
            )}
            style={{
                transitionDelay: `${delay}ms`,
            }}
            {...props}
        >
            {children}
        </Component>
    )
}
