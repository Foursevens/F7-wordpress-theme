import { Link } from 'gatsby-plugin-intl';
import React from 'react';

const LINKS = [
  { title: 'Cases', to: '/cases' },
  { title: 'Blog', to: '/blog' },
  { title: 'Team', to: '/team' },
  { title: 'Jobs', to: '/jobs' },
  { title: 'Contact', to: '/contact' },
];

const getLinkProps = ({ isPartiallyCurrent }) =>
  isPartiallyCurrent
    ? { className: 'bg-f7200 focusable p-3 font-800 rounded text-f7800' }
    : null;

export default function Menu() {
  return (
    <nav className="max-w-sm mx-auto">
      <ul className="flex justify-between text-lg -mx-3">
        {LINKS.map(({ title, to }) => (
          <li key={title}>
            <Link
              className="focusable p-3 text-f7800"
              getProps={getLinkProps}
              to={to}
            >
              {title}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
