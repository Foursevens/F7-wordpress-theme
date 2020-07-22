import PropTypes from 'prop-types';
import React from 'react';

import { Container, Title } from '../components';

export function ContentLayout({ children, title }) {
  return (
    <Container>
      <Title as="h1" className="text-5xl">
        {title}
      </Title>
      {children}
    </Container>
  );
}

ContentLayout.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
};
