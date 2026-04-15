import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export function TableOfContents({ items }) {
  const location = useLocation();
  const [activeId, setActiveId] = useState(items[0]?.id || "");

  useEffect(() => {
    setActiveId(items[0]?.id || "");

    if (!items.length) {
      return undefined;
    }

    const headings = items
      .map((item) => document.getElementById(item.id))
      .filter(Boolean);

    if (!headings.length) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((left, right) => left.boundingClientRect.top - right.boundingClientRect.top)[0];

        if (visibleEntry?.target?.id) {
          setActiveId(visibleEntry.target.id);
        }
      },
      { rootMargin: "-96px 0px -65% 0px" }
    );

    headings.forEach((heading) => observer.observe(heading));
    return () => observer.disconnect();
  }, [items, location.pathname]);

  if (!items.length) {
    return null;
  }

  return (
    <aside className="toc">
      <div className="toc-title">이 페이지</div>
      <ul className="toc-list">
        {items.map((item) => (
          <li
            key={item.id}
            className={item.level === 3 ? "toc-item toc-item-sub" : "toc-item"}
          >
            <a href={`#${item.id}`} className={item.id === activeId ? "active" : ""}>
              {item.title}
            </a>
          </li>
        ))}
      </ul>
    </aside>
  );
}
