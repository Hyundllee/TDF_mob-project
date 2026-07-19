import tdf20 from './tdf-20.svg'
import tdf30 from './tdf-30.svg'
import tdf40 from './tdf-40.svg'
import tdf50 from './tdf-50.svg'
import tdf60 from './tdf-60.svg'
import youngNeutral from './character-young-neutral.svg'
import youngTalking from './character-young-talking.svg'
import seniorNeutral from './character-senior-neutral.svg'
import seniorTalking from './character-senior-talking.svg'
import growth from './icon-growth.svg'
import plant from './icon-plant.svg'
import rocket from './icon-rocket.svg'
import pine from './icon-pine.svg'
import safety from './icon-safety.svg'
import tree from './icon-tree.svg'
import balance from './icon-balance.svg'
import apple from './icon-apple.svg'
import cash from './icon-cash.svg'
import rebalancing from './icon-rebalancing-scale.svg'
import glideAirplane from './icon-glide-airplane.svg'
import allocation from './icon-allocation-system.svg'
import coin from './icon-coin.svg'
import ai from './icon-ai-strategy.svg'
import pieChart from './icon-pie-chart.svg'
import calendarChart from './icon-calendar-chart.svg'
import wonPuzzle from './icon-won-puzzle.svg'
import home from './icon-home.svg'
import warrenBuffett from './portrait-warren-buffett.svg'
import johnBogle from './portrait-john-bogle.svg'
import glideArea from './glide-path-area.png'
import calloutArrow from './callout-arrow.svg'
import overviewCallout from './overview-callout.svg'
import timelineArrow from './timeline-arrow.svg'
import timelineBlueDot from './timeline-dot-blue.svg'
import timelineMagentaDot from './timeline-dot-magenta.svg'

export const heroImages: Record<string, string> = {
  '20': tdf20,
  '30': tdf30,
  '40': tdf40,
  '50': tdf50,
  '60': tdf60,
}

export const images = {
  characters: { youngNeutral, youngTalking, seniorNeutral, seniorTalking },
  heroIcons: { growth, plant, rocket, pine, safety, tree, balance, apple, cash },
  icons: { rebalancing, glideAirplane, allocation, coin, ai, pieChart, calendarChart, wonPuzzle, home },
  portraits: { warrenBuffett, johnBogle },
  glideArea,
}

export const tdfContentImages = {
  characters: { youngNeutral, youngTalking, seniorNeutral, seniorTalking },
  glidePathArea: glideArea,
  calloutArrow,
  portraits: { warrenBuffett, johnBogle },
  timeline: {
    arrow: timelineArrow,
    blueDot: timelineBlueDot,
    magentaDot: timelineMagentaDot,
  },
  icons: {
    aiStrategy: ai,
    allocationSystem: allocation,
    calendarChart,
    coin,
    glideAirplane,
    home,
    pieChart,
    rebalancingScale: rebalancing,
    wonPuzzle,
  },
  overviewCallout,
}
