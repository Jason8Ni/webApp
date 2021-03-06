import Axios from 'axios'
import router from '@/router'
import config from '@config'
//probably should keep this info in a config and then link to it... smarter idea
const url = `http://localhost:3001`
const version = 'v1'

export default {
    user: { authenticated: false },

    signup(component, auth, redirect) {
        Axios.post(`${api}/api/${version}/signup`, auth)
            .then(({ data: { token } }) => {
                component.$cookie.set('token', token, '2D')
                component.validSignup = true
                this.user.authenticated = true

                if (redirect) { router.push(redirect) }
            }).catch(({ response: { data } }) => {
                context.snackbar = true
                context.message = data.message
            })
    }
    ,

    isAuthenticated() {
        const token = document.cookie

        if (token)
            this.user.authenticated = true
        else
            this.user.authenticated = false
    },

    getAuthHeader(component) {
        return `Bearer ${component.$cookie.get('token')}`
    }

}