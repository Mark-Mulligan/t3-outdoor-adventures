// src/pages/api/examples.ts
import type { NextApiRequest, NextApiResponse } from 'next';
// import axios from 'axios';
import { prisma } from '../../server/db/client';

const examples = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    // const result = await prisma.nationalParksData.findMany({ skip: 0, take: 10 });
    console.log(req.query);
    const page = Number(req.query.page);
    const limit = Number(req.query.limit);

    const offset = (page - 1) * limit;
    const endIndex = page * limit;

    const allResults = await prisma.nationalParksData.findMany();

    const results = allResults.slice(offset, endIndex);
    const totalCount = allResults.length;
    const totalPages = Math.ceil(totalCount / limit);

    res.status(200).json({ results, totalCount, totalPages, currentPage: page });
  }
};

export default examples;
