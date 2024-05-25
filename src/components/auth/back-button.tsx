"use client"

import { ComponentProps } from 'react'
import Link from 'next/link'

import { Button } from '@/components/ui/button'

interface BackButtonProps extends ComponentProps<typeof Link> {
  label: string
  href: string
}

export function BackButton({ label, href, ...rest }: BackButtonProps) {
  return (
    <Button
      variant="link"
      className='font-normal w-full'
      size="sm"
      asChild
    >
      <Link
        href={href}
        {...rest}
      >
        {label}
      </Link>
    </Button>
  )
}
