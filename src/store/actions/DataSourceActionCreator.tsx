import { getClusterMetadataURL, getDatasourcesURL, importDataSourcesMetadataURL } from "@app/CentralConfig";
import { loading, disableLoading, errorCall, availabeDataSources, dataSourceMetadata, setClusterMetaData } from "@reducers/DataSourceReducers";


export const getListOfDataSources = () => async dispatch => {
    
    dispatch(loading());
    try 
    {
        const response = await fetch(getDatasourcesURL());
        const data = await response.json();
        dispatch(availabeDataSources({ datasources: data.datasources }))
    } 
    catch (error: any) 
    {
        dispatch(errorCall({ error: error.message, error_method: "getListOfDataSources" }))
    }
    dispatch(disableLoading())

}

export const importDataSourceMetaData = (dataSourceName: string) => async dispatch => {
    dispatch(loading());
    try {
        const payload = {
            version: 'v1.0',
            datasource_name: dataSourceName
        };
        
        const response = await fetch(importDataSourcesMetadataURL(), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        const data = await response.json();
        dispatch(dataSourceMetadata({ dataSourceMetaData: data.datasources, selectedDataSource: dataSourceName }))

    } 
    catch (error: any) {
        
        dispatch(errorCall({ error: error.message, error_method: "importDataSourceMetaData" }))
    }
    dispatch(disableLoading())
}


export const getClusterMetaData = (datasourceName: string, clusterName: string) => async dispatch => {
    dispatch(loading());
    try {
        const response = await fetch(getClusterMetadataURL(datasourceName, clusterName))
        const data = await response.json();
        dispatch(setClusterMetaData({
            [`${datasourceName}-${clusterName}`]: data.datasources[datasourceName].clusters[clusterName]
        }))
    } catch (error: any) {
        dispatch(errorCall({ error: error.message, error_method: "getClusterMetaData" }))
    }
    dispatch(disableLoading())
}
