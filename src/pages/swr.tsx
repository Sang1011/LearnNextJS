import React, { useState } from "react";
import UserDetailPage from "../components/swr/UserDetail";
export default function SWRPage() {
  const [detailList, setDetailList] = useState([1, 2, 3]);
  function handleAddClick() {
    setDetailList((prevList) => [...prevList, 1]);
  }
  return (
    <div>
      <h1>SWR Playground</h1>
      <button onClick={handleAddClick}>Add detail</button>
      <ul>
        {detailList.map((x, index) => (
          <li key={index}>
            <UserDetailPage userId="8" />
          </li>
        ))}
      </ul>
    </div>
  );
}
