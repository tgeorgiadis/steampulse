import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "~/components/ui/card";
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

export const MostPlayedGameCard: React.FC<Props> = ({
  name,
  imageUrl,
  genres,
  totalHoursPlayed,
}) => {
  return (
    <Card className="border-none bg-white/10">
      <CardHeader className="flex flex-row items-center gap-4 pl-12">
        <div className="flex flex-col">
          <CardTitle className="text-2xl font-bold text-gray-50 dark:text-gray-300">
            Most Played Game
          </CardTitle>
          <CardDescription className="text-sm text-gray-400 dark:text-gray-500 text-right">
            {totalHoursPlayed} hours played
          </CardDescription>
        </div>
        <img
          alt="Most Played Game"
          className="w-18 overflow-hidden rounded-md border"
          height="100"
          src={imageUrl}
        />
        <div className="flex flex-col">
          <h3 className="text-xl font-bold text-gray-50 dark:text-gray-300">
            {name}
          </h3>
          <p className="text-sm text-gray-400 dark:text-gray-500">
            {convertGenresToCommaSeparatedString(genres)}
          </p>
        </div>
      </CardHeader>
    </Card>
  );
};
