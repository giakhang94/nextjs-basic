"use client";
import { createUser } from "@/utils/actions";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { useFormState, useFormStatus } from "react-dom";

const SubmitButton = () => {
  "use client";
  const result = useFormStatus();
  console.log(result);
  return (
    <button type="submit" className={btnStyle} disabled={result.pending}>
      {result.pending ? "Loading..." : "Submit"}
    </button>
  );
};

export default function Form() {
  const [message, formAction] = useFormState(createUser, null);
  return (
    // <form action={createUser} className={formStyle}> //change createUser function to formAction
    <form action={formAction} className={formStyle}>
      <h2 className="text-2xl capitalize mb-4">Create User</h2>
      {message && (
        <span className="-mt-2 block bg-green-200 text-green-500 py-2 px-5">
          {message}
        </span>
      )}
      <input
        type="text"
        name="firstName"
        id=""
        className={inputStyle}
        required
        placeholder="Peter"
      />
      <input
        type="text"
        name="lastName"
        id=""
        className={inputStyle}
        placeholder="Smith"
        required
      />
      <SubmitButton />
    </form>
  );
}
const formStyle = "max-w-lg flex flex-col gap-y-4  shadow rounded p-8";
const inputStyle = "border shadow rounded py-2 px-3 text-gray-700";
const btnStyle =
  "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded capitalize";
