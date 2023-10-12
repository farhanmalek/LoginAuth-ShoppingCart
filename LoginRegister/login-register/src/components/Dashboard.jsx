import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

function Dashboard() {
  const [name, setName] = useState("");
  const [id, setID] = useState("");

  const navigate = useNavigate();
  axios.defaults.withCredentials = true;

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get("http://localhost:5000");
        if (response.data.Error === "Not authenticated") {
          navigate("/login");
        } else {
          setName(response.data.name);
          setID(response.data.id);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);

  const fetchLogout = async () => {
    try {
      await axios.get("http://localhost:5000/logout");
      window.location.reload(true);
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogout = (e) => {
    e.preventDefault();
    fetchLogout();
  };

  return (
    <div>
      <p>
        Welcome {name}! of ID: {id}
        <button onClick={handleLogout}>
          <Link to="/login"> Logout </Link>
        </button>
      </p>
    </div>
  );
}

export default Dashboard;
