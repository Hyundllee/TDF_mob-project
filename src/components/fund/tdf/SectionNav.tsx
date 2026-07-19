import { useEffect, useRef, useState } from 'react'

export const sectionItems = [
  { id: 'tdf-overview', label: 'TDF란?' },
  { id: 'global-active', label: '글로벌 액티브 TDF' },
  { id: 'global-emp', label: '글로벌 EMP TDF' },
  { id: 'korea-emp', label: '코리아 EMP TDF' },
  { id: 'glide-path', label: '글라이드 패스' },
]

interface SectionNavProps {
  visible: boolean
  introLocked: boolean
  onSelect: (id: string) => void
}

export default function SectionNav({ visible, introLocked, onSelect }: SectionNavProps) {
  const [activeId, setActiveId] = useState(sectionItems[0].id)
  const navRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (introLocked) {
      setActiveId(sectionItems[0].id)
      return
    }

    let frame = 0
    const updateActiveSection = () => {
      window.cancelAnimationFrame(frame)
      frame = window.requestAnimationFrame(() => {
        const activationLine = 180
        let nextActiveId = sectionItems[0].id

        sectionItems.forEach(({ id }) => {
          const section = document.getElementById(id)
          if (section && section.getBoundingClientRect().top <= activationLine) {
            nextActiveId = id
          }
        })

        setActiveId(nextActiveId)
      })
    }

    updateActiveSection()
    window.addEventListener('scroll', updateActiveSection, { passive: true })

    return () => {
      window.cancelAnimationFrame(frame)
      window.removeEventListener('scroll', updateActiveSection)
    }
  }, [introLocked])

  useEffect(() => {
    const active = navRef.current?.querySelector<HTMLElement>(`[data-section="${activeId}"]`)
    const nav = navRef.current
    if (!active || !nav) return

    nav.scrollTo({
      left: active.offsetLeft - nav.clientWidth / 2 + active.clientWidth / 2,
      behavior: 'smooth',
    })
  }, [activeId])

  return (
    <nav className={`tdf-section-nav${visible ? ' is-visible' : ''}`} ref={navRef} aria-label="TDF 서브메뉴">
      {sectionItems.map((item, index) => (
        <button
          type="button"
          key={item.id}
          data-section={item.id}
          className={item.id === activeId ? 'is-active' : ''}
          aria-current={item.id === activeId ? 'location' : undefined}
          onClick={() => {
            setActiveId(item.id)
            onSelect(item.id)
          }}
        >
          <span>{String(index + 1).padStart(2, '0')}</span>
          {item.label}
        </button>
      ))}
    </nav>
  )
}
