const User = ({ user }) => {
  return (
    <div className="card bg-base-100 w-96 shadow-sm">
      <figure className="px-10 pt-10">
        <img src={user.photoUrl} alt="user" className="rounded-xl" />
      </figure>
      <div className="card-body items-center text-center">
        <h2 className="card-title">
          {user.firstName} {user.lastName}
        </h2>
        <p>{user.about}</p>
        <div className="card-actions">
          <button className="btn btn-primary">Like</button>
        </div>
      </div>
    </div>
  );
};

export default User;
