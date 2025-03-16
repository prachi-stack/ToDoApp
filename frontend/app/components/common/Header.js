import Image from "next/image";

export default function Header() {
  return (
    <div className="h-16 flex items-center gap-2 pl-[1rem] md:pl-[2rem] lg:pl-[4rem]">
      <Image src="/logo.png" alt="ToDo Icon" width={32} height={32} />
      <h1 className="text-2xl font-bold">TODO</h1>
    </div>
  );
}
