async function getData(url) {
  const response = await fetch(url).catch((err) => console.log(err));
  const data = response.json();
  return data;
}

export { getData };
