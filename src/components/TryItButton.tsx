import React from 'react'
import Link from '@docusaurus/Link'
import { ArrowUpRight, MessageSquare, Mic } from 'lucide-react'

interface TryItButtonProps {
  href: string
  mode?: 'text' | 'voice'
  children?: React.ReactNode
}

// Small pill button for demo links inside docs tables (e.g. the Featured LEIAs index).
const TryItButton: React.FC<TryItButtonProps> = ({ href, mode = 'text', children = 'Try it' }) => {
  const Icon = mode === 'voice' ? Mic : MessageSquare

  return (
    <Link href={href} className="try-it-button" aria-label={`Try the ${mode} demo`}>
      <Icon size={14} aria-hidden="true" />
      <span>{children}</span>
      <ArrowUpRight size={14} aria-hidden="true" />
    </Link>
  )
}

export default TryItButton
