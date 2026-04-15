import { NavLink } from "react-router-dom";
import { resolvePagePath } from "../utils/reportPage";

export function Sidebar({ navigation, brand }) {
  const brandTitle = brand?.title || "Report";
  const brandSubtitle = brand?.subtitle || "Catalog";

  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <NavLink to="/" end>
          {brandTitle}
          <br />
          {brandSubtitle}
        </NavLink>
      </div>

      {navigation.map((section) => (
        <div className="sidebar-section" key={section.label}>
          <div className="sidebar-section-label">{section.label}</div>
          {section.items.map((item) => (
            <NavLink
              key={item.id}
              to={resolvePagePath(item.id)}
              end={item.id === "index"}
              className={({ isActive }) =>
                isActive ? "sidebar-link active" : "sidebar-link"
              }
            >
              <span className="sidebar-dot" />
              <span>{item.title}</span>
              {item.tag ? <span className="sidebar-tag">{item.tag}</span> : null}
            </NavLink>
          ))}
        </div>
      ))}
    </aside>
  );
}
