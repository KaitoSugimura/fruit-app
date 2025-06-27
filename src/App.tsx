import "./App.css";
import "./Reset.css";
import Home from "./Pages/Home/Home";
import { FruitJarProvider } from "./Context/FruitJarContext";
import ThemeContextProvider from "./Context/ThemeContext";

function App() {
  /* Could add something like a Browser router with Route components here if this was a multipage website */
  /* For the sake of this assignment, I'll just keep it simple and have a single Home page component */
  return (
    <ThemeContextProvider>
      <FruitJarProvider>
        <Home />
      </FruitJarProvider>
    </ThemeContextProvider>
  );
}

export default App;
