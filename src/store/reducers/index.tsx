import { combineSlices } from "@reduxjs/toolkit";

import experimentSlicer from '@reducers/ExperimentReducer'
import dataSourceSlicer from "./DataSourceReducers";

export const rootReducer = combineSlices(experimentSlicer, dataSourceSlicer)
export type RootState = ReturnType<typeof rootReducer>;

