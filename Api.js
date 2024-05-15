import info from "./util/info/info";

const host = info.host;
const APIHost = info.APIHost;


export const logIn = async (user) => {
    const res = await fetch(`${host}/users/login`, {
        method: "POST",
        headers: { Accept: "application/json", "Content-Type": 'application/json' },
        body: JSON.stringify(user)
    })
    return res;
}

export const register = async (user) => {
    const res = await fetch(`${host}/users/register`, {
        method: "POST",
        headers: { Accept: "application/json", "Content-Type": 'application/json' },
        body: JSON.stringify(user)
    })
    return res;
}

export const uploadImage = async (user) => {
    const res = await fetch(APIHost, {
        method: 'POST',
        headers: { Accept: 'aplication/json', "Content-Type": 'multipart/form-data' },
        body: user
    });
    return await res.json();
}

export const test = async (user) => {
    const res = await fetch(APIHost, {
        method: 'GET',
        headers: { Accept: 'aplication/json', "Content-Type": 'multipart/form-data' },
        body: JSON.stringify(user)
    });
    return await res.json();
}

export const upload = async (formData) => {
    const res = await fetch(`${APIHost}/api/analyze`, {
        method: 'POST',
        body: formData,
        headers: {
            'Accept': '*/*',
            'Content-Type': 'multipart/form-data',
        },
    });

    return res;
}