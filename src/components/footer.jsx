import { graphql, useStaticQuery } from 'gatsby';
import BackgroundImage from 'gatsby-background-image';
import React from 'react';

import Image from './image';

export default function FooterDetails() {
  const data = useStaticQuery(graphql`
    query FooterQuery {
      mapImage: file(base: { eq: "map.png" }) {
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
  const { mapImage, whiteLogoImage } = data;
  return (
    <div className="bg-f7500 relative">
      <div className="absolute inset-0 container mx-auto w-full">
        <div className="md:w-1/2 lg:w-1/4">
          <div className="absolute text-white font-300 text-xs leading-loose m-6 z-10">
            <Image file={whiteLogoImage} loading="eager" />
            <address>
              <div>Rue d&apos;alost 7</div>
              <div>1000 Bruxelles</div>
              <div>Belgique</div>
              <div>info@foursevens.be</div>
              <div>+32 3 450 80 30</div>
            </address>
          </div>
        </div>
      </div>
      <BackgroundImage
        className="w-full opacity-25 xl:w-2/5 md:w-1/2 sm:w-3/4 xl:opacity-100 lg:opacity-100 md:opacity-100 sm:opacity-75 h-64 ml-auto z-10"
        fluid={mapImage.childImageSharp.sizes}
        preserveStackingContext
      />
    </div>
  );
}
