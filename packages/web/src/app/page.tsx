"use client";

import ExampleComponent from "@sparcs-clubs/web/common/components/ExampleComponent";
import Select from "../common/components/Forms/Select";
import PhoneInput from "../common/components/Forms/PhoneInput";
import TextInput from "../common/components/Forms/TextInput";
import RentalInput from "../common/components/Forms/RentalInput";

const items: SelectItem[] = [
  { label: "Option 1", value: "option1", selectable: true },
  { label: "Option 2", value: "option2", selectable: true },
  { label: "Option 3", value: "option3", selectable: false },
];

const Home = () => (
  <ExampleComponent>
    Welcome to SPARCS Clubs! The frontend is working well!
    <TextInput
      label="Label"
      placeholder="내용"
      errorMessage="에러 메세지"
      required
    />
    <Select items={items} />
    <PhoneInput />
    <RentalInput />
  </ExampleComponent>
);

export default Home;
