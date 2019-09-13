import { graphql, useStaticQuery } from 'gatsby';
import Img from 'gatsby-image';
import React from 'react';

export default function Hero() {
  const data = useStaticQuery(graphql`
    query HeroQuery {
      hero: file(base: { eq: "hero.jpg" }) {
        childImageSharp {
          fluid {
            ...GatsbyImageSharpFluid
          }
        }
      }
      metadata: wordpressSiteMetadata(language: { eq: "en" }) {
        description
      }
    }
  `);
  return (
    <div className="hidden sm:block relative shadow">
      <Img
        fluid={data.hero.childImageSharp.fluid}
        imgStyle={{ objectPosition: 'top center' }}
        style={{ height: 350 }}
      />
      <div className="absolute top-0 left-0 right-0 container mx-auto">
        <div className="mx-6 py-6 text-2xl text-right">
          <span className="bg-f7100 opacity-75 inline-block -mr-1 p-1">
            {data.metadata.description}
          </span>
        </div>
      </div>
    </div>
  );
}
