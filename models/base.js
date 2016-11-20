import _ from 'lodash';
import db from '../db';

class BaseModel {
  constructor(options) {
    if (options) {
      for (const key of Object.keys(options)) {
        this[key] = options[key];
      }
    }
  }

  get = async () => {
    const query = `MATCH (node:{type}) RETURN COLLECT(node) as nodes`;
    const params = {
      type: this.model, // might not work cause of arrow function and "this"
    };
    const data = await db.run(query, params);
    return data;
  }
}

export default BaseModel;
