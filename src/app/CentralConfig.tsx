// config.ts
const isProduction = process.env.KRUIZE_UI_ENV === 'production';

const getBaseUrl = () => {
    if (isProduction) {
        return "/api";
    } else {
        return `http://${process.env.CLUSTER_IP}:${process.env.KRUIZE_PORT}`;
    }
}

const getDatasourcesURL = () => {
    return getBaseUrl() + '/api/kruize/v1/datasource';
 } 

const getRecommendationsURLWithParams = (experiment_name: string, latest: string) => {
    return getBaseUrl() + '/listRecommendations?experiment_name=' + experiment_name + '&latest=' + latest
}

const getRecommendationsURL = () => {
    return getBaseUrl() + '/listRecommendations';
}


const getListExperimentsURL = () => {
    return getBaseUrl() + '/listExperiments'
}

const getHostname = () => {
    if (isProduction) {
        return window.location.hostname;
    } else {
        return process.env.CLUSTER_IP;
    }
}

const getPort = () => {
    if (isProduction) {
        return window.location.port || (window.location.protocol === "https:" ? "443" : "80");
    } else {
        return process.env.KRUIZE_PORT;
    }
}

export { getRecommendationsURLWithParams, getListExperimentsURL, getHostname, getPort, getRecommendationsURL, getDatasourcesURL};
