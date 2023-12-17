import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

export default function Page({ params }: any) {
  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <div>
        dadadada
        <Link className={buttonVariants()} href="/">
          ホームに戻る
        </Link>
      </div>
    </div>
  );
}
