import { Fragment } from 'react';
import { FiInfo } from 'react-icons/fi';
import './ArticleContent.css';

/**
 * Renders structured article blocks:
 *  { type: 'p' | 'h2' | 'h3', text }
 *  { type: 'ul' | 'ol', items: [] }
 *  { type: 'callout', title?, text }
 *
 * `insertAfter` + `insert` place a node (e.g. an in-content ad) after block N.
 */
export default function ArticleContent({ blocks, insertAfter, insert }) {
  return (
    <div className="article-content">
      {blocks.map((block, index) => (
        <Fragment key={index}>
          <Block block={block} />
          {insert && index === insertAfter && insert}
        </Fragment>
      ))}
    </div>
  );
}

function Block({ block }) {
  switch (block.type) {
    case 'h2':
      return <h2>{block.text}</h2>;
    case 'h3':
      return <h3>{block.text}</h3>;
    case 'ul':
      return <ul>{block.items.map((item) => <li key={item}>{item}</li>)}</ul>;
    case 'ol':
      return <ol>{block.items.map((item) => <li key={item}>{item}</li>)}</ol>;
    case 'callout':
      return (
        <aside className="article-callout">
          <FiInfo aria-hidden="true" className="article-callout__icon" />
          <div>
            {block.title && <strong className="article-callout__title">{block.title}</strong>}
            <p>{block.text}</p>
          </div>
        </aside>
      );
    case 'p':
    default:
      return <p>{block.text}</p>;
  }
}
