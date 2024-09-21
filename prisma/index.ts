import { PrismaClient } from '@prisma/client'
import { User } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const [user, post, totalPosts ] = await prisma.$transaction([
    prisma.user.create({
        data: {
            name: 'mike',
            email: 'mike@example.com',
            profile: {
                create: {
                    bio: 'I like turtles',
                }
            }
        }
    }),
    prisma.post.create({
        data: {
            title: 'sample post'
        }
    }),
    prisma.post.count(),
])

console.log(user, post, totalPosts)
}

main()
  .catch((e) => {
    throw e
  })
  .finally(async () => {
    await prisma.$disconnect()
  })