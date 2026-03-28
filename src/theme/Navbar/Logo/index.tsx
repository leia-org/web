import React, { type ReactNode } from 'react';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import { useThemeConfig } from '@docusaurus/theme-common';

export default function NavbarLogo(): ReactNode {
  const { navbar: { logo } } = useThemeConfig();

  const logoSrc = useBaseUrl(logo?.src || '/img/LEIALogo.png');

  return (
    <Link
      to="/"
      className="relative z-20 mr-4 flex items-center space-x-2 px-2 py-1 text-sm font-normal text-black dark:text-white no-underline hover:no-underline">
      <img
        src={logoSrc}
        alt={logo?.alt || "LEIA Logo"}
        className="w-8 h-8 object-contain"
      />
      <span className="font-medium text-black dark:text-white">LEIA</span>
    </Link>
  );
}
