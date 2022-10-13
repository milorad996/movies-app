


class OmdbService {
    async getOmdbDataByTitle(title)  {
        const response = await fetch(`https://www.omdbapi.com/?t=${title}&apikey=a906cb38`);
        return await response.json();
   }
}

export default new OmdbService();