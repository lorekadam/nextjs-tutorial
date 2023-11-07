import { Todo } from "@/app/lib/definitions";
import { lusitana } from "@/app/ui/fonts";
import { unstable_noStore as noStore } from "next/cache";
import Link from "next/link";
import { env } from "process";
import {
  CheckIcon,
  PencilIcon,
  TrashIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { DeleteTodo } from "@/app/ui/todos/delete";

async function fetchTodos(): Promise<Todo[]> {
  noStore();
  try {
    const todos = fetch(`${env.API_URL}/todos`);
    return (await todos).json();
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
            <div className="w-[20%]">{id.substring(0, 3)}...</div>
            <div className="w-[20%]">{name}</div>
            <div className="w-[20%]">{description}</div>
            <div>
              {done ? <CheckIcon width={30} /> : <XMarkIcon width={30} />}
            </div>
            <div>
              <DeleteTodo id={id} />
            </div>
            <div>
              <Link
                className="flex text-white bg-green-700 p-2"
                href={`/dashboard/todos/${id}`}
              >
                <PencilIcon width={30} />
              </Link>
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
