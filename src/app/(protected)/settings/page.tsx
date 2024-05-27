import { auth, signOut } from "@/auth"
import { Button } from "@/components/ui/button"
import { DEFAULT_LOGIN_PAGE_REDIRECT } from "@/routes"

export default async function SettingsPage() {
  const session = await auth()

  return (
    <div>
      <h1>SettingsPage</h1>
      <form action={async () => {
        "use server"
        await signOut({
          redirectTo: DEFAULT_LOGIN_PAGE_REDIRECT,
        })
      }}>
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
