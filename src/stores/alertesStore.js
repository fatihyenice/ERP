import { defineStore } from "pinia";
import { ref } from "vue";

export const alertstore = defineStore('alerte', () => {

    const message = ref('ok');

    return { message }
})