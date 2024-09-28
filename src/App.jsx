import "./App.css";
import Formulario from "./components/Formulario";
import Header from "./components/Header";
import Titulos from "./components/Titulos";

function App() {
  return (
    <>
      <section>
        <Header />
      </section>
      <section>
        <Titulos />
      </section>
      <section className="">
        <Formulario />
      </section>
    </>
  );
}

export default App;
