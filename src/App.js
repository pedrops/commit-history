import "./App.css";
import Commits from "./Commits";
import Diff from "./Diff";
import NavigationBar from "./NavigationBar";

function App() {
  return (
    //<header className="App-header">
    <header>
      <NavigationBar />
      <Commits />
      <div style= {{"margin-top": "400px"}}>
        <Diff />
      </div>
    </header>
  );
}

export default App;
