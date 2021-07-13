import { Suspense } from "react"
import { BlitzPage, Link } from "blitz"

import Layout from "app/core/layouts/Layout"
import Authorized from "app/admin/components/Authorized"

const AdminPage: BlitzPage = () => {
  return (
    <main>
      <h1>Admin panel</h1>
      <Link href="/">Return home</Link>

      <Suspense fallback="Loading...">
        <Authorized />
      </Suspense>
    </main>
  )
}

AdminPage.suppressFirstRenderFlicker = true
AdminPage.getLayout = (page) => (
  <Suspense fallback="Loading...">
    <Layout title="Admin">{page}</Layout>
  </Suspense>
)

export default AdminPage
