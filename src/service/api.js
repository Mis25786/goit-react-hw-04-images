import axios from 'axios';

const URL = 'https://pixabay.com/api';
const KEY = '32938330-25a7d9530d370aeaa9b179f57';

export const makeRequest = async (nextName, nextPage) => {
  const responsive = await axios.get(
    `${URL}/?q=${nextName}&page=${nextPage}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`
  );
  return responsive.data;
};
