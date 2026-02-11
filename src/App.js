import './App.css';
import Card from './elements/Card';
import Chat from './elements/Chat';
import Sidebar from './elements/Sidebar';
import { Fragment, useState, useEffect } from 'react';

function App() {

  const [alpha, setAlpha] = useState(2);
  const [tau, setTau] = useState(2);
  const [theme, setTheme] = useState("light"); // light o dark
  const [addTau, setAddTau] = useState(false);
  const [isShowingMenu, setIsShowingMenu] = useState(true);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);


  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <Fragment>
      <div className="d-flex vh-100">
          <Sidebar isOpen={isShowingMenu} setIsOpen={setIsShowingMenu} toggleTheme={toggleTheme} theme={theme} setAddTau={setAddTau} />

        {/* Main content */}

        <main className={`flex-grow-1 position-relative p-4 ${theme === "light" ? "bg-light text-dark" : "bg-dark text-light"}`} >
          <div className="d-flex flex-column gap-3 mb-5 justify-content-center">
            <Card title="Domain - audience α" theme={theme}>
              Talking about Programming Languages and EDC
            </Card>
            <div className='w-full d-flex gap-3 flex-column flex-md-row'>
              <Card title="Set your configuration" theme={theme}>
                <label htmlFor="range4" className="form-label">What kind of level of vocabulary do you want the model uses?</label>
                <input type="range" className="form-range" min="1" max="3" step="1" value={alpha} id="range4" onChange={(e) => setAlpha(e.target.value)} />

                <div className="d-flex justify-content-between">
                  <label htmlFor="range5" className="form-label">Beginner</label>
                  <label htmlFor="range5" className="form-label">Intermediate</label>
                  <label htmlFor="range5" className="form-label">Advanced</label>
                </div>
              </Card>

              {addTau &&

                <Card title="How much strict vocabulary you want the model be with you?" theme={theme}>
                  <label htmlFor="range1" className="form-label">What kind of level of vocabulary do you want the model uses?</label>
                  <input type="range" className="form-range" min="0" max="10" step="1" value={tau} id="range1" onChange={(e) => setTau(e.target.value)} />
                  <div className="d-flex justify-content-between">
                    <label htmlFor="range5" className="form-label">Slighly</label>
                    <output htmlFor="range5" id="rangeValue" aria-hidden="true">{tau}</output>
                    <label htmlFor="range5" className="form-label">Strict</label>
                  </div>
                </Card>

              }
            </div>
          </div>

          {/* <hr class="bg-dark border-2 border-top border-secondary" /> */}

          <div className="mt-4" style={{ backgroundColor: theme === "light" ? "rgba(var(--bs-light-rgb), var(--bs-bg-opacity)) " : "rgba(var(--bs-dark-rgb), var(--bs-bg-opacity))" }}>
            <Chat alpha={alpha} tau={tau} theme={theme} />
          </div>

        </main>
      </div>
    </Fragment>
  );
}

export default App;
