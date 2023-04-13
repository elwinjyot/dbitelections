import Link from "next/link";
import { FunctionComponent, useEffect, useState } from "react";
import AddClub from "../components/AddClub";
import AddMember from "../components/AddMember";
import prisma from "../lib/prisma";
import { IClub, IMember } from "../types";
import { useRouter } from "next/router";

const Dashboard: FunctionComponent<Props> = ({ members, clubList }) => {
  const [allMembers, setAllMembers] = useState<IMember[]>(JSON.parse(members));
  const [clubs, setAllClubs] = useState<IClub[]>(JSON.parse(clubList));
  const [showAddMemberWindow, setShowAddMemberWindow] =
    useState<boolean>(false);
  const [showAddClubWindow, setShowAddClubWindow] = useState<boolean>(false);

  const router = useRouter();

  return (
    <>
      {showAddMemberWindow ? (
        <AddMember
          closeWindow={setShowAddMemberWindow}
          memUpdate={setAllMembers}
        />
      ) : null}
      {showAddClubWindow ? (
        <AddClub closeWindow={setShowAddClubWindow} clubUpdate={setAllClubs} />
      ) : null}
      <section id="dashboard" className="bg-primary container-full">
        <div className="panel">
          <div className="header">
            <div className="back-btn" onClick={() => { router.back() }}>
              <span className="material-symbols-rounded">chevron_left</span>
            </div>
            <div>
              <h1 className="title">Existing Candidates</h1>
              <div className="header-controls" style={{ marginTop: "0.4em" }}>
                <button
                  className="btn-primary"
                  onClick={() => {
                    setShowAddMemberWindow(true);
                  }}
                >
                  <span className="material-symbols-rounded">add</span> Add
                  Candidate
                </button>
                <Link href={"/track"}>
                  <button className="btn-primary">
                    <span className="material-symbols-rounded">insights</span>{" "}
                    Track Results
                  </button>
                </Link>
              </div>
            </div>
          </div>
          <div className="candidate-list">
            <div className="candidate">
              <div className="cell centered">S.No</div>
              <div className="cell">Name</div>
              <div className="cell">Club</div>
              <div className="cell">Position</div>
              <div className="cell centered">Votes</div>
            </div>
            {allMembers
              ? allMembers.map((member, index) => (
                <div className="candidate">
                  <div className="cell centered">{index + 1}</div>
                  <div className="cell">
                    <div className="tiny-preview">
                      <img src={member.img} alt="" />
                    </div>
                    {member.name}
                  </div>
                  <div className="cell">{member.Club.clubName}</div>
                  <div className="cell">{member.position}</div>
                  <div className="cell centered">{member.votes}</div>
                </div>
              ))
              : null}
          </div>
          <div className="header" style={{ marginTop: "2em" }}>
            <div>
              <h1 className="title">Clubs</h1>
              <button
                style={{ marginTop: "0.4em" }}
                className="btn-primary"
                onClick={() => {
                  setShowAddClubWindow(true);
                }}
              >
                <span className="material-symbols-rounded">add</span> Add Club
              </button>
            </div>
          </div>
          <div className="candidate-list">
            <div className="candidate">
              <div className="cell centered">S.No</div>
              <div className="cell">Name</div>
              {/* <div className="cell">Members Count</div> */}
            </div>
            {clubs
              ? clubs.map((club, index) => (
                <div className="candidate" key={index}>
                  <div className="cell centered">{index + 1}</div>
                  <div className="cell">
                    <div className="tiny-preview">
                      <img src={club.imgUri} alt="" />
                    </div>
                    {club.clubName}
                  </div>
                  {/* <div className="cell">{club._count.clubMembers}</div> */}
                </div>
              ))
              : null}
          </div>
        </div>
      </section>
    </>
  );
};

interface Props {
  members: string;
  clubList: string;
}

export const getStaticProps = async () => {
  const members = await prisma.member.findMany({
    select: {
      name: true,
      img: true,
      position: true,
      votes: true,
      Club: {
        select: {
          clubName: true,
        },
      },
    },
    orderBy: {
      Club: { clubName: "asc" },
    },
  });
  const clubList = await prisma.club.findMany({
    select: {
      clubName: true,
      imgUri: true,
      _count: {
        select: {
          clubMembers: true,
        },
      },
    },
    orderBy: {
      clubName: "asc",
    },
  });

  if (members && clubList) {
    return {
      props: {
        members: JSON.stringify(members),
        clubList: JSON.stringify(clubList),
      },
    };
  } else {
    return {
      props: {
        members: [],
        clubList: [],
      },
    };
  }
};

export default Dashboard;
