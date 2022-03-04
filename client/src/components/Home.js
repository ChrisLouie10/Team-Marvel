import { useEffect, useState } from 'react';
import { getUsers } from "../api/provider";
import Navbar from "./Navbar";

const Home = () => {
  const [data, setData] = useState("");

  const fetchData = () => {
    getUsers()
      .then(response => response.data)
      .then(data => setData(data.text))
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="App">
      <Navbar/>
      <h3>Welcome to the Home Page!</h3>
      <p>Fetched Data:</p>
      <p>{data}</p>
    </div>
  );
}

export default Home;
