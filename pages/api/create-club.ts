import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { clubName, img } = JSON.parse(req.body);

    const response = await prisma.club.create({
      data: {
        clubName: clubName,
        imgUri: img,
      }
    });

    if (response) {
      const clubs = await prisma.club.findMany({
        select: {
          clubName: true,
          imgUri: true,
        }
      });

      if (clubs) {
        console.log(clubs);
        res.status(200).send(clubs);
      }
    }
  } else {
    res.status(400).send({ message: "Only post request accepted" });
  }
} 