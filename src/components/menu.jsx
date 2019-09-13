import { Link } from 'gatsby-plugin-intl';
import React from 'react';

const LINKS = [
  { title: 'Cases', to: '/cases' },
  { title: 'Blog', to: '/blog' },
  { title: 'Team', to: '/team' },
  { title: 'Jobs', to: '/jobs' },
];

export default function Menu() {
  return (
    <nav className="max-w-sm mx-auto">
      <ul className="flex justify-between text-lg -mx-3">
        {LINKS.map(({ title, to }) => (
          <li key={title}>
            <Link
              activeClassName="bg-f7200 font-bold"
              className="p-3 focusable rounded text-f7800"
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
