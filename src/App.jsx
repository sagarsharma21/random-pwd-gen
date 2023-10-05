import { useCallback, useEffect, useState } from "react";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);
  const [length, setLength] = useState(6);
  const [allowNum, setAllowNum] = useState(false);
  const [allowChar, setAllowChar] = useState(false);
  const [Password, setPassword] = useState("");

  //generate random password
  const pwdGenerator = useCallback(() => {
    let pwd = "";
    let pool = "ABCDEFGHabcdefgh";

    if (allowNum) {
      pool += "1234567890";
    }

    if (allowChar) {
      pool += "@#$&";
    }

    for (let i = 1; i <= length; i++) {
      let itr = Math.floor(Math.random() * pool.length + 1);
      pwd += pool.charAt(itr);
    }

      setPassword(pwd);
      console.log(pwd+' is password');

  }, [length, allowNum, allowChar ]);

  //useEffect hook to invoke password generator function
  useEffect(() => {
      pwdGenerator();
  }, [length, allowNum, allowChar ])

  return (
    <>

      <div
        className="w-full max-w-md mx-auto shadow rounded-lg 
            px-4 my-8 text-orange-400 bg-gray-800" >
              
              <h1 className="text-cyan text-4xl text-center bg-white-400">
                Password Generator
              </h1>

        <div className="flex shadow rounded-lg overflow-hidden mb-4 mt-3 ">
          <input
            type="text"
            value={Password}
            className="outline-none w-full py-1 px-3"
            placeholder="Generate new"
            readOnly
          ></input>
          <button className="outline-none  bg-blue-400 text-white 
          px-3 py-0.5 shrink-0">Copy</button>
        </div>

        <div className="flex text-sm gap-x-2">
          <div className="flex items-center gap-x-1">
            <input 
                type="range" className="cursor-pointer" 
                min={6} max={12}
                value={length}
                name="" id="slider"
                onChange={(e) => { setLength(e.target.value) 
                }} 
            />
            <label htmlFor="slider">Length: {length}</label>
          </div>

          <div className="flex items-center gap-x-1">
            <input   
                type="checkbox"
                defaultChecked={allowNum}
                name="" id="numInput"
                onChange={() => {
                  setAllowNum((prev) => !prev );
                }}
            /> 
            <label htmlFor="numInput">Numbers</label>  
          </div>

          <div className="flex items-center gap-x-1">
            <input
                type="checkbox" 
                defaultChecked={allowChar}
                name="" id="charInput"
                onChange={() => {
                  setAllowChar((prev) => !prev );
                }} 
            /> 
            <label htmlFor="charInput">Characters</label>  
          </div>
        </div>

      </div>

      <p className="text-sm text-zinc-200 text-center">
        Adjust the length slider and check-boxes to generate desired password string
      </p>
    </>
  );
}

export default App;
