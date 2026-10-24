import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';
import Container from '../Container/Container';
import './CategorySection.css';

/** A titled content section (e.g. "Latest articles") with an optional "view all" link. */
export default function CategorySection({ id, eyebrow, title, description, action, children }) {
  const headingId = id ? `${id}-title` : undefined;

  return (
    <section className="category-section page-section" aria-labelledby={headingId}>
      <Container>
        <header className="category-section__header">
          <div>
            {eyebrow && <span className="eyebrow">{eyebrow}</span>}
            <h2 id={headingId} className="category-section__title">{title}</h2>
            {description && <p className="category-section__description">{description}</p>}
          </div>
          {action && (
            <Link to={action.to} className="category-section__action">
              {action.label} <FiArrowRight aria-hidden="true" />
            </Link>
          )}
        </header>
        {children}
      </Container>
    </section>
  );
}
