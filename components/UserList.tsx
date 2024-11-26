import { fetchUsers } from "@/utils/actions";
import DeleteButton from "./DeleteButton";

export default async function UserList() {
  const users = await fetchUsers();
  return (
    <div>
      <h3 className="text-3xl font-semibold">UsersList</h3>

      {users.length > 0 ? (
        users.map((user) => {
          return (
            <div key={user.id} className="my-2 flex space-x-20">
              <div>
                <p className="font-semibold">{user.id}</p>
                <div>{user.firstName + " " + user.lastName}</div>
              </div>
              <div className="">
                <DeleteButton id={user.id} />
              </div>
            </div>
          );
        })
      ) : (
        <div>no users to display </div>
      )}
    </div>
  );
}
