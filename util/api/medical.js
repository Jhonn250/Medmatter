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

export const getMedicalProfile = async () => {
    const res = await fetch(`${host}/medical/profile`, {
        method: "GET",
        headers: await setHeaders(),
    })
    return res;
}

export const getAllergies = async () => {
    const res = await fetch(`${host}/medical/profile/allergies`, {
        method: "GET",
        headers: await setHeaders(),
    })
    return res;
}

export const getLimitations = async () => {
    const res = await fetch(`${host}/medical/profile/limitations`, {
        method: "GET",
        headers: await setHeaders(),
    })
    return res;
}

export const getConditions = async () => {
    const res = await fetch(`${host}/medical/profile/conditions`, {
        method: "GET",
        headers: await setHeaders(),
    })
    return res;
}

export const getSurgeries = async () => {
    const res = await fetch(`${host}/medical/profile/surgeries`, {
        method: "GET",
        headers: await setHeaders(),
    })
    return res;
}

////POST////
export const postAllergies = async (user) => {
    const res = await fetch(`${host}/medical/profile/allergies/new`, {
        method: "POST",
        headers: await setHeadersPost(),
        body: JSON.stringify(user)
    })
    return res;
}

export const postLimitations = async (user) => {
    const res = await fetch(`${host}/medical/profile/limitations/new`, {
        method: "POST",
        headers: await setHeadersPost(),
        body: JSON.stringify(user)
    })
    return res;

}

export const postSurgeries = async (user) => {
    const res = await fetch(`${host}/medical/profile/surgeries/new`, {
        method: "POST",
        headers: await setHeadersPost(),
        body: JSON.stringify(user)
    })
    return res;

}

export const postConditions = async (user) => {
    const res = await fetch(`${host}/medical/profile/conditions/new`, {
        method: "POST",
        headers: await setHeadersPost(),
        body: JSON.stringify(user)
    })
    return res;

}

///delete////
export const deleteAllergies = async (user) => {
    const res = await fetch(`${host}/medical/profile/allergy/delete`, {
        method: "POST",
        headers: await setHeadersPost(),
        body: JSON.stringify(user)
    })
    return await res.json();
}

export const deleteLimitations = async (user) => {
    const res = await fetch(`${host}/medical/profile/limitation/delete`, {
        method: "POST",
        headers: await setHeadersPost(),
        body: JSON.stringify(user)
    })
    return await res.json();

}

export const deleteSurgeries = async (user) => {
    const res = await fetch(`${host}/medical/profile/surgery/delete`, {
        method: "POST",
        headers: await setHeadersPost(),
        body: JSON.stringify(user)
    })
    return await res.json();

}

export const deleteConditions = async (user) => {
    const res = await fetch(`${host}/medical/profile/condition/delete`, {
        method: "POST",
        headers: await setHeadersPost(),
        body: JSON.stringify(user)
    })
    return await res.json();
}


////update
export const editAllergies = async (user) => {
    const res = await fetch(`${host}/medical/profile/allergies/update`, {
        method: "POST",
        headers: await setHeadersPost(),
        body: JSON.stringify(user)
    })
    return res;
}

export const editLimitations = async (user) => {
    const res = await fetch(`${host}/medical/profile/limitations/update`, {
        method: "POST",
        headers: await setHeadersPost(),
        body: JSON.stringify(user)
    })
    return res;

}

export const editSurgeries = async (user) => {
    const res = await fetch(`${host}/medical/profile/surgeries/update`, {
        method: "POST",
        headers: await setHeadersPost(),
        body: JSON.stringify(user)
    })
    return res;

}

export const editConditions = async (user) => {
    const res = await fetch(`${host}/medical/profile/conditions/update`, {
        method: "POST",
        headers: await setHeadersPost(),
        body: JSON.stringify(user)
    })
    return res;
}

export const updateMedicalProfile = async (user) => {
    const res = await fetch(`${host}/medical/profile/update`, {
        method: "POST",
        headers: await setHeadersPost(),
        body: JSON.stringify(user)
    })
    return res;
}




