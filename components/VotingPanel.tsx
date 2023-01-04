import { FunctionComponent } from "react";
import { IClub } from "../types";
import Image from "next/image";
import placeholder from "../assets/images/placeholder.png";

const VotingPanel: FunctionComponent<Props> = ({ setClub, club }) => {
  const vote = async (memberId: number) => {
    const res = await fetch("http://localhost:3000/api/clubs", {
      method: "POST",
      body: JSON.stringify({
        c_id: club._id ? club._id : null,
        mem_id: memberId,
      }),
    });
    const data = await res.json();
    console.log(data);
  };

  return (
    <div className="voting-panel">
      <div className="header">
        <div
          className="back-btn"
          onClick={() => {
            setClub(undefined);
          }}
        >
          <span className="material-symbols-rounded">chevron_left</span>
        </div>
        <div>
          <h1 className="title">Voting Panel</h1>
          <p>{club.clubName}</p>
        </div>
      </div>
      <div className="members">
        {club.clubMembers.map((member) => (
          <div className="member">
            <div className="member-image">
              <Image
                src={placeholder}
                width={200}
                height={200}
                alt={member.name}
              />
              <button
                className="btn-primary"
                onClick={() => {
                  vote(member.memberId);
                }}
              >
                Vote
              </button>
            </div>
            <h2>{member.name}</h2>
            <p>
              {member.course}({member.position})
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

interface Props {
  setClub: Function;
  club: IClub;
}

export default VotingPanel;
