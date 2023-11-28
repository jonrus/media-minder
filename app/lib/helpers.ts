import fs from 'fs';

export function doesFileExist(filePath: string): boolean {
  try {
    if (fs.existsSync(filePath)) {
      return true;
    }
    return false;
  } catch(err) {
    return false;
  }
}

export function removeFile(filePath: string): void {
  try {
    fs.unlinkSync(filePath);
  }
  catch {
    return;
  }
}