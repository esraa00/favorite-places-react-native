const GOOGLE_API_KEY = "";

export function getMapPreview(lat, long) {
  return `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${long}&markers=color:red|${lat},${long}&size=400x400&key=${GOOGLE_API_KEY}`;
}

export async function getAddress(latitude, longitude) {
  const response = await fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${GOOGLE_API_KEY}`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch address!");
  }
  const data = await response.json();
  return data.results[0].formatted_address;
}
