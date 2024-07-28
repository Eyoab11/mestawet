import { useEffect } from 'react'
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom'
import { Button } from '../ui/button'
import { useSignOutAccount } from '@/lib/react-query/queriesAndMutations'
import { useUserContext } from '@/context/AuthContext'
import { sidebarLinks } from '@/constants'
import { INavLink } from '@/types'

const LeftSidebar = () => {
    const { mutate: signOut, isSuccess } = useSignOutAccount()
    const navigate = useNavigate();
    const { user } = useUserContext();
    const {pathname} = useLocation();
    
    useEffect(() => {
        if (isSuccess) navigate(0);
    }, [isSuccess]
)

  return (
    <nav className="leftsidebar text-white">
        <div className="flex flex-col gap-6"> 
            
            <Link to="/" className='flex gap-3 items-center'>
                <img src="/assets/images/mlogo.svg" alt="logo" width={170} height={36} />
            </Link>

            <Link to={`/profile/${user.id}`} className='flex gap-3 items-center'>
                <img src={user.imageUrl || '/assets/icons/profile-placeholder.svg'} alt="profile" className='h-14 w-14 rounded-full'/>

                <div className='flex flex-col'>
                    <p className='body-bold '> 
                        {user.name}
                    </p>
                    <p className='small-regular text-green-400'> 
                        {user.username}
                    </p>

                </div>
            </Link>

            <ul className='flex flex-col gap-1 '>
                {sidebarLinks.map((link: INavLink) => {
                    const isActive = pathname === link.route;
                    return (
                        <li className={`leftsidebar-link group mb-2 ${isActive && 'bg-gray-500'}`} key={link.label}>
                            <NavLink to={link.route} className='flex gap-4 items-center p-3'>
                                <img src={link.imgURL} alt={link.label} className={`w-8 h-8 group-hover:invert-white ${isActive && 'invert-white'}`}/>
                                {link.label}
                            </NavLink>
                        </li>
                    )
                })}
            </ul>
        </div>
        <Button variant="ghost" className='shad-button_ghost mt-4'
                onClick={() => signOut()}
                >
            <img src="/assets/icons/logouticon.svg" alt="logout" className="w-8 h-8" />
            <p className='small-medium lg:base-medium'>Logout</p>
        </Button>
    </nav>
  )
}

export default LeftSidebar
