import * as dotenv from 'dotenv';
import * as path from 'path';

if (process.env.NODE_ENV !== 'production') {
  dotenv.config({
    path: path.join(__dirname, `.env.${process.env.NODE_ENV || 'development'}`),
  });
}

import configs from './src/database/config';

export default configs;
