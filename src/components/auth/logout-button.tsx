'use client'

import { logout } from '@/actions/logout';

interface LoginButtonProps {
  children?: React.ReactNode;
}

export function LogoutButton({
  children,
}: LoginButtonProps) {
  function onClick() {
    logout()
  }


  return (
    <span onClick={onClick} className="cursor-pointer">
      {children}
    </span>
  )
}
