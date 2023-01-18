import { Link } from "react-router-dom";

const Header = (props: any) => {
  const { user, logout } = props;
  return (
    <header className="mt-10">
      <nav className="max-w-3xl mx-auto">
        <ul className="flex list-none h-[40px] items-center font-bold justify-end">
          {user?.loading ? (
            // If loading, don't display any buttons specific to the loggedIn state
            <div className="h-[40px]"></div>
          ) : user?.issuer ? (
            <>
              <li className="mr-6 ml-0">
                <Link color="primary" to="/">
                  Home
                </Link>
              </li>
              <li className="mr-6 ml-0">
                <Link color="primary" to="/profile">
                  Profile
                </Link>
              </li>
              <li className="mr-6 ml-0">
                <button
                  className="px-6 py-2 rounded-full text-white bg-[#3EDBB5] hover:bg-[#1c9b7b] duration-300"
                  onClick={logout}
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <li className="mr-6 ml-0">
              <Link
                className="px-6 py-2 rounded-full text-white bg-[#3EDBB5] hover:bg-[#1c9b7b] duration-300"
                to="/login"
              >
                Let's start
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
