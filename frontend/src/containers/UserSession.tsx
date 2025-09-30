import { useGameContext } from "../context/useGameContext";
import { typography } from "../styles/typography";

const UserSession = () => {
  const { token, tokenExpiry } = useGameContext();

  return (
    <div className="user-session p-4 bg-gray-100 text-xs break-all ">
      <h2 className={typography.h2}>User Session</h2>
      <p className={typography.body}>
        Token: {token ? token : "No token available"}
      </p>
      <p className={typography.body}>
        Expiry:{" "}
        {tokenExpiry
          ? new Date(tokenExpiry).toLocaleString()
          : "No expiry information"}
      </p>
    </div>
  );
};

export default UserSession;
