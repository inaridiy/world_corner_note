"use client";

import { useCallback, useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import ja from "date-fns/locale/ja";
import { format, parseISO } from "date-fns";
import { Star } from "lucide-react";

type Note = {
  id: string;
  memo: string;
  favorite: number;
  embedding: string;
  createdAt: string;
  similarity: number;
};

export default function Form() {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false); // [1
  const [data, setData] = useState<null | Note[]>(null);

  const favorite = useCallback(
    async (memoId: string) => {
      if (!text) return;

      setLoading(true);
      const response = await fetch("/api/fav", {
        method: "POST",
        body: JSON.stringify({ memoId }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      setLoading(false);

      setData(
        data?.map((d) =>
          d.id === memoId ? { ...d, favorite: d.favorite + 1 } : d
        ) ?? null
      );

      if (!response) toast.error("Failed to retrieve message");
    },
    [data]
  );

  const submit = useCallback(async () => {
    if (!text) return;

    const response = await fetch("/api/post", {
      method: "POST",
      body: JSON.stringify({ memo: text }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response) toast.error("Failed to retrieve message");
    else toast.success("Successfully posted");
    setText("");
  }, [text]);

  const search = useCallback(async () => {
    if (!text) return;

    setLoading(true);
    const response = await fetch(`/api/search?query=${text}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    setLoading(false);
    if (!response) {
      toast.error("Failed to retrieve message");
    } else {
      setData(await response.json());
    }
  }, [text]);

  return (
    <>
      <div className="space-y-2">
        <Textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter Text..."
          className="h-24 resize-none"
        />
        <div className="grid grid-cols-2 gap-4">
          <Button variant="outline" onClick={submit} disabled={loading}>
            Submit
          </Button>
          <Button onClick={search} disabled={loading}>
            Search
          </Button>
        </div>
      </div>
      {data && (
        <div className="py-10 flex flex-col w-full">
          {data.map((d, i) => (
            <div key={i} className="flex flex-col border-b p-4 gap-2">
              <div className="flex ">
                <p className="whitespace-pre-wrap break-words text-start flex-1">
                  {d.memo}
                </p>
                <button
                  className="rounded-full p-2 hover:bg-muted hover:text-muted-foreground h-10 w-10"
                  onClick={() => favorite(d.id)}
                >
                  <Star className="w-6 h-6" />
                </button>
              </div>
              <div className="flex justify-between items-center">
                <span>
                  {format(parseISO(d.createdAt), "PPP", { locale: ja })}
                </span>

                <span>{`${d.favorite} Fav`}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
