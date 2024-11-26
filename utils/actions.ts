"use server";

import { readFile, writeFile } from "fs/promises";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { revalidatePath } from "next/cache";
// import { redirect } from "next/navigation";

type User = {
  id: string;
  firstName: string;
  lastName: string;
};
export const createUser = async (prevState: unknown, formData: FormData) => {
  "use server";
  console.log(prevState);
  //   await new Promise((resolve) => setTimeout(resolve, 3000));
  const firstName = formData.get("firstName") as string;
  const lastName = formData.get("lastName") as string;
  //   const allValue = Object.fromEntries(formData);
  const newUser: User = { firstName, lastName, id: Date.now().toString() };
  try {
    await saveUser(newUser);
    revalidatePath("/actions");
    return "user created!";
  } catch (error) {
    console.log(error);
    return "something went wrong";
  }
  //   revalidatePath("/actions");
};

//read and save user in a local file
export const fetchUsers = async (): Promise<User[]> => {
  const result = await readFile("users.json", { encoding: "utf8" });
  const users = result ? JSON.parse(result) : [];
  return users;
};

export const saveUser = async (user: User) => {
  const users = await fetchUsers();
  users.push(user);
  await writeFile("users.json", JSON.stringify(users));
};

//delete user
export const DeleteUser = async (formData: FormData) => {
  "use server";
  const id = formData.get("id") as string;
  console.log(id);
  const users = await fetchUsers();
  const filter = users.filter((user) => user.id !== id);
  console.log(filter);
  await writeFile("users.json", JSON.stringify(filter));
  revalidatePath("/actions");
};

export const removeUser = async (id: string) => {
  const users = await fetchUsers();
  const filter = users.filter((user) => user.id !== id);
  console.log(filter);
  await writeFile("users.json", JSON.stringify(filter));
  revalidatePath("/actions");
};
