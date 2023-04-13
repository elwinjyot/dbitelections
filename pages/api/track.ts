import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";

export default async function handler(request: NextApiRequest, response: NextApiResponse) {
  const result = await generateResults();
  if (result) {
    response.status(200).send(result);
  }
}

async function generateResults() {
  const clubNames = await prisma.club.findMany({ select: { clubName: true } })
  let results: any[] = [];
  if (clubNames) {
    for (let i = 0; i < clubNames.length; i++) {
      const { clubName } = clubNames[i];
      const data = await prisma.club.findUnique({
        where: { clubName: clubName }, select: {
          clubName: true,
          clubMembers: {
            orderBy: { votes: "desc" },
            take: 1,
            select: {
              name: true,
              position: true,
              votes: true,
              img: true
            }
          },
        }
      })
      if (data) {
        results.push({
          name: data.clubName,
          members: data.clubMembers.map((member: any) => (
            member
          ))
        });
      }
    }
  }

  return results;
}