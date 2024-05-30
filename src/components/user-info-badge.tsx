import { Badge } from '@/components/ui/badge'

export interface UserInfoBadgeProps {
  isTwoFactorEnabled: boolean | undefined
}

export function UserInfoBadge({ isTwoFactorEnabled }: UserInfoBadgeProps) {
  return (
    <Badge variant={isTwoFactorEnabled ? "success" : "destructive"}>
      {isTwoFactorEnabled ? 'ON' : 'OFF'}
    </Badge>
  )
}
