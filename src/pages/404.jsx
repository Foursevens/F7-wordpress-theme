import React from 'react';

import { Container, Layout, SEO, Title } from '../components';

export default function NotFoundPage() {
  return (
    <Layout>
      <SEO title="404: Not found" />
      <Container>
        <Title as="h1" className="text-5xl">
          Not Found
        </Title>
        <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
      </Container>
    </Layout>
  );
}
