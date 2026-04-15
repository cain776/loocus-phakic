import { Link } from "react-router-dom";
import { AppShell } from "../components/AppShell";

export function NotFoundPage({ navigation, brand }) {
  return (
    <AppShell navigation={navigation} tocItems={[]} brand={brand}>
      <main className="page-main report-page">
        <div className="section-badge">NOT FOUND</div>
        <h1>페이지를 찾을 수 없습니다</h1>
        <p className="subtitle">요청한 회고 페이지가 없거나 경로가 잘못되었습니다.</p>

        <article className="notice-panel">
          <p className="notice-copy">
            좌측 메뉴에서 다른 페이지를 선택하거나 <Link to="/">대시보드</Link> 로 돌아가서
            다시 이동해 주세요.
          </p>
        </article>
      </main>
    </AppShell>
  );
}
