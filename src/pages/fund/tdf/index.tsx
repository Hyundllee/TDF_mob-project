import { useCallback, useLayoutEffect, useRef, useState } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import HybridFullPage, {
  type HybridFullPageHandle,
} from '@/components/fund/tdf/HybridFullPage'
import SectionNav from '@/components/fund/tdf/SectionNav'
import TdfHero from '@/components/fund/tdf/TdfHero'
import {
  GlidePathSlide,
  GlobalActiveSlide,
  GlobalEmpSlide,
  KoreaEmpSlide,
  QnaSlide,
  TdfOverviewSlide,
} from '@/components/fund/tdf/slides'
import '@/styles/pages/fund/tdf/index.scss'

export default function TdfPage() {
  const fullPageRef = useRef<HybridFullPageHandle>(null)
  const [introState, setIntroState] = useState({ index: 0, locked: true })

  useLayoutEffect(() => {
    const className = 'tdf-mobile-page'
    document.documentElement.classList.add(className)
    document.body.classList.add(className)

    return () => {
      document.documentElement.classList.remove(className)
      document.body.classList.remove(className)
    }
  }, [])

  const handleIntroState = useCallback((index: number, locked: boolean) => {
    setIntroState({ index, locked })
  }, [])

  const handleSectionSelect = useCallback((id: string) => {
    if (id === 'tdf-overview') {
      fullPageRef.current?.showSlide(1)
      return
    }

    fullPageRef.current?.releaseTo(id)
  }, [])

  const introSlides = [
    <TdfHero key="hero" />,
    <TdfOverviewSlide
      key="people"
      eyebrow="TDF란?"
      title="20대의 투자와 60대의 투자, 같아도 괜찮을까요?"
      variant="people"
    />,
    <TdfOverviewSlide
      key="allocation"
      eyebrow="TDF란?"
      title="20대의 투자와 60대의 투자, 같아도 괜찮을까요?"
      variant="allocation"
    />,
    <TdfOverviewSlide
      key="definition"
      eyebrow="TDF란?"
      title="20대의 투자와 60대의 투자, 같아도 괜찮을까요?"
      variant="definition"
    />,
  ]

  return (
    <div className="tdf-mobile">
      <Header />
      <SectionNav
        visible={introState.index > 0 || !introState.locked}
        introLocked={introState.locked}
        onSelect={handleSectionSelect}
      />

      <HybridFullPage ref={fullPageRef} slides={introSlides} onStateChange={handleIntroState} />

      <main className="tdf-flow" aria-label="삼성 TDF 상세 정보">
        <section className="tdf-flow__section" id="tdf-overview">
          <TdfOverviewSlide
            eyebrow="TDF란?"
            title="알아서 관리하는 나의 생애주기 투자"
            variant="features"
          />
        </section>

        <section className="tdf-flow__section" id="global-active">
          <GlobalActiveSlide
            eyebrow="글로벌 액티브 TDF"
            title="오랜 경험으로 든든하게, 세계에 나눠 담는 내 자산"
            variant="history"
          />
          <GlobalActiveSlide
            eyebrow="글로벌 액티브 TDF"
            title="나의 은퇴 시점에 따른 자산배분"
            variant="glide"
          />
          <GlobalActiveSlide
            eyebrow="글로벌 액티브 TDF"
            title="삼성 글로벌 액티브 TDF만의 운용 전략"
            variant="features"
          />
        </section>

        <section className="tdf-flow__section" id="global-emp">
          <GlobalEmpSlide
            eyebrow="글로벌 EMP TDF"
            title="전 세계 분산투자! 글로벌 대표 ETF로 완성!"
            variant="intro"
          />
          <GlobalEmpSlide
            eyebrow="글로벌 EMP TDF"
            title="삼성 글로벌 EMP TDF만의 운용 전략"
            variant="features"
          />
        </section>

        <section className="tdf-flow__section" id="korea-emp">
          <KoreaEmpSlide
            eyebrow="코리아 EMP TDF"
            title="국내 자산배분으로 한국인의 생애주기에 최적화된 TDF"
            variant="intro"
          />
          <KoreaEmpSlide
            eyebrow="코리아 EMP TDF"
            title="삼성 코리아 EMP TDF만의 운용 전략"
            variant="features"
          />
        </section>

        <section className="tdf-flow__section" id="glide-path">
          <GlidePathSlide
            eyebrow="글로벌 액티브/EMP TDF 글라이드 패스"
            title="시간이 지나면 내 자산은 어떻게 변할까요?"
          />
        </section>

        <section className="tdf-flow__section tdf-flow__section--qna" id="qna">
          <QnaSlide />
        </section>
      </main>
      <Footer />
    </div>
  )
}
