export const getQuery = (query) => {
    const search = new URLSearchParams(document.location.search);
    return search.get(query);
};
