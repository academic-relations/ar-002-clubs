"use client";

import React, { useState } from "react";

import SearchSelect from "@sparcs-clubs/web/common/components/Forms/SearchSelect";

const DaystarPage: React.FC = () => {
  const [content, setContent] = useState("");
  const [selected, setSelected] = useState("");

  const [errorMessage, setErrorMessage] = useState("");

  const options = [
    "apple",
    "banana",
    "cherry",
    "date",
    "elderberry",
    "하하",
    "하하호호",
    "fapple",
    "fbanana",
    "fcherry",
    "fdate",
    "felderberry",
    "f하하",
    "f하하호호",
  ];

  const handleSelect = (value: string) => {
    setSelected(value);
    if (value === "") {
      setErrorMessage("항목을 선택해 주세요");
    } else {
      setErrorMessage("");
    }
  };

  return (
    <div>
      <h1>Daystar Page</h1>
      <div>{`Selected : ${selected}`}</div>
      <SearchSelect
        placeholder="placeholder"
        handleChange={setContent}
        value={content}
        options={options}
        selected={selected}
        setSelected={handleSelect}
        errorMessage={errorMessage}
      />
    </div>
  );
};

export default DaystarPage;
