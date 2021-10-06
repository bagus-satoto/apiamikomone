const axios = require('axios')
const Endpoint = require('./endpoint')

class AmikomOne {
    constructor() {
        this.access_token = ""
        this.npm = ""
        this.request = axios.create({
            headers: {
                "user-agent": "@m!k0mXv=#neMob!le",
                'Content-Type': 'application/x-www-form-urlencoded',
            }
        })
    }

    set Authorization(token) {
        this.request.defaults.headers['Authorization'] = token
    }
    set ContentType(content_type) {
        this.request.defaults.headers['Content-Type'] = content_type
    }

    async makeParam(parameterAdd) {
        let params = new URLSearchParams()
        for (let key in parameterAdd)
            params.append(key, parameterAdd[key])
        return params.toString()
    }

    async get() {
        const response = await this.request.get(this.url)
        return response.data
    }

    async login(npm, passcode) {
        try {
            let params = await this.makeParam({
                username: npm,
                keyword: passcode
            })
            const response = await this.request.post(Endpoint.LOGIN, params)
            this.npm = npm
            this.access_token = response.data.access_token
            this.Authorization = this.access_token
            console.log(this.access_token)
            return response.data
        } catch (error) {
            console.log(error)
        }
    }

    async presensi_via_qrcode(data) {
        try {
            let params = await this.makeParam({
                data
            })
            const response = await this.request.post(Endpoint.PRESENSI_QRCODE, params, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            // response sukses: {"message": "Created"}
            return response.data
        } catch (error) {
            console.log(error)
        }
    }

    async presensi_via_code(data) {
        try {
            let params = await this.makeParam({
                data
            })
            const response = await this.request.post(Endpoint.PRESENSI_CODE, params, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            // response sukses: {"message": "Created"}
            return response.data
        } catch (error) {
            console.log(error)
        }
    }

    async list_presensi(semester, tahun_akademik) {
        try {
            let params = await this.makeParam({
                npm: this.npm,
                semester,
                tahun_akademik
            })
            const response = await this.request.post(Endpoint.LIST_PRESENSI, params)
            return response.data
        } catch (error) {
            console.log(error)
        }
    }


    async jadwal() {
        try {
            let params = await this.makeParam({
                npm: this.npm
            })
            const response = await this.request.post(Endpoint.JADWAL, params)
            return response.data
        } catch (error) {
            console.log(error)
        }
    }

    async personal() {
        try {
            const response = await this.request.post(Endpoint.PERSONAL)
            return response.data
        } catch (error) {
            console.log(error)
        }
    }

    async khs() {
        try {
            let params = await this.makeParam({
                npm: this.npm
            })
            const response = await this.request.post(Endpoint.KHS, params)
            return response.data
        } catch (error) {
            console.log(error)
        }
    }
    async transkrip() {
        try {
            let params = await this.makeParam({
                npm: this.npm
            })
            const response = await this.request.post(Endpoint.TRANSKRIP, params)
            return response.data
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = AmikomOne