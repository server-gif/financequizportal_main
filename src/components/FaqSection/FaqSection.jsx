import { FiPlus } from 'react-icons/fi';
import { FAQS } from '../../data/faqs';
import Container from '../Container/Container';
import './FaqSection.css';

/**
 * FAQ accordion. Native <details>/<summary> keeps it keyboard- and
 * screen-reader-friendly with zero JavaScript.
 */
export default function FaqSection({ faqs = FAQS }) {
  return (
    <section className="faq-section page-section" id="faq" aria-labelledby="faq-title">
      <Container>
        <header className="faq-section__header">
          <span className="eyebrow">Answers</span>
          <h2 id="faq-title" className="faq-section__title">Frequently Asked Questions</h2>
          <p className="faq-section__description">
            Quick answers to the money questions readers ask us most.
          </p>
        </header>

        <div className="faq-section__list">
          {faqs.map((faq, index) => (
            <details className="faq-item" key={faq.question} open={index === 0}>
              <summary className="faq-item__question">
                <span>{faq.question}</span>
                <span className="faq-item__icon" aria-hidden="true">
                  <FiPlus />
                </span>
              </summary>
              <div className="faq-item__answer">
                <p>{faq.answer}</p>
              </div>
            </details>
          ))}
        </div>
      </Container>
    </section>
  );
}
