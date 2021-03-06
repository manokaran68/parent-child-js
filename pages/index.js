import Head from "next/head";
import Image from "next/image";
import { useState, useReducer } from "react";
import styles from "../styles/Home.module.css";

const userDetails = [
  { Name: "First Name", Value: "John" },
  { Name: "Last Name", Value: "P" },
  { Name: "Email", Value: "Test@gmail" },
  { Name: "PhoneEmail", Value: "12345" },
];

function Child(props) {
  function onChange(event) {
    props.onChange({ Name: props.Name, Value: event.target.value });
  }
  return (
    <div>
      <div>
        <label>{props.Name}</label>
      </div>
      <div>
        <input type="text" defaultValue={props.Value} onChange={onChange} />
      </div>
    </div>
  );
}

function reducer(state, action) {
  state = state.map((i) => ({ ...i }));
  let record = state.find((i) => i.Name === action.Name);
  record.Value = action.Value;
  return state;
}

export default function Home() {
  const [userState, setUserState] = useReducer(reducer, userDetails);
  const [user, setUser] = useState(userDetails);

  function onSubmit(event) {
    event.preventDefault();
    setUser(userState);
  }
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        {user.map((i) => (
          <div key={i.Name}>
            {i.Name}: {i.Value}
          </div>
        ))}
        <form onSubmit={onSubmit}>
          {user.map((i) => (
            <Child key={i.Name} {...i} onChange={setUserState} />
          ))}
          <input type="submit" value="Submit" />
        </form>
      </main>
    </div>
  );
}
