import { useEffect, useState } from "react";
import { fetchRetryCounts } from "../services/gameApi";
import { typography } from "../styles/typography";

const RetryOverview = () => {
  const [counts, setCounts] = useState({ easy: 0, medium: 0, hard: 0 });

  useEffect(() => {
    fetchRetryCounts().then(setCounts);
  }, []);

  return (
    <>
      <p className={typography.body}>
        Number of Questions Available to Retry (Select Up To 10)
      </p>
      <ul className="space-x-6 flex justify-center p-2">
        <li className="bg-green-500 rounded px-2">Easy: {counts.easy}</li>
        <li className="bg-orange-500 rounded px-2">Medium: {counts.medium}</li>
        <li className="bg-red-500 rounded px-2">Hard: {counts.hard}</li>
      </ul>
    </>
  );
};

export default RetryOverview;
