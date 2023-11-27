import Database, {
  Database as dbType,
  Options as dbOptions
} from 'better-sqlite3';

export default abstract class DatabaseBase {
  abstract fileName: string;
  abstract filePath: string;
  abstract database: dbType;
  abstract options: dbOptions;
  abstract checkIfDatabaseExists(): boolean;
  abstract init(): void;
  databaseOpen: boolean = false;

  openDatabase(options: dbOptions = {}): dbType {
    if (this.fileName === undefined) {
      throw new Error('Must specify a file name for the database!');
    }

    if (this.isDatabaseOpen() === false) {
      this.database = new Database(this.filePath, options);
      this.database.pragma('journal_mode = WAL');
      this.databaseOpen = true;
    }

    return this.database;
  }

  close(): void {
    this.database.close();
    this.databaseOpen = false;
  }

  isDatabaseOpen(): boolean {
    return this.databaseOpen === true;
  }

  checkIfOpen(): void {
    if (!this.isDatabaseOpen()) {
      throw new Error('Database is closed!');
    }
  }
}
