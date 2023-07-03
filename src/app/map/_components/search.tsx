"use client";

import { Map } from "ol";
import { ChangeEvent, FunctionComponent, useState } from "react";
import { useMapStore } from "../_store/map";

export const SearchBar: FunctionComponent = () => {
  const map: Map = useMapStore((state: any) => state.map);

  const [search, setSearch] = useState<string>("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    setSearch(e.target.value as string);
  };

  return (
    <input
      className="absolute top-5 start-14 h-8 text-base text-stone-900"
      onChange={handleChange}
      value={search}
    />
  );
};
