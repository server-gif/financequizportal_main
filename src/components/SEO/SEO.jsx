import { useLocation } from 'react-router-dom';
import { SITE } from '../../config/site';

const absolute = (path) => (/^https?:\/\//.test(path) ? path : `${SITE.url}${path}`);

/**
 * Per-page SEO tags. React 19 hoists <title>, <meta> and <link> into <head>
 * and removes them on unmount, so no extra dependency is needed.
 */
export default function SEO({
  title,
  description = SITE.description,
  image = SITE.defaultImage,
  imageAlt,
  type = 'website',
  path,
  article,
  faqs,
  noindex = false,
}) {
  const { pathname } = useLocation();
  const fullTitle = title ? `${title} | ${SITE.name}` : `${SITE.name} — ${SITE.tagline}`;
  const canonical = absolute(path ?? pathname);
  const imageUrl = absolute(image);

  const structuredData = article
    ? {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: title,
        description,
        image: [imageUrl],
        datePublished: article.publishedTime,
        author: { '@type': 'Organization', name: article.author },
        publisher: { '@type': 'Organization', name: SITE.name },
        mainEntityOfPage: canonical,
      }
    : null;

  // FAQPage schema — the visible accordion and this data must stay in sync
  // (both come from src/data/faqs.js), which is what Google requires.
  const faqData = Array.isArray(faqs) && faqs.length
    ? {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: { '@type': 'Answer', text: faq.answer },
        })),
      }
    : null;

  return (
    <>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />
      {noindex && <meta name="robots" content="noindex, follow" />}

      <meta property="og:site_name" content={SITE.name} />
      <meta property="og:locale" content={SITE.locale} />
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={imageUrl} />
      {imageAlt && <meta property="og:image:alt" content={imageAlt} />}

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />

      {article && <meta property="article:published_time" content={article.publishedTime} />}
      {article && <meta property="article:section" content={article.section} />}
      {structuredData && (
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
      )}
      {faqData && <script type="application/ld+json">{JSON.stringify(faqData)}</script>}
    </>
  );
}
