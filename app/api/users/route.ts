import { fetchUsers, saveUser } from "@/utils/actions";
import { NextRequest, NextResponse } from "next/server";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const GET = async (req: NextRequest) => {
  // console.log("atdw", new URL("/abc", req.url));

  const users = await fetchUsers();

  //   return NextResponse.redirect(new URL("/", req.url));
  return NextResponse.json({ msg: "get data ok", users });
};

export const POST = async (req: NextRequest) => {
  const body = await req.json();

  const user = {
    firstName: body.firstName,
    lastName: body.lastName,
    id: Date.now().toString(),
  };
  await saveUser(user);
  return NextResponse.json({ msg: "OK", user });
};
