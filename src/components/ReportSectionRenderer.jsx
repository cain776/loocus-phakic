import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { resolvePagePath } from "../utils/reportPage";

function RichText({ className = "", html, tag: Tag = "div" }) {
  return <Tag className={className} dangerouslySetInnerHTML={{ __html: html }} />;
}

function SectionHeading({ section }) {
  if (!section.heading) {
    return null;
  }

  return (
    <>
      <h2 id={section.anchorId}>{section.heading}</h2>
      {section.subtitleHtml ? (
        <RichText className="section-copy" html={section.subtitleHtml} tag="p" />
      ) : null}
    </>
  );
}

function renderCell(content) {
  return <span dangerouslySetInnerHTML={{ __html: content }} />;
}

function CardGridSection({ section }) {
  return (
    <section className="section-block">
      <SectionHeading section={section} />
      <div className="index-grid">
        {section.cards.map((card) => (
          <Link key={card.title} to={resolvePagePath(card.pageId)} className="index-card">
            <div className="card-label">{card.label}</div>
            <div className="card-title-lg">{card.title}</div>
            <div className="card-description">{card.description}</div>
          </Link>
        ))}
      </div>
    </section>
  );
}

function CompareTableSection({ section }) {
  return (
    <section className="section-block">
      <SectionHeading section={section} />
      <div className="table-card">
        <table className="compare-table">
          <thead>
            <tr>
              {section.columns.map((column, index) => (
                <th
                  key={column}
                  className={
                    index === 1 ? "compare-head left" : index === 2 ? "compare-head right" : ""
                  }
                >
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {section.rows.map((row) => (
              <tr key={row.label}>
                <td>{row.label}</td>
                <td>{renderCell(row.left)}</td>
                <td>{renderCell(row.right)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function FeatureGridSection({ section }) {
  return (
    <section className="section-block">
      <SectionHeading section={section} />
      <div className="feature-grid">
        {section.items.map((item) => (
          <article className="feature-card" key={item.title}>
            <div className="feature-icon">{item.icon}</div>
            <h3>{item.title}</h3>
            <RichText className="feature-copy" html={item.descriptionHtml} tag="p" />
          </article>
        ))}
      </div>
    </section>
  );
}

function ReasonListSection({ section }) {
  return (
    <section className="section-block">
      <SectionHeading section={section} />
      <div className="reason-stack">
        {section.items.map((item) => (
          <article className="reason-card" key={item.title}>
            <div className="reason-icon">{item.icon}</div>
            <div className="reason-body">
              <div className="reason-title">{item.title}</div>
              <RichText className="reason-copy" html={item.bodyHtml} tag="p" />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function DualListSection({ section }) {
  return (
    <section className="section-block">
      <SectionHeading section={section} />
      <div className="dual-grid">
        {section.boxes.map((box) => (
          <article className={`dual-card ${box.tone}`} key={box.title}>
            <div className="dual-title">{box.title}</div>
            <div className="dual-subtitle">{box.subtitle}</div>
            <ul className="bullet-list">
              {box.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}

function ProblemListSection({ section }) {
  return (
    <section className="section-block">
      <SectionHeading section={section} />
      <div className="problem-stack">
        {section.problems.map((problem) => (
          <article className={`problem-card ${problem.severity}`} key={problem.title}>
            <div className="problem-head">
              <span className="problem-number">[{problem.number}]</span>
              <h3 id={problem.anchorId}>{problem.title}</h3>
              <span className={`severity-chip ${problem.severity}`}>{problem.severityLabel}</span>
            </div>
            <div className="problem-impact">{problem.impact}</div>

            {problem.blocks.map((block, index) => (
              <div className="problem-block" key={`${problem.title}-${index}`}>
                {block.title ? <div className="problem-block-title">{block.title}</div> : null}
                {block.textHtml ? <RichText className="section-copy" html={block.textHtml} /> : null}
                {block.list ? (
                  <ul className="problem-list">
                    {block.list.map((item) => (
                      <li key={item}>
                        <span dangerouslySetInnerHTML={{ __html: item }} />
                      </li>
                    ))}
                  </ul>
                ) : null}
                {block.table ? (
                  <table className="impact-table">
                    <thead>
                      <tr>
                        {block.table.columns.map((column) => (
                          <th key={column}>{column}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {block.table.rows.map((row, rowIndex) => (
                        <tr key={`${problem.title}-row-${rowIndex}`}>
                          {row.map((cell, cellIndex) => (
                            <td key={`${problem.title}-${rowIndex}-${cellIndex}`}>
                              {renderCell(cell)}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : null}
              </div>
            ))}
          </article>
        ))}
      </div>
    </section>
  );
}

function StatGridSection({ section }) {
  return (
    <section className="section-block">
      <SectionHeading section={section} />
      <div className="stat-grid">
        {section.items.map((item) => (
          <article className={`stat-card ${item.tone}`} key={item.label}>
            <div className="stat-label">{item.label}</div>
            <div className="stat-count">{item.count}</div>
            <div className="stat-description">{item.description}</div>
          </article>
        ))}
      </div>
    </section>
  );
}

function SummaryTableSection({ section }) {
  return (
    <section className="section-block">
      <SectionHeading section={section} />
      <div className="table-card">
        <table className="summary-table">
          <thead>
            <tr>
              {section.columns.map((column, index) => (
                <th
                  key={column}
                  className={
                    index === 1 ? "summary-head left" : index === 2 ? "summary-head right" : ""
                  }
                >
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {section.rows.map((row, rowIndex) => (
              <tr key={`summary-row-${rowIndex}`}>
                {row.map((cell, cellIndex) => (
                  <td key={`summary-cell-${rowIndex}-${cellIndex}`}>{renderCell(cell)}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function formatChartTick(value, prefix = "", suffix = "") {
  const safePrefix = prefix || "";
  const safeSuffix = suffix || "";
  const normalized = Number.isInteger(value) ? String(value) : String(value).replace(/\.0$/, "");
  return `${safePrefix}${normalized}${safeSuffix}`;
}

function buildPath(points) {
  return points.map((point, index) => `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`).join(" ");
}

function MarketMetricCard({ item }) {
  return (
    <article className={`market-metric-card${item.tone ? ` ${item.tone}` : ""}`}>
      <div className="market-metric-title">{item.title}</div>
      <div className="market-metric-value">{item.value}</div>
      <div className="market-metric-note">{item.note}</div>
    </article>
  );
}

function MarketBarChart({ chart }) {
  const width = 560;
  const height = 320;
  const padding = { top: 18, right: 18, bottom: 54, left: 54 };
  const innerWidth = width - padding.left - padding.right;
  const innerHeight = height - padding.top - padding.bottom;
  const baseY = height - padding.bottom;
  const slotWidth = innerWidth / chart.values.length;
  const barWidth = Math.min(58, slotWidth * 0.46);

  return (
    <article className="market-chart-card">
      <div className="market-chart-title">{chart.title}</div>
      <svg viewBox={`0 0 ${width} ${height}`} className="market-chart-svg" role="img" aria-label={chart.title}>
        {chart.yTicks.map((tick) => {
          const y = padding.top + innerHeight - (tick / chart.max) * innerHeight;
          return (
            <g key={`bar-grid-${tick}`}>
              <line
                x1={padding.left}
                x2={width - padding.right}
                y1={y}
                y2={y}
                style={{ stroke: "var(--border)", strokeWidth: 1 }}
              />
              <text
                x={padding.left - 12}
                y={y + 4}
                textAnchor="end"
                className="market-axis-label"
              >
                {formatChartTick(tick, chart.yTickPrefix, chart.yTickSuffix)}
              </text>
            </g>
          );
        })}

        {chart.values.map((item, index) => {
          const x = padding.left + slotWidth * index + (slotWidth - barWidth) / 2;
          const barHeight = (item.value / chart.max) * innerHeight;
          const y = baseY - barHeight;
          return (
            <g key={item.label}>
              <rect
                x={x}
                y={y}
                width={barWidth}
                height={barHeight}
                rx="8"
                fill={item.color}
              />
              <text
                x={x + barWidth / 2}
                y={height - 18}
                textAnchor="middle"
                className="market-axis-label market-axis-label-x"
              >
                {item.label}
              </text>
            </g>
          );
        })}
      </svg>
      <div className="market-chart-legend">
        <span className="market-legend-item">
          <span className="market-legend-swatch" style={{ background: chart.legend.color }} />
          {chart.legend.label}
        </span>
      </div>
    </article>
  );
}

function MarketLineChart({ chart }) {
  const width = 560;
  const height = 320;
  const padding = { top: 18, right: 22, bottom: 54, left: 66 };
  const innerWidth = width - padding.left - padding.right;
  const innerHeight = height - padding.top - padding.bottom;
  const actualCount = chart.actualCount;
  const points = chart.values.map((item, index) => ({
    ...item,
    x: padding.left + (innerWidth * index) / (chart.values.length - 1),
    y: padding.top + innerHeight - (item.value / chart.max) * innerHeight,
  }));
  const actualPath = buildPath(points.slice(0, actualCount));
  const forecastPath = buildPath(points.slice(actualCount - 1));

  return (
    <article className="market-chart-card">
      <div className="market-chart-title">{chart.title}</div>
      <svg viewBox={`0 0 ${width} ${height}`} className="market-chart-svg" role="img" aria-label={chart.title}>
        {chart.yTicks.map((tick) => {
          const y = padding.top + innerHeight - (tick / chart.max) * innerHeight;
          return (
            <g key={`line-grid-${tick}`}>
              <line
                x1={padding.left}
                x2={width - padding.right}
                y1={y}
                y2={y}
                style={{ stroke: "var(--border)", strokeWidth: 1 }}
              />
              <text
                x={padding.left - 12}
                y={y + 4}
                textAnchor="end"
                className="market-axis-label"
              >
                {formatChartTick(tick, chart.yTickPrefix, chart.yTickSuffix)}
              </text>
            </g>
          );
        })}

        <path
          d={actualPath}
          fill="none"
          stroke={chart.actualColor}
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d={forecastPath}
          fill="none"
          stroke={chart.forecastColor}
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="8 8"
        />

        {points.map((point, index) => {
          const isForecast = index >= actualCount;
          return (
            <g key={point.label}>
              <circle
                cx={point.x}
                cy={point.y}
                r={isForecast ? 6.5 : 7.5}
                fill={isForecast ? "none" : chart.actualColor}
                stroke={isForecast ? chart.forecastColor : chart.actualColor}
                strokeWidth="4"
              />
              <text
                x={point.x}
                y={height - 18}
                textAnchor="middle"
                className="market-axis-label market-axis-label-x"
              >
                {point.label}
              </text>
            </g>
          );
        })}
      </svg>
      <div className="market-chart-legend">
        <span className="market-legend-item">
          <span className="market-legend-swatch" style={{ background: chart.actualColor }} />
          {chart.actualLegend}
        </span>
        <span className="market-legend-item">
          <span className="market-legend-line forecast" />
          {chart.forecastLegend}
        </span>
      </div>
    </article>
  );
}

function MarketSnapshotSection({ section }) {
  return (
    <section className="section-block">
      <SectionHeading section={section} />
      <div className="market-snapshot">
        <div className="market-metric-grid">
          {section.metrics.map((item) => (
            <MarketMetricCard key={item.title} item={item} />
          ))}
        </div>

        <div className="market-chart-grid">
          <MarketBarChart chart={section.barChart} />
          <MarketLineChart chart={section.lineChart} />
        </div>

        <div className="market-snapshot-source">{section.source}</div>
      </div>
    </section>
  );
}

function SlideGallerySection({ section }) {
  return (
    <section className="section-block">
      <SectionHeading section={section} />
      <div className="slide-gallery-actions">
        <a
          href={section.presentationUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="presentation-btn"
        >
          ▶ 발표 모드로 보기
        </a>
        <span className="slide-gallery-count">총 {section.slides.length}장</span>
      </div>
      <div className="slide-gallery-grid">
        {section.slides.map((slide) => (
          <a
            key={slide.number}
            href={`${section.presentationUrl}#${slide.number}`}
            target="_blank"
            rel="noopener noreferrer"
            className="slide-gallery-card"
          >
            <div className="slide-gallery-number">{String(slide.number).padStart(2, "0")}</div>
            <div className="slide-gallery-badge">{slide.badge}</div>
            <div className="slide-gallery-title">{slide.title}</div>
          </a>
        ))}
      </div>
    </section>
  );
}

function LegacyPageSection({ section }) {
  const [html, setHtml] = useState("");
  const [cssLoaded, setCssLoaded] = useState(false);

  useEffect(() => {
    // 원본 CSS 로드
    const linkId = "legacy-page-css";
    if (!document.getElementById(linkId)) {
      const link = document.createElement("link");
      link.id = linkId;
      link.rel = "stylesheet";
      link.href = "/legacy-pages/style.css";
      document.head.appendChild(link);
      link.onload = () => setCssLoaded(true);
    } else {
      setCssLoaded(true);
    }
  }, []);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const res = await fetch(section.url);
        const text = await res.text();
        // 인라인 <style> 태그 추출
        const styles = [];
        text.replace(/<style[^>]*>([\s\S]*?)<\/style>/gi, (_, css) => {
          styles.push(css);
        });
        const styleBlock = styles.length > 0 ? `<style>${styles.join("\n")}</style>` : "";

        // <main class="main"> 내부 콘텐츠만 추출
        const match = text.match(/<main\s+class="main"[^>]*>([\s\S]*?)<\/main>/i);
        if (!cancelled && match) {
          setHtml(styleBlock + match[1]);
        } else if (!cancelled) {
          const bodyMatch = text.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
          if (bodyMatch) {
            const cleaned = bodyMatch[1]
              .replace(/<script[\s\S]*?<\/script>/gi, "")
              .replace(/<nav[\s\S]*?<\/nav>/gi, "");
            setHtml(styleBlock + cleaned);
          }
        }
      } catch {
        // fetch 실패 시 무시
      }
    }

    load();
    return () => { cancelled = true; };
  }, [section.url]);

  if (!html) {
    return null;
  }

  return (
    <section className="section-block legacy-embed">
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </section>
  );
}

function ImageBlockSection({ section }) {
  return (
    <section className="section-block">
      <SectionHeading section={section} />
      <div className="image-block">
        <img src={section.src} alt={section.alt || ""} />
        {section.caption ? (
          <div className="image-caption">{section.caption}</div>
        ) : null}
      </div>
    </section>
  );
}

function NoticePanelSection({ section }) {
  return (
    <section className="section-block">
      <SectionHeading section={section} />
      <article className="notice-panel">
        <RichText className="notice-copy" html={section.bodyHtml} tag="p" />
      </article>
    </section>
  );
}

export function ReportSectionRenderer({ section }) {
  if (section.type === "cardGrid") {
    return <CardGridSection section={section} />;
  }

  if (section.type === "compareTable") {
    return <CompareTableSection section={section} />;
  }

  if (section.type === "featureGrid") {
    return <FeatureGridSection section={section} />;
  }

  if (section.type === "reasonList") {
    return <ReasonListSection section={section} />;
  }

  if (section.type === "closingBanner") {
    return (
      <section className="section-block">
        <div className="closing-banner">{section.text}</div>
      </section>
    );
  }

  if (section.type === "dualList") {
    return <DualListSection section={section} />;
  }

  if (section.type === "problemList") {
    return <ProblemListSection section={section} />;
  }

  if (section.type === "statGrid") {
    return <StatGridSection section={section} />;
  }

  if (section.type === "summaryTable") {
    return <SummaryTableSection section={section} />;
  }

  if (section.type === "noticePanel") {
    return <NoticePanelSection section={section} />;
  }

  if (section.type === "legacyPage") {
    return <LegacyPageSection section={section} />;
  }

  if (section.type === "slideGallery") {
    return <SlideGallerySection section={section} />;
  }

  if (section.type === "marketSnapshot") {
    return <MarketSnapshotSection section={section} />;
  }

  if (section.type === "imageBlock") {
    return <ImageBlockSection section={section} />;
  }

  return null;
}
