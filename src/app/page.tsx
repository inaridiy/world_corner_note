import Form from "./client";

export default function Home() {
  return (
    <main className="mx-auto text-center px-4 max-w-xl py-28">
      <h1 className="md:text-5xl text-3xl mb-12 font-bold text-center">
        World Corner Note.
      </h1>

      <Form />
    </main>
  );
}
