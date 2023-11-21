import Database from 'better-sqlite3';
import {Database as dbType} from 'better-sqlite3'
import DatabaseBase from "./DatabaseBase";

export default class MemoryDatabase extends DatabaseBase {
  fileName: string;
  filePath: string;
  database: dbType;

  constructor() {
    super();
    this.fileName = ':memory:';
    this.filePath = '';
    this.database = this.openDatabase();
  }

  openDatabase() {
    this.database = new Database(':memory:');
    this.database.pragma('journal_mode = WAL');

    return this.database;
  }

  checkIfDatabaseExists(): boolean {
    return true;
  }

  createDatabase(): void {
    throw new Error;
  }
}