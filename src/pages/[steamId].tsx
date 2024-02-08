import { AvatarImage, AvatarFallback, Avatar } from "~/components/ui/avatar";
import { CardTitle, CardContent, Card } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { api } from "~/utils/api";
import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
import { LoadingSpinner } from "~/components/ui/loadingSpinner";
import { RecentlyPlayedGameCard } from "~/components/blocks/RecentlyPlayedGameCard";
import { MostPlayedGameCard } from "~/components/blocks/MostPlayedGameCard";
import { type SteamGenre } from "~/utils/steamHelper";
import { useState } from "react";

export default function ProfilePage() {
  const router = useRouter();
  const { steamId: rawSteamId } = router.query as { steamId: string };

  const steamId = rawSteamId ? rawSteamId : "";

  const {
    data: steamUserSummaryData,
    isLoading: steamUserSummaryDataIsLoading,
    isError: steamUserSummaryDataIsError,
  } = api.steam.getUserSummary.useQuery({
    steamId: steamId,
  });

  const {
    data: recentlyPlayedGamesData,
    isLoading: recentlyPlayedGamesIsLoading,
    isError: recentlyPlayedGamesIsError,
  } = api.steam.getRecentlyPlayedGames.useQuery({ steamId: steamId });

  const {
    data: mostPlayedGameData,
    isLoading: mostPlayedGameIsLoading,
    isError: mostPlayedGameIsError,
  } = api.steam.getMostPlayedGame.useQuery({
    steamId: steamId,
  });

  const { data: generalStatsData } = api.steam.getGeneralStats.useQuery({
    steamId: steamId,
  });

  const [popupMessage, setPopupMessage] = useState("");

  const handleCopyToClipboard = () => {
    const url = window.location.href;
    navigator.clipboard
      .writeText(url)
      .then(() => {
        setPopupMessage("The share link has been copied to your clipboard!");
        setTimeout(() => {
          setPopupMessage("");
        }, 3000); // Popup message disappears after 3 seconds
      })
      .catch((error) => console.error("Failed to copy:", error));
  };

  return (
    <>
      <Head>
        <title>SteamPulse</title>
        <meta name="description" content="Profile Page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <div className="container flex flex-col items-center justify-center gap-8 px-4 py-8">
          {/* Logo */}
          <Link href="/">
            <div className="text-center">
              <h1 className="text-lg font-extrabold tracking-tight text-white sm:text-[3rem]">
                Steam<span className="text-[hsl(280,100%,70%)]">Pulse</span>
              </h1>
            </div>
          </Link>

          {/* Loading Spinner */}
          {steamUserSummaryDataIsLoading && (
            <LoadingSpinner size={42} className="text-white" />
          )}

          {/* Failed to Fetch */}
          {steamUserSummaryDataIsError && (
            <>
              <h2 className="text-xl font-bold text-white">
                Failed to fetch user data
              </h2>
              <Link href="/">
                <Button>Try another Steam ID</Button>
              </Link>
            </>
          )}

          {/* User Profile */}
          {steamUserSummaryData && (
            <Card className="w-full max-w-screen-lg flex-col gap-4 rounded-xl border-none bg-white/10 p-4 text-white">
              <CardContent className="flex flex-col gap-4">
                <div className="flex flex-col gap-1.5">
                  <div className="flex items-center justify-center gap-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage
                        alt={steamUserSummaryData.nickname}
                        src={steamUserSummaryData.avatar.medium}
                      />
                      <AvatarFallback>
                        {steamUserSummaryData.nickname}
                      </AvatarFallback>
                    </Avatar>
                    <CardTitle className="text-3xl font-bold text-gray-50 dark:text-gray-300">
                      {steamUserSummaryData.nickname}
                    </CardTitle>
                  </div>
                </div>
                <div className="grid gap-2 md:grid-cols-2">
                  <div className="flex flex-col items-center justify-center gap-1.5">
                    <h2 className="text-xl font-semibold text-gray-50 dark:text-gray-300">
                      Total Games
                    </h2>
                    <p className="text-3xl font-bold text-gray-50 dark:text-gray-300">
                      {generalStatsData?.totalGameCount}
                    </p>
                  </div>
                  <div className="flex flex-col items-center justify-center gap-1.5">
                    <h2 className="text-xl font-semibold text-gray-50 dark:text-gray-300">
                      Total Playtime
                    </h2>
                    <p className="text-3xl font-bold text-gray-50 dark:text-gray-300">
                      {generalStatsData?.totalPlaytime} hours
                    </p>
                  </div>
                </div>
              </CardContent>

              <CardContent className="flex flex-col gap-4 pt-4 ">
                {/* Most Played */}
                {mostPlayedGameData && (
                  <MostPlayedGameCard
                    name={mostPlayedGameData.name}
                    imageUrl={mostPlayedGameData.headerImage}
                    genres={mostPlayedGameData.genres}
                    totalHoursPlayed={mostPlayedGameData.totalHoursPlayed}
                  />
                )}

                {/* Recently Played */}
                <div className="flex flex-col gap-2">
                  <h2 className="text-2xl font-bold text-gray-50 dark:text-gray-300">
                    Recently Played
                  </h2>
                  {recentlyPlayedGamesData?.length === 0 && (
                    <p className="text-sm text-gray-400 dark:text-gray-500">
                      No recently played games
                    </p>
                  )}
                  {recentlyPlayedGamesData?.map((game) => (
                    <RecentlyPlayedGameCard
                      key={game.game.id}
                      name={game.game.name}
                      imageUrl={game.gameInfo.header_image as string}
                      genres={game.gameInfo.genres as SteamGenre[]}
                      totalHoursPlayed={game.totalHoursPlayed}
                    />
                  ))}
                </div>

                <div className="flex flex-col items-center justify-center">
                  <Button onClick={handleCopyToClipboard} className="m-0">
                    Share Profile
                  </Button>
                  {popupMessage && (
                    <div className="text-sm">{popupMessage}</div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </>
  );
}
