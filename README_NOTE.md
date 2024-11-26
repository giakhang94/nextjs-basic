Cái này tao tự ghi chú lại cho dễ hiểu

### create app

```sh
npx create-next-app@14 (or @latest)
```

### app/page.tsx

`app/page.tsx` is the application homepage.
This name 'page.tsx' is really important. If we change to whatever other than "page", the app is not going to work
go to `app/page.tsx` replace all the current code by your code

### create more pages

to create other page -> create `app/<pageName>/page.tsx`
for example: `app/about/page.tsx`
-> access: http://localhost:3000/about

### how to go page-to-page in nextjs

- go to homepage
- use `Link` from `next/link`

```js
import Link from "next/link";

function HomePage() {
  return (
    <div>
      <h1 className="text-7xl">Home Page</h1>
      <Link href="/about">About Page</Link>
      <Link href="/info">Info Page</Link>
    </div>
  );
}

export default HomePage;
```

### app/layout.tsx -> It wraps our entire application

- Similar to the `page.tsx`. The name `layout.tsx` is super important.
- If we change this to anything else. The functionality is not going to work correctly
- layout.tsx wraps pages, components...
- it keeps the fix layout (navbar, sidebar...) and change the <outlet> content in the layout. Lay sharedLayout in reactjs

1. remove everything in app/layout.tsx
2. import global.css
3. layout.tsx in the root one need <HTML> tag
4. layout.tsx files for other child pages don't need <HTML> tag

### Metadata

go to `app/layout.tsx`
copy paste

```js
export const metadata: Metadata = {
  title: "Next.js Project",
  description: "A Next.js project with TypeScript and TailwindCSS.",
  keywords: "Next.js, Typescript, TailwindCSS",
};
```

### Sever components vs Client components

- in Nextjs, by default, any component is a server component
- if you want to use a client components
  -> in the top of the file, add `use client`;

```js
"use client"; // add 'use client' here
import { useState } from "react";

const Counter = () => {};
```

- in a server component, we can also use some client components without change the parent to client component

### fetch API

- khi fetch API là làm ở server
- client chưa hỗ trợ asyn/await luôn
- nhưng sau đó return thì data sẽ dược render ra client
- interact giữa client và server tính là `client component` khi có liên quan tới `state` của component

1. loading while fetching API.
   Remember, the name `loading.tsx` is really important

- go to the folder containing the required page
- add app/folderName/loading.tsx
- create and export a Loading component in this file with `'use client'`
  => Next will automatically understand and display loading while fetching data

2. Error
   Triggers errors only if there is an network error

- totally similar with loading
- `app/folderName/error.tsx`

### Nested layout, dynamic pages

- ở trong thư mục chứa page nào đó ví dụ `app/tours`
- tạo thêm thư mục tên loz gì cũng được (để chưa slug), để navigate đi mấy page con của layout
- tên của thư mục bỏ vô square brackets => `app/tours/[id]` hoặc `app/tours/[slug]` hoặc cái gfi cũng được
- tạo file page.tsx trong thư mục vừa tạo => `app/tours[id]/page.tsx`
  ==> file này sẽ render thư mục theo đường dẫn `localhost:3000/tours/:id/page.tsx`
  => sau đó có thể dùng `params` để bắt cái `id` (hoặc `slug`) đó.
  => nếu tên folder là `id` thì params.id
  => nếu tên folder là `slug` thì params.slug

```tsx
function Page({ params }: { params: { id: string } }) {
  return (
    <div>
      <h1 className="text-4xl">ID: {params.id}</h1>
    </div>
  );
}
export default Page;
```

### Image component from next

- use locally: no need to config the `next.config.mjs` file
- use remotely: You have to add the `host` and `path` to the `remotePatterns` in `next.config.mjs`

```ts
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.course-api.com",
        port: "",
        pathname: "/images/**",
      },
    ],
  },
};
```

Properties: fill (cho responsive), sizes (giống như media query), width,height

### Form Action

- tạo form bình thường
- action thì bằng 1 hàm. Hàm này có 1 argument là `formData: FormData`
- hàm action thì phải có 'use server'
- để lấy value
  1. formData.firstName
  2. const allData = Object.FromEntries(formData)

```ts
"use server";
export const createUser = async (formData: FormData) => {
  "use server";
  const firstName = formData.get("firstName") as string;
  const lastName = formData.get("lastName") as string;
  const allValue = Object.fromEntries(formData);
  console.log("allvalue", allValue);
  console.log({ firstName, lastName });
};
```

### Xử lý UX => sau khi add user => user list cập nhật ra client liền

1. import `revalidatePath` from 'next/cache'
2. import `redirect` from 'next/navigation'
3. DO NOT place the `redirect` in the `try` block otherwise `revalidatePath` is working fine in `try` block
4. use this in `actions.ts `file

