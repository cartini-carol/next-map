"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";

export const Headers = () => {
  const { data: session } = useSession();

  return (
    <div className="basis-16 flex flex-row justify-between items-center pr-10 pl-10">
      <div className="">hihi</div>
      <div className="">
        {session && session.user && (
          <div className="flex flex-row items-center gap-2">
            <Image
              src={session.user.image as string}
              width={28}
              height={28}
              alt={"profile"}
            />
            <div className="">{session.user?.name}</div>
          </div>
        )}
        {!session && <a onClick={() => signIn()}>sign-in</a>}
      </div>
    </div>
  );
};
