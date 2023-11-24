import MemoryDatabase from "./MemoryDatabase"

export type TokenRowInsert = {
  token: string,
  expiresAt: string,
}

export type TokenRowResult = TokenRowInsert & {
  id: number,
  expired: boolean,
  deletedAt: string,
}

export default class TokenDatabase extends MemoryDatabase {
  isTokenActive: boolean;
  token: string;

  constructor() {
    super();
    this.isTokenActive = false;
    this.token = '';
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
        expired BOOLEAN NOT NULL DEFAULT 0,
        deletedAt TEXT DEFAULT NULL
      );`;
    const query = this.database.prepare(createTableStatement);
    query.run();
  }

  insertNewToken(tokenObj: TokenRowInsert): void {
    this.checkIfOpen();

    const insertStatement = this.database.prepare(`
      INSERT INTO tokens (token, expiresAt) VALUES (@token, @expiresAt);`);
    insertStatement.run(tokenObj);
    // TODO: make sure to delete/disable all previous tokens
  }

  invalidateAllTokens(): void {
    this.checkIfOpen();

    const updateTokensStatement = `
      UPDATE tokens
      SET
        expired = 1,
        deletedAt = DATETIME()
      WHERE expired = 0;`;

    const query = this.database.prepare(updateTokensStatement);
    query.run();
  }

  getActiveTokenRow(): TokenRowResult {
    this.checkIfOpen();

    const selectTokenStatement = `
      SELECT *
      FROM tokens
      WHERE expired = 0;`;

    const query = this.database.prepare(selectTokenStatement);
    const queryResult = query.get() as TokenRowResult;

    return queryResult;
  }

  getActiveToken(): string {
    return this.token;
  }
}
