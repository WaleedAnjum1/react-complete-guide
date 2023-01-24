import { Link } from "react-router-dom";
import classes from "./ErrorPage.module.css";

const ErrorPage = () => {
  return (
    <div className={classes.notfound}>
      <div className={classes.f404}>
        <h1>404</h1>
      </div>
      <h2>Oops! Nothing was found</h2>
      <p>
        The page you are looking for might have been removed had its name
        changed or is temporarily unavailable.{" "}
        <Link to="/">Return to homepage</Link>
      </p>
    </div>
  );
};

export default ErrorPage;
