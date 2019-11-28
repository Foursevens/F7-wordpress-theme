import PropTypes from 'prop-types';
import React from 'react';

export default function SideBarItem({ children, title }) {
  return (
    <>
      <h3 className="font-900 font-title mt-6 text-2xl">{title}</h3>
      {children}
    </>
  );
}

SideBarItem.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.node.isRequired,
};
