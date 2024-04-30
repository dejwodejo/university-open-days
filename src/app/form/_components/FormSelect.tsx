import { Select, SelectItem } from "@nextui-org/select";

type SelectOption = {
  name: string;
  [key: string]: any;
};

type FormSelectProps = {
  data: SelectOption[];
};

export default function FormSelect({ data }: FormSelectProps) {
  return (
    <div>
      <Select
        label="Wybierz województwo, w którym chodzisz do szkoły."
        className="max-w-xs"
      >
        {data.map(({ name }) => (
          <SelectItem key={name} value={name}>
            {name}
          </SelectItem>
        ))}
      </Select>
    </div>
  );
}
