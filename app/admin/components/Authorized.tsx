import { useSession } from "blitz"

export const Authorized = () => {
  const session = useSession()

  if (session.isLoading) return <p>Loading...</p>
  if (session.role === "ADMIN") return <p>Authorized</p>

  return <p>Not authorized</p>
}

export default Authorized
