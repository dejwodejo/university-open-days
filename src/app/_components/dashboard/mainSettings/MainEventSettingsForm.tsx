"use client";

import TitleForm from "./TitleForm";
import DateForm from "./DateForm";
import OrganizatorForm from "./OrganizatorForm";

interface MainEventSettingsFormProps {
  currentSettings: {
    title: string | null | undefined;
    date: Date | null | undefined;
    organizer: string | null | undefined;
  };
  organizators: { name: string; value: string }[];
}

export default function MainEventSettingsForm({
  currentSettings: { title, date, organizer },
  organizators,
}: MainEventSettingsFormProps) {
  return (
    <>
      <TitleForm currTitle={title} />
      <DateForm currDate={date} />
      <OrganizatorForm currOrg={organizer} orgs={organizators} />
    </>
  );
}
