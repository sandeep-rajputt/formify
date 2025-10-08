"use client";
import Image from "next/image";
import { useSession } from "next-auth/react";
function TivoraUserMessage({ message }: { message: string }) {
  const { data: session } = useSession();
  let imageUrl = "/user.svg";
  if (session) {
    imageUrl = session.user?.image;
  }

  return (
    <div className="grid grid-cols-[auto_1fr] gap-2 my-2 px-3 py-2">
      <div>
        <Image
          src={imageUrl}
          alt="user-icon"
          width={26}
          height={26}
          className="rounded-full"
        />
      </div>
      <div className="self-center">
        <p className="text-[15px] wrap-anywhere">{message}</p>
      </div>
    </div>
  );
}

export default TivoraUserMessage;
