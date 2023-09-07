"use client";

import { Switch } from "app/_components/checkbox/switch";
import { Headers } from "app/_components/headers";
import { ChangeEvent } from "react";

export const MapHeaders: React.FC = () => {
  return (
    <Headers>
      <menu className="flex flex-row gap-8 pt-2 pb-2">
        <li className="flex flex-row gap-2">
          <Switch
            id="franchiseType"
            label="프랜차이즈"
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              e.target.checked;
            }}
          />
        </li>
      </menu>
    </Headers>
  );
};
