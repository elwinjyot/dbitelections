import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { name, course, club, position, img } = JSON.parse(req.body);

    const response = await prisma.member.create({
      data: {
        name: name,
        course: course,
        position: position,
        votes: 0,
        img: img,
        clubId: club,
      }
    })

    if (response) {
      const members = await prisma.member.findMany({
        select: {
          img: true,
          name: true,
          position: true,
          votes: true,
          Club: {
            select: {
              clubName: true
            }
          }
        },
        orderBy: {
          votes: "desc",
        }
      });

      if (members) {
        res.status(200).send(members);
      }
    }
  } else {
    res.status(400).send({ message: "Only POST request accepted!" });
  }
}