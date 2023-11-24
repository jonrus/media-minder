import TokenDatabase, { TokenRowInsert, TokenRowResult } from "@/app/db/TokenDatabase";

describe('TokenDatabase', () => {
  let db: TokenDatabase;

  beforeEach(() => {
    db = new TokenDatabase();
  });
  afterAll(() => {
    db.close();
  });

  it('is a MemoryDatabase class', () => {
    expect(db).toBeInstanceOf(TokenDatabase);
  });

  describe('it has the expected schema', () => {
    it('has the expected table schema', () => {
      const statement = db.database.prepare("SELECT COUNT(*) FROM sqlite_master WHERE type='table' AND name=?;");
      const queryResult = statement.get('tokens') as {'COUNT(*)': number};
      expect(queryResult['COUNT(*)']).toEqual(1);
    });
  });

  describe('methods', () => {
    describe('with an open Database', () => {
      it('insertNewToken() inserts values', () => {
        const values: TokenRowInsert = {token: 'foo', expiresAt: `${new Date()}`};
        db.insertNewToken(values);
      });

      describe('invalidateAllTokens()', () => {
        beforeEach(() => {
          const validToken: TokenRowInsert = {token: 'valid', expiresAt: `${new Date()}`};
          const validToken2: TokenRowInsert = {token: 'valid2', expiresAt: `${new Date()}`};

          // We can't pass more than one row to our custom function
          db.insertNewToken(validToken);
          db.insertNewToken(validToken2);
        });
        it('invalidateAllTokens() marks are all active tokens invalid', () => {

        });
      });
    });

    describe('with a closed Database', () => {
      beforeEach(() => {
        db.close();
      });

      it('insertNewToken() throws an error', () => {
        const values: TokenRowInsert = {token: 'foo', expiresAt: `${new Date()}`};
        expect(() => (db.insertNewToken(values))).toThrow(Error);
      });
    })

  });
});