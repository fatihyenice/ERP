 import { defineStore } from "pinia";
import { computed, onMounted, ref } from "vue";  
import { axiosconfig } from "../axios/axios-config";
import { useRouter } from "vue-router";

export const logginStore = defineStore("loginStore", () => {

    const email = ref("");
    const mdp = ref("");
    const isAuthed = ref(false);
    const errormsg = ref(false);
    const routes = useRouter();

    const allFullField = computed(() => {
        return email.value && mdp.value;
    });

   const loggin = async(e) => {
        errormsg.value = false;
        
        e.preventDefault(); 

        if (!allFullField.value) {
            errormsg.value = "Veuillez remplir tous les champs !";
            return;
        }
        
        try {
            const response = await axiosconfig.post("/loggin", {
                email: email.value,
                mdp: mdp.value
            });

            errormsg.value = response.data.message;
            
            if(response.data.authed === true){
                routes.push('/dashboard');
            }
        } catch (error) {
            if (error.response && error.response.data) {
                errormsg.value = error.response.data.message; 
            } else {
                errormsg.value = "Erreur serveur inconnue";
            }
        }
    }  

    const isAuthedTry = async() => {
        try {
            const response = await axiosconfig.get('check-auth')
            isAuthed.value = response.data.authed;

            if(isAuthed.value === true){
                routes.push('/dashboard');
            }
        }catch(error){
                errormsg.value = "Erreur serveur inconnue" + error;
        }
    }

    return {
        email,
        mdp,
        allFullField,
        loggin,
        errormsg,
        isAuthedTry,
        isAuthed
    }
})