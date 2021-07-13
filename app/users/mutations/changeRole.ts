import { resolver } from "blitz"
import db from "db"
import * as z from "zod"

export const ChangeRole = z.object({
  role: z.enum(["USER", "ADMIN"]),
})

export default resolver.pipe(resolver.zod(ChangeRole), resolver.authorize(), async (data, ctx) => {
  const user = await db.user.update({
    where: { id: ctx.session.userId },
    data,
  })

  await ctx.session.$setPublicData({ role: data.role })

  return user
})
