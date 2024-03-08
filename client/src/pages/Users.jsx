import { Link } from "react-router-dom";

function Users() {
  const users = [
    { id: 1, username: "user1", password: "password1", rol: "admin" },
    { id: 2, username: "user2", password: "password2", rol: "user" },
    { id: 3, username: "user3", password: "password3", rol: "user" },
  ];

  const handleEdit = (userId) => {
    console.log("Edit user with ID:", userId);
  };

  const handleDelete = (userId) => {
    console.log("Delete user with ID:", userId);
  };

  return (
    <div className="flex justify-center p-4 ">
      <div className="w-full md:w-3/4 lg:w-4/5 xl:w-3/4 bg-white rounded-lg shadow-md ">
        <h1
          className="text-center rounded-lg bg-blue-900 font-bold text-white py-2 relative"
          style={{ fontSize: "30px" }}
        >
          Usuarios
          <Link
            to="/register"
            className="bg-blue-400 text-white hover:bg-blue-500 px-3 rounded-full absolute top-1/2 transform -translate-y-1/2 right-4 flex items-center justify-center"
            style={{ width: "36px", height: "36px" }}
          >
            +
          </Link>
        </h1>
        <div className="my-2 overflow-x-auto  rounded-lg">
          <table className="w-full border-collapse rounded-lg">
            <thead>
              <tr className="bg-blue-900 text-white">
                <th className="py-2 text-center">Username</th>
                <th className="py-2 text-center">Contrasena</th>
                <th className="py-2 text-center">Rol</th>
                <th className="py-2 text-center">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td className="text-center border border-blue-100">
                    {user.username}
                  </td>
                  <td className="text-center border border-blue-100">
                    {user.password}
                  </td>
                  <td className="text-center border border-blue-100">
                    {user.rol}
                  </td>
                  <td className="flex justify-center items-center border border-blue-100">
                    <button
                      className="bg-blue-500 font-bold hover:bg-blue-400 text-white py-1 px-2 rounded-lg mr-2"
                      onClick={() => handleEdit(user.id)}
                    >
                      Editar
                    </button>
                    <button
                      className="bg-red-500 font-bold hover:bg-red-400 text-white py-1 px-2 rounded-lg"
                      onClick={() => handleDelete(user.id)}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Users;
