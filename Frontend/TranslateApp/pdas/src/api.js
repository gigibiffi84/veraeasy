import axios from 'axios';


const searchImages = async () => {
    const response = await axios.get('https://api.unsplash.com/search/photos',
        {
            headers: {
                Authorization: 'Client-ID dW9uqEvZXXlW7tsmXWRU9EG7oabJz8DdWVKYEd0SRvM'
            },
            params: {
                query: 'cars'
            }
        }
    );
    return response;
}

export default searchImages;