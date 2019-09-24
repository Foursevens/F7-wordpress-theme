import React from 'react';

import LanguageSwitch from './language-switch';
import Logo from './logo';
import Menu from './menu';

export default function NavigationBar() {
  return (
    <div className="bg-f7100 border-t-2 border-f7400 shadow">
      <div className="container mx-auto flex flex-wrap items-center justify-between">
        <div className="md:w-1/2 lg:w-1/4">
          <div className="m-6">
            <Logo />
          </div>
        </div>
        <div className="flex-1 lg:flex-initial md:w-1/2 lg:w-2/4 order-3 lg:order-2">
          <div className="m-6 mt-0 lg:mt-6">
            <Menu />
          </div>
        </div>
        <div className="order-2 lg:order-3 lg:w-1/4">
          <div className="m-6">
            <LanguageSwitch />
          </div>
        </div>
      </div>
    </div>
  );
}
