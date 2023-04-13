import { useState } from "react";
import prisma from "../../lib/prisma";
import { IMember } from "../../types";
import Image from "next/image";
import { useRouter } from "next/router";
import VoteConfirmation from "../../components/VoteConfirmation";

export default function Vote({ members, clubName }: Props) {
  const [allMembers] = useState<IMember[]>(JSON.parse(members));
  const [showConf, setShowConf] = useState<boolean>(false);

  const router = useRouter();

  const vote = async function (id: string) {
    const res = await fetch("http://localhost:3000/api/vote", {
      method: "POST",
      body: JSON.stringify({
        id: id,
      }),
    });

    if (res) {
      res.json().then((data) => {
        setShowConf(true);
      });
    }
  };

  return (
    <>
      {showConf ? <VoteConfirmation /> : null}
      <div id="portal">
        <section className="portal-wrapper">
          <div className="voting-panel panel">
            <div className="header">
              <div className="back-btn" onClick={() => {router.back()}}>
                <span className="material-symbols-rounded">chevron_left</span>
              </div>
              <div>
                <h1 className="title">Voting Panel</h1>
                <p>{clubName.clubName}</p>
              </div>
            </div>
            <div className="members">
              {allMembers.map((mem) => (
                <div className="member">
                  <div className="member-image">
                    <Image
                      src={mem.img}
                      width={200}
                      height={200}
                      alt={mem.name}
                    />
                    <button
                      className="btn-primary"
                      onClick={() => {
                        vote(mem.memberId);
                      }}
                    >
                      Vote
                    </button>
                  </div>
                  <h2>{mem.name}</h2>
                  <p>
                    {mem.course}({mem.position})
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

interface Props {
  members: any;
  clubName: any;
}

export const getServerSideProps = async (context: any) => {
  const id = context.params.id;

  if (id) {
    const clubName = await prisma.club.findUnique({
      where: {
        id: id,
      },
      select: {
        clubName: true,
      },
    });

    const members = await prisma.member.findMany({
      where: {
        clubId: id,
      },
      select: {
        img: true,
        name: true,
        position: true,
        course: true,
        memberId: true,
      },
      orderBy: {
        name: "asc"
      }
    });

    if (members) {
      return {
        props: {
          members: JSON.stringify(members),
          clubName: clubName,
        },
      };
    } else {
      return {
        props: {
          members: [],
          clubName: null,
        },
      };
    }
  } else {
    return {
      props: {
        members: [],
        clubName: null,
      },
    };
  }
};
