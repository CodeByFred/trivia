import { useGameContext } from "../context/useGameContext";

const UserSession = () => {
  const { token, tokenExpiry } = useGameContext();

  return (
    <div className="user-session p-4 bg-gray-100 text-xs break-all ">
      <h2 className="font-semibold italic">User Session</h2>
      <p>Token: {token ? token : "No token available"}</p>
      <p>
        Expiry:{" "}
        {tokenExpiry
          ? new Date(tokenExpiry).toLocaleString()
          : "No expiry information"}
      </p>
    </div>
  );
};

export default UserSession;
