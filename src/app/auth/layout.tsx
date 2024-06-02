import GradientSVG from "../../../public/gradient.svg";
import Image from "next/image";
import { Suspense } from "react";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full lg:grid lg:grid-cols-2 min-h-screen">
      <div className="flex items-center justify-center py-12">
        <Suspense fallback={<div />}>{children}</Suspense>
      </div>
      <div className="hidden bg-muted lg:block">
        <Image
          src={GradientSVG}
          alt="Image"
          width="1920"
          height="1080"
          className="h-dvh w-full dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
}
