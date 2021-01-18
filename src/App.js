import "./App.css";
import Commits from "./Commits";
import NavigationBar from "./NavigationBar";

function App() {
  return (
    //<header className="App-header">
    <header>
          <NavigationBar />
          <Commits />
      </header>
  );
}

export default App;
