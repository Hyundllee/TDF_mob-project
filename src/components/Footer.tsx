export default function Footer() {
  return (
    <footer className="mo-footer">
      <div className="mo-footer__tools">
        <button type="button">패밀리사이트 및 유관기관 <span>⌃</span></button>
        <a href="#tdf-top">TOP ↑</a>
      </div>
      <nav aria-label="정책 안내">
        <a href="#tdf-top">개인정보처리방침(고객)</a>
        <a href="#tdf-top">개인정보처리방침(채용/인사)</a>
        <a href="#tdf-top">고객권리 안내문</a>
        <a href="#tdf-top">신용정보활용체제</a>
      </nav>
      <strong>Samsung Asset Management</strong>
      <p>※ 본 페이지는 삼성 TDF 이해를 돕기 위한 안내 페이지입니다.</p>
    </footer>
  )
}
