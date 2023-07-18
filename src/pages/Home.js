import users from "../data";
import UserCard from "../components/UserCard";

function Home() {
  
  const userList = users.map(user =>{
    <UserCard key={user.id} {...user}/>
  })

  return (
    <>
      <header>
        {/* place NavBar here */}
      </header>
      <main>
        <h1>Home!</h1>
      </main>
    </>
  );
};

export default Home;