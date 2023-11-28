import FileDatabase from "./FileDatabase";

export type TokenRowInsert = {
  token: string,
  expiresAt: string,
}

export type TokenRowResult = TokenRowInsert & {
  id: number,
  expired: boolean,
  deletedAt: string,
}

export default class TokenDatabase extends FileDatabase {
  isTokenActive: boolean;
  token: string;

  constructor(fName: string, fPath = './') {
    super(fName, fPath);
    this.isTokenActive = false;
    this.token = '';
    this.init();
  }

  init(): void {
    // SQLite does _not_ have date/time types
    // https://www.sqlite.org/lang_datefunc.html
    const createTableStatement = `
      CREATE TABLE IF NOT EXISTS tokens (
        tokenId INTEGER PRIMARY KEY,
        token TEXT NOT NULL,
        createdAt TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
        expiresAt TEXT NOT NULL,
        expired BOOLEAN NOT NULL DEFAULT 0,
        deletedAt TEXT DEFAULT NULL
      );`;
    const query = this.database.prepare(createTableStatement);
    query.run();
  }

  insertNewToken(tokenObj: TokenRowInsert): void {
    this.throwIfNotOpen();

    const insertStatement = this.database.prepare(`
      INSERT INTO tokens (token, expiresAt) VALUES (@token, @expiresAt);`);
    insertStatement.run(tokenObj);
    // TODO: make sure to delete/disable all previous tokens
  }

  invalidateAllTokens(): void {
    this.throwIfNotOpen();

    const updateTokensStatement = `
      UPDATE tokens
      SET
        expired = 1,
        deletedAt = CURRENT_TIMESTAMP
      WHERE expired = 0;`;

    const query = this.database.prepare(updateTokensStatement);
    query.run();
  }

  getActiveTokenRow(): TokenRowResult {
    this.throwIfNotOpen();

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
