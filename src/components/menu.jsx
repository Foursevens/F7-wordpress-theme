import { Link } from 'gatsby-plugin-intl';
import React, { useCallback } from 'react';

const LINKS = [
  { title: 'Cases', to: '/cases' },
  { title: 'Blog', to: '/blog' },
  { title: 'Team', to: '/team' },
  { title: 'Jobs', to: '/jobs' },
  { title: 'Contact', to: '/contact' },
];

export default function Menu() {
  const handleKeyPress = useCallback((event) => {
    const menuItemElement = event.target.closest('li');
    switch (event.key) {
      default: {
        break;
      }
      case 'ArrowLeft': {
        const nextFocussedMenuItem =
          menuItemElement.previousSibling ||
          menuItemElement.closest('ul').lastChild;
        nextFocussedMenuItem.querySelector('a').focus();
        break;
      }
      case 'ArrowRight': {
        const nextFocussedMenuItem =
          menuItemElement.nextSibling ||
          menuItemElement.closest('ul').firstChild;
        nextFocussedMenuItem.querySelector('a').focus();
        break;
      }
    }
  });
  return (
    <nav className="max-w-sm mx-auto">
      <ul
        className="flex justify-between text-lg -mx-3"
        onKeyUp={handleKeyPress}
        role="presentation"
      >
        {LINKS.map(({ title, to }) => (
          <li key={title} role="menuitem">
            <Link
              activeClassName="bg-f7200 font-800"
              className="p-3 focusable rounded text-f7800"
              partiallyActive
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
