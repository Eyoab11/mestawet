import { bottombarLinks } from '@/constants';
import { Link, useLocation } from 'react-router-dom';

const Bottombar = () => {
  const { pathname } = useLocation();
  
  return (
    <section className='bottom-bar'>
      {bottombarLinks.map((link) => {
        const isActive = pathname === link.route;
        return (
          <Link
            key={link.route}
            to={link.route}
            className={`flex-center flex-col gap-1 p-2 transition ${isActive ? 'bg-white rounded-[10px]' : ''}`}
          >
            <img
              src={link.imgURL}
              alt={link.label}
              width={16}
              height={16}
              className={`w-4 h-4 transition-colors ${isActive ? 'text-black' : 'text-gray-500'}`}
            />
            <p className={`tiny-medium ${isActive ? 'text-black' : 'text-white'}`}>
              {link.label}
            </p>
          </Link>
        );
      })}
    </section>
  );
}

export default Bottombar;
