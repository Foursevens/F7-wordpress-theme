import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import BackgroundImage from 'gatsby-background-image';

import Image from './image';

export default function FooterDetails() {
  const data = useStaticQuery(graphql`
    query FooterQuery {
      footerImage: file(base: { eq: "map.png" }) {
        childImageSharp {
          sizes(quality: 100, maxWidth: 1200) {
            ...GatsbyImageSharpSizes
          }
        }
      }
      whiteLogoImage: file(base: { eq: "logo-w.png" }) {
        childImageSharp {
          fixed(width: 200) {
            ...GatsbyImageSharpFixed
          }
        }
      }
    }
  `);
  const imageData = data.footerImage.childImageSharp.sizes;
  return (
    <div className="bg-f7500 relative">
      <div className="absolute inset-0 container mx-auto w-full">
        <div className="md:w-1/2 lg:w-1/4">
          <div className=" absolute text-white font-300 text-xs leading-loose m-6 z-50">
            <Image loading="eager" file={data.whiteLogoImage} />
            <p>Rue d&apos;alost 7</p>
            <p>1000 Bruxelles</p>
            <p>Belgique</p>
            <p>info@foursevens.be</p>
            <p>+32 3 450 80 30</p>
          </div>
        </div>
      </div>
      <BackgroundImage
        className="w-full opacity-25 xl:w-2/5 md:w-1/2 sm:w-3/4 xl:opacity-100 lg:opacity-100 md:opacity-100 sm:opacity-75 h-64 ml-auto z-10"
        fluid={imageData}
        preserveStackingContext
      />
    </div>
  );
}
