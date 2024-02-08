import { Card, CardContent } from "~/components/ui/card";
import {
  convertGenresToCommaSeparatedString,
  type SteamGenre,
} from "~/utils/steamHelper";

interface Props {
  name: string;
  imageUrl: string;
  genres: SteamGenre[];
  totalHoursPlayed: number;
}

export const RecentlyPlayedGameCard: React.FC<Props> = ({
  name,
  imageUrl,
  genres,
  totalHoursPlayed
}) => {
  return (
    <Card className="border-none bg-white/10">
      <CardContent className="flex items-center gap-4">
        <img
          alt="Game cover"
          className="rounded-md"
          height="64"
          src={imageUrl}
          style={{
            aspectRatio: "64/64",
            objectFit: "cover",
          }}
          width="64"
        />
        <div className="flex flex-col">
          <h3 className="font-semibold text-gray-50 dark:text-gray-300">
            {name}
          </h3>
          <p className="text-sm text-gray-300 dark:text-gray-400">
            {totalHoursPlayed} hours played
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {convertGenresToCommaSeparatedString(genres)}
          </p>
        </div>
        {/* <Button size="sm">Play</Button> */}
      </CardContent>
    </Card>
  );
};
