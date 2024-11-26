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
