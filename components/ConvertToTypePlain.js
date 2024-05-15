export const GetSex = (value) => {
    var type;

    if (value === 0) {
        type = 'Masculino';

    }
    if (value === 1) {
        type = 'Femenino';

    }
    if (value === 2) {
        type = 'Otro';

    }
    return type;
}

export const GetRace = (value) => {
    var type;

    if (value === 0) {
        type = 'Caucásica';

    }
    if (value === 1) {
        type = 'Africana';

    }
    if (value === 2) {
        type = 'Mongólica';

    }
    if (value === 3) {
        type = 'Amerindia';

    }
    if (value === 4) {
        type = 'Prefiero no decir';

    }
    if (value === 5) {
        type = 'Otro';
    }

    return type;
}

export const GetTypeofBlood = (value) => {
    var type;

    if (value === 0) {
        type = 'A+';

    }
    if (value === 1) {
        type = 'A-';

    }
    if (value === 2) {
        type = 'B+';

    }
    if (value === 3) {
        type = 'B-';

    }
    if (value === 4) {
        type = 'AB+';

    }
    if (value === 5) {
        type = 'AB-';

    }
    if (value === 6) {
        type = 'O+';

    }
    if (value === 7) {
        type = 'O-';

    }
    return type;
}

export const GetHypertension = (value) => {
    var type;

    if (value === true) {
        type = 'Si'
    }
    if (value === false) {
        type = 'No'
    }
    return type;
}

export const GetSmoker = (value) => {
    var type;

    if (value === true) {
        type = 'Si'
    }
    if (value === false) {
        type = 'No'
    }
    return type;
}

export const GetLimitation = (value) => {
    var type;
    if (value.type === 0) {
        type = 'Física';

    }
    if (value.type === 1) {
        type = 'Intelectual';

    }
    if (value.type === 2) {
        type = 'Mental';

    }
    if (value.type === 3) {
        type = 'Psicosocial';

    }
    if (value.type === 4) {
        type = 'Múltiple';

    }
    if (value.type === 5) {
        type = 'Sensorial';

    }
    if (value.type === 6) {
        type = 'Auditiva';

    }
    if (value.type === 7) {
        type = 'Visual';

    }
    if (value.type === 8) {
        type = value.description;
    }
    return type;
}