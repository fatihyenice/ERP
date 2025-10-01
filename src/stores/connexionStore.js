 import { defineStore } from "pinia";
import { computed, ref } from "vue";  
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
            const response = await axiosconfig.post("auth/loggin", {
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
            const response = await axiosconfig.get('auth/check-auth')
            isAuthed.value = response.data.authed; 
        }catch(error){
            errormsg.value = "Erreur serveur inconnue" + error;
        }
    }

    const logout = async() => {
        try {
            const response = await axiosconfig.get('auth/logout');
            await isAuthedTry();
            isAuthed.value = false;
            routes.push("/")
        }catch(e) {
            console.log(e);
        }
    }

    return {
        email,
        mdp,
        allFullField,
        loggin,
        errormsg,
        isAuthedTry,
        isAuthed,
        logout
    }
})