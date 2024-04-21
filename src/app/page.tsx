import Image from "next/image";
import { playfair_display } from "~/app/fonts";

const mockLectures = [
    { title: 'Event Title 1', time: '12:00', location: 'Location 1' },
    { title: 'Event Title 2', time: '15:00', location: 'Location 2' },
];

const mockStands = [
    {
        title: 'Wydział Nauk Społecznych',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',
        location: 'A-29 Piętro II, obok sali 205 >',
        logo: 'https://utfs.io/f/d0520383-662e-4dcc-8d19-5a355de2a771-ek9pyc.png',
    },
    {
        title: 'Wydział Informatyki, Elektrotechniki i Automatyki',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',
        location: 'A-29 Piętro II, obok sali 205 >',
        logo: 'https://utfs.io/f/81c58550-c042-4b26-824b-c7ecfcdcf8c9-3xsb20.png'
    },
    {
        title: 'Wydział Prawa i Administracji',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',
        location: 'A-29 Piętro II, obok sali 202 >',
        logo: 'https://utfs.io/f/29fff066-9b7d-4630-b411-cffb0d2bb091-69nhq6.png'
    },
    {
        title: 'Wydział Nauk Biologicznych',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',
        location: 'A-29 Piętro I, obok sali 102 >',
        logo: 'https://utfs.io/f/53be313c-0d52-4f6a-98a1-46cc72306dfa-mm3gbp.png'
    },
    {
        title: 'Wydział Matematyki, Informatyki i Ekonometrii',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',
        location: 'A-29 Piętro I, obok sali 105 >',
        logo: 'https://utfs.io/f/07b66c08-19cc-4c8c-a944-f2ae762ca077-x92ogu.png'
    },
]

export default function HomePage() {
  return (
    <main>
        <div className="container mx-auto p-4">
            <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4">Upcoming Events</h2>
                {mockLectures.map((event, index) => (
                    <div key={index} className="mb-4">
                        <div className="text-lg font-bold">{event.title}</div>
                        <div className="text-sm">{event.time} - {event.location}</div>
                    </div>
                ))}
            </div>

            <div className="mb-8">
                <h2 className={ `text-5xl font-semibold mb-4 ${playfair_display.className}` }>{"Stanowiska na wydarzeniu"}</h2>
                { mockStands.map(({title, description, location, logo}, index) => (
                    <div key={index} className="flex items-center mb-10">
                        <div className="flex-grow pr-10">
                            <h3 className={ `font-bold text-3xl ${playfair_display.className}` }>{title}</h3>
                            <p className="text-sm">{description}</p>
                            <div className={"flex justify-center items-center my-4"}>
                                <img src={"/map-pin-icon.png"} alt={"Gdzie jest stanowisko?"} className={"w-8 h-8"}/>
                                <div className={"flex justify-between items-center w-full"}>
                                    <p className="text-base">{ location }</p>
                                    <p className="text-base py-2 px-9 shadow-lg rounded border-2 border-black hover:bg-gray-300">{ "Zobacz na mapie" }</p>
                                </div>
                            </div>
                        </div>
                        <img src={ logo } alt="Logo" className="h-56 w-56 ml-4" />
                    </div>
                ))}
            </div>
        </div>
    </main>
  );
}
