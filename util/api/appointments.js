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


export const getAppointments = async () => {
    const res = await fetch(`${host}/appointments/all`, {
        method: "GET",
        headers: await setHeaders(),
    })
    return res;
}

////POST////
export const postAppointment = async (user) => {
    console.log(user);
    const res = await fetch(`${host}/appointments/new`, {
        method: "POST",
        headers: await setHeadersPost(),
        body: JSON.stringify(user)
    })
    return res;
    
}
export const editAppointment = async (user) => {
    console.log(user);
    const res = await fetch(`${host}/appointments/update`, {
        method: "POST",
        headers: await setHeadersPost(),
        body: JSON.stringify(user)
    })
    return res;
}

////DELETE////
export const deleteAppointment = async (user) => {
    const res = await fetch(`${host}/appointments/delete`, {
        method: "POST",
        headers: await setHeadersPost(),
        body: JSON.stringify(user)
    })
    return await res.json();
}
