import { useEffect, useState } from "react";
import { fetchRetryCounts } from "../services/gameApi";

const RetryOverview = () => {
  const [counts, setCounts] = useState({ easy: 0, medium: 0, hard: 0 });

  useEffect(() => {
    fetchRetryCounts().then(setCounts);
  }, []);

  return (
    <div className="p-4 justify-center items-center flex flex-col space-y-2">
      <h2>Number of Questions Available to Retry</h2>
      <h2>(Select Up To 10)</h2>
      <ul className="space-x-6 flex justify-center">
        <li className="bg-green-500">Easy: {counts.easy}</li>
        <li className="bg-orange-500">Medium: {counts.medium}</li>
        <li className="bg-red-500">Hard: {counts.hard}</li>
      </ul>
    </div>
  );
};

export default RetryOverview;
