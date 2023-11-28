import DatabaseBase from "@/app/db/DatabaseBase";
import {
  Database as dbType,
  Options as dbOptions
} from 'better-sqlite3';

/*
  DatabaseBase is an abstract class so we need to build a small class
  to test the few features of the base class - as this is a test we will
  use an in memory DB.
*/
class TestDatabase extends DatabaseBase {
  fileName: string;
  filePath: string;
  database: dbType;
  options: dbOptions;

  constructor() {
    super();
    this.fileName = ':memory:';
    this.filePath = this.fileName;
    this.options = {};
    this.database = this.openDatabase();
  }

  checkIfDatabaseExists(): boolean {
    return this.isDatabaseOpen();
  }

  init(): void {
  }
}

// Test(s)
describe('DatabaseBase', () => {
  let db: TestDatabase;
  beforeEach(() => {
    db = new TestDatabase();
  });
  afterAll(() => {
    db.close();
  });

  it('is a TestDatabase instance', () => {
    expect(db).toBeInstanceOf(TestDatabase);
  });

  describe('methods', () => {
    describe('with an open Database', () => {
      it('isDatabaseOpen() is true', () => {
        expect(db.isDatabaseOpen()).toEqual(true)
      });

      it('throwIfNotOpen() returns undefined', () => {
        expect(db.throwIfNotOpen()).toBe(undefined);
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

      it('throwIfNotOpen() throws an error', () => {
        expect(() => (db.throwIfNotOpen())).toThrow(Error);
      })

      it('close() does nothing', () => {
        expect(db.isDatabaseOpen()).toEqual(false);
        db.close();
        expect(db.isDatabaseOpen()).toEqual(false);
      });
    });
  });
});
