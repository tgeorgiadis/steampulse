import Head from "next/head";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useRouter } from "next/router";

type Inputs = {
  steamId: string;
};

export default function Home() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) =>
    router.push(`/${data.steamId}`);

  return (
    <>
      <Head>
        <title>SteamPulse</title>
        <meta name="description" content="Level Up Your Gaming" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
          <div className="text-center">
            <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
              Steam<span className="text-[hsl(280,100%,70%)]">Pulse</span>
            </h1>
            <h3 className="text-2xl font-bold text-white">
              Level Up Your Gaming
            </h3>
          </div>

          <form
            className="flex w-3/12 flex-col gap-4 rounded-xl bg-white/10 p-4 text-center text-white"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div>
              <label htmlFor="steamId" className="block text-base">
                Enter your Steam ID below
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  id="steamId"
                  className="block w-full rounded-md border-0 px-2 py-1.5 text-center text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="76561198833313974"
                  {...register("steamId", { pattern: /^\d{17}$/, minLength: 17, maxLength: 17 })}
                />
                {errors.steamId && (
                  <p className="text-red-500 text-xs mt-1">
                    Please enter a valid Steam ID
                  </p>
                )}
              </div>
            </div>
            <input
              type="submit"
              className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              value="git gud now"
            />
          </form>
        </div>
      </main>
    </>
  );
}
