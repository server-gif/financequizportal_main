import { Link } from 'react-router-dom';
import { FiArrowRight, FiTrendingUp, FiShield, FiBookOpen } from 'react-icons/fi';
import ArticleImage from '../ArticleImage/ArticleImage';
import Container from '../Container/Container';
import { BLOGS } from '../../data/blogs';
import './HeroSection.css';

/** Latest articles shown as real thumbnail cards in the hero visual. */
const CARDS = BLOGS.slice(0, 3);

/** Topic chips shown under the subtitle. */
const TOPICS = ['Budgeting', 'Investing', 'Credit', 'Taxes'];

/** Brand-aligned hero banner. */
export default function HeroSection() {
  return (
    <section className="hero">
      {/* Decorative background */}
      <div className="hero__bg" aria-hidden="true">
        <span className="hero__orb hero__orb--1" />
        <span className="hero__orb hero__orb--2" />
        <span className="hero__grid" />
      </div>

      <Container className="hero__inner">
        <div className="hero__main">
          <span className="hero__tag">
            Finance, Simplified
          </span>

          <h1 className="hero__heading">
            Smart Money Decisions{' '}
            <span className="hero__highlight">Start Here</span>
          </h1>

          <p className="hero__subtitle">
            Expert guides on budgeting, investing, credit &amp; taxes — explained in plain
            language so you can take control of your financial future.
          </p>

          <ul className="hero__topics" aria-label="Topics we cover">
            {TOPICS.map((topic) => (
              <li key={topic} className="hero__topic">{topic}</li>
            ))}
          </ul>

          {/* <div className="hero__actions">
            <Link to="/blog" className="hero__btn hero__btn--primary">
              Explore Articles
              <FiArrowRight className="hero__btn-icon" aria-hidden="true" />
            </Link>
          </div> */}
          <div className="hero__actions">
            <Link to="/blog" className="hero__btn hero__btn--primary">
              Explore Articles
              <FiArrowRight aria-hidden="true" />
            </Link>
          </div>

          <ul className="hero__trust">
            <li className="hero__trust-item">
              <FiBookOpen aria-hidden="true" />
              Plain-language guides
            </li>
            <li className="hero__trust-item">
              <FiShield aria-hidden="true" />
              Unbiased, no hype
            </li>
          </ul>
        </div>

        <div className="hero__visual" aria-hidden="true">
          {/* Growth panel */}
          <div className="hero__panel">
            <div className="hero__panel-head">
              <span className="hero__panel-label">Your money, growing</span>
              <span className="hero__panel-badge">
                <FiTrendingUp />
                +12.4%
              </span>
            </div>
            <svg className="hero__chart" viewBox="0 0 260 90" preserveAspectRatio="none">
              <defs>
                <linearGradient id="heroChartFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="currentColor" stopOpacity="0.28" />
                  <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path
                className="hero__chart-area"
                d="M0 78 L30 70 L60 74 L90 58 L120 62 L150 44 L180 48 L210 28 L240 22 L260 10 L260 90 L0 90 Z"
                fill="url(#heroChartFill)"
              />
              <path
                className="hero__chart-line"
                d="M0 78 L30 70 L60 74 L90 58 L120 62 L150 44 L180 48 L210 28 L240 22 L260 10"
                fill="none"
              />
              <circle className="hero__chart-dot" cx="260" cy="10" r="4" />
            </svg>
          </div>

          {/* Latest article cards */}
          {CARDS.map((blog, index) => (
            <div key={blog.id} className={`hero__card hero__card--${index + 1}`}>
              <span className="hero__card-num">{String(index + 1).padStart(2, '0')}</span>
              <ArticleImage src={blog.image} alt="" ratio="1 / 1" className="hero__card-image" />
              <div className="hero__card-text">
                <span className="hero__card-cat">{blog.category}</span>
                <span className="hero__card-title">{blog.title}</span>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}