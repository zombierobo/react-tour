export interface Report {
  id: number;
  title: string;
  description: string;
}

export interface Researcher {
  id: number;
  name: string;
}

const mockReports: Report[] = [
  {
    id: 1,
    title: "Crack RSA encryption",
    description: `We have recently found a method of finding private secret key
      in polynomial time. This approach exploits the fact that.....
    `
  },
  {
    id: 2,
    title: "Fully decentralized Internet",
    description: `Hurray!! it's 2205 A.D. After many decades of research work
      by a group of computer scientists on distributed trust chain. We have finally
      achieved the unthinkable. 
    `
  }
];

const mockResearchers: Researcher[] = [
  "Isaac Newton",
  "Niels Bohr",
  "Galileo Galilei",
  "Albert Einstein",
  "James Clerk",
  "Michael Faraday",
  "Marie Curie",
  "Richard Feynman"
].map((r, i) => ({ name: r, id: i }));

const randomInt = (max: number): number => {
  return Math.ceil(Math.random() * max);
};

/**
 * Helper function which exposes methods needed for
 * fetching researchers data.
 */
const researchersApiBuilder = () => {
  return {
    getReports: (): Promise<Report[]> =>
      new Promise(res => setTimeout(() => res(mockReports), 500)),
    getActivePeopleCount: (): Promise<number> =>
      new Promise(res => setTimeout(() => res(randomInt(10)), 500)),
    getResearchers: (): Promise<Researcher[]> =>
      new Promise(res => setTimeout(() => res(mockResearchers), 500)),
    getResearchersOnlineIds: (): Promise<number[]> =>
      new Promise(res =>
        setTimeout(
          () =>
            res(
              mockResearchers
                .map(m => ({ id: m.id, online: Math.random() > 0.5 }))
                .filter(m => m.online)
                .map(m => m.id)
            ),
          500
        )
      )
  };
};

/**
 * Export an instance of ResearchersApi
 */
export const ResearchersApi = researchersApiBuilder();
