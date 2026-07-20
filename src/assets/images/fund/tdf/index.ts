const getWebappBasePath = () => {
  if (typeof document === 'undefined') return ''

  const scriptUrls = Array.from(document.scripts)
    .map((script) => script.src)
    .filter(Boolean)
    .reverse()

  for (const scriptUrl of scriptUrls) {
    const url = new URL(scriptUrl, window.location.href)
    const marker = ['/scripts/', '/assets/', '/src/'].find((path) =>
      url.pathname.includes(path),
    )

    if (marker) {
      return url.pathname.slice(0, url.pathname.indexOf(marker))
    }
  }

  return ''
}

const imageBasePath = `${getWebappBasePath()}/assets/images/fund/tdf`

const imagePath = (fileName: string) => `${imageBasePath}/${fileName}`

export const tdfHeroImages: Record<string, string> = {
  '20': imagePath('tdf-20.svg'),
  '30': imagePath('tdf-30.svg'),
  '40': imagePath('tdf-40.svg'),
  '50': imagePath('tdf-50.svg'),
  '60': imagePath('tdf-60.svg'),
}

export const tdfHeroIcons = {
  apple: imagePath('icon-apple.svg'),
  balance: imagePath('icon-balance.svg'),
  cash: imagePath('icon-cash.svg'),
  growth: imagePath('icon-growth.svg'),
  pine: imagePath('icon-pine.svg'),
  plant: imagePath('icon-plant.svg'),
  rocket: imagePath('icon-rocket.svg'),
  safety: imagePath('icon-safety.svg'),
  tree: imagePath('icon-tree.svg'),
}

export const tdfContentImages = {
  characters: {
    youngNeutral: imagePath('character-young-neutral.svg'),
    youngTalking: imagePath('character-young-talking.svg'),
    seniorNeutral: imagePath('character-senior-neutral.svg'),
    seniorTalking: imagePath('character-senior-talking.svg'),
  },
  glidePathArea: imagePath('glide-path-area.png'),
  calloutArrow: imagePath('callout-arrow.svg'),
  portraits: {
    warrenBuffett: imagePath('portrait-warren-buffett.svg'),
    johnBogle: imagePath('portrait-john-bogle.svg'),
  },
  timeline: {
    arrow: imagePath('timeline-arrow.svg'),
    blueDot: imagePath('timeline-dot-blue.svg'),
    magentaDot: imagePath('timeline-dot-magenta.svg'),
  },
  icons: {
    aiStrategy: imagePath('icon-ai-strategy.svg'),
    allocationSystem: imagePath('icon-allocation-system.svg'),
    calendarChart: imagePath('icon-calendar-chart.svg'),
    coin: imagePath('icon-coin.svg'),
    glideAirplane: imagePath('icon-glide-airplane.svg'),
    home: imagePath('icon-home.svg'),
    pieChart: imagePath('icon-pie-chart.svg'),
    rebalancingScale: imagePath('icon-rebalancing-scale.svg'),
    wonPuzzle: imagePath('icon-won-puzzle.svg'),
    globalAllocation: imagePath('icon-global-allocation.svg'),
  },
  overviewCallout: imagePath('overview-callout.svg'),
  bubbleBox: imagePath('bubble-box.svg'),
  allocationArrows: {
    up: imagePath('arrow-up.svg'),
    down: imagePath('arrow-down.svg'),
  },
  allocationDetailBracket: imagePath('allocation-detail-bracket.svg'),
  allocationChart: {
    slider: imagePath('allocation-slider.svg'),
    edgeFade: imagePath('allocation-edge-fade.svg'),
  },
  qnaControls: {
    expandDark: imagePath('qna-expand-dark.svg'),
    expandLight: imagePath('qna-expand-light.svg'),
    collapse: imagePath('qna-collapse.svg'),
  },
  comparison: {
    arrow: imagePath('korea-comparison-arrow.svg'),
    flag: imagePath('korea-comparison-flag.svg'),
    initial: {
      global: imagePath('korea-comparison-initial-global.svg'),
      korea: imagePath('korea-comparison-initial-korea.svg'),
    },
    investor: {
      global: imagePath('korea-comparison-investor-global.svg'),
      korea: imagePath('korea-comparison-investor-korea.svg'),
    },
    retirement: {
      global: imagePath('korea-comparison-retirement-global.svg'),
      korea: imagePath('korea-comparison-retirement-korea.svg'),
    },
    target: {
      global: imagePath('korea-comparison-target-global.svg'),
      korea: imagePath('korea-comparison-target-korea.svg'),
    },
  },
}
