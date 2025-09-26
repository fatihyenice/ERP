import { defineStore } from "pinia";
import { ref } from "vue"; 
import { useRouter } from "vue-router"; 

export const themestore = defineStore("themestore", () => {

    const allThemes = ref([]);
    const loading = ref(true);
    const error = ref(false);
    const inputSearch = ref('');
    const originalThemes = ref([]);
    const router = useRouter();

    const fetchThemes = async () => {
        try {
            const response = await fetch("http://localhost:3000/getThemes");
            if (!response.ok) throw new Error("Erreur HTTP " + response.status);
            const data = await response.json();
            allThemes.value = data;
            originalThemes.value = data;
        } catch (err) {
            console.error("Erreur lors de la récupération des thèmes :", err);
            error.value = "Impossible de récuperer les thèmes !";
        } finally {
            loading.value = false;
        }
    };

    const searchThemes = () => {
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