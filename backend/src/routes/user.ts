import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign } from 'hono/jwt'
import { signupInput, signinInput } from "@100xdevs/medium-common";

export const userRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string;
        JWT_SECRET: string;
    }
}>();



userRouter.post('/signup', async (c) => {
    const body = await c.req.json();
    const { success } = signupInput.safeParse(body);
    if (!success) {
        c.status(411);
        return c.json({
            message: "Inputs not correct"
        })
    }
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
  
    try {
      const user = await prisma.user.create({
        data: {
          username: body.username,
          password: body.password,
          name: body.name
        }
      })
      const jwt = await sign({
        id: user.id
      }, c.env.JWT_SECRET);
  
      return c.text(jwt)
    } catch(e) {
      console.log(e);
      c.status(411);
      return c.text('Invalid')
    }
  })
  
  
  userRouter.post('/signin', async (c) => {
    const body = await c.req.json();
    const { success } = signinInput.safeParse(body);
    if (!success) {
        c.status(411);
        return c.json({
            message: "Inputs not correct"
        })
    }

    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
  
    try {
      const user = await prisma.user.findFirst({
        where: {
          username: body.username,
          password: body.password,
        }
      })
      if (!user) {
        c.status(403);
        return c.json({
          message: "Incorrect creds"
        })
      }
      const jwt = await sign({
        id: user.id
      }, c.env.JWT_SECRET);
  
      return c.text(jwt)
    } catch(e) {
      console.log(e);
      c.status(411);
      return c.text('Invalid')
    }
  })


  import { verify } from 'hono/jwt';

  userRouter.get('/profile', async (c) => {
      const authHeader = c.req.headers.get('Authorization');
      if (!authHeader) {
          c.status(401);
          return c.json({ message: "Unauthorized" });
      }
  
      try {
          const token = authHeader.split(" ")[1]; // Extract the token
          const payload = await verify(token, c.env.JWT_SECRET); // Verify the token
  
          const prisma = new PrismaClient({
              datasourceUrl: c.env.DATABASE_URL,
          }).$extends(withAccelerate());
  
          const user = await prisma.user.findUnique({
              where: { id: payload.id }, // Fetch the user by their ID from the JWT payload
              select: { id: true, name: true, username: true }, // Only select relevant fields
          });
  
          if (!user) {
              c.status(404);
              return c.json({ message: "User not found" });
          }
  
          return c.json({ user });
      } catch (e) {
          console.log(e);
          c.status(403);
          return c.json({ message: "Invalid or expired token" });
      }
  });
  