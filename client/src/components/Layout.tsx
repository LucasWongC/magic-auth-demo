import Header from "./Header";

const Layout = (props: any) => {
  const { user, logout } = props;

  return (
    <>
      <Header user={user} logout={logout}/>
      <main>
        <div className="w-4/5 mx-auto">{props.children}</div>
      </main>
    </>
  );
};

export default Layout;
