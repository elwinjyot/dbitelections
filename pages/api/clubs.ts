// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import connect from "../../lib/connect";
import SClub from "../../models/Club.model";
import { IClub, IMember } from "../../types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connect();

  switch (req.method) {
    case "GET": {
      const data = await SClub.find();
      if (data) {
        res.status(200).json(data);
      }

      break;
    }
    case "POST": {
      const c_id = JSON.parse(req.body)["c_id"];
      const mem_id = parseInt(JSON.parse(req.body)["mem_id"]);
      const data = await SClub.findOne({ _id: c_id });
      let members: IMember[] = data.clubMembers;
      let index;

      if (data && members) {
        for (let i = 0; i < members.length; i++) {
          console.log(members[i].name);
          if (mem_id == members[i]["memberId"]) {
            index = i;
          }
        }
      }

      console.log(index);
      res.status(201).json("Voted");

      break;
    }
  }
}
