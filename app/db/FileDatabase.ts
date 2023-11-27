import fs from 'fs';
import {
  Database as dbType,
  Options as dbOptions
} from 'better-sqlite3';
import DatabaseBase from './DatabaseBase';


export default class FileDatabase extends DatabaseBase {
  fileName: string;
  filePath: string;
  database: dbType;
  options: dbOptions;

  constructor(fName: string, fPath = './') {
    super();
    if (fName === undefined) throw new Error('Must pass a filename!');
    this.fileName = fName;
    this.filePath = `${fPath}${this.fileName}`;
    this.options = {verbose: console.log}; //TODO: Remove the console
    this.database = this.openDatabase();
  }

  checkIfDatabaseExists(): boolean {
    try {
      if (fs.existsSync(this.filePath)) {
        return true;
      }
      return false;
    } catch(err) {
      return false;
    }
  }

  init(): void {
    throw new Error('Sub-class should implement this method');
  }
}
