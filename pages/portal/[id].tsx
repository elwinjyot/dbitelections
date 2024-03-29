import { FunctionComponent, useEffect, useState } from "react";
import Image from "next/image";
import placeholder from "../assets/images/placeholder.gif";
import { IClub } from "../../types";
import prisma from "../../lib/prisma";
import Link from "next/link";
import pageMap from "../../lib/map";

const Portal: FunctionComponent<Props> = ({ allClubs }) => {
  const [clubs] = useState<IClub[] | null>(allClubs);

  return (
    <div id="portal">
      <section className="portal-wrapper">
        <h1 className="title">All Clubs</h1>
        {clubs ? (
          clubs.length > 0 ? (
            <div className="clubs">
              {" "}
              {clubs.map((club) => (
                <Link href={`/vote/${club.id}`} key={club.id}>
                  <div className="club">
                    <div className="club-image">
                      <Image
                        src={club.imgUri}
                        width={140}
                        height={140}
                        alt=""
                      />
                    </div>
                    <h3>{club.clubName}</h3>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <h3>No Clubs found!</h3>
          )
        ) : (
          <div className="loading">
            <p>Loading</p>
          </div>
        )}
      </section>
    </div>
  );
};

interface Props {
  allClubs: IClub[];
}

export const getServerSideProps = async (context: any) => {
  const id = context.params.id;

  if (!id || id > 12 || id == 0) {
    return {
      redirect: {
        destination: "/portal",
        permanent: false,
      }
    }
  }

  const idList: string[] = pageMap[id]

  const clubs = await prisma.club.findMany({
    where: {
      id: {
        in: idList
      }
    },
    orderBy: {
      clubName: "asc"
    }
  });


  if (clubs) {
    return {
      props: { allClubs: clubs, },
    };
  } else {
    props: {
      allClubs: null;
    }
  }
};

export default Portal;
