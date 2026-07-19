import { useEffect, useRef, useState } from 'react'
import { heroImages, images } from '../../../assets/images/fund/tdf'

const stages = [
  { age: '20', progress: 0.08, left: '사회초년생', leftIcon: '🌱', right: '성장을 위한 투자에 집중', rightIcon: images.heroIcons.growth },
  { age: '30', progress: 0.27, left: '자산성장기', leftIcon: images.heroIcons.plant, right: '공격적인 자산 투자 도전', rightIcon: images.heroIcons.rocket },
  { age: '40', progress: 0.48, left: '자산안정기', leftIcon: images.heroIcons.pine, right: '노후를 위한 안전자산 비중 확대', rightIcon: images.heroIcons.safety },
  { age: '50', progress: 0.72, left: '자산운용기', leftIcon: images.heroIcons.tree, right: '축적된 자산을 균형 있게 운용', rightIcon: images.heroIcons.balance },
  { age: '60', progress: 0.92, left: '자산활용기', leftIcon: images.heroIcons.apple, right: '은퇴 후 안정적인 현금흐름', rightIcon: images.heroIcons.cash },
]

function BadgeIcon({ source }: { source: string }) {
  return source.startsWith('/') || source.startsWith('data:')
    ? <img src={source} alt="" />
    : <>{source}</>
}

export default function TdfHero() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [point, setPoint] = useState({ x: 25, y: 17 })
  const pathRef = useRef<SVGPathElement>(null)
  const progressRef = useRef(stages[0].progress)
  const active = stages[activeIndex]

  useEffect(() => {
    const path = pathRef.current
    if (!path) return
    const start = progressRef.current
    const target = active.progress
    const length = path.getTotalLength()
    const startedAt = performance.now()
    let frame = 0

    const animate = (now: number) => {
      const ratio = Math.min((now - startedAt) / 680, 1)
      const eased = 0.5 - Math.cos(Math.PI * ratio) / 2
      const progress = start + (target - start) * eased
      const next = path.getPointAtLength(length * progress)
      progressRef.current = progress
      setPoint({ x: next.x, y: next.y })
      if (ratio < 1) frame = requestAnimationFrame(animate)
    }

    frame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(frame)
  }, [active.progress])

  return (
    <div className="tdf-hero">
      <header className="tdf-hero__heading">
        <h1>SAMSUNG <em>TDF</em></h1>
        <p>투자는 평생 같은 방식으로 해야 할까요?<br />생애주기에 따라 투자 비중도 함께 변화합니다.</p>
      </header>

      <div className="tdf-hero__scene" aria-live="polite">
        <svg viewBox="0 0 360 104" preserveAspectRatio="none" aria-hidden="true">
          <defs>
            <linearGradient id="mobile-hero-curve" x1="0" x2="1">
              <stop stopColor="#1454ff" stopOpacity="0" />
              <stop offset=".22" stopColor="#1454ff" />
              <stop offset=".72" stopColor="#55d6c4" />
              <stop offset="1" stopColor="#55d6c4" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path ref={pathRef} d="M0 14 C92 9 129 25 186 54 C245 84 306 99 360 97" fill="none" stroke="url(#mobile-hero-curve)" strokeWidth="2" />
          <circle cx={point.x} cy={point.y} r="7" fill="#fff" stroke="#1763f5" strokeWidth="4" />
        </svg>
        <img className="tdf-hero__image" key={active.age} src={heroImages[active.age]} alt={`${active.age}대 TDF 투자 이미지`} />
        <div className="tdf-hero__badge tdf-hero__badge--left"><span><BadgeIcon source={active.leftIcon} /></span><b>{active.left}</b></div>
        <div className="tdf-hero__badge tdf-hero__badge--right"><span><BadgeIcon source={active.rightIcon} /></span><b>{active.right}</b></div>
      </div>

      <div className="tdf-hero__ages" aria-label="생애주기 선택">
        {stages.map((stage, index) => (
          <button
            key={stage.age}
            type="button"
            className={index === activeIndex ? 'is-active' : ''}
            aria-pressed={index === activeIndex}
            onClick={() => setActiveIndex(index)}
          >
            {stage.age}대
          </button>
        ))}
      </div>
      <span className="tdf-hero__scroll" aria-hidden="true"><i /></span>
    </div>
  )
}
