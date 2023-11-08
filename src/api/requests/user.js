const { default: axios } = require("axios");

const apiUrl = "http://192.168.1.104:3005/user";

const requestsUser = {
    async login ({username, email, password}){
        return await axios.post(apiUrl + '/login', {username: username, email: email, password: password})
    },
    async register ({username, email, password}){
        return await axios.post(apiUrl + '/register', {username: username, email: email, password: password})
    },
    async update ({username, email, password}){
        return await axios.post(apiUrl + '/:id/update', {username: username, email: email, password: password})
    },
    async loadProfile ({username, email}){
        return await axios.post(apiUrl + '/:id/profile', {username: username, email: email})
    },
    async createFavBook (){
        return await axios.post(apiUrl + '/:id/favbooks/create')
    },
    async showFavBooks (){
        return await axios.post(apiUrl + '/:id/favBooks')
    },
    async updateStatusBook (){
        return await axios.post(apiUrl + '/:id/favbooks/:id')
    },
    async deleteFavBook (){
        return await axios.post(apiUrl + '/:id/favbooks/:idbook')
    },
}

export default requestsUser;