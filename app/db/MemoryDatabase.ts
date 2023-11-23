import {
  Database as dbType,
  Options as dbOptions
} from 'better-sqlite3';
import DatabaseBase from "./DatabaseBase";

export default class MemoryDatabase extends DatabaseBase {
  fileName: string;
  filePath: string;
  database: dbType;
  options: dbOptions;

  constructor() {
    super();
    this.fileName = ':memory:';
    this.filePath = this.fileName;
    this.options = {verbose: console.log};
    this.database = this.openDatabase();
    this.init();
  }

  /*
    This method will build out the db schema.
    As this is an in memory db all the schema will be defined
    in this method - the changes/rollbacks pattern will not be
    used here.
  */
  init(): void {
    const statement = this.database.prepare('CREATE TABLE IF NOT EXISTS tokens (token_id INTEGER PRIMARY KEY, token TEXT NOT NULL);');
    statement.run();
  }

  checkIfDatabaseExists(): boolean {
    return true;
  }
}
