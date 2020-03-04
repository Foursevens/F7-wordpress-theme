import classNames from 'classnames';
import { FormattedMessage } from 'gatsby-plugin-intl';
import PropTypes from 'prop-types';
import React from 'react';

import Button from './button';
import Container from './container';
import Title from './title';

export default function Section({
  actionMessageId,
  actionTo,
  children,
  striped,
  title,
}) {
  return (
    <section className={classNames('py-10', { 'bg-f7100': striped })}>
      <Container>
        <Title className="mt-0 mb-10">{title}</Title>
        {children}
        {actionMessageId && actionTo && (
          <div className="mt-10 text-center">
            <Button to={actionTo}>
              <FormattedMessage id={actionMessageId} />
            </Button>
          </div>
        )}
      </Container>
    </section>
  );
}

Section.defaultProps = {
  actionMessageId: undefined,
  actionTo: undefined,
  striped: false,
};

Section.propTypes = {
  actionMessageId: PropTypes.string,
  actionTo: PropTypes.string,
  children: PropTypes.node.isRequired,
  striped: PropTypes.bool,
  title: PropTypes.string.isRequired,
};
