import MemoryDatabase from "@/app/db/MemoryDatabase";

describe('MemoryDatabase', () => {
  let db: MemoryDatabase;
  beforeEach(()=> {
    db = new MemoryDatabase();
  });

  it('is a MemoryDatabase class', () => {
    expect(db).toBeInstanceOf(MemoryDatabase);
  });

  it('has the expected schema', () => {
    const statement = db.database.prepare("SELECT COUNT(*) FROM sqlite_master WHERE type='table' AND name=?;");
    const output = statement.get('tokens') as {'COUNT(*)': number};
    expect(output['COUNT(*)']).toEqual(1);
  });

  describe('un-used methods throw error', () => {
  });

  describe('methods', () => {
    describe('with an open Database', () => {
      it('checkIfFileExists()', () => {
        expect(db.checkIfDatabaseExists()).toEqual(true);
      });

      it('isDatabaseOpen() is true', () => {
        expect(db.isDatabaseOpen()).toEqual(true)
      });

      it('checkIfOpen() returns undefined', () => {
        expect(db.checkIfOpen()).toBe(undefined);
      });

      it('close() closes the Database', () => {
        expect(db.isDatabaseOpen()).toEqual(true);
        db.close();
        expect(db.isDatabaseOpen()).toEqual(false);
      });
    });

    describe('with a closed Database', () => {
      beforeEach(() => {
        db.close();
      });

      it('isDatabaseOpen() is false', () => {
        expect(db.isDatabaseOpen()).toEqual(false)
      });

      it('checkIfOpen() throws an error', () => {
        expect(() => (db.checkIfOpen())).toThrow(Error);
      })

      it('close() does nothing', () => {
        expect(db.isDatabaseOpen()).toEqual(false);
        db.close();
        expect(db.isDatabaseOpen()).toEqual(false);
      });
    })
  });
});
