"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import Link from "next/link";
import ja from "date-fns/locale/ja";
import { format, parseISO } from "date-fns";

type Data = {
  id: string;
  memo: string;
  favorite: number;
  embedding: string;
  createdAt: string;
  similarity: number;
};

export default function Form() {
  const [text, setText] = useState("");
  const [data, setData] = useState<null | Data[]>(null);

  const fetchData = async () => {
    const data = await fetch(`/api/search?query=${text}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!data) {
      toast.error("Failed to retrieve message");
    } else {
      setData(await data.json());
    }
  };

  return (
    <>
      <div className="mt-7 inline-flex items-center text-lg gap-x-5">
        <Input
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter Text..."
        />
        <Button onClick={fetchData}>Submit</Button>
      </div>
      {data && (
        <div className="py-10 grid grid-cols-4">
          {data.map((d) => (
            <Link href="/post/aa">
              <p>{d.memo}</p>
              <span>
                {format(parseISO(d.createdAt), "PPP", { locale: ja })}
              </span>
            </Link>
          ))}
        </div>
      )}
    </>
  );
}
