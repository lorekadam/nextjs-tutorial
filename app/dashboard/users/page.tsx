import { lusitana } from "@/app/ui/fonts";
import { Suspense } from "react";

type User = {
  id: number;
  name: string;
  email: string;
  phone: string;
  // ...
};

async function fetchUsers(): Promise<User[]> {
  try {
    // await new Promise((resolve) => setTimeout(resolve, 3000));
    const users = fetch("https://jsonplaceholder.typicode.com/users");
    return (await users).json();
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch the latest invoices.");
  }
}

const UsersList = async () => {
  const users = await fetchUsers();
  return (
    <div className="flex flex-col gap-6">
      {users.map(({ id, name, email, phone }) => (
        <div className="flex gap-4 border-b-2 p-2" key={id}>
          <div className="w-[33%]">{name}</div>
          <div className="w-[33%]">{email}</div>
          <div className="w-[33%]">{phone}</div>
        </div>
      ))}
    </div>
  );
};

export default async function Page() {
  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Users
      </h1>
      <div>
        <Suspense fallback={<div>Loading users from REST API...</div>}>
          <UsersList />
        </Suspense>
      </div>
    </main>
  );
}
