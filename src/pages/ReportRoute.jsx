import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { AppShell } from "../components/AppShell";
import { ReportSectionRenderer } from "../components/ReportSectionRenderer";
import { preparePageForRender } from "../utils/reportPage";
import { NotFoundPage } from "./NotFoundPage";

export function ReportRoute({ catalog, fixedPageId }) {
  const params = useParams();
  const pageId = fixedPageId || params.pageId;
  const page = catalog.pages.find((item) => item.id === pageId);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pageId]);

  useEffect(() => {
    if (page) {
      const appTitle = catalog.brand?.title
        ? `${catalog.brand.title} ${catalog.brand.subtitle || ""}`.trim()
        : "Report";
      document.title = `${page.title} | ${appTitle}`;
    }
  }, [catalog.brand, page]);

  if (!page) {
    return <NotFoundPage navigation={catalog.navigation} brand={catalog.brand} />;
  }

  const preparedPage = preparePageForRender(page);

  return (
    <AppShell
      navigation={catalog.navigation}
      tocItems={preparedPage.tocItems}
      brand={catalog.brand}
    >
      <main className="page-main report-page">
        <div className="section-badge">{page.badge}</div>
        <h1>{page.title}</h1>
        <p className="subtitle">{page.subtitle}</p>

        {preparedPage.sections.map((section, index) => (
          <ReportSectionRenderer key={`${page.id}-${section.type}-${index}`} section={section} />
        ))}
      </main>
    </AppShell>
  );
}
