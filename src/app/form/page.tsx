import { db } from "~/server/db";
import FormSelect from "~/app/form/_components/FormSelect";

export default async function FormPage() {
  const address = await db.query.regions.findMany({
    with: {
      cities: {
        with: {
          schools: true,
        },
      },
    },
  });

  return (
    <div>
      <h2>
        {"Zanim przejdziesz dalej, proszę wypełnij dodatkowe informacje!"}
      </h2>
      <p>
        {
          "To pomoże nam dowiedzieć się skąd są uczniowe i nauczyciele, którzy interesują się naszą uczelnią."
        }
      </p>
      <FormSelect data={address} />
    </div>
  );
}
