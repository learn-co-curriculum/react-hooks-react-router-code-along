import { Link } from "react-router-dom"

function UserCard({id, name}) {
  return (
    <article>
        <h2>{name}</h2>
        <Link to={`/profile/${id}`}>View profile</Link>
    </article>
  )
}

export default UserCard