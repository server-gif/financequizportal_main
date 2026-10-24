import BlogCard from '../BlogCard/BlogCard';
import './BlogGrid.css';

/** Responsive grid of BlogCards. */
export default function BlogGrid({ blogs, columns = 3 }) {
  if (!blogs?.length) {
    return <p className="blog-grid__empty">No articles in this section yet — check back soon.</p>;
  }

  return (
    <div className={`blog-grid blog-grid--cols-${columns}`}>
      {blogs.map((blog) => (
        <BlogCard key={blog.id} blog={blog} />
      ))}
    </div>
  );
}
