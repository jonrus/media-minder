import FileDatabase from "@/app/db/FileDatabase";

describe('FileDatabase', () => {
  let db: FileDatabase;
  beforeEach(() => {
    db = new FileDatabase('file_test.db', './__test__/db/');
  });
  afterAll(() => {
    db.close();
  });

  it('is a FileDatabase class', () => {
    expect(db).toBeInstanceOf(FileDatabase);
  });

  describe('methods', () => {
    describe('checkIfDatabaseExists', () => {
      describe('with an existing file', () => {
        it('returns true', () => {
          expect(db.checkIfDatabaseExists()).toEqual(true);
        });
      });
      describe('with NO existing file', () => {
        it('returns false', () => {
          db.filePath = ''; //Set the path to junk
          expect(db.checkIfDatabaseExists()).toEqual(false);
        });
      });
    });
  });
});
