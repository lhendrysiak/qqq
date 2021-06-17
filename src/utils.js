import _ from 'lodash'

export const dataCenterConverter = (dataCenter) => {
    switch(dataCenter) {
        case 'EU': return 'eu1';
        case 'US': return 'us1';
    }
}

export const dataCenterInURL = (dataCenter) => {
    switch(dataCenter) {
        case 'EU': return 'us1';
        case 'US': return 'us1';
    }
}

export const createDomainName = (environment, body) => {
    console.log('1/18 Generating domain name')
    const purpose = body.purpose
    console.log('2/18 Domain name was generated')
    return `${environment}_${body.dataCenter}_${body.countryCode}${purpose ? '_'+purpose : ''}`.toLowerCase();
};

export const replaceVariablesInWebSDK = (webSDK, body) => {
    const variables = {
      'COUNTRY_CODE': body.countryCode,
    }
    Object.entries(variables).forEach(([key, value]) => {
      webSDK = webSDK.replace(`[[${key}]]`, `'${value}'`);
    })
    return webSDK
}

export const compareACLs = (masterACL, environmentACL) => {
    return _.isEqual(masterACL, environmentACL)
}

export const generateCreationDate = (date) => {
    const year = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(date);
    const month = new Intl.DateTimeFormat('en', { month: '2-digit' }).format(date);
    const day = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(date);
    return `${year}-${month}-${day}`
}

export const generatePermissionGroupName = (domainName, system) => {
    return `api_${domainName}_${system}`.toLowerCase();
};

export const errorHandler = (object) => {
    if (object.errorCode) {
        console.log(object);
        throw new Error(object.errorDetails || object.errorMessage);
    }
};

export const delay = ms => {
    return new Promise(res => setTimeout(res, ms))
};