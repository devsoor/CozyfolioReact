import React, { useState } from 'react'
import { useAuth } from "../Auth/Context";


class ServerApi {
    constructor() {
        const { authTokens } = useAuth();
        this.authTokens = authTokens;
    }

    get(url){ 

        return fetch(url, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'JWT ' +  this.authTokens
            }
        })
    }

    create(url, obj) {
        console.log("api.create: obj = ", obj)
        return fetch(url, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'JWT ' +  this.authTokens
            },
            body:  JSON.stringify(obj)
        })
    }

    update(url, id, obj) {
        return fetch(url + id, {
            method: 'PUT',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'JWT ' +  this.authTokens
            },
            body:  JSON.stringify(obj)
        })
    }
    delete (url, id) {
        return fetch(url + id, {
            method: 'DELETE',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'JWT ' +  this.authTokens
            }
        })
    }
}

export default ServerApi;


