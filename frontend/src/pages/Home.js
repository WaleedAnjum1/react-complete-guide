import { Link } from "react-router-dom";

const HomePage = () => {

//   const navigate = useNavigate();

//   const navigateHandler = () => {
//     navigate("/products");
//   };

  return (
    <>
      <h1>My Home Page</h1>
      <p>
        Go to <Link to="events">the list of events</Link>
      </p>
      {/* Use of Link is encouraged instead of button 
      <p>
        <button onClick={navigateHandler}>Navigate</button>
      </p> */}
    </>
  );
};

export default HomePage;