import React, { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, Music, Award, Coffee, Flame, Flower, Users, Mic, ChevronLeft, ChevronRight } from 'lucide-react'
import { Slider } from "@/components/ui/slider"

const AgendaItems = [
  { startTime: "8:00", endTime: "9:00", description: "Registration", icon: Users },
  { startTime: "9:00", endTime: "10:15", description: "First Phase of 2nd Round", icon: Award },
  { startTime: "10:30", endTime: "11:30", description: "Second Phase of 2nd Round", icon: Award },
  { startTime: "11:30", endTime: "12:15", description: "Finalization of Second Round", icon: Award },
  { startTime: "12:25", endTime: "13:10", description: "Refreshments", icon: Coffee },
  { startTime: "13:10", endTime: "13:30", description: "Ushering schools to Kularathna Hall", icon: Users },
  { startTime: "13:30", endTime: "13:45", description: "Lighting of Oil Lamp", icon: Flame },
  { startTime: "13:45", endTime: "13:55", description: "Religious Observances / National Anthem / School Anthem", icon: Flower },
  { startTime: "13:55", endTime: "14:00", description: "Welcome Speech", icon: Mic },
  { startTime: "14:00", endTime: "14:05", description: "Trailer and Light Show", icon: Music },
  { startTime: "14:05", endTime: "14:45", description: "Semi Final 01", icon: Award },
  { startTime: "14:45", endTime: "14:55", description: "MIC Speech", icon: Mic },
  { startTime: "14:55", endTime: "15:10", description: "Entertainment Item 01 - Music", icon: Music },
  { startTime: "15:10", endTime: "15:20", description: "Entertainment Item 02 - Dance", icon: Music },
  { startTime: "15:20", endTime: "15:30", description: "Principal or Deputy Principal Speech", icon: Mic },
  { startTime: "15:30", endTime: "15:40", description: "Awards for Intra school competitions", icon: Award },
  { startTime: "15:40", endTime: "16:10", description: "Chief Guest Speech", icon: Mic },
  { startTime: "16:10", endTime: "16:40", description: "Final Round 01", icon: Award },
  { startTime: "16:40", endTime: "17:00", description: "Entertainment Item 02", icon: Music },
  { startTime: "17:00", endTime: "17:10", description: "Awarding Ceremony", icon: Award },
  { startTime: "17:10", endTime: "17:15", description: "Vote of Thanks", icon: Mic },
]

interface ScrollTimeout extends Window {
  scrollTimeout?: number | NodeJS.Timeout;
}

declare let window: ScrollTimeout;

export default function Component() {
  const [isScrolling, setIsScrolling] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const scrollContainerRef = useRef<HTMLDivElement | null>(null)

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleWheel = (e: WheelEvent) => {
    if (scrollContainerRef.current) {
      e.preventDefault()
      scrollContainerRef.current.scrollLeft += e.deltaY * 3
      setIsScrolling(true)
      updateScrollProgress()
      clearTimeout(window.scrollTimeout)
      window.scrollTimeout = setTimeout(() => setIsScrolling(false), 300)
    }
  }

  const updateScrollProgress = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current
      const progress = (scrollLeft / (scrollWidth - clientWidth)) * 100
      setScrollProgress(progress)
    }
  }

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -600 : 600
      scrollContainerRef.current.scrollBy({
        left: scrollAmount,
        behavior: 'smooth'
      })
      setTimeout(updateScrollProgress, 300)
    }
  }

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current
    if (scrollContainer) {
      scrollContainer.addEventListener('wheel', handleWheel, { passive: false })
      scrollContainer.addEventListener('scroll', updateScrollProgress)
    }
    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener('wheel', handleWheel)
        scrollContainer.removeEventListener('scroll', updateScrollProgress)
      }
    }
  }, [handleWheel])

  return (
    <Card className="w-full max-w-7xl mx-auto bg-black text-white overflow-hidden border border-zinc-800">
      <CardHeader className="bg-zinc-900/50 py-6">
        <CardTitle className="text-4xl font-bold text-center text-white">
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            SACCMCT '25 - Event Agenda
          </motion.div>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="flex flex-col gap-4">
          <div className="relative">
            <div 
              ref={scrollContainerRef}
              className="flex overflow-x-auto gap-4 pb-4 scroll-smooth scrollbar-hide"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {AgendaItems.map((item, index) => (
                <motion.div
                  key={`${item.startTime}-${index}`}
                  initial={isScrolling ? { opacity: 0, x: 50 } : false}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex-shrink-0 w-[280px]"
                >
                  <div className="flex flex-col h-full p-4 rounded-lg border border-zinc-800 bg-zinc-900/50 backdrop-blur-sm hover:bg-zinc-800/50 transition-all duration-300">
                    <div className="flex items-start space-x-3 mb-3">
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center">
                        <item.icon className="h-5 w-5 text-white/80" />
                      </div>
                      <div className="flex-grow">
                        <p className="text-sm font-medium text-white leading-tight">{item.description}</p>
                      </div>
                    </div>
                    <Badge variant="outline" className="mt-auto self-start text-zinc-300 border-zinc-700 text-xs">
                      <Clock className="mr-1 h-3 w-3" />
                      {item.startTime} - {item.endTime}
                    </Badge>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <button 
              onClick={() => scroll('left')}
              className="absolute left-0 top-1/2 -translate-y-1/2 -ml-4 bg-zinc-800/80 hover:bg-zinc-700 p-2 rounded-full backdrop-blur-sm transition-all hidden md:block"
            >
              <ChevronLeft className="h-6 w-6 text-white/80" />
            </button>
            
            <button 
              onClick={() => scroll('right')}
              className="absolute right-0 top-1/2 -translate-y-1/2 -mr-4 bg-zinc-800/80 hover:bg-zinc-700 p-2 rounded-full backdrop-blur-sm transition-all hidden md:block"
            >
              <ChevronRight className="h-6 w-6 text-white/80" />
            </button>
          </div>

          <div className="mt-2 px-4">
            <Slider 
              value={[scrollProgress]} 
              max={100}
              step={1}
              className="w-full"
              disabled
            />
            <div className="flex justify-between text-xs text-zinc-500 mt-2">
              <span>8:00 AM</span>
              <span>5:15 PM</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}