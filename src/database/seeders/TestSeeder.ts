import type { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';

export class TestSeeder extends Seeder {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async run(em: EntityManager): Promise<void> {
    // const yourRepo = em.getRepository(Repo);
    // logic to seed the database
    return;
  }
}
