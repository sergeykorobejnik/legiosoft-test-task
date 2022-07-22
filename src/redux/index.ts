import {configureStore} from "@reduxjs/toolkit";
import createSagaMiddleware from 'redux-saga';
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import userReducer from "./userReducer";
import uiReducer from "./uiReducer";
import {workerUser} from "./saga/userSaga";
import fileReducer from "./fileReducer";
import {fileSaga} from "./saga/fileSaga";

const saga = createSagaMiddleware()

const store = configureStore({
    reducer: {
        user: userReducer,
        ui: uiReducer,
        file: fileReducer
    },
    middleware: [saga]
})

saga.run(workerUser)
saga.run(fileSaga)

export default store

export type AppDispatch = typeof store.dispatch

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<ReturnType<typeof store.getState>> = useSelector