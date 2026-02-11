
const Sidebar = ({ toggleTheme, theme, setAddTau }) => {
  const getRequest = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/");
      const data = await response.json();
      console.log("Response from server:", data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <aside
      className={`vh-100 position-fixed top-0 start-0 ${theme === "light" ? "bg-secondary-subtle text-dark" : "bg-black text-light"}`}
      style={{ width: "16rem" }}
    >
      <div className="p-4 fs-5 fw-bold border-bottom border-secondary">
        <img src={`/img/${theme === "light" ? "black" : "light"}-logo.png`} className="card-img-top" alt="logo" />
      </div>

      <nav className="mt-3">
        <ul className="list-unstyled px-2">
          <li
            onClick={getRequest}
            className="px-3 py-2 rounded sidebar-item"
            role="button"
          >
            Test Connection
          </li>
          <li className="px-3 py-2 rounded sidebar-item" role="button" onClick={toggleTheme}>
            Change Theme
          </li>
          <li className="px-3 py-2 rounded sidebar-item" role="button" onClick={() => setAddTau(prev => !prev)}>
            Add Tau
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
