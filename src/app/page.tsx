import Form from "./client";

export default function Home() {
  return (
    <main className="mx-auto text-center px-4 max-w-xl py-28">
      <div className="mb-12 space-y-6">
        <h1 className="md:text-5xl text-3xl font-bold text-center">
          World Corner Note.
        </h1>
      </div>

      <Form />
    </main>
  );
}
