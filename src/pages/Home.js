import users from "../data";
import UserCard from "../components/UserCard";

function Home() {
  
  const userList = users.map(user =>{
    <UserCard key={user.id} name={user.name}/>
  })

  return (
    <>
      <main>
        <h1>Home!</h1>
      </main>
    </>
  );
};

export default Home;