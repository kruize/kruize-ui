// Action Creators

import { getListExperimentsURL, getListExperimentsURLWithParams, generateRecommendationsURL, getRecommendationsURLWithParams } from "@app/CentralConfig";
import { loading, errorCall, disableLoading, listOfexperiments, experimentList, listRecommendations, recommendation } from "@reducers/ExperimentReducer";
import { __setFunctionName } from "tslib";

export const getListOfExperiments =  () => async dispatch => {
    dispatch(loading());
    try {
        const response = await fetch(getListExperimentsURL())
        const data = await response.json();
        dispatch(listOfexperiments({listOfExperiments: data}))
    } catch (error: any) {
        dispatch(errorCall({error: error.message, error_method: "getListOfExperiments"}))
    }
    dispatch(disableLoading())
}

export const getExperimentData =  (value: string) => async dispatch => {
    dispatch(loading());
    try {
        const response = await fetch(getListExperimentsURLWithParams(value))
        const data = await response.json();
        dispatch(experimentList({experiment: data}))
    } catch (error: any) {
        dispatch(errorCall({error: error.message, error_method: "getExperimentData"}))
    }
    dispatch(disableLoading())
}


export const generateRecommendations = (name: string) => async dispatch => {
    dispatch(loading())
    try {
        const response = await fetch(generateRecommendationsURL(name))
        const data = await response.json();
        dispatch(listRecommendations({listRecommendations: data}))
    } catch (error: any) {
        dispatch(errorCall({error: error.message, error_method: "generateReommendations"}))
    }
    dispatch(disableLoading())
}

export const generateRecommendationsWithParams = (name: string, latest: string) => async dispatch => {
    dispatch(loading())
    try {
        const response = await fetch(getRecommendationsURLWithParams(name, latest))
        const data = await response.json();
        dispatch(recommendation({recommendation: data}))
    } catch (error: any) {
        dispatch(errorCall({error: error.message, error_method: "generateRecommendationsWithParams"}))
    }
    dispatch(disableLoading())
}