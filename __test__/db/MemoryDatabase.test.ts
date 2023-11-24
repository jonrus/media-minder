import MemoryDatabase from "@/app/db/MemoryDatabase";

describe('MemoryDatabase', () => {
  let db: MemoryDatabase;
  beforeEach(()=> {
    db = new MemoryDatabase();
  });
  afterAll(() => {
    db.close();
  });

  it('is a MemoryDatabase class', () => {
    expect(db).toBeInstanceOf(MemoryDatabase);
  });

  describe('methods', () => {
    describe('with an open Database', () => {
      it('checkIfDatabaseExists()', () => {
        expect(db.checkIfDatabaseExists()).toEqual(true);
      });
    });

    describe('with a closed Database', () => {
      beforeEach(() => {
        db.close();
      });

      it('checkIfDatabaseExists()', () => {
        expect(db.checkIfDatabaseExists()).toEqual(false);
      });
    })

    it('init() throws an Error', () => {
      expect(() => (db.init())).toThrow(Error);
    });
  });
});
