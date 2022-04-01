import React, { useEffect, useState } from "react";
import "./App.css";
import { useMutation, useQuery } from "@apollo/client";
import { GET_ALL_USERS, GET_ONE_USER } from "./query/user";
import { CREATE_USER } from "./mutations/user";

const App = () => {
  const { data, loading, error, refetch } = useQuery(GET_ALL_USERS);
  const { data: oneUser, loading: loadingOneUser } = useQuery(GET_ONE_USER, {
    variables: {
      id: 1,
    },
  });

  const [newUser] = useMutation(CREATE_USER);
  const [users, setUsers] = useState([]);
  const [username, setUsername] = useState("");
  const [age, setAge] = useState(0);

  useEffect(() => {
    if (!loading) {
      setUsers(data.getAllUsers);
    }
  }, [data, loading]);

  const addUser = (e) => {
    e.preventDefault();
    newUser({
      variables: {
        input: {
          username,
          age,
        },
      },
    }).then(({ data }) => {
      console.log(data);
      setUsername("");
      setAge(0);
    });
  };

  const getAll = (e) => {
    e.preventDefault();
    refetch();
  };

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div>
      <form>
        <input
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          type="text"
        />
        <input
          value={age}
          onChange={(event) => setAge(event.target.value)}
          type="number"
        />
        <div className="btns">
          <button onClick={addUser}>Создать</button>
          <button onClick={getAll}>Получить</button>
        </div>
      </form>
      <div>
        {users.map((user) => (
          <div className="user">
            {user.id}. {user.username} {user.age}
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
