/* eslint-disable react-hooks/rules-of-hooks */
import { useContext, useState } from 'react'
import axios from 'axios'
import { UserContext } from '../context/UserContext'
import { Link, Navigate, useParams } from 'react-router-dom'

const Account = () => {
  const [redirect, setRedirect] = useState(null)
  const { ready, user, setUser } = useContext(UserContext)

  let { subpage } = useParams();
  if (subpage === undefined) {
    subpage = "profile";
  }

  const logout = async () => {
    await axios.post('/logout')
    setUser(null);
    setRedirect('/')
  }
  
  if (!ready) {
    return 'Loading...'
  }
  if (ready && !user) {
    return <Navigate to={'/login'} />
  }

  const linkClasses = (type = null) => {
    let classes = 'py-2 px-6'
    if (type === subpage) {
      classes += ' bg-[#F5385D] text-white rounded-full';
    }
    return classes
  }

  if (redirect) {
    return <Navigate to={redirect} />
  }
  return (
    <div>
      <nav className="w-full flex justify-center my-8 gap-2">
        <Link className={linkClasses('profile')} to={"/account"}>
          My Profile
        </Link>
        <Link className={linkClasses('bookings')} to={"/account/bookings"}>
          My bookings
        </Link>
        <Link className="py-2 px-6" to={"/account/places"}>
          My accommodations
        </Link>
      </nav>
      {subpage === 'profile' && (
        <div className='text-center max-w-lg mx-auto'>
          Logged in as {user.name} ({user.email}) <br />
          <button onClick={logout} className="primary max-w-sm mt-2">Logout</button>
        </div>
      )}
    </div>
  );
}

export default Account