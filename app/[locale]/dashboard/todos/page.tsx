import { Todo } from "@/app/lib/definitions";
import { lusitana } from "@/app/ui/fonts";
import Link from "next/link";
import { env } from "process";
import { DeleteTodo } from "@/app/ui/todos/delete";

export const dynamic = "force-dynamic";

async function fetchTodos(): Promise<Todo[]> {
  try {
    const todos = await fetch(`${env.API_URL}/todos`, { cache: "no-store" });
    return todos.json();
  } catch (error) {
    throw new Error("Failed to fetch todos");
  }
}

const TodosList = async () => {
  const todos = await fetchTodos();
  return (
    <div className="flex flex-col gap-6">
      {todos.length === 0 ? (
        <h2>No todos</h2>
      ) : (
        todos.map(({ id, name, description, done }) => (
          <div
            className="flex gap-4 border-b-2 p-2 items-center justify-between"
            key={id}
          >
            <div className="w-[50px]">{id.substring(0, 5)}</div>
            <div>{name}</div>
            <div>{description}</div>
            <div>
              <input type="checkbox" checked={done} readOnly />
            </div>
            <div>
              <DeleteTodo id={id} />
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default async function Page() {
  return (
    <main>
      <div className="flex justify-between">
        <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
          Todos
        </h1>
        <Link
          className="flex justify-center items-center p-2 bg-blue-500 text-white rounded-md"
          href="/dashboard/todos/create"
        >
          New todo +
        </Link>
      </div>
      <TodosList />
    </main>
  );
}
