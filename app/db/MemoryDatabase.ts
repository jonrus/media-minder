import {
  Database as dbType,
  Options as dbOptions
} from 'better-sqlite3';
import DatabaseBase from "./DatabaseBase";

export type TokenRowInsert = {
  token: string,
  expiresAt: string,
}

export type TokenRowResult = TokenRowInsert & {
  id: number,
  deleted: boolean,
  deletedAt: string,
}

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
    // SQLite does _not_ have date/time types
    // https://www.sqlite.org/lang_datefunc.html
    const createTableStatement = `
      CREATE TABLE IF NOT EXISTS tokens (
        tokenId INTEGER PRIMARY KEY,
        token TEXT NOT NULL,
        expiresAt TEXT NOT NULL,
        deleted BOOLEAN NOT NULL DEFAULT 0,
        deletedAt TEXT DEFAULT NULL
      );
    `
    const statement = this.database.prepare(createTableStatement);
    statement.run();
  }

  checkIfDatabaseExists(): boolean {
    return true;
  }

  insertNewToken(tokenObj: TokenRowInsert): void {
    this.checkIfOpen();
    const insertStatement = this.database.prepare(`
      INSERT INTO tokens (token, expiresAt) VALUES (@token, @expiresAt);`);
    insertStatement.run(tokenObj);
    // TODO: make sure to delete/disable all previous tokens
  }
}
