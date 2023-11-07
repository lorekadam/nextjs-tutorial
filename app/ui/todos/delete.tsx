"use client";

import { deleteTodo } from "@/app/lib/actions";
import { TrashIcon } from "@heroicons/react/24/outline";

export const DeleteTodo = ({ id }: { id: string }) => {
  return (
    <button
      className="p-2 text-white bg-red-400"
      onClick={async () => await deleteTodo(id)}
    >
      <TrashIcon width={30} />
    </button>
  );
};
