import { writable, derived } from "svelte/store";

export const t_activeTabs = writable([]);
export const t_chatDirect = writable([]);
export const id_socket = writable([]);