import { FunctionComponent, useEffect, useState } from "react";
import Image from "next/image";
import placeholder from "../assets/images/placeholder.gif";
import { IClub } from "../types";

const Clubs: FunctionComponent<Props> = ({ setClub }) => {
  const [clubs, setClubs] = useState<IClub[]>();

  useEffect(() => {
    getClubs();
  }, []);

  const getClubs = async () => {
    const response = await fetch("http://localhost:3000/api/clubs");
    const data = await response.json();

    if (data) {
      setClubs(data);
    }
  };

  return (
    <>
      <h1 className="title">All Clubs</h1>

      {clubs ? (
        <div className="clubs">
          {" "}
          {clubs.map((club) => (
            <div
              className="club"
              onClick={() => {
                setClub(club);
              }}
            >
              <div className="club-image">
                <Image src={placeholder} width={140} height={140} alt="" />
              </div>
              <h3>{club.clubName}</h3>
            </div>
          ))}
        </div>
      ) : (
        <div className="loading">
          <p>Loading</p>
        </div>
      )}
    </>
  );
};

interface Props {
  setClub: Function;
}

export default Clubs;
