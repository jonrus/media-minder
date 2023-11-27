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
});