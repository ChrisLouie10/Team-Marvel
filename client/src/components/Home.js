import { useEffect, useState } from 'react';
import { getUsers } from "../api/provider";

const Home = () => {
  const [data, setData] = useState("");

  const fetchData = () => {
    getUsers()
      .then(response => response.text)
      .then(text => setData(text))
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="App">
      <h3>Welcome to the Home Page!</h3>
      <p>Fetched Data:</p>
      <p>{data}</p>
    </div>
  );
}

export default Home;
