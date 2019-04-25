import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import VueCookie from 'vue-cookie'

Vue.use(Vuex)
Vue.use(VueCookie)

axios.defaults.baseURL = 'https://stage.api.banners.ee/v1'

export default new Vuex.Store({
    state: {
			token: JSON.parse(VueCookie.get('accessToken')) || null,
			user: JSON.parse(VueCookie.get('user')) || null,
			currentCompany: JSON.parse(VueCookie.get('currentCompany')) || null,
			currentAccessLevel: null,
			//expiresIn: JSON.parse(VueCookie.get('accessToken')).expiresIn || null,
/* 		folders: undefined,
		templates: undefined,
		sizes: undefined, */
	},
	getters: {
		loggedIn(state){
			return state.token !== null
		},
		getToken(state){
			return state.token
		},
		getUser(state){
			return state.user
		},
		getCurrentCompany(state){
/* 			console.log('getCurrentCompany')
			console.log(state.currentCompany) */
			return state.currentCompany
		},
		getCurrentAccessLevel(state){
			return state.currentAccessLevel
		},
		getExpiresIn(state){
			return state.expiresIn
		},

/* 		getBanners(state){
			return state.banners
		},
		getFolders(state){
			return state.folders
		},
		getTemplates(state){
			return state.templates
		},
		getSizes(state){
			return state.sizes
		} */
	},
	mutations: {
		retrieveToken(state, token){
			state.token = token
		},
		retrieveUser(state, user){
			state.user = user
		},
		retrieveBanners(state, banners){
			state.banners = banners

		},
		destroyToken(state){
			state.token = null;
			state.user = null;
			state.currentCompany = null;
		},
		setCurrentCompany(state, company){
			state.currentCompany = company;
		},
		setCurrentAccessLevel(state, accessLevel){
			state.currentAccessLevel = accessLevel;
		},
		setExpiresIn(state, timestamp){
			let date = new Date()
			date.setTime(timestamp)
			state.expiresIn = date;
		}
/* 		setFolders(state, folders){
			state.folders = folders
		},
		setTemplates(state, templates){
			state.templates = templates
		},
		setSizes(state, sizes){
			state.sizes = sizes
		} */
	},
  actions: {
      retrieveToken(context, credentials){
			return new Promise((resolve, reject) => {

					axios.post('/auth/login', credentials)
					.then((response) => {
							let date = new Date()
							date.setTime(response.data.token.expiresIn)
							console.log(response)
							console.log(date)
							VueCookie.set('accessToken', JSON.stringify(response.data.token) , date.toUTCString());
							VueCookie.set('user', JSON.stringify(response.data.user), date.toUTCString());
							context.commit('retrieveToken', response.data.token)
							context.commit('retrieveUser', response.data.user)
							context.commit('setExpiresIn', date)

							axios.defaults.headers.common['Authorization'] = 'Bearer ' + response.data.token.accessToken,
							axios.defaults.headers.common['Company'] = response.data.user.companies[0].id
							return axios.get('/companies')
					})
          .then((response) => {
						console.log(context.getters.getExpiresIn)
						let date = new Date()
						date.setTime(context.getters.getExpiresIn)
						VueCookie.set('currentCompany', JSON.stringify(response.data.companies[0]), date.toUTCString());
						context.commit('setCurrentCompany', response.data.companies[0])
						resolve(response);
					})
          .catch((error) => {
				  	reject(error);
			  	})
			})  
		},
		destroyToken(context, credentials){
			axios.defaults.headers.common['Authorization'] = 'Bearer ' + credentials.bearer
				return new Promise((resolve, reject) => {
					axios.post('/auth/logout')
              		.then(function (response) {
						console.log(axios.defaults.headers.common)
						console.log(response)
						VueCookie.delete('accessToken')
						VueCookie.delete('user')
						VueCookie.delete('currentCompany')
						context.commit('destroyToken')
						resolve(response)
					})
					.catch(function(error){
						console.log(axios.defaults.headers.common)
						console.log(error.response)						
						VueCookie.delete('accessToken')
						VueCookie.delete('user')
						VueCookie.delete('currentCompany')
						context.commit('destroyToken')
						reject(error)
					})
				})
		},
		resetToken(context, credentials){
			axios.defaults.headers.common['Authorization'] = 'Bearer ' + credentials.bearer
			if(context.getters.loggedIn){
				return new Promise((resolve, reject) => {
					axios.get('/auth/user')
              		.then(function (response) {
						console.log(response)
						console.log(axios.defaults.headers.common)
						let date = new Date()
						date.setTime(response.data.expiresIn)
						VueCookie.set('accessToken', response.data.token.accessToken, date.toUTCString());
						VueCookie.set('user', response.data.user, date.toUTCString());
						context.commit('retrieveToken', response.data.token)
						context.commit('retrieveUser', response.data.user)
						resolve(response)
					})
					.catch(function(error){
						console.log(error)
						reject(error)
					})
				})
			}
		},
		retrieveBanners(context, credentials){
			// SET HEADERS
			axios.defaults.headers.common['Authorization'] = 'Bearer ' + credentials.bearer
			axios.defaults.headers.common['Company'] = credentials.company

			//IF Logged in make Call
			if(context.getters.loggedIn){
				return new Promise((resolve, reject) => {
					axios.get('/banners')
              		.then(function (response) {
						console.log(response.data)
						//console.log(axios.defaults.headers)
						context.commit('retrieveBanners', response.data)
						let date = new Date()
						date.setTime(response.data.expiresIn)
						//date.setTime(1549152000)
						VueCookie.set('banners', JSON.stringify(response.data) , date.toUTCString());
						resolve(response)
					})
					.catch(function(error){
						console.log(axios.defaults.headers)
						console.log(error.response)
						reject(error)
					})
				})
			}
		},
		retrieveBanners(context, credentials){
			// SET HEADERS
			axios.defaults.headers.common['Authorization'] = 'Bearer ' + credentials.bearer
			axios.defaults.headers.common['Company'] = credentials.company

			//IF Logged in make Call
			if(context.getters.loggedIn){
				return new Promise((resolve, reject) => {
					axios.get('/banners')
              		.then(function (response) {
						console.log(response.data)
						//console.log(axios.defaults.headers)
						context.commit('retrieveBanners', response.data)
						let date = new Date()
						//date.setTime(token.expiresIn)
						//date.setTime(1549152000)
						date.setTime(response.data.expiresIn)
						VueCookie.set('banners', JSON.stringify(response.data) , date.toUTCString());
						resolve(response)
					})
					.catch(function(error){
						console.log(axios.defaults.headers)
						console.log(error.response)
						reject(error)
					})
				})
			}
		},
		updatePassword(context, credentials){
			//IF NOT Logged in make Call
			if(!context.getters.loggedIn){
				return new Promise((resolve, reject) => {
					axios.post('/auth/password/' + credentials.token, credentials)
					.then(function (response) {
						resolve(response)
					})
					.catch(function(error){
						console.log(axios.defaults.headers)
						reject(error)
					})
				})
			}
		},
/* 		getFolders(context, credentials){
			// SET HEADERS
			axios.defaults.headers.common['Authorization'] = 'Bearer ' + credentials.bearer
			axios.defaults.headers.common['Company'] = credentials.company
	
			//IF Logged in make Call
			if(context.getters.loggedIn){
				return new Promise((resolve, reject) => {
					axios.get('/folders')
					  .then(function (response) {
						console.log(response.data)
						context.commit('setFolders', response.data)
						resolve(response)
					})
					.catch(function(error){
						console.log(error.response)
						reject(error)
					})
				})
			}
		},
		getTemplates(context, credentials){
			// SET HEADERS
			axios.defaults.headers.common['Authorization'] = 'Bearer ' + credentials.bearer
			axios.defaults.headers.common['Company'] = credentials.company
	
			//IF Logged in make Call
			if(context.getters.loggedIn){
				return new Promise((resolve, reject) => {
					axios.get('/templates')
					  .then(function (response) {
						console.log(response.data)
						context.commit('setTemplates', response.data)
						resolve(response)
					})
					.catch(function(error){
						console.log(error.response)
						reject(error)
					})
				})
			}
		},
		getSizes(context, credentials){
			// SET HEADERS
			axios.defaults.headers.common['Authorization'] = 'Bearer ' + credentials.bearer
			axios.defaults.headers.common['Company'] = credentials.company
	
			//IF Logged in make Call
			if(context.getters.loggedIn){
				return new Promise((resolve, reject) => {
					axios.get('/sizes')
					  .then(function (response) {
						console.log(response.data)
						context.commit('setSizes', response.data)
						resolve(response)
					})
					.catch(function(error){
						console.log(error.response)
						reject(error)
					})
				})
			}
		}, */
	},
	
})