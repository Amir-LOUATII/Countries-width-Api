const paginate = (data) => {
  const itemPerPage = 12;
  const numberOfPages = Math.ceil(data.length / itemPerPage);
  const newData = Array.from({ length: numberOfPages }, (_, index) => {
    const start = index * itemPerPage;
    return data.slice(start, start + itemPerPage);
  });
  return newData;
};
export { paginate };
