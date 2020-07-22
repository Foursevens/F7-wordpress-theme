import { useStaticQuery, graphql } from 'gatsby';
import { useIntl } from 'gatsby-plugin-intl';
import PropTypes from 'prop-types';
import React from 'react';
import { Helmet } from 'react-helmet';

import { Facebook } from './facebook';
import { Twitter } from './twitter';

const YEAR = new Date().toISOString().slice(0, 'YYYY'.length);

const query = graphql`
  query SEO {
    hero: file(base: { eq: "hero.jpg" }) {
      childImageSharp {
        fluid {
          src
        }
      }
    }
    site {
      buildTime(formatString: "YYYY-MM-DD")
      siteMetadata {
        contact {
          twitter
        }
        defaultAuthor: author
        siteUrl
      }
    }
    wordpressSiteMetadata {
      defaultTitle: name
      headline: description
    }
  }
`;

export function SEO({ author, article, banner, description, pathname, title }) {
  const {
    hero: {
      childImageSharp: {
        fluid: { src: defaultBanner },
      },
    },
    site: {
      buildTime,
      siteMetadata: {
        defaultAuthor,
        contact: { twitter },
        siteUrl,
      },
    },
    wordpressSiteMetadata: { defaultTitle, headline },
  } = useStaticQuery(query);

  const { locale: siteLanguage } = useIntl();
  const siteHomepage = `${siteUrl}/${siteLanguage}`;

  const defaultDescription = headline;
  const seo = {
    author: author || defaultAuthor,
    description: description || defaultDescription,
    image: `${siteUrl}${banner || defaultBanner}`,
    title: title ? `${defaultTitle} – ${title}` : defaultTitle,
    url: `${siteUrl}${pathname || ''}`,
  };

  // schema.org in JSONLD format
  // https://developers.google.com/search/docs/guides/intro-structured-data
  // You can fill out the 'author', 'creator' with more data or another type (e.g. 'Organization')

  const schemaOrgWebPage = {
    '@context': 'http://schema.org',
    '@type': 'WebPage',
    author: { '@type': 'Person', name: seo.author },
    copyrightHolder: { '@type': 'Person', name: seo.author },
    copyrightYear: YEAR,
    creator: { '@type': 'Person', name: seo.author },
    dateModified: buildTime,
    // TODO datePublished: '2019-01-18T10:30:00+01:00',
    description: defaultDescription,
    headline,
    image: { '@type': 'ImageObject', url: `${siteUrl}${defaultBanner}` },
    inLanguage: siteLanguage,
    mainEntityOfPage: siteHomepage,
    name: defaultTitle,
    publisher: { '@type': 'Person', name: seo.author },
    url: siteHomepage,
  };

  // Initial breadcrumb list

  const itemListElement = [
    {
      '@type': 'ListItem',
      item: { '@id': siteHomepage, name: 'Homepage' },
      position: 1,
    },
  ];

  let schemaArticle = null;
  if (article) {
    schemaArticle = {
      '@context': 'http://schema.org',
      '@type': 'Article',
      author: { '@type': 'Person', name: seo.author },
      copyrightHolder: { '@type': 'Person', name: seo.author },
      copyrightYear: '2019',
      creator: { '@type': 'Person', name: seo.author },
      publisher: {
        '@type': 'Organization',
        logo: { '@type': 'ImageObject', url: `${siteUrl}${defaultBanner}` },
        name: seo.author,
      },
      description: seo.description,
      headline: seo.title,
      inLanguage: siteLanguage,
      url: seo.url,
      name: seo.title,
      image: { '@type': 'ImageObject', url: seo.image },
      mainEntityOfPage: seo.url,
    };
    // Push current blogpost into breadcrumb list
    itemListElement.push({
      '@type': 'ListItem',
      item: { '@id': seo.url, name: seo.title },
      position: 2,
    });
  }

  const breadcrumb = {
    '@context': 'http://schema.org',
    '@type': 'BreadcrumbList',
    description: 'Breadcrumbs list',
    itemListElement,
    name: 'Breadcrumbs',
  };

  return (
    <>
      <Helmet title={seo.title}>
        <html lang={siteLanguage} />
        <meta content={seo.description} name="description" />
        <meta content={seo.image} name="image" />
        {article ? (
          <script type="application/ld+json">
            {JSON.stringify(schemaArticle)}
          </script>
        ) : (
          <script type="application/ld+json">
            {JSON.stringify(schemaOrgWebPage)}
          </script>
        )}
        <script type="application/ld+json">{JSON.stringify(breadcrumb)}</script>
      </Helmet>
      <Facebook
        description={seo.description}
        image={seo.image}
        locale={siteLanguage}
        // name={facebook} // Could be enabled when we have a facebook page
        title={seo.title}
        type={article ? 'article' : 'website'}
        url={seo.url}
      />
      <Twitter
        description={seo.description}
        image={seo.image}
        title={seo.title}
        username={twitter}
      />
    </>
  );
}

SEO.defaultProps = {
  article: false,
  author: null,
  banner: null,
  description: null,
  pathname: null,
  title: null,
};

SEO.propTypes = {
  article: PropTypes.bool,
  author: PropTypes.string,
  banner: PropTypes.string,
  description: PropTypes.string,
  pathname: PropTypes.string,
  title: PropTypes.string,
};
