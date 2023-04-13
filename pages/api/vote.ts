import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = JSON.parse(req.body);

  if (id) {
    const response = await prisma.member.update({
      where: {
        memberId: id
      },
      data: {
        votes: {
          increment: 1
        }
      }
    })

    if (response) {
      res.status(200).send({ data: { name: response.name } });
    }
  }
}