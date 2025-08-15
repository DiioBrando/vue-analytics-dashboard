import axios from "axios";

export const $wb_api = axios.create({
    baseURL: '/api',
});