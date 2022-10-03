import { useEffect, useState } from "react";
import "./App.css";
import { db } from "./firebase-config";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  updateDoc,
} from "firebase/firestore";

function App() {
  const [users, setUsers] = useState([]);
  const [newAge, setNewAge] = useState(0);
  const [newName, setNewName] = useState(0);

  const usersCollectionRef = collection(db, "users");

  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(
        query(usersCollectionRef, orderBy("timestamp", "desc"))
      );
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getUsers();
  }, [usersCollectionRef]);

  const createUser = async () => {
    console.log(newName, newAge);
    await addDoc(usersCollectionRef, {
      name: newName,
      age: Number(newAge),
      timestamp: new Date(),
    });
    setNewAge(0);
    setNewName("");
  };

  const updateUser = async (id, age) => {
    const userDoc = doc(db, "users", id);
    const newFields = { age: age + 1 };

    await updateDoc(userDoc, newFields);
  };

  const deleteUser = async (id) => {
    const userDoc = doc(db, "users", id);

    await deleteDoc(userDoc);
  };

  return (
    <div className="App">
      <input
        onChange={(event) => setNewName(event.target.value)}
        value={newName}
      />
      <input
        type="number"
        onChange={(event) => setNewAge(event.target.value)}
        value={newAge}
      />

      <button onClick={createUser}> Create User </button>

      {users.map((user, index) => {
        const { name, age, id } = user;
        return (
          <div key={`${name}_${age}_${index}`}>
            {`name: ${name}`}
            <br />
            {`age: ${age}`}
            <button onClick={() => updateUser(id, age)}>add age</button>
            <button onClick={() => deleteUser(id)}>delete user</button>
          </div>
        );
      })}
    </div>
  );
}

export default App;
