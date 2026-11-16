type Module = {
  index: string;
  title: string;
  body: string;
};

export function AccordionItem({
  item,
  isOpen,
  onToggle,
}: {
  item: Module;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const triggerId = `course-trigger-${item.index}`;
  const panelId = `panel-${item.index}`;

  return (
    <li>
      <h3>
        <button
          id={triggerId}
          type="button"
          className="course-toggle"
          aria-expanded={isOpen}
          aria-controls={panelId}
          onClick={onToggle}
        >
          <span className="card-kicker course-index">{item.index}</span>
          <span className="course-module-title">{item.title}</span>
          <span className="course-chevron" aria-hidden="true">
            {isOpen ? "↑" : "↓"}
          </span>
        </button>
      </h3>
      <div
        id={panelId}
        className={`course-panel${isOpen ? " is-open" : ""}`}
        role="region"
        aria-labelledby={triggerId}
        aria-hidden={isOpen ? undefined : true}
      >
        <div>
          <p>{item.body}</p>
        </div>
      </div>
    </li>
  );
}
