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

  openDatabase(options: dbOptions = {}): dbType {
    if (this.fileName === undefined) {
      throw new Error('Must specify a file name for the database!');
    }

    if (this.isDatabaseOpen() === false) {
      this.database = new Database(this.filePath, options);
      this.database.pragma('journal_mode = WAL');
    }

    return this.database;
  }

  close(): void {
    if (this.isDatabaseOpen()) {
      this.database.close();
    }
  }

  isDatabaseOpen(): boolean {
    // This method is called prior to database being assigned
    if (this.database === undefined) {
      return false;
    }
    return this.database.open === true;
  }

  throwIfNotOpen(): void {
    if (!this.isDatabaseOpen()) {
      throw new Error('Database is closed!');
    }
  }
}
