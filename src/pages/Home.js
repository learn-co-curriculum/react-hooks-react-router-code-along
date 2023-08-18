import users from "../data";
import UserCard from "../components/UserCard";
import NavBar from "../components/NavBar";

function Home() {
  
  const userList = users.map(user =>{
    return <UserCard key={user.id} user={user}/>
  })

  return (
    <>
      <header>
        <NavBar />
      </header>
      <main>
        <h1>Home!</h1>
        {userList}
      </main>
    </>
  );
};

export default Home;