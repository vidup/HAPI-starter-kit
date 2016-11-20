import 'dotenv/config';

import neo4j from 'neo4j-driver';

const driver = neo4j.driver(`bolt://${process.env.NEO4J_HOST}`, neo4j.auth.basic(process.env.NEO4J_USER, process.env.NEO4J_PASS), { encrypted: false });

module.exports = {
  session: () => driver.session(),
  int: neo4j.int,
  run: async (query, params) => {
    const session = driver.session();

    try {
      const result = await session.run(query, params);
      session.close();
      return result;
    } catch (error) {
      session.close();
      throw error;
    }
  },
};
