export default async function () {
  try {
    const response = await fetch("https://randomuser.me/api/");
    const data = await response.json();
    return data.results[0].name.first;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}