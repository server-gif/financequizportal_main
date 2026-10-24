import './Container.css';

/** Centered, max-width wrapper with responsive side gutters. */
export default function Container({ as: Tag = 'div', size = 'default', className = '', children, ...rest }) {
  return (
    <Tag className={`container container--${size} ${className}`.trim()} {...rest}>
      {children}
    </Tag>
  );
}
