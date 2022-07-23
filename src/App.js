import {
    BrowserRouter as Router,
    Routes,
    Route
} from "react-router-dom";
import Explorer from "./Explorer";
import TxInfo from "./TxInfo";

function App() {
  return (
      <Router>
          <div>
              <Routes>
                  <Route path="/tx/:id" element={<TxInfo/>}/>
                  <Route path="/" element={<Explorer/>}/>
              </Routes>
          </div>
      </Router>
  );
}

export default App;
