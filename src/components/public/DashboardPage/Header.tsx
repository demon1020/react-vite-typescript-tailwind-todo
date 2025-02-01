import useLoginStore from "../../../store/useLoginStore";

function Header() {
  const { firstName, email, image } = useLoginStore();
  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">Dashboard</a>
      </div>
      <div className="flex-none gap-2">
        <div className="form-control text-right">
          <h2 className="text-blue-500">{firstName}</h2>
          <h5>{email}</h5>
        </div>
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <img alt="Tailwind CSS Navbar component" src={image} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
