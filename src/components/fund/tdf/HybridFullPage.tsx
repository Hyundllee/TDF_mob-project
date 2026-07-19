import {
  forwardRef,
  type ReactNode,
  useCallback,
  useEffect,
  useImperativeHandle,
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

const HybridFullPage = forwardRef<HybridFullPageHandle, HybridFullPageProps>(
  function HybridFullPage({ slides, onStateChange }, ref) {
    const [activeIndex, setActiveIndex] = useState(0)
    const [locked, setLocked] = useState(true)
    const movingRef = useRef(false)
    const sectionRef = useRef<HTMLElement>(null)
    const touchStartRef = useRef<number | null>(null)

    const holdTransition = useCallback(() => {
      movingRef.current = true
      window.setTimeout(() => {
        movingRef.current = false
      }, TRANSITION_TIME)
    }, [])

    const showSlide = useCallback(
      (index: number) => {
        if (movingRef.current) return
        const safeIndex = Math.min(Math.max(index, 0), slides.length - 1)
        holdTransition()
        setActiveIndex(safeIndex)
        setLocked(true)
        window.scrollTo({ top: 0, behavior: 'auto' })
      },
      [holdTransition, slides.length],
    )

    const releaseTo = useCallback(
      (targetId: string) => {
        if (movingRef.current) return
        holdTransition()
        setLocked(false)
        window.requestAnimationFrame(() => {
          window.requestAnimationFrame(() => {
            document.getElementById(targetId)?.scrollIntoView({
              block: 'start',
              behavior: 'auto',
            })
          })
        })
      },
      [holdTransition],
    )

    useImperativeHandle(ref, () => ({ showSlide, releaseTo }), [releaseTo, showSlide])

    useEffect(() => {
      const className = 'tdf-intro-locked'
      document.documentElement.classList.toggle(className, locked)
      document.body.classList.toggle(className, locked)
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
          const introHeight = sectionRef.current?.offsetHeight ?? window.innerHeight
          if (direction < 0 && window.scrollY <= introHeight + 2) {
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
        if (locked || (event.deltaY < 0 && window.scrollY <= window.innerHeight + 2)) {
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
