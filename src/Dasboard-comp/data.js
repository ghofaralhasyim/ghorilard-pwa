import { writable, derived } from "svelte/store";

export const socket = writable();
export const apiData = writable([]);
export const activeTabs = writable([]);
export const dataDevice = writable([]);
export const subTabs = writable('');
export const nama_kolam = writable('');
export const monitoring_data = writable(); // ALL DATA HISTORY MONITORING
export const graphautodata = writable(); //WRITABLE DATA FOR AUTO GRAPH
export const id_device = writable();
export const comment = writable([]);

export const user = derived(apiData,($apiData) => {
    return $apiData;
});