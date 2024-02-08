import { z } from "zod";
import SteamAPI, { type UserSummary } from "steamapi";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { type SteamGenre } from "~/utils/steamHelper";

const steam = new SteamAPI(
  process.env.STEAM_API_KEY ?? "No STEAM_API_KEY defined in environment",
);

const SteamIdSchema = z.object({ steamId: z.string() })

export const steamRouter = createTRPCRouter({
  getUserSummary: publicProcedure
    .input(SteamIdSchema)
    .query(async ({ input }) => {
      const { steamId } = input;
      try {
        const userSummary = (await steam.getUserSummary(
          steamId,
        )) as UserSummary;
        return userSummary;
      } catch (error) {
        throw new Error("Failed to fetch Steam stats");
      }
    }),
  getRecentlyPlayedGames: publicProcedure
    .input(SteamIdSchema)
    .query(async ({ input }) => {
      const { steamId } = input;
      try {
        const recentGames = await steam.getUserRecentGames(steamId, 5);

        const recentGamesWithAdditionalInfo = await Promise.all(
          recentGames.map(async (recentGame) => {
            const gameInfo = await steam.getGameDetails(recentGame.game.id);
            return {
              gameInfo,
              totalHoursPlayed: Math.round(recentGame.minutes / 60),
              ...recentGame,
            };
          }),
        );

        return recentGamesWithAdditionalInfo;
      } catch (error) {
        console.error("Error getting recently played games: ", error);
        return [];
      }
    }),
  getMostPlayedGame: publicProcedure
    .input(SteamIdSchema)
    .query(async ({ input }) => {
      const { steamId } = input;
      try {
        const games = await steam.getUserOwnedGames(steamId, {
          includeAppInfo: true,
        });

        if (!games || games?.length === 0) {
          return null;
        }

        const mostPlayedGame = games.reduce((prevGame, currGame) => {
          return currGame.minutes > prevGame.minutes ? currGame : prevGame;
        });

        const gameInfo = await steam.getGameDetails(mostPlayedGame.game.id);

        return {
          name: gameInfo?.name as string,
          totalHoursPlayed: Math.round(mostPlayedGame.minutes / 60),
          headerImage: gameInfo?.header_image as string,
          genres: gameInfo?.genres as SteamGenre[],
        };
      } catch (error) {
        console.error("Error getting the most played game: ", error);
        return null;
      }
    }),

  getGeneralStats: publicProcedure
    .input(SteamIdSchema)
    .query(async ({ input }) => {
      const { steamId } = input;
      try {
        const games = await steam.getUserOwnedGames(steamId);
        const totalGameCount = games?.length ?? 0;

        const totalPlaytimeInMinutes = games?.reduce((acc, game) => {
          return acc + game.minutes;
        }, 0);

        const totalPlaytimeInHours = Math.round(totalPlaytimeInMinutes / 60);

        return {
          totalGameCount: totalGameCount,
          totalPlaytime: totalPlaytimeInHours,
        };
      } catch (error) {
        console.error("Error retrieving player game stats:", error);
        return {
          totalGameCount: 0,
          totalPlaytime: 0,
        };
      }
    }),
});
