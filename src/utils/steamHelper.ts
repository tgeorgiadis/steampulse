export type SteamGenre = {
  id: number;
  description: string;
};

export const convertGenresToCommaSeparatedString = (genreList: SteamGenre[]) => {
  return genreList?.map((genre) => genre.description)?.join(", ");
};
