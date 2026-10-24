import { Link, useParams } from 'react-router-dom';
import BlogGrid from '../components/BlogGrid/BlogGrid';
import Container from '../components/Container/Container';
import SEO from '../components/SEO/SEO';
import { BLOGS, getBlogsBySection } from '../data/blogs';
import { CATEGORIES, getCategoryBySlug } from '../data/categories';
import { SITE } from '../config/site';
import NotFound from './NotFound';
import './Blog.css';

/** Article listing — all articles at /blog, or one section at /category/:category. */
export default function Blog() {
  const { category: categorySlug } = useParams();
  const category = categorySlug ? getCategoryBySlug(categorySlug) : null;

  if (categorySlug && !category) return <NotFound />;

  const blogs = category ? getBlogsBySection(category.slug) : BLOGS;
  const title = category ? category.title : 'All Articles';
  const description = category
    ? category.description
    : `Every ${SITE.name} guide on personal finance, saving, investing, banking and the economy.`;

  return (
    <>
      <SEO title={title} description={description} path={category ? `/category/${category.slug}` : '/blog'} />

      <section className="listing page-section" key={categorySlug ?? "all"}>
        <Container>
          <header className="listing__header">
            <span className="eyebrow">{category ? 'Topic' : 'Library'}</span>
            <h1 className="listing__title">{title}</h1>
            <p className="listing__description">{description}</p>
            <p className="listing__count">
              {blogs.length} {blogs.length === 1 ? 'article' : 'articles'}
            </p>
          </header>

          {!category && (
            <nav className="listing__topics" aria-label="Browse by topic">
              {CATEGORIES.map((item) => (
                <Link key={item.slug} to={`/category/${item.slug}`} className="listing__chip">
                  {item.name}
                </Link>
              ))}
            </nav>
          )}

          <BlogGrid blogs={blogs} />
        </Container>
      </section>
    </>
  );
}
