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
        console.log("ServerAPI, create: obj = ", obj)
        const formData = new FormData();
        for (const name in obj) {
            if (name == 'pictures') {
                console.log("ServerAPI: found name = pictures", name)
                const uploadedFiles = [];
                obj[name].forEach((file, i) => {
                    uploadedFiles.push(file)
                    console.log("uploadedFiles = ", uploadedFiles)
                    // formData.append(`uploadfile${i}`, file.picfile)
                })
                formData.append('uploadedPics', uploadedFiles)
            } else {
                console.log("ServerAPI: OTHERWISE found name =", name)
                formData.append(name, obj[name])
            }
        }
        return fetch(url, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Authorization': 'JWT ' +  this.authTokens
            },
            body: formData
        })
    }

    update(url, id, obj) {
        const formData = new FormData();
        for (const name in obj) {
            if (name == 'files') {
                obj[name].forEach((file, i) => {
                    formData.append(`uploadfile${i}`, file)
                })
            } else {
                formData.append(name, obj[name])
            }
        }
        return fetch(url + id, {
            method: 'PUT',
            credentials: 'include',
            headers: {
                'Authorization': 'JWT ' +  this.authTokens
            },
            body: formData
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


