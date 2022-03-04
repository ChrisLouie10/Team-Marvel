import { useEffect, useState } from 'react';

const Home = () => {
  const [data, setData] = useState("");

  useEffect(() => {
    fetch('/api/users')
      .then((response) => response)
      .then((responseData) => responseData.json())
      .then(json => setData(json["text"]))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="App">
      <h3>Welcome to the Home Page!</h3>
      <p>Check console to see if you fetched user data</p>
    </div>
  );
}

export default Home;
