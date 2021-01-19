import "./App.css";
import Commits from "./Commits";
import Diff from "./Diff";
import NavigationBar from "./NavigationBar";

function App() {
  return (
    <header>
      <NavigationBar />
      <Commits />
      <div style= {{"margin-top": "400px"}}>
      </div>
    </header>
  );
}

export default App;
