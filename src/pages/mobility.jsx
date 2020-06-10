// import { MobilityWidget } from 'f7-mobility-widget';
// import F7Background from 'f7-mobility-widget/assets/background.jpg';
// import { graphql } from 'gatsby';
// import React from 'react';

// import { SEO, Title } from '../components';
// import { ContentLayout, MainLayout } from '../layout';

// export const query = graphql`
//   query MobilityPage {
//     site {
//       siteMetadata {
//         mobilityWidget {
//           apiKey
//         }
//       }
//     }
//   }
// `;

// export default function MobilityPage({
//   data: {
//     site: {
//       siteMetadata: { mobilityWidget },
//     },
//   },
// }) {
//   return (
//     <MainLayout>
//       <SEO title="Mobility" />
//       <ContentLayout title="Mobility">
//         <MobilityWidget
//           apiKey={mobilityWidget.apiKey}
//           background={F7Background}
//         />
//       </ContentLayout>
//     </MainLayout>
//   );
// }
