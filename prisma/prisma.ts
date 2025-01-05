import { Pool, neonConfig } from '@neondatabase/serverless';
import { PrismaNeon } from '@prisma/adapter-neon';
import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';
import ws from 'ws';

dotenv.config();

neonConfig.webSocketConstructor = ws;

const connectionString: string = process.env.DATABASE_URL || '';

const pool = new Pool({ connectionString });

const adapter = new PrismaNeon(pool);

const prisma = new PrismaClient({ adapter });

export { prisma };
