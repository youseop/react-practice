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
} from "firebase/firestore";

function App() {
  const [users, setUsers] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [matchingUsers, setMatchingUsers] = useState([]);
  const [newName, setNewName] = useState("");
  const [pwdInput, setPwdInput] = useState("");
  const [randomWords, setRandomWords] = useState([]);

  const pwd = "aaaaaaaa";

  const usersCollectionRef = collection(db, "users");

  useEffect(() => {
    const getUsers = async () => {
      // const data = await getDocs(
      //   query(usersCollectionRef, orderBy("timestamp", "desc"))
      // );
      // setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      setUsers([
        { name: "호랑이" },
        { name: "맥주" },
        { name: "사진" },
        { name: "카메라" },
        { name: "차" },
      ]);
    };
    getUsers();
  }, []);

  const createUser = async () => {
    await addDoc(usersCollectionRef, {
      name: newName,
      timestamp: new Date(),
    });
    setNewName("");
  };

  // const updateUser = async (id) => {
  //   const userDoc = doc(db, "users", id);
  //   const newFields = { age: age + 1 };

  //   await updateDoc(userDoc, newFields);
  // };

  const deleteUser = async (id) => {
    const userDoc = doc(db, "users", id);

    await deleteDoc(userDoc);
  };

  const searchUser = () => {
    setMatchingUsers(
      users.map((user) => {
        if (user.name.includes(searchKeyword)) {
          return true;
        }
        return false;
      })
    );
  };

  const numOfWord = 3;

  const extractRandomWord = () => {
    const randomWordCandidate = [];
    const numOfUser = users.length;
    if (users.length === 0) {
      return;
    }
    for (let i = 0; i < numOfWord; i++) {
      const randNum = Math.floor(Math.random() * (numOfUser - 1) + 1);
      randomWordCandidate.push(users[randNum]);
    }
    setRandomWords(randomWordCandidate);
  };

  return (
    <div className="App">
      <button onClick={extractRandomWord}>get random three words</button>
      {randomWords.map((user, index) => {
        const { name } = user;
        return <div key={`${name}_${index}`}>{`name: ${name}`}</div>;
      })}
      <input
        onChange={(event) => setPwdInput(event.target.value)}
        value={pwdInput}
      />
      {pwdInput === pwd && (
        <div>
          <div>
            <input
              onChange={(event) => setSearchKeyword(event.target.value)}
              value={searchKeyword}
            />
            <button onClick={searchUser}> Search Word </button>
            {matchingUsers.map((user, index) => {
              const { name, id } = user;
              return (
                <div key={`${name}_${index}`}>
                  {`name: ${name}`}
                  <button onClick={() => deleteUser(id)}>delete user</button>
                </div>
              );
            })}
          </div>
          <br />
          {matchingUsers.length === 0 && (
            <div>
              <input
                onChange={(event) => setNewName(event.target.value)}
                value={newName}
              />
              <button onClick={createUser}> Create User </button>
              {users.map((user, index) => {
                const { name, id } = user;
                return (
                  <div key={`${name}_${index}`}>
                    {`name: ${name}`}
                    <button onClick={() => deleteUser(id)}>delete user</button>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
