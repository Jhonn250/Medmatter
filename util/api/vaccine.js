import info from "../info/info";
import { getData } from "../other/SaveObject";

const host = info.host;

const setHeaders = async () => {
    let user = await getData();
    let headers = {
        Accept: '*/*',
        'session-key': user.sessionKey,
        'email': user.email,
    }
    return headers;
}

const setHeadersPost = async () => {
    let user = await getData();
    let headersPost = {
        Accept: "application/json",
        "Content-Type": 'application/json',
        'session-key': user.sessionKey,
        'email': user.email,
    }
    return headersPost;
}


export const getVaccines = async () => {
    const res = await fetch(`${host}/medical/profile/vaccines`, {
        method: "GET",
        headers: await setHeaders(),
    })
    return res;
}

////POST////
export const postVaccine = async (user) => {
    const res = await fetch(`${host}/medical/profile/vaccines/new`, {
        method: "POST",
        headers: await setHeadersPost(),
        body: JSON.stringify(user)
    })
    return res;
}

export const editVaccine = async (user) => {
    const res = await fetch(`${host}/medical/profile/vaccines/update`, {
        method: "POST",
        headers: await setHeadersPost(),
        body: JSON.stringify(user)
    })
    return res;
}

////DELETE////
export const deleteVaccine = async (user) => {
    const res = await fetch(`${host}/medical/profile/vaccine/delete`, {
        method: "POST",
        headers: await setHeadersPost(),
        body: JSON.stringify(user),
    })
    return await res.json();
}

