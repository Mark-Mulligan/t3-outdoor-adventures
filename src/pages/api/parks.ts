// src/pages/api/examples.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import { prisma } from '../../server/db/client';

const examples = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    const result = await prisma.nationalParksData.findMany({ skip: 0, take: 10 });
    res.status(200).json(result);
  }
};

export default examples;
