import {Router, Request, Response, response} from 'express';

import { requireAuth } from './auth.router';
import { PersonalDiary } from "../models/PersonalDiary";
import { PersonalDiaryResponse } from "../models/PersonalDiaryResponse";
import {sequelize} from "../../../../sequelize";

const router: Router = Router();

router.post("/", requireAuth, async (req: Request, res: Response) => {
  let { recordDate, notes } = req.body;

  if (!req.headers || !req.headers.userid){
    return res.status(400).send({ message: 'Required headers missing.' });
  }

  if ( !recordDate ) {
    return res.status(400).send({ message: 'Reqest must have recordDate, height and weight.'});
  }

  const userId: string = req.headers.userid.toString();

  const recordDateTz = recordDate;
  // @ts-ignore
  const new_record = await new PersonalDiary ({recordDate: recordDateTz, notes: notes, email: userId });
  console.log('Sacving record: ', new_record);
  let savedUser = await new_record.save();
  res.status(201).send(savedUser);
});

// get all Diary items
router.get('/all', async (req: Request, res: Response) => {
  const items = await PersonalDiary.findAll({
      order: [sequelize.literal(`TO_DATE("recordDate", 'YYYY-mm-DD')`)]
    });
  res.status(200).send(items);
});

// get diary items filtered by used email
router.get("/", requireAuth, async (req: Request, res: Response) => {
    if (!req.headers || !req.headers.userid){
        return res.status(200).send({});
    }

    const email: string = req.headers.userid.toString();

    try {
       var items = await PersonalDiary.findAll({
            where: {email: email},
            order: [sequelize.literal(`TO_DATE("recordDate", 'YYYY-mm-DD')`)]
       });
       if (items == null || items.length == 0) {
         return res.status(200).send({});
       }
       console.log('Returning: ' , items);
       res.status(200).send(items);
    } catch (e) {
        console.log("exception: ", e);
        res.status(500).send("Internal Server Error.");
    }
});

export const DiaryRouter: Router = router;

