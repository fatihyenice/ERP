import { defineStore } from "pinia";
import { ref } from "vue"; 
import { useRouter } from "vue-router"; 
import { axiosconfig } from "../axios/axios-config"

export const themestore = defineStore("themestore", () => {

    const allThemes = ref([]);
    const loading = ref(true);
    const error = ref(false);
    const inputSearch = ref('');
    const originalThemes = ref([]);
    const router = useRouter();

    const fetchThemes = async () => {
        loading.value = true;
        error.value = null;  

        try {
            const response = await axiosconfig.get("themes/getThemes"); 
            allThemes.value = response.data;
            originalThemes.value = response.data;
        } catch (err) {
            console.error("Erreur fetchThemes:", err); // pour debugger
            error.value = "Impossible de récuperer les thèmes !";
        } finally {
            loading.value = false;
        }
    };


    const searchThemes = (e) => {
        e.preventDefault();
        if(inputSearch.value.length > 0){
            allThemes.value = originalThemes.value.filter(theme => {
                return theme.nom.trim().toLowerCase().includes(inputSearch.value.trim().toLowerCase())
            })
        }else{
            allThemes.value = originalThemes.value;
        }
    }
 
    const openTheme = (params) => {
        router.push(params)
    }

    return { 
        fetchThemes, 
        loading, 
        allThemes, 
        error, 
        searchThemes,
        inputSearch,
        openTheme
    }
});