"use client"

import * as React from "react"
import * as SliderPrimitive from "@radix-ui/react-slider"

import { cn } from "@/lib/utils"
import { useSlider } from "@/contexts/SliderContext"

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => {
  const { value, setValue } = useSlider()

  return (
    <SliderPrimitive.Root
      ref={ref}
      className={cn(
        "relative flex touch-none select-none items-center",
        className
      )}
      value={[value]}
      onValueChange={([newValue]) => setValue(newValue)}
      {...props}
    >
      <SliderPrimitive.Track className="relative h-2 w-full grow overflow-hidden rounded-full bg-secondary">
        <SliderPrimitive.Range className="absolute h-full bg-[#2c5f34dd]" />
      </SliderPrimitive.Track>
      <SliderPrimitive.Thumb className="block h-4 w-4 rounded-full border-2 border-primary bg-background ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50" />
    </SliderPrimitive.Root>
  )
})
Slider.displayName = SliderPrimitive.Root.displayName

export { Slider }