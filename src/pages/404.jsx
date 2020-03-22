import React from 'react';

import { SEO } from '../components';
import { ContentLayout, MainLayout } from '../layout';

export default function NotFoundPage() {
  return (
    <MainLayout>
      <SEO title="404: Not found" />
      <ContentLayout>
        <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
      </ContentLayout>
    </MainLayout>
  );
}
