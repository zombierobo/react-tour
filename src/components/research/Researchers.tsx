import React, { useState, useEffect } from "react";
import { Spinner } from "../../components/common";
import { Report, ResearchersApi } from "./researchers-api";
import { useInterval } from "../../utils/useInterval";

interface ContentState {
  fetched: boolean;
  fetching: boolean;
  reports?: Report[];
}

const researcherIsOnline = (id: number, onlineIds: number[]) =>
  onlineIds.some(i => id === i);

const Researchers: React.FC = () => {
  const [activeResearchersIdsState, setActiveResearchersIdsState] = useState({
    fetching: false,
    ids: []
  });

  const [researcherListState, setResearcherListState] = useState({
    fetching: false,
    researchers: []
  });

  useEffect(() => {
    setResearcherListState(previousState => ({
      ...previousState,
      fetching: true
    }));
    ResearchersApi.getResearchers().then(
      researchers =>
        setResearcherListState({
          fetching: false,
          researchers
        }),
      err => {}
    );
  }, []);

  const fetchActive = () => {
    setActiveResearchersIdsState(previousState => ({
      ...previousState,
      fetching: true
    }));
    ResearchersApi.getResearchersOnlineIds().then(
      ids =>
        setActiveResearchersIdsState({
          fetching: false,
          ids
        }),
      err => {}
    );
  };

  /*
   * Poll for online status
   */
  useInterval(fetchActive, 15000);

  useEffect(() => {
    fetchActive();
  }, []);

  return (
    <section>
      <div>
        <h4>Researchers</h4>
        <div>
          {researcherListState.fetching ? (
            <Spinner>Fetching...</Spinner>
          ) : (
            <>
              {researcherListState.researchers.length > 0 ? (
                <ul>
                  {researcherListState.researchers.map(r => (
                    <li key={r.id}>
                      <span>{r.name}</span>
                      {researcherIsOnline(
                        r.id,
                        activeResearchersIdsState.ids
                      ) && (
                        <span>
                          <span role="img" aria-label="active">
                            🔋
                          </span>
                          Online
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              ) : (
                <span>No researchers as of yet.</span>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default Researchers;
