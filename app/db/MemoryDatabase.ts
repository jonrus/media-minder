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
  }

  checkIfDatabaseExists(): boolean {
    return this.isDatabaseOpen();
  }

  init(): void {
    throw new Error(''); //TODO: fill in message
  }
}
