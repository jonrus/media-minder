import fs from 'fs';
import { doesFileExist, removeFile } from "@/app/lib/helpers";

describe('doesFileExist()', () => {
  it('returns true for an existing file', () => {
    const filePath = './__test__/lib/helpers.test.ts';
    expect(doesFileExist(filePath)).toEqual(true);
  });

  it('returns false for a non-existing file', () => {
    const filePath = '';
    expect(doesFileExist(filePath)).toEqual(false);
  });
});

describe('removeFile()', () => {
  const filePath = './__test__/lib/test.file';
  beforeEach(() => {
    const fh = fs.openSync(filePath, 'w');
    fs.closeSync(fh);
  });

  it('removes a file', () => {
    expect(doesFileExist(filePath)).toEqual(true);
    removeFile(filePath);
    expect(doesFileExist(filePath)).toEqual(false);
  });
});
