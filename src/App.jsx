import "./App.css";
import Formulario from "./components/formulario";
import Header from "./components/header";
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
