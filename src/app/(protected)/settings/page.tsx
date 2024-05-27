import { auth } from "@/auth"

import { signOutAction } from "@/actions/sign-out"
import { Button } from "@/components/ui/button"

export default async function SettingsPage() {
  const session = await auth()

  return (
    <div>
      <h1>SettingsPage</h1>
      <form
        action={signOutAction}
      >
        <Button
          type="submit"
        >
          Sign out
        </Button>
      </form>
      {JSON.stringify(session, null, 2)}
    </div>
  )
}
