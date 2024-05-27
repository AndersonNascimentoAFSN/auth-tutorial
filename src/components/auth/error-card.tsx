
import { ExclamationTriangleIcon } from '@radix-ui/react-icons'
import { CardWrapper } from '@/components/auth/card-wrapper'


export function ErrorCard() {
  return (
    <CardWrapper
      headerLabel='Oops! something went wrong!'
      backButtonLabel='Back to login'
      backButtonHref='/auth/login'
    >
      <div className='w-full flex items-center justify-center'>
        <ExclamationTriangleIcon className="h-8 w-8 text-destructive" />
      </div>
    </CardWrapper>
  )
}
