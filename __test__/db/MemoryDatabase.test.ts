import MemoryDatabase from "@/app/db/MemoryDatabase";

describe('MemoryDatabase', () => {
  let db: MemoryDatabase;
  beforeEach(()=> {
    db = new MemoryDatabase();
  });

  it('is a DatabaseBase class', () => {
    expect(db).toBeInstanceOf(MemoryDatabase);
  });

  describe('un-used methods throw error', () => {
    it('createDatabase()', () => {
      expect(() => (db.createDatabase())).toThrow(Error)
    });

  });

  describe('methods', () => {
    it('checkIfFileExists()', () => {
      expect(db.checkIfDatabaseExists()).toEqual(true);
    });
  });
});