const { useEffect, useState } = require('react');

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
      <header className="App-header">
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <p>please o god work</p>
        <p>is this working: {data}</p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default Home;
