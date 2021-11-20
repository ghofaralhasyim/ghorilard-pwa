import { writable, derived } from "svelte/store";

export const apiData = writable([]);
export const activeTabs = writable([]);
export const dataDevice = writable([]);
export const deviceActive = writable('');
export const nama_kolam = writable('');
export const graphData = writable([]);

export const user = derived(apiData,($apiData) => {
    return $apiData;
});

export const data_kolam = derived(dataDevice,($dataDevice) => {
    return $dataDevice;
});