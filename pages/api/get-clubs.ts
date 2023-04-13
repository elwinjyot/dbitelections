import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const clubs = await prisma.club.findMany({
    select: {
      clubName: true,
      id: true
    }
  });

  if (clubs) {
    res.status(200).send(clubs);
  }
}