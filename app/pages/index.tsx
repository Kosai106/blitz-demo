import { Suspense } from "react"
import { BlitzPage, Link, Routes, useMutation } from "blitz"

import Layout from "app/core/layouts/Layout"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import changeRole from "app/users/mutations/changeRole"
import logout from "app/auth/mutations/logout"

const UserInfo = () => {
  const currentUser = useCurrentUser()
  const [logoutMutation] = useMutation(logout)

  if (currentUser) {
    return (
      <>
        <button
          style={{ marginBottom: "1rem" }}
          onClick={async () => {
            await logoutMutation()
          }}
        >
          Logout
        </button>
        <div>
          User id: <code>{currentUser.id}</code>
          <br />
          User role: <code>{currentUser.role}</code>
        </div>
      </>
    )
  } else {
    return (
      <>
        <Link href={Routes.SignupPage()}>
          <a className="button small">
            <strong>Sign Up</strong>
          </a>
        </Link>
        <Link href={Routes.LoginPage()}>
          <a className="button small">
            <strong>Login</strong>
          </a>
        </Link>
      </>
    )
  }
}

const Home: BlitzPage = () => {
  const [changeRoleMutation] = useMutation(changeRole)

  return (
    <main>
      <h1>Home</h1>
      <Link href="/admin">Go to admin panel</Link>

      <div style={{ marginTop: "2rem", marginBottom: "2rem" }}>
        <Suspense fallback="Loading...">
          <UserInfo />
        </Suspense>
      </div>

      <button
        style={{ marginRight: "1rem" }}
        onClick={async () => {
          try {
            await changeRoleMutation({
              role: "ADMIN",
            })
          } catch (error) {
            console.error(error)
          }
        }}
      >
        Set ADMIN role
      </button>

      <button
        onClick={async () => {
          try {
            await changeRoleMutation({
              role: "USER",
            })
          } catch (error) {
            console.error(error)
          }
        }}
      >
        Set USER role
      </button>
    </main>
  )
}

Home.suppressFirstRenderFlicker = true
Home.getLayout = (page) => <Layout title="Home">{page}</Layout>

export default Home
