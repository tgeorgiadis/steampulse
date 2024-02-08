# SteamPulse

Check it out at https://steampulse.tgeo.dev

This is a [T3 Stack](https://create.t3.gg/) project bootstrapped with `create-t3-app` called **SteamPulse**. SteamPulse displays key points of interest of a Steam user. 

I am a huge fan of the T3 Stack since it allows me to rapidly develop on both the backend and frontend with shared type safety.

## Setup
`pnpm i`

`pnpm dev`

## Main files of interest

Most of the files in this project are boilerplatey and set up by `create-t3-app`. I recommend looking at these files for the core functionality:

- `src/pages/index.tsx` - The homepage where the user enters the Steam ID of the Steam user they want to see
- `src/pages/[steamId].tsx` - The page that displays key points of interest of a Steam user
- `src/server/api/routers/steam.ts` - Contains the backend routes the frontend hits to fetch data of a Steam user

## Todo
- Unit Tests
- Better Mobile Responsiveness

## Nice to haves
- Authentication
- Caching

## Technologies used

- [Next.js](https://nextjs.org)
- [Tailwind CSS](https://tailwindcss.com)
- [tRPC](https://trpc.io)
- [steamapi](https://www.npmjs.com/package/steamapi)

## Learn More

[Learn the T3 Stack](https://create.t3.gg/en/faq#what-learning-resources-are-currently-available)

You can also check out the [create-t3-app GitHub repository](https://github.com/t3-oss/create-t3-app)


