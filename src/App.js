import { useEffect, useState } from "react";
import "./App.css";
import { db } from "./firebase-config";
import { collection, getDocs } from "firebase/firestore";

function App() {
  const [users, setUsers] = useState([]);
  const usersCollectionRef = collection(db, "users");

  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getUsers();
  }, [usersCollectionRef]);

  const createUser = () => {
    console.log("!23");
  };

  return (
    <div className="App">
      <input placeholder="Name..." />
      <input type="number" placeholder="Age..." />

      <button onClick={createUser}> Create User </button>

      {users.map((user, index) => {
        return (
          <div key={`${user.name}_${user.age}_${index}`}>
            {`name: ${user.name}`}
            <br />
            {`age: ${user.age}`}
          </div>
        );
      })}
    </div>
  );
}

export default App;
