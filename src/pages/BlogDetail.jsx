import { Link, useParams } from 'react-router-dom';
import { FiChevronRight, FiClock } from 'react-icons/fi';
import ArticleContent from '../components/ArticleContent/ArticleContent';
import ArticleImage from '../components/ArticleImage/ArticleImage';
import BlogGrid from '../components/BlogGrid/BlogGrid';
import CategorySection from '../components/CategorySection/CategorySection';
import Container from '../components/Container/Container';
import SEO from '../components/SEO/SEO';
import { getBlogBySlug, getRelatedBlogs } from '../data/blogs';
import { getCategoryBySlug } from '../data/categories';
import NotFound from './NotFound';
import './BlogDetail.css';

export default function BlogDetail() {
  const { slug } = useParams();
  const blog = getBlogBySlug(slug);

  if (!blog) return <NotFound />;

  const section = getCategoryBySlug(blog.section);
  const related = getRelatedBlogs(blog, 3);

  return (
    <>
      <SEO
        title={blog.title}
        description={blog.excerpt}
        image={blog.ogImage}
        // ogImage is our own cover illustration, not the in-article photograph,
        // so it gets its own description rather than reusing blog.imageAlt.
        imageAlt={`${blog.title} — cover illustration`}
        type="article"
        path={`/blog/${blog.slug}`}
        article={{ publishedTime: blog.isoDate, author: blog.author, section: blog.category }}
      />

      <article className="post" key={blog.slug}>
        <Container size="narrow">
          <nav className="post__breadcrumb" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <FiChevronRight aria-hidden="true" />
            {section && <Link to={`/category/${section.slug}`}>{section.name}</Link>}
          </nav>

          <header className="post__header">
            <span className="eyebrow">{blog.category}</span>
            <h1 className="post__title">{blog.title}</h1>
            <p className="post__lede">{blog.excerpt}</p>
            <div className="post__meta">
              <span className="post__avatar" aria-hidden="true">{blog.author.charAt(0)}</span>
              <div>
                <span className="post__author">By {blog.author}</span>
                <span className="post__details">
                  <time dateTime={blog.isoDate}>{blog.date}</time>
                  <span aria-hidden="true">·</span>
                  <span className="post__read"><FiClock aria-hidden="true" /> {blog.readTime} min read</span>
                </span>
              </div>
            </div>
          </header>
        </Container>

        <Container size="narrow">
          <figure className="post__figure">
            <ArticleImage src={blog.image} alt={blog.imageAlt} priority ratio="16 / 9" className="post__image" />
          </figure>
        </Container>

        <Container size="narrow">
          <ArticleContent blocks={blog.content} />
        </Container>
      </article>

      {related.length > 0 && (
        <CategorySection id="related" eyebrow="Continue reading" title="Related Articles">
          <BlogGrid blogs={related} />
        </CategorySection>
      )}
    </>
  );
}
