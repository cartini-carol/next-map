"use client";

import { Map } from "ol";
import { ChangeEvent, FunctionComponent, useState } from "react";
import { useMapStore } from "../_store/map";

export const SearchForm: FunctionComponent = () => {
  const map: Map = useMapStore((state: any) => state.map);

  const [search, setSearch] = useState<string>("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    setSearch(e.target.value as string);
  };

  return (
    <form className="absolute top-5 start-14 bg-white text-stone-900 shadow-sm p-4">
      <div>
        <div className="flex gap-1">
          <input
            type="checkbox"
            id="OPERATION"
            name="status"
            value="OPERATION"
          />
          <label htmlFor="OPERATION" id="OPERATION">
            운영
          </label>
        </div>
      </div>
      <input
        className="h-8 text-base text-stone-900 "
        onChange={handleChange}
        value={search}
      />
    </form>
  );
};
