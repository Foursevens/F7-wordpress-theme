import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedinIn, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faAt, faPhone, faMailbox } from '@fortawesome/pro-solid-svg-icons';
import classNames from 'classnames';
import { graphql } from 'gatsby';
import { FormattedMessage } from 'gatsby-plugin-intl';
import PropTypes from 'prop-types';
import React from 'react';

import { Container, Layout, SEO, Title } from '../components';

export const query = graphql`
  query($language: String!) {
    contactPage: wordpressPage(
      language: { eq: $language }
      slug: { eq: "contact" }
    ) {
      content
      subtitle
      title
    }
    site {
      siteMetadata {
        contact {
          email
          linkedin
          phone
          twitter
        }
      }
    }
  }
`;

function ContactChannel({ className, content, href, icon }) {
  const child = (
    <div className="flex items-center sm:flex-col">
      <FontAwesomeIcon
        className="text-f7200"
        fixedWidth
        icon={icon}
        size="2x"
      />
      <div className="m-3">{content}</div>
    </div>
  );
  return (
    <li className={classNames(className, 'w-full sm:w-1/3 sm:my-3 lg:w-1/5')}>
      {href
        ? React.createElement(
            'a',
            {
              className: 'block sm:-my-3 sm:py-3',
              href,
              ...(href.match(/^http/) && {
                rel: 'noopener noreferrer',
                target: '_blank',
              }),
            },
            child,
          )
        : child}
    </li>
  );
}

ContactChannel.defaultProps = {
  className: '',
  href: null,
};

ContactChannel.propTypes = {
  className: PropTypes.string,
  content: PropTypes.node.isRequired,
  href: PropTypes.string,
  icon: PropTypes.shape().isRequired,
};

export default function ContactPage({
  data: {
    contactPage: { content, subtitle, title },
    site: {
      siteMetadata: {
        contact: { email, phone, linkedin, twitter },
      },
    },
  },
}) {
  return (
    <Layout>
      <SEO title="Contact" />
      <Container>
        <Title as="h1" className="text-5xl">
          {title}
        </Title>
        <ul className="flex flex-wrap space-around sm:-my-3">
          <ContactChannel
            content={
              <>
                <FormattedMessage id="general.address.street" />
                <br />
                <FormattedMessage id="general.address.city" />
                <br />
                <FormattedMessage id="general.address.country" />
              </>
            }
            className="hidden sm:block"
            icon={faMailbox}
          />
          <ContactChannel
            content={email}
            href={`mailto:${email}`}
            icon={faAt}
          />
          <ContactChannel
            content={phone}
            href={`tel:${phone}`}
            icon={faPhone}
          />
          <ContactChannel
            content={twitter}
            href={`https://twitter.com/${twitter}`}
            icon={faTwitter}
          />
          <ContactChannel
            content={linkedin}
            href={`https://linkedin.com/company/${linkedin}`}
            icon={faLinkedinIn}
          />
        </ul>
        <div className="font-title text-xl my-6">{subtitle}</div>
        <div className="my-6 font-300 text-2xl">
          <span dangerouslySetInnerHTML={{ __html: content }} />
        </div>
      </Container>
    </Layout>
  );
}
