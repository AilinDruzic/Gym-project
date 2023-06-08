import React, { useState } from "react";
import randomcolor from "randomcolor";

function App() {
  const [lockers, setLockers] = useState(
    Array(10).fill({ status: "free", color: "" })
  );
  const [nextLockerIndex, setNextLockerIndex] = useState(0);

  const reserveLocker = () => {
    setLockers((prevLockers) => {
      const newLockers = [...prevLockers];
      newLockers[nextLockerIndex] = { status: "taken", color: randomcolor() };
      const updatedIndex =
        nextLockerIndex + 2 < lockers.length ? nextLockerIndex + 2 : 1;
      setNextLockerIndex(updatedIndex);
      return newLockers;
    });
  };

  return (
    <div className="mt-4 pl-8">
      <h2 className="font-sans text-4xl mt-4">Gym Locker Reservation</h2>
      <button
        className="mt-4 px-5 bg-teal-700 rounded-lg text-slate-100"
        onClick={reserveLocker}
      >
        Reserve Locker
      </button>
      <div className="mt-4 grid grid-cols-4 gap-4"></div>
      {lockers.map((locker, index) => (
        <button
          key={index}
          className={`locker ${locker.status}  rounded-lg p-4 border border-gray-600 border-opacity-100`}
          disabled={locker.status === "taken"}
          style={{ backgroundColor: locker.color, paddingBottom: "15%" }}
          onClick={locker.status === "free" ? reserveLocker : null}
        >
          #{index + 1}
          <br />
          {locker.status === "taken" ? "Taken" : "Free"}
        </button>
      ))}
    </div>
  );
}

export default App;
