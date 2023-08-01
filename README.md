# Artificial Intelligence Frontend project based in Next 13 | Typescript

## Dev

First, create and add your initML api token in `.env.local`

```bash
NEXT_PUBLIC_API_KEY="<API_TOKEN>"
```

Run the development server:

```bash
# Do not forget to install dependencies
npm i

npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser.

> This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Structure

### /adapters

Connect the with the outside world.

### /app

Powered by NextJS, all your logic about routing/layout... Can be found here. if you don't know the NextJS structure check the official documentation : https://nextjs.org/docs/app/building-your-application/routing

### /components

Here you will find all reusable components

#### /components/atoms

Simplest atomic components.

#### /components/molecule

More complex components that can be build with multiples atoms.

#### /components/organism

Complex logic components with business logic.
# InitDrop-AI-Project
