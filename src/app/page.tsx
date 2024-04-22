import { playfair_display } from "~/app/fonts";
import { db } from "~/server/db";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [lectures, stands] = await Promise.all([
    db.query.lectures.findMany({
      with: {
        room: true,
      },
    }),
    db.query.stands.findMany(),
  ]);

  return (
    <main>
      <div className="container mx-auto p-4">
        <div className="mb-8">
          <h2
            className={`my-8 text-5xl font-semibold ${playfair_display.className}`}
          >
            {"Nadchodzące wykłady i warsztaty"}
          </h2>
          <div className="flex w-full items-start justify-between gap-7">
            <div className="flex w-1/2 flex-col gap-4">
              {lectures
                .slice(0, Math.ceil(lectures.length / 2))
                .map(
                  (
                    {
                      title,
                      description,
                      type,
                      start,
                      end,
                      authors,
                      room: { floor, number },
                    },
                    index,
                  ) => (
                    <div
                      key={index}
                      className="relative mb-4 flex min-w-[400px] flex-col rounded-2xl border-2 border-black p-4"
                    >
                      <img
                        src={
                          type === "traditional"
                            ? "/lecture-icon.png"
                            : "/workshop-icon.png"
                        }
                        className={
                          "absolute left-0 top-0 z-[2] size-10 translate-x-[-50%] translate-y-[-50%] bg-gray-100"
                        }
                      ></img>
                      <div className="mb-2 flex flex-col items-baseline justify-between">
                        <h3
                          className={`text-3xl font-bold ${playfair_display.className}`}
                        >
                          {title}
                        </h3>
                        <h4
                          className={`text-2xl font-semibold ${playfair_display.className}`}
                        >
                          {authors}
                        </h4>
                      </div>
                      <p className="text-sm">{description}</p>
                      <div className="flex flex-row flex-wrap gap-2">
                        <div className="my-2 flex items-center">
                          <img
                            src={"/clock-icon.png"}
                            className={"mr-2 size-6"}
                          />
                          <p>
                            {"Od " +
                              start.toLocaleDateString() +
                              " do " +
                              end.toLocaleDateString()}
                          </p>
                        </div>
                        <div className="my-2 flex items-center">
                          <img
                            src={"/map-pin-icon.png"}
                            className={"mr-2 size-6"}
                          />
                          <p>{"Piętro " + floor + " sala " + number}</p>
                        </div>
                      </div>
                    </div>
                  ),
                )}
            </div>
            <div className="flex w-1/2 flex-col gap-4">
              {lectures
                .slice(Math.ceil(lectures.length / 2))
                .map(
                  (
                    {
                      title,
                      description,
                      type,
                      start,
                      end,
                      authors,
                      room: { floor, number },
                    },
                    index,
                  ) => (
                    <div
                      key={index}
                      className="relative mb-4 flex min-w-[400px] flex-col rounded-2xl border-2 border-black p-4"
                    >
                      <img
                        src={
                          type === "traditional"
                            ? "/lecture-icon.png"
                            : "/workshop-icon.png"
                        }
                        className={
                          "absolute left-0 top-0 z-[2] size-10 translate-x-[-50%] translate-y-[-50%] bg-gray-100"
                        }
                      ></img>
                      <div className="mb-2 flex flex-col items-baseline justify-between">
                        <h3
                          className={`text-3xl font-bold ${playfair_display.className}`}
                        >
                          {title}
                        </h3>
                        <h4
                          className={`text-2xl font-semibold ${playfair_display.className}`}
                        >
                          {authors}
                        </h4>
                      </div>
                      <p>{description}</p>
                      <div className="flex flex-row flex-wrap gap-2">
                        <div className="my-2 flex items-center">
                          <img
                            src={"/clock-icon.png"}
                            className={"mr-2 size-6"}
                          />
                          <p>
                            {"Od " +
                              start.toLocaleDateString() +
                              " do " +
                              end.toLocaleDateString()}
                          </p>
                        </div>
                        <div className="my-2 flex items-center">
                          <img
                            src={"/map-pin-icon.png"}
                            className={"mr-2 size-6"}
                          />
                          <p>{"Piętro " + floor + " sala " + number}</p>
                        </div>
                      </div>
                    </div>
                  ),
                )}
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h2
            className={`mb-4 text-5xl font-semibold ${playfair_display.className}`}
          >
            {"Stanowiska na wydarzeniu"}
          </h2>
          {stands.map(
            ({ name, description, type, location, imageUrl }, index) => (
              <div key={index} className="mb-10 flex items-center">
                <div className="flex-grow pr-10">
                  <h3
                    className={`text-3xl font-bold ${playfair_display.className}`}
                  >
                    {name}
                  </h3>
                  <p className="text-sm">{description}</p>
                  <div className={"my-4 flex items-center justify-center"}>
                    <img
                      src={"/map-pin-icon.png"}
                      alt={"Gdzie jest stanowisko?"}
                      className={"mr-2 size-6"}
                    />
                    <div className={"flex w-full items-center justify-between"}>
                      <p className="text-base">{location}</p>
                      <p className="gray-300 rounded border-2 px-9 py-2 text-base shadow-lg hover:border-gray-400 hover:bg-gray-300">
                        {"Zobacz na mapie"}
                      </p>
                    </div>
                  </div>
                </div>
                <img src={imageUrl} alt="Logo" className="ml-4 h-56 w-56" />
              </div>
            ),
          )}
        </div>
      </div>
    </main>
  );
}
