import { useState, Dispatch, SetStateAction } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);
  const [cock, setCock] = useState(0);

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <Poop
        peak={"IM OVER HERE STROKING MY DICK I GOT LOTION ON MY DICK"}
        poke={"yes.."}
        cock={cock}
        setCock={setCock}
      />
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

function Poop(
  { peak, poke, cock, setCock }: {
    peak: string;
    poke: string;
    cock: number;
    setCock: Dispatch<SetStateAction<number>>;
  },
) {
  return (
    <>
      <p>{peak} {poke}</p>
      <button
        onClick={() =>
          setCock((cock) => {
            return cock < 100 ? cock + 1 : -20;
          })}
      >
        Increase COck Size
      </button>
      <p>Current cock size: {cock} meters</p>
    </>
  );
}

export default App;
