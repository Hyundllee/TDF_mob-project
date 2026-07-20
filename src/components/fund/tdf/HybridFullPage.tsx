import {
  forwardRef,
  type ReactNode,
  useCallback,
  useEffect,
  useImperativeHandle,
  useLayoutEffect,
  useRef,
  useState,
} from 'react'

export interface HybridFullPageHandle {
  showSlide: (index: number) => void
  releaseTo: (targetId: string) => void
}

interface HybridFullPageProps {
  slides: ReactNode[]
  onStateChange?: (index: number, locked: boolean) => void
}

const TRANSITION_TIME = 720
const WHEEL_THRESHOLD = 8

function resetDocumentScroll() {
  document.documentElement.scrollTo({ top: 0, behavior: 'auto' })
  document.body.scrollTo({ top: 0, behavior: 'auto' })
  window.scrollTo({ top: 0, behavior: 'auto' })
}

const HybridFullPage = forwardRef<HybridFullPageHandle, HybridFullPageProps>(
  function HybridFullPage({ slides, onStateChange }, ref) {
    const [activeIndex, setActiveIndex] = useState(0)
    const [locked, setLocked] = useState(true)
    const movingRef = useRef(false)
    const transitionTimerRef = useRef<number | null>(null)
    const sectionRef = useRef<HTMLElement>(null)
    const touchStartRef = useRef<number | null>(null)

    const holdTransition = useCallback(() => {
      movingRef.current = true
      if (transitionTimerRef.current !== null) {
        window.clearTimeout(transitionTimerRef.current)
      }
      transitionTimerRef.current = window.setTimeout(() => {
        movingRef.current = false
        transitionTimerRef.current = null
      }, TRANSITION_TIME)
    }, [])

    const showSlide = useCallback(
      (index: number) => {
        const safeIndex = Math.min(Math.max(index, 0), slides.length - 1)
        holdTransition()
        setActiveIndex(safeIndex)
        setLocked(true)
        resetDocumentScroll()
      },
      [holdTransition, slides.length],
    )

    const releaseTo = useCallback(
      (targetId: string) => {
        holdTransition()
        document.documentElement.classList.remove('tdf-intro-locked')
        document.body.classList.remove('tdf-intro-locked')
        setLocked(false)
        window.setTimeout(() => {
          const target = document.getElementById(targetId)
          if (!target) return
          target.scrollIntoView({ block: 'start', behavior: 'smooth' })
        }, 32)
      },
      [holdTransition],
    )

    useImperativeHandle(ref, () => ({ showSlide, releaseTo }), [releaseTo, showSlide])

    useLayoutEffect(() => {
      const previousScrollRestoration = window.history.scrollRestoration
      window.history.scrollRestoration = 'manual'
      resetDocumentScroll()
      const frame = window.requestAnimationFrame(resetDocumentScroll)

      return () => {
        window.cancelAnimationFrame(frame)
        window.history.scrollRestoration = previousScrollRestoration
      }
    }, [])

    useEffect(() => {
      const className = 'tdf-intro-locked'
      document.documentElement.classList.toggle(className, locked)
      document.body.classList.toggle(className, locked)
      if (locked) resetDocumentScroll()
      onStateChange?.(activeIndex, locked)

      return () => {
        document.documentElement.classList.remove(className)
        document.body.classList.remove(className)
      }
    }, [activeIndex, locked, onStateChange])

    const move = useCallback(
      (direction: 1 | -1) => {
        if (movingRef.current) return

        if (!locked) {
          if (direction < 0 && window.scrollY <= 2) {
            showSlide(slides.length - 1)
          }
          return
        }

        if (direction > 0 && activeIndex === slides.length - 1) {
          releaseTo('tdf-overview')
          return
        }

        const nextIndex = activeIndex + direction
        if (nextIndex >= 0 && nextIndex < slides.length) {
          holdTransition()
          setActiveIndex(nextIndex)
        }
      },
      [activeIndex, holdTransition, locked, releaseTo, showSlide, slides.length],
    )

    useEffect(() => {
      const handleWheel = (event: WheelEvent) => {
        if (Math.abs(event.deltaY) < WHEEL_THRESHOLD) return
        if (locked || (!locked && event.deltaY < 0 && window.scrollY <= 2)) {
          event.preventDefault()
        }
        move(event.deltaY > 0 ? 1 : -1)
      }

      const handleTouchStart = (event: TouchEvent) => {
        touchStartRef.current = event.touches[0]?.clientY ?? null
      }

      const handleTouchMove = (event: TouchEvent) => {
        if (locked) event.preventDefault()
      }

      const handleTouchEnd = (event: TouchEvent) => {
        const startY = touchStartRef.current
        const endY = event.changedTouches[0]?.clientY
        touchStartRef.current = null
        if (startY == null || endY == null || Math.abs(startY - endY) < 24) return
        move(startY > endY ? 1 : -1)
      }

      const handleKeyDown = (event: KeyboardEvent) => {
        if (!['ArrowDown', 'ArrowUp', 'PageDown', 'PageUp'].includes(event.key)) return
        if (locked) event.preventDefault()
        move(event.key === 'ArrowDown' || event.key === 'PageDown' ? 1 : -1)
      }

      window.addEventListener('wheel', handleWheel, { passive: false })
      window.addEventListener('touchstart', handleTouchStart, { passive: true })
      window.addEventListener('touchmove', handleTouchMove, { passive: false })
      window.addEventListener('touchend', handleTouchEnd, { passive: true })
      window.addEventListener('keydown', handleKeyDown)

      return () => {
        window.removeEventListener('wheel', handleWheel)
        window.removeEventListener('touchstart', handleTouchStart)
        window.removeEventListener('touchmove', handleTouchMove)
        window.removeEventListener('touchend', handleTouchEnd)
        window.removeEventListener('keydown', handleKeyDown)
      }
    }, [locked, move])

    return (
      <section className="mo-fullpage" id="tdf-top" ref={sectionRef} aria-label="삼성 TDF 소개">
        {slides.map((slide, index) => (
          <article
            key={index}
            className={`mo-fullpage__slide${index === activeIndex ? ' is-active' : ''}`}
            aria-hidden={index !== activeIndex}
          >
            {slide}
          </article>
        ))}
      </section>
    )
  },
)

export default HybridFullPage
