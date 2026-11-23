import React, {type ReactNode} from 'react'
import Link from '@docusaurus/Link'
import isInternalUrl from '@docusaurus/isInternalUrl'
import {useThemeConfig} from '@docusaurus/theme-common'
import IconExternalLink from '@theme/Icon/ExternalLink'

type FooterItem = {
  label?: string
  to?: string
  href?: string
}

type FooterColumn = {
  title?: string | null
  items: FooterItem[]
}

function FooterLink({item}: {item: FooterItem}): ReactNode {
  const {label, to, href} = item
  const external = Boolean(href) && !isInternalUrl(href)
  return (
    <Link
      className="inline-flex items-center gap-1 text-sm text-gray-400 transition-colors hover:text-white hover:no-underline"
      {...(href ? {href} : {to})}>
      {label}
      {external && <IconExternalLink />}
    </Link>
  )
}

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear()
  const {footer} = useThemeConfig()
  const columns = ((footer?.links ?? []) as Array<FooterColumn | FooterItem>).filter(
    (link): link is FooterColumn => 'items' in link,
  )

  return (
    <footer id="contacto" className="bg-black text-white">
      <div className="container-max py-16">
        {columns.length > 0 && (
          <div className="mb-12 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {columns.map((column, i) => (
              <div key={i}>
                {column.title && (
                  <div className="mb-4 text-sm font-semibold uppercase tracking-wide text-white">
                    {column.title}
                  </div>
                )}
                <ul className="m-0 list-none space-y-3 p-0">
                  {column.items.map((item, j) => (
                    <li key={j}>
                      <FooterLink item={item} />
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}

        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-gray-400 text-sm">
              © {currentYear} LEIA Team. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
