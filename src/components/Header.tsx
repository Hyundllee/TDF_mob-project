import { useState } from 'react'

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <header className="mo-header">
        <div className="mo-header__bar">
          <a className="mo-header__brand" href="#tdf-top" aria-label="삼성 Kodex ETF 홈">
            <i aria-hidden="true" />
            <b>삼성</b>
            <strong>Kodex ETF</strong>
          </a>
          <div className="mo-header__switch" aria-label="펀드 유형">
            <button type="button" className="is-active">Kodex ETF</button>
            <button type="button">삼성펀드</button>
          </div>
          <button
            className={`mo-header__menu${isOpen ? ' is-open' : ''}`}
            type="button"
            aria-label="전체 메뉴"
            aria-expanded={isOpen}
            onClick={() => setIsOpen((open) => !open)}
          >
            <i /><i /><i />
          </button>
        </div>
      </header>
      {isOpen && (
        <nav className="mo-header-menu" aria-label="전체 메뉴">
          <a href="#tdf-overview" onClick={() => setIsOpen(false)}>TDF란?</a>
          <a href="#global-active" onClick={() => setIsOpen(false)}>글로벌 액티브 TDF</a>
          <a href="#global-emp" onClick={() => setIsOpen(false)}>글로벌 EMP TDF</a>
          <a href="#korea-emp" onClick={() => setIsOpen(false)}>코리아 EMP TDF</a>
        </nav>
      )}
    </>
  )
}
