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


export const getDrugs = async () => {
    const res = await fetch(`${host}/medical/profile/drugs`, {
        method: "GET",
        headers: await setHeaders(),
    })
    return res;
}

////POST////
export const postDrugs = async (user) => {
    const res = await fetch(`${host}/medical/profile/drugs/new`, {
        method: "POST",
        headers: await setHeadersPost(),
        body: JSON.stringify(user)
    })
    return res;
}

///EDIT////
export const editDrug = async (user) => {
    const res = await fetch(`${host}/medical/profile/drugs/update`, {
        method: "POST",
        headers: await setHeadersPost(),
        body: JSON.stringify(user)
    })
    return res;
}

////DELETE///
export const deleteDrug = async (user) => {
    const res = await fetch(`${host}/medical/profile/drug/delete`, {
        method: "POST",
        headers: await setHeadersPost(),
        body: JSON.stringify(user),
    })
    return await res.json();
}
