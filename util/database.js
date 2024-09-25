import * as SQLite from 'expo-sqlite';

const database = SQLite.openDatabaseSync('places');

export async function init() {
  await database.withTransactionAsync(async () => {
    try {
      return await database.execAsync(`
        CREATE TABLE IF NOT EXISTS places (
          id INTEGER PRIMARY KEY NOT NULL,
          title TEXT NOT NULL,
          image_uri TEXT NOT NULL,
          address TEXT NOT NULL,
          latitude REAL NOT NULL,
          longitude REAL NOT NULL
        )
      `);
    } catch (error) {
      console.log({ error });
    }
  });
}

export async function insertPlace(place) {
  try {
    return await database.runAsync(
      `INSERT INTO places (title, image_uri, address, latitude, longitude) VALUES (?, ?, ?, ?, ?)`,
      place.title,
      place.imageUri,
      place.address,
      place.location.latitude,
      place.location.longitude
    );
  } catch (error) {
    console.log({ error });
  }
}

export async function fetchPlaces() {
  try {
    return await database.getAllAsync('SELECT * FROM places');
  } catch (error) {
    console.log(error);
  }
}

export async function fetchPlace(id) {
  try {
    return await database.getFirstAsync(
      'SELECT * FROM places WHERE id = ?',
      id
    );
  } catch (error) {
    console.log(error);
  }
}
