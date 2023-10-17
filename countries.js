export default async function getCountries() {
  const response = await fetch("https://restcountries.com/v3.1/all");
  const json = await response.json();
  return json.map((country, index) => {
    return { id: index + 1, ...country };
  });
}
