import { Suspense } from "react";
import { RoomAccessForm } from "@/components/room-access-form";

interface PageProps {
  searchParams: Promise<{ room: string }>;
}

export default async function Page({ searchParams }: PageProps) {
  const roomId = (await searchParams).room;

  return (
    <>
      <main className="relative flex min-h-full w-full flex-col overflow-hidden dark min-[1189px]:flex-row bg-white dark:bg-white">
        <div className="flex w-full min-h-[500px] flex-col justify-center p-4 min-[560px]:p-8 min-[1189px]:w-5/12 min-[1189px]:items-center bg-black">
          <div className="w-full max-w-xl">
            <h1 className="flex flex-col text-start text-4xl font-bold tracking-tight sm:text-5xl items-center">
              <span>NOW SYNC</span>
              <span className="flex items-end gap-2 min-[1189px]:items-center">
                <span>WITH</span>
                <span className="bg-gradient-to-r from-[#00C6FF] to-[#007FFF] bg-clip-text text-transparent drop-shadow-[0_0_8px_rgba(255,255,255,0.1)]">
                  NetSync
                </span>
              </span>
            </h1>
            <div className="flex text-lg sm:text-xl text-foreground/90 whitespace-pre-line justify-center">
              <p>Collaborative real-time coding and execution</p>
            </div>

            <Suspense fallback={null}>
              <RoomAccessForm roomId={roomId} />
            </Suspense>
          </div>

          {/* <Image className="h-auto max-w-lg rounded-lg" src="/docs/images/examples/image-1@2x.jpg" alt="image description"> */}
        </div>
        <img
          className="p-20 size-5/12"
          src="../apple-icon.png"
          alt="Introductory image"
        />
      </main>
    </>
  );
}
