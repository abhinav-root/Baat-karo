import { Button } from "@/components/ui/button";
import { logout, validateRequest } from "@/lucia";

export default async function Home() {
  const { user, session } = await validateRequest();
  return (
    <main className="min-h-screen">
      Home Page
      <h1>{JSON.stringify(user)}</h1>
      <h1>{JSON.stringify(session)}</h1>
      <form action={async () => {
        "use server"
        await logout()
      }}>
      <Button>Signout</Button>

      </form>
    </main>
  );
}
