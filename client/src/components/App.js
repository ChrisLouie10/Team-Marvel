const { useEffect, useState } = require('react');

const App = () => {
  const [data, setData] = useState({});

  useEffect(() => {
    fetch('/api/users')
      .then((response) => response)
      .then((responseData) => {
        console.log(responseData);
        setData(responseData);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <p>please o god work</p>
        <p>is this working</p>
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

export default App;
