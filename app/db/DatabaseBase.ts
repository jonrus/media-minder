import { Database } from "better-sqlite3";

export default abstract class DatabaseBase {
  abstract fileName: string;
  abstract filePath: string;
  abstract database: Database;
  abstract openDatabase(): Database;
  abstract createDatabase(): void;
  abstract checkIfDatabaseExists(): boolean;
  // abstract handleOpen(): void;

  close(): void {
    this.getDatabase().close();
  }

  getDatabase(): Database {
    return this.database;
  }

  init(): void {
    const db = this.getDatabase();

    //TODO
  }
}