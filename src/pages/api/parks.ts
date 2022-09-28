// src/pages/api/examples.ts
import type { NextApiRequest, NextApiResponse } from 'next';
// import axios from 'axios';
import { prisma } from '../../server/db/client';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    const page = Number(req.query.page);
    const limit = Number(req.query.limit);

    try {
      const allResults = await prisma.nationalParksData.findMany();
      const offset = (page - 1) * limit;
      const endIndex = page * limit;
      const results = allResults.slice(offset, endIndex);
      const totalCount = allResults.length;
      const totalPages = Math.ceil(totalCount / limit);

      res.status(200).json({ results, totalCount, totalPages, currentPage: page });
      return;
    } catch (err) {
      res.status(500).json({ message: 'Failed to fetch data from database.' });
      return;
    }
  }
};

export default handler;
