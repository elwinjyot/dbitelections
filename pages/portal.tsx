import { FunctionComponent, useEffect, useState } from "react";
import Clubs from "../components/Clubs";
import VotingPanel from "../components/VotingPanel";
import { IClub } from "../types";

const Portal: FunctionComponent = () => {
  const [selectedClub, setSelectedClub] = useState<IClub>();

  return (
    <section id="portal" className="bg-primary container-full">
      <div className="portal-wrapper">
        {selectedClub ? <VotingPanel setClub={setSelectedClub} club={selectedClub} /> : <Clubs setClub={setSelectedClub} />}
      </div>
    </section>
  );
};

export default Portal;
