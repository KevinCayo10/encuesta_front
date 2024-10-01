import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Forms from "./views/Forms";
import SuccessPage from "./views/Success";

function App() {
  return (
    <Router>
      <Routes>
        {/* Otras rutas */}
        <Route path="/" element={<Forms />} />
        <Route path="/success" element={<SuccessPage />} />
      </Routes>
    </Router>
  );
}

export default App;
