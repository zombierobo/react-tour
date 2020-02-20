import React, { useState, useEffect } from "react";
import { Report, ResearchersApi } from "./researchers-api";

interface ContentState {
  fetched: boolean;
  fetching: boolean;
  reports?: Report[];
}

const ResearchAreas: React.FC = () => {
  const [contentState, setContentState] = useState<ContentState>({
    fetched: false,
    fetching: false
  });
  const { fetched, fetching, reports } = contentState;

  useEffect(() => {
    setContentState({
      fetched: false,
      fetching: true
    });
    ResearchersApi.getReports().then(
      newReports =>
        setContentState({
          fetched: true,
          fetching: false,
          reports: newReports
        }),
      err => {}
    );
  }, []);

  return (
    <div>
      <h4>Research Areas</h4>
      <div>
        {fetching && <span>spinner</span>}
        {fetched && reports && (
          <div>
            <ul>
              {reports.map((report, i) => (
                <li key={i}>
                  <strong>{report.title}</strong>
                  {" - "}
                  <span>{report.description}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResearchAreas;
