"use client";

import { signIn, signOut, useSession } from "next-auth/react";

export const Headers = () => {
  const { data: session } = useSession();
  return (
    <div className="basis-16 flex flex-row justify-between items-center pr-10 pl-10">
      <div className="">hihi</div>
      <div className="">
        {!session && <a onClick={() => signIn()}>sign-in</a>}
      </div>
    </div>
  );
};
