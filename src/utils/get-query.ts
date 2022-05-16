export default (query) => {
  const search = new URLSearchParams(document.location.search);
  return search.get(query);
};
