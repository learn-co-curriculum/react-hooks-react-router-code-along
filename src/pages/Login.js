import NavBar from "../components/NavBar";

function Login() {
    return (
      <>
        <header>
          <NavBar />
        </header>
        <main>
          <h1>Login</h1>
          <form>
            <div>
              <input type="text" name="username" placeholder="Username" />
            </div>
            <div>
              <input type="password" name="password" placeholder="Password" />
            </div>
            <input type="submit" value="Submit" />
          </form>
        </main>
      </>
    );
  };
  
  export default Login;