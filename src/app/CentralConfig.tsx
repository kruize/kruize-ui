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
    return getBaseUrl() + '/datasources';
}

const importDataSourcesMetadataURL = () => {
    return getBaseUrl() + '/dsmetadata'; 
}

const importCreateExperimentJsonURL = () =>{
    return getBaseUrl() + '/createExperiment';
}

const getDatasourceMetadataURL = (datasource_name : string) => {
    return getBaseUrl() + '/dsmetadata?datasource=' + datasource_name + '&verbose=false'
}

const getClusterMetadataURL = (datasource_name : string, cluster_name : string) => {
    return getBaseUrl() + '/dsmetadata?datasource=' + datasource_name + '&cluster_name=' + cluster_name +  '&verbose=true' 
}

const getRecommendationsURLWithParams = (experiment_name: string, latest: string) => {
    return getBaseUrl() + '/listRecommendations?experiment_name=' + experiment_name + '&latest=' + latest
}

const getRecommendationsURL = () => {
    return getBaseUrl() + '/listRecommendations';
}

const getListExperimentsURLWithParams = (experiment_name: string) => {
    return getBaseUrl() + '/listExperiments?experiment_name=' + experiment_name
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

export { getRecommendationsURLWithParams, getListExperimentsURL, getHostname, getPort, getRecommendationsURL, getDatasourcesURL, 
    importDataSourcesMetadataURL, getListExperimentsURLWithParams, getDatasourceMetadataURL, getClusterMetadataURL, importCreateExperimentJsonURL};
