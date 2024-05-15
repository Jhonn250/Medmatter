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


//WEIGHT
export const getWeight = async () => {
    const res = await fetch(`${host}/tracking/weight`, {
        method: "GET",
        headers: await setHeaders(),
    })
    return res;
}

export const postWeight = async (user) => {
    const res = await fetch(`${host}/tracking/weight/new`, {
        method: "POST",
        headers: await setHeadersPost(),
        body: JSON.stringify(user)
    })
    return res;
}

export const editWeigth = async (user) => {
    const res = await fetch(`${host}/tracking/weight/update`, {
        method: "POST",
        headers: await setHeadersPost(),
        body: JSON.stringify(user)
    })
    return res;
}

export const deleteWeight = async (user) => {
    const res = await fetch(`${host}/tracking/weight/delete`, {
        method: "POST",
        headers: await setHeadersPost(),
        body: JSON.stringify(user)
    })
    return await res.json();
}


//Temperature///
export const getTemperature = async () => {
    const res = await fetch(`${host}/tracking/temperature`, {
        method: "GET",
        headers: await setHeaders(),
    })
    return res;
}

export const postTemperature = async (user) => {
    const res = await fetch(`${host}/tracking/temperature/new`, {
        method: "POST",
        headers: await setHeadersPost(),
        body: JSON.stringify(user)
    })
    return res;
}

export const editTemperature = async (user) => {
    const res = await fetch(`${host}/tracking/temperature/update`, {
        method: "POST",
        headers: await setHeadersPost(),
        body: JSON.stringify(user)
    })
    return res;
}

export const deleteTemperature = async (user) => {
    const res = await fetch(`${host}/tracking/temperature/delete`, {
        method: "POST",
        headers: await setHeadersPost(),
        body: JSON.stringify(user)
    })
    return await res.json();
}

//Glycemia///
export const getGlycemia = async () => {
    const res = await fetch(`${host}/tracking/glycemia`, {
        method: "GET",
        headers: await setHeaders(),
    })
    return res;
}

export const postGlycemia = async (user) => {
    const res = await fetch(`${host}/tracking/glycemia/new`, {
        method: "POST",
        headers: await setHeadersPost(),
        body: JSON.stringify(user)
    })
    return res;
}

export const editGlycemia = async (user) => {
    const res = await fetch(`${host}/tracking/glycemia/update`, {
        method: "POST",
        headers: await setHeadersPost(),
        body: JSON.stringify(user)
    })
    return res;
}

export const deleteGlycemia = async (user) => {
    const res = await fetch(`${host}/tracking/glycemia/delete`, {
        method: "POST",
        headers: await setHeadersPost(),
        body: JSON.stringify(user)
    })
    return await res.json();
}


///Cholesterol
export const getCholesterol = async () => {
    const res = await fetch(`${host}/tracking/cholesterol`, {
        method: "GET",
        headers: await setHeaders(),
    })
    return res;
}

export const postCholesterol = async (user) => {
    const res = await fetch(`${host}/tracking/cholesterol/new`, {
        method: "POST",
        headers: await setHeadersPost(),
        body: JSON.stringify(user)
    })
    return res;
}

export const editCholesterol = async (user) => {
    const res = await fetch(`${host}/tracking/cholesterol/update`, {
        method: "POST",
        headers: await setHeadersPost(),
        body: JSON.stringify(user)
    })
    return res;
}

export const deleteCholesterol = async (user) => {
    const res = await fetch(`${host}/tracking/cholesterol/delete`, {
        method: "POST",
        headers: await setHeadersPost(),
        body: JSON.stringify(user)
    })
    return await res.json();
}

///Blood Preasure
export const getBlood = async () => {
    const res = await fetch(`${host}/tracking/blood_pressure`, {
        method: "GET",
        headers: await setHeaders(),
    })
    return res;
}

export const postBlood = async (user) => {
    const res = await fetch(`${host}/tracking/blood_pressure/new`, {
        method: "POST",
        headers: await setHeadersPost(),
        body: JSON.stringify(user)
    })
    return res;
}

export const editBlood = async (user) => {
    const res = await fetch(`${host}/tracking/blood_pressure/update`, {
        method: "POST",
        headers: await setHeadersPost(),
        body: JSON.stringify(user)
    })
    return res;
}

export const deleteBlood = async (user) => {
    const res = await fetch(`${host}/tracking/blood_pressure/delete`, {
        method: "POST",
        headers: await setHeadersPost(),
        body: JSON.stringify(user)
    })
    return await res.json();
}