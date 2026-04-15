import { startTransition, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { fetchReportCatalog } from "./api/reportApi";
import { NotFoundPage } from "./pages/NotFoundPage";
import { ReportRoute } from "./pages/ReportRoute";

function LoadingView() {
  return (
    <div className="loading-screen">
      <div className="status-card">
        <div className="status-label">Loading</div>
        <h1>회고 리포트 구성을 불러오는 중입니다</h1>
        <p>등록된 카탈로그를 기준으로 메뉴와 페이지를 구성하고 있습니다.</p>
      </div>
    </div>
  );
}

function ErrorView({ message }) {
  return (
    <div className="loading-screen">
      <div className="status-card error">
        <div className="status-label">Error</div>
        <h1>리포트 데이터를 불러오지 못했습니다</h1>
        <p>{message}</p>
        <p>카탈로그 파일과 앱 구성을 확인한 뒤 다시 실행해 주세요.</p>
      </div>
    </div>
  );
}

export default function App() {
  const [catalog, setCatalog] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function loadCatalog() {
      try {
        const data = await fetchReportCatalog();
        if (cancelled) {
          return;
        }

        startTransition(() => {
          setCatalog(data);
        });
      } catch (loadError) {
        if (!cancelled) {
          setError(loadError.message);
        }
      }
    }

    loadCatalog();

    return () => {
      cancelled = true;
    };
  }, []);

  if (error) {
    return <ErrorView message={error} />;
  }

  if (!catalog) {
    return <LoadingView />;
  }

  return (
    <Routes>
      <Route path="/" element={<ReportRoute catalog={catalog} fixedPageId="index" />} />
      <Route path="/pages/:pageId" element={<ReportRoute catalog={catalog} />} />
      <Route
        path="*"
        element={<NotFoundPage navigation={catalog.navigation} brand={catalog.brand} />}
      />
    </Routes>
  );
}
