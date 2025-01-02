import "./SideBar.scss";
import stitchImage from "../../assets/stitch.jpg";
import { FaCheck, FaHome, FaSignOutAlt, FaTasks } from "react-icons/fa";
import { MdEditDocument } from "react-icons/md";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

function SideBar({ onTaskSelect }: { onTaskSelect: (task: string) => void }) {
  const [activeButton, setActiveButton] = useState<string>("All Tasks");

  const handleButtonClick = (task: string) => {
    setActiveButton(task);
    onTaskSelect(task);
  };

  const getButtonClass = (task: string) => {
    return task === activeButton
      ? "side-bar__itemTwo--button side-bar__itemTwo--button--active"
      : "side-bar__itemTwo--button";
  };

  // Get the user Id from the token
  const getUserIdFromToken = () => {
    const token = localStorage.getItem("token");
    if (!token) return null;

    try {
      const decodedToken = jwtDecode(token); // Decode the JWT token
      return decodedToken.sub; // Use the 'sub' field for the user ID
    } catch (error) {
      console.error("Failed to decode token", error);
      return null;
    }
  };

  useEffect(() => {
    const userId = getUserIdFromToken();
    console.log("User Id", userId);
  }, []);

  return (
    <section className="side-bar">
      <div className="side-bar__container">
        <div className="side-bar__itemOne">
          <div className="side-bar__itemOne__logo">
            <img src={stitchImage} alt="logo" />
          </div>
          <h1>Stitch</h1>
        </div>

        <div className="side-bar__itemTwo">
          <div className="side-bar__itemTwo--buttons">
            <div
              className={getButtonClass("All Tasks")}
              onClick={() => handleButtonClick("All Tasks")}
            >
              <div className="side-bar__itemTwo--buttons__button__group">
                <div className="side-bar__itemTwo--buttons__button__icon">
                  <FaHome />
                </div>
                <button>All Tasks</button>
              </div>
            </div>
            <div
              className={getButtonClass("Important")}
              onClick={() => handleButtonClick("Important")}
            >
              <div className="side-bar__itemTwo--buttons__button__group">
                <div className="side-bar__itemTwo--buttons__button__icon">
                  <FaTasks />
                </div>

                <button>Importants!</button>
              </div>
            </div>
            <div
              className={getButtonClass("Completed")}
              onClick={() => handleButtonClick("Completed")}
            >
              <div className="side-bar__itemTwo--buttons__button__group">
                <div className="side-bar__itemTwo--buttons__button__icon">
                  <FaCheck />
                </div>

                <button>Completed!</button>
              </div>
            </div>
            <div
              className={getButtonClass("Do it Now")}
              onClick={() => handleButtonClick("Do it Now")}
            >
              <div className="side-bar__itemTwo--buttons__button__group">
                <div className="side-bar__itemTwo--buttons__button__icon">
                  <MdEditDocument />
                </div>

                <button>Do it Now</button>
              </div>
            </div>
          </div>
        </div>

        <div className="side-bar__itemThree">
          <FaSignOutAlt />
          <button
            onClick={() => {
              localStorage.removeItem("token");
              window.location.href = "/login";
            }}
          >
            Sign Out
          </button>
        </div>
      </div>
    </section>
  );
}

export default SideBar;
