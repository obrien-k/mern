const Header = ({ username, userId }) => {
  return (
    <div className="header">
      <h2>
        <strong>
          <Link to={`/user/${userId}`}>{username}</Link>
        </strong>
      </h2>
    </div>
  );
};

export default Header;
