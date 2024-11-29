import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    error: "",
    error_method: "",
    datasources: [],
    dataSourceMetaData: {},
    clusterMetaData: {},
    selectedDataSource: "",
    selectedClusterName: ""
}

const dataSourceSlicer = createSlice({
    name: 'dataSource',
    initialState,
    reducers: {
        loading : (state) => {
            state.loading = true;
        },
        availabeDataSources: (state, action) => {
            state.datasources = action.payload.datasources
        },
        dataSourceMetadata: (state, action) => {
            state.dataSourceMetaData = action.payload.dataSourceMetaData
            state.selectedDataSource = action.payload.selectedDataSource
        },
        errorCall: (state, action) => {
            state.error = action.payload.error
            state.error_method = action.payload.error_method
        },
        disableLoading: state => {
            state.loading = false;
        },
        setClusterMetaData:  (state, action) => {
            Object.assign(state.clusterMetaData, action.payload)
        },
        saveSelectedClusterName: (state, action) => {
            console.log(action.payload)
            state.selectedClusterName = action.payload.selectedClusterName
        }

    }
})

export const { loading, disableLoading, errorCall, dataSourceMetadata, availabeDataSources, setClusterMetaData, saveSelectedClusterName } = dataSourceSlicer.actions
export default dataSourceSlicer