```ts
try {
  await saveUser(newUser);
} catch (error) {
  console.log(error);
}
redirect("/actions");
//   revalidatePath("/actions");
```

### handle isLoading, checking form status

1. use `UseFormState` and `useFormStatus` from 'react-dom'
2. use `use client`. All the stuffs making UX more comfortable are in client components
3. us this in `Form` component file
   => Because it only use for client component
   => we must separate submit button into new component

```js
const SubmitButton = () => {
  "use client";
  const result = useFormStatus(); //this result contains {pending, formData, method, action}
  console.log(result);
  return (
    <button type="submit" className={btnStyle} disabled={result.pending}>
      {result.pending ? "Loading..." : "Submit"}
    </button>
  );
};
```

then import this `SubmitButton` into the Form

\*\*\* For the `useFormState()`

- it has 2 arguments: the actionFunction and the initialState
- it return an array that contains 2 value
  1.  [firstValue, secondValue]
      *firstValue: firstValue is whatever value that the actionFunction return.
      *secondValue: is the actionFunction
  2.  if you built the action function with just 1 argument. Then add one first argument
      that `prevState: any` or `prevState: unknown` to make Typescript happy!
- Use directly in Form Component

### redirect and revalidatePath

- redirect: like return, when you call it, all the code below in the `try` scope will be not executed
- revalidatePath: can place in the `try` block and above the `return`

### bind method to pass data from a component to server actions

- dùng bind thì không cần truyền data thông qua formData nữa
- bind() method có 2 argument.
  1. The first one, chưa cần quan tâm, để null
  2. chính là cái data cần truyền qua server action
- khi dùng. Khai báo 1 hàm mới gán cho nó giá trị là cái hàm action.bind(null, data)
- data có thể là 1 value, hoặc 1 object
- hàm action bên server khi đó sẽ nhận argument đầu tiên chính là data dc bind truyền qua
  => Không cần dùng hidden input with default value nữa

```ts
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { DeleteUser, removeUser } from "@/utils/actions";

function DeleteButton({ id }: { id: string }) {
  //   const [message, deleteAction] = useFormState(DeleteUser(id), null);
  const removeUserById = removeUser.bind(null, id);
  return (
    // <form action={DeleteUser}>
    <form action={removeUserById}>
      <input value={"abcdaere"} type="hidden" name="name" />
      <button
        type="submit"
        className="rounded-sm py-2 px-3 bg-red-500 text-white font-semibold text-sm"
      >
        Delete
      </button>
    </form>
  );
}

export default DeleteButton;
//in actions.ts (server actions)
export const removeUser = async (id: string) => {
  //this function get the 1st argument is the value bind() method passed to
  const users = await fetchUsers();
  const filter = users.filter((user) => user.id !== id);
  console.log(filter);
  await writeFile("users.json", JSON.stringify(filter));
  revalidatePath("/actions");
};
```

### API

- create API folder in app folder
  `app/api/users/route.ts`
  ## The name `route` is super important. We can not change to anything other than `route`
- use Request and Response helper
- get request in argument of the function
- get a param => `request.url.searchParams.get('id')`

```ts
import { fetchUsers, saveUser } from "@/utils/actions";

export const GET = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);
  console.log("search params", searchParams.get("id"));

  const users = await fetchUsers();
  return Response.json({ msg: "api route", users });
};
```

Update 1 chut

```tsx
import { fetchUsers, saveUser } from "@/utils/actions";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  console.log("atdw", req.nextUrl.pathname);

  const users = await fetchUsers();
  return NextResponse.redirect(new URL("/", req.url));
  //redirect to homepage
  // nếu URL("/abc", req.url) => sẽ redirect về localhost:3000/abc
};
```

### Ghi chú API

- kiểu như API sẽ không khai router như bên express
- API là tạo 1 thư mục app/api rồi muốn path như nào thì tạo thêm thư mục con nữa
- file cuối là `route.ts`
- ví dụ: `app/api/users/route.ts` hoặc `app/api/post/route.ts`
- trong file `route.ts` thì sẽ khai báo các hàm GET POST PATCH...
  vì 1 route có thể có đủ các loại method GET POST PATCH DELETE
- xài `NextRequest`,`Request`, `NextResponse`, `Response`
- xong nớ return response trả về cho người ta
- chưa biết return lỗi như nào

### Middleware

- tạo 1 file tên 9 xác là `middleware.ts` ở root => `root/middleware.ts`
- next tự nhận diện nó là middleware và sẽ chạy trước khi request tới được controller
- The function in middleware.ts will be called before every request

```ts
export const middleware = () => {
  return Response.json({ msg: "hello there" });
};

//config object
//matcher: allow wath route will execute the middleware function
export const config = {
  matcher: ["/about/:path*", "/tours/:path*"], //tour and about route will trigger middleware
};
```
