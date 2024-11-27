import { createSlice } from "@reduxjs/toolkit";

export interface ExperimentsInitialState {
    error: string,
    error_method: string,
    loading: boolean,
    listOfExperiments: any,
    experiment: any,
    listRecommendations: any,
    recommendation: any
}

const initialState: ExperimentsInitialState = {
    error: "",
    error_method: "",
    loading: false,
    listOfExperiments: [],
    experiment: [],
    listRecommendations: [],
    recommendation: []
}


// Slicers

const experimentSlicer = createSlice({
    name: 'experiments',
    initialState,
    reducers: {
        loading : (state) => {
            state.loading = true;
        },
        disableLoading: state => {
            state.loading = false;
        },
        listOfexperiments: (state, action) => {
            state.listOfExperiments = action.payload.listOfExperiments
        },
        experimentList: (state, action) => {
            state.experiment = action.payload.experiment
        },
        listRecommendations: (state, action) => {
            state.listRecommendations = action.payload.listRecommendations
        },
        recommendation: (state, action) => {
            state.recommendation = action.payload.recommendation
        },
        errorCall: (state, action) => {
            state.error = action.payload.error
            state.error_method = action.payload.error_method
        }
    }
})

export const { loading, disableLoading, errorCall, listOfexperiments, experimentList, listRecommendations, recommendation } = experimentSlicer.actions
export default experimentSlicer