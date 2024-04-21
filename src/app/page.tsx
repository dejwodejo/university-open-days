import { playfair_display } from "~/app/fonts";
import { mockLectures, mockStands } from "~/app/mockData";

export default function HomePage() {
  return (
    <main>
        <div className="container mx-auto p-4">
            <div className="mb-8">
                <h2 className={ `text-5xl font-semibold my-8 ${ playfair_display.className }` }>{ "Nadchodzące wykłady i warsztaty" }</h2>
                <div className="w-full flex justify-between items-start gap-7">
                    <div className="w-1/2 flex flex-col gap-4">
                        { mockLectures.slice( 0, Math.ceil( mockLectures.length / 2 ) ).map( ( {
                                                                                                   title,
                            description,
                                                                                                   type,
                                                                                                   start,
                                                                                                   location,
                                                                                                   author
                                                                                               }, index ) => (
                            <div key={ index }
                                 className="relative flex flex-col p-4 rounded-2xl border-black border-2 mb-4 min-w-[400px]">
                                <img src={ type === "lecture" ? "/lecture-icon.png" : "/workshop-icon.png" }
                                     className={ "absolute top-0 left-0 translate-x-[-50%] translate-y-[-50%] z-[2] size-10 bg-gray-100" }></img>
                                <div className="flex flex-col justify-between items-baseline mb-2">
                                    <h3 className={ `font-bold text-3xl ${ playfair_display.className }` }>{ title }</h3>
                                    <h4 className={ `font-semibold text-2xl ${ playfair_display.className }` }>{ author }</h4>
                                </div>
                                <p className="text-sm">{ description }</p>
                                <div className="flex flex-wrap flex-row gap-2">
                                    <div className="flex items-center my-2">
                                        <img src={ "/clock-icon.png" } className={ "size-6 mr-2" }/>
                                        <p>{ start }</p>
                                    </div>
                                    <div className="flex items-center my-2">
                                        <img src={ "/map-pin-icon.png" } className={ "size-6 mr-2" }/>
                                        <p>{ location }</p>
                                    </div>
                                </div>
                            </div>
                        ) ) }
                    </div>
                    <div className="w-1/2 flex flex-col gap-4">
                        { mockLectures.slice( Math.ceil( mockLectures.length / 2 ) ).map( ( {
                                                                                                title,
                                                                                                description,
                                                                                                type,
                                                                                                start,
                                                                                                location,
                                                                                                author
                                                                                            }, index ) => (
                            <div key={ index }
                                 className="relative flex flex-col p-4 rounded-2xl border-black border-2 mb-4 min-w-[400px]">
                                <img src={ type === "lecture" ? "/lecture-icon.png" : "/workshop-icon.png" }
                                     className={ "absolute top-0 left-0 translate-x-[-50%] translate-y-[-50%] z-[2] size-10 bg-gray-100" }></img>
                                <div className="flex flex-col justify-between items-baseline mb-2">
                                    <h3 className={ `font-bold text-3xl ${ playfair_display.className }` }>{ title }</h3>
                                    <h4 className={ `font-semibold text-2xl ${ playfair_display.className }` }>{ author }</h4>
                                </div>
                                <p>{ description }</p>
                                <div className="flex flex-wrap flex-row gap-2">
                                    <div className="flex items-center my-2">
                                        <img src={ "/clock-icon.png" } className={ "size-6 mr-2" }/>
                                        <p>{ start }</p>
                                    </div>
                                    <div className="flex items-center my-2">
                                        <img src={ "/map-pin-icon.png" } className={ "size-6 mr-2" }/>
                                        <p>{ location }</p>
                                    </div>
                                </div>
                            </div>
                        ) ) }
                    </div>
                </div>
            </div>


            <div className="mb-8">
                <h2 className={ `text-5xl font-semibold mb-4 ${ playfair_display.className }` }>{ "Stanowiska na wydarzeniu" }</h2>
                { mockStands.map( ( { title, description, location, logo }, index ) => (
                    <div key={ index } className="flex items-center mb-10">
                        <div className="flex-grow pr-10">
                            <h3 className={ `font-bold text-3xl ${ playfair_display.className }` }>{ title }</h3>
                            <p className="text-sm">{ description }</p>
                            <div className={ "flex justify-center items-center my-4" }>
                                <img src={ "/map-pin-icon.png" } alt={ "Gdzie jest stanowisko?" }
                                     className={ "size-6 mr-2" }/>
                                <div className={ "flex justify-between items-center w-full" }>
                                    <p className="text-base">{ location }</p>
                                    <p className="text-base py-2 px-9 shadow-lg rounded border-2 gray-300 hover:bg-gray-300 hover:border-gray-400">{ "Zobacz na mapie" }</p>
                                </div>
                            </div>
                        </div>
                        <img src={ logo } alt="Logo" className="h-56 w-56 ml-4"/>
                    </div>
                ) ) }
            </div>
        </div>
    </main>
  );
}
