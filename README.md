# SteamPulse

Check it out: https://steampulse.tgeo.dev

Example profile: https://steampulse.tgeo.dev/76561197991700585

This is a [T3 Stack](https://create.t3.gg/) project bootstrapped with `create-t3-app` called **SteamPulse**. SteamPulse displays key points of interest of a Steam user. 

I am a huge fan of the T3 Stack since it allows me to rapidly develop on both the backend and frontend with shared type safety.

## Setup
In the project root:

1. Copy the `.env.example` file and rename it to `.env`. Provide your `STEAM_API_KEY` in the file 
2. `pnpm i`
3. `pnpm dev`
4. Visit the dev server on localhost:3000

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
- Database integration
- Caching

## Technologies used

- [Next.js](https://nextjs.org)
- [Tailwind CSS](https://tailwindcss.com)
- [tRPC](https://trpc.io)
- [steamapi](https://www.npmjs.com/package/steamapi)

## Learn More

[Learn the T3 Stack](https://create.t3.gg/en/faq#what-learning-resources-are-currently-available)

You can also check out the [create-t3-app GitHub repository](https://github.com/t3-oss/create-t3-app)


