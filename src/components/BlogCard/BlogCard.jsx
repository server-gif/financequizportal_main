import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';
import { useArticleLink } from '../../hooks/useArticleLink';
import ArticleImage from '../ArticleImage/ArticleImage';
import './BlogCard.css';

/** Article teaser card. The whole card is one accessible link to the article. */
export default function BlogCard({ blog }) {
  const { to, onClick } = useArticleLink(blog.slug);

  return (
    <article className="blog-card">
      <Link to={to} onClick={onClick} className="blog-card__link">
        <ArticleImage src={blog.image} alt={blog.imageAlt} className="blog-card__image" />
        <div className="blog-card__body">
          <span className="eyebrow">{blog.category}</span>
          <h3 className="blog-card__title">{blog.title}</h3>
          <p className="blog-card__excerpt">{blog.excerpt}</p>
          <div className="blog-card__meta">
            <time dateTime={blog.isoDate}>{blog.date}</time>
            <span className="blog-card__cta">
              Read article <FiArrowRight aria-hidden="true" />
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}
