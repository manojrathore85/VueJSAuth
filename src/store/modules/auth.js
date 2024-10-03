import axios from "axios";
export default{
    state:{
        token:localStorage.getItem('token') || null,
        user:null,
    },
    mutations:{
        SET_TOKEN(state, token){
            state.token = token;
            localStorage.setItem('token',token);
        },
        SET_USER(state, user){
            state.user = user;
            localStorage.setItem('user',user);
        },
        CLEAR_AUTH(state){
            state.token = null;
            state.user = null;
            localStorage.removeItem('token');
            localStorage.removeItem('user');
        }

    },
    actions:{
        async register({commit}, userData){
            try {
                const response = await axios.post('register',userData);
                commit('SET_TOKEN', response.data.data.token);
                commit('SET_USER', response.data.data.user);
                return response
            } catch (error) {
                commit('CLEAR_AUTH');
                throw error;
            }
        },
        async login({commit}, credentials){            
            try {
                const response = await axios.post('login', credentials);
                commit('SET_TOKEN', response.data.token);
                commit('SET_USER', response.data.user);
                return response
            } catch (error) {
                commit('CLEAR_AUTH');
                throw error;
            }
        },
        async fetchUser({commit,state}){
            if(state.token){
                try {
                    const response = await axios.get('/user');
                    commit('SET_USER', response.data);
                    return response
                } catch (error) {
                    commit('CLEAR_AUTH');
                    throw error;
                }
            }
        },
        logout({commit}){
            commit('CLEAR_AUTH');
        },


    },
    getters:{
        isAuthenticated(state){
            return !!state.token;
        },
        user(state){
            return state.user;
        }
    }
}