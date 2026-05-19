import { Link } from "react-router";

const Back2Home = () => {
  return (
    <div>
      "You are already Signed in"
      <Link to="/">
        <button className="btn">
          <img
            className="w-5"
            src="https://img.icons8.com/win10/1200/forward-arrow.jpg"
          ></img>
          Back to home{" "}
        </button>
      </Link>
    </div>
  );
};

export default Back2Home;
