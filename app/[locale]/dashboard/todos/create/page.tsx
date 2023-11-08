"use client";
import { lusitana } from "@/app/ui/fonts";
import { useRouter } from "next/navigation";
import { SyntheticEvent, useState } from "react";

export default function Page() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [done, setDone] = useState(false);

  const addTodo = async (e: SyntheticEvent) => {
    e.preventDefault();
    try {
      const add = await fetch(`/api/todos`, {
        method: "POST",
        body: JSON.stringify({ name, description, done }),
      });
      const res = await add.json();
      if (res.success) {
        router.push("/dashboard/todos");
      }
    } catch (error) {
      console.log(error);
      throw new Error("error with creating todo");
    }
  };

  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Add todo
      </h1>
      <form className="flex flex-col gap-4 w-[600px]" onSubmit={addTodo}>
        <label htmlFor="name">Name</label>
        <input
          name="name"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <label htmlFor="name">Description</label>
        <textarea
          name="description"
          id="description"
          rows={6}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <label htmlFor="done">Is done?</label>
        <input
          type="checkbox"
          name="done"
          id="done"
          value={done ? "on" : "off"}
          onChange={() => setDone((prev) => !prev)}
        />
        <button className="flex justify-center items-center p-2 bg-blue-500 text-white rounded-md">
          Create
        </button>
      </form>
    </main>
  );
}
