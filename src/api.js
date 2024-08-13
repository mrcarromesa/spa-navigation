export const getTodos = async (queryParams = {}) => {
  const params = Object.keys(queryParams).length > 0 ? { params: queryParams } : {};
  const { data } = await axios.get('https://jsonplaceholder.typicode.com/todos', params);

  return data;
}