import NavBar from "../components/NavBar"
import { useRouteError } from "react-router-dom";

function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <>
      <header>
        <NavBar />
      </header>
      <main>
        <h1>Whoops! Something went wrong!</h1>
      </main>
    </>
  );
}

export default ErrorPage;