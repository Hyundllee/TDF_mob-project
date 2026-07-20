export interface StrategyCardItem {
  title: string
  description: string[]
  icon?: string
  symbol?: string
  accent?: string
}

interface StrategyCardsProps {
  items: StrategyCardItem[]
  bulleted?: boolean
}

export default function StrategyCards({ items, bulleted = false }: StrategyCardsProps) {
  return (
    <div className="strategy-grid">
      {items.map((item, index) => (
        <article className={bulleted ? 'is-bulleted' : undefined} key={item.title}>
          <span className="strategy-grid__number">{String(index + 1).padStart(2, '0')}</span>
          {(item.icon || item.symbol) && (
            <div className="strategy-grid__icon" aria-hidden="true">
              {item.icon ? <img src={item.icon} alt="" /> : item.symbol}
            </div>
          )}
          <h3>
            {item.accent
              ? item.title.split(item.accent).map((part, partIndex, parts) => (
                <span key={`${part}-${partIndex}`}>
                  {part}
                  {partIndex < parts.length - 1 && <em>{item.accent}</em>}
                </span>
              ))
              : item.title}
          </h3>
          {bulleted ? (
            <ul>
              {item.description.map((description) => <li key={description}>{description}</li>)}
            </ul>
          ) : (
            <p>{item.description.join(' ')}</p>
          )}
        </article>
      ))}
    </div>
  )
}
