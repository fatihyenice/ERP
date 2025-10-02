import { defineStore } from "pinia";
import { axiosconfig } from "../axios/axios-config";
import { ref } from "vue";
import { useRouter } from "vue-router"; 
import { checkAccess } from "../accessCardSecurity/access"

export const client = defineStore('client', () => {

    const allClients = ref(null);
    const alert = ref(null); 
    const router = useRouter(); 
    const introuvable = ref(false); 
    const DetailClient = ref(false);
    const loading = ref(true); 
    const autorization = ref("loading");
 
    const hassCheck = async() => {  
        try {
            const hasAccess = await checkAccess(1);
            autorization.value = hasAccess ? null : "Vous n'êtes pas autorisé à accéder à cette card";
        } catch (err) {
            console.error(err);
            autorization.value = "Erreur lors de la vérification d'accès";
        }
    };  
    
    const getAllClients = async() => {
        allClients.value = null;
        try{
            const response = await axiosconfig.get('clients/getAllClient') 
            allClients.value = response.data
        }catch(e){ 
            allClients.value = e;
        }
    }

    const getDetailClient = async(IdClientDetail) => {
        if(!isValidClientIdOnDetailPage(IdClientDetail)){
            return;
        }

        loading.value = true;
        try {
            const response = await axiosconfig.post('clients/detail', {
                idClient: IdClientDetail
            });

            DetailClient.value = response.data; 
            loading.value = false; 

            if(response.data.introuvable){
                introuvable.value = true; 
            }
        }catch(e){
            DetailClient.value = false;
            loading.value = false;
            console.log(e); 
        }
    }

    const detailClient = (clientId) => {
        router.push(`/client/detail/${clientId}`);
    }

    const isValidClientIdOnDetailPage = (getIdClient) => {
        if (!/^\d+$/.test(getIdClient)) {
            router.push('/client/all');
            return false;
        }   
        return true;
    }

    const nom = ref("");
    const prenom = ref("");
    const email = ref("");
    const telephone = ref("");
    const naissance = ref("");
    const adresse = ref("");
    const codepostal = ref("");
    const pays = ref("");
    const alertError = ref(false);
    const alertSuccess = ref(false);
    const success = ref(null);
 
    const addClientBtn = async (e) => {
        e.preventDefault();
        
        try{
            const response = await axiosconfig.post('clients/addClient', {
                nomr: nom.value,
                prenomr: prenom.value,
                emailr: email.value,
                telephoner: telephone.value,
                naissancer: naissance.value,
                adresser: adresse.value,
                codepostalr: codepostal.value,
                paysr: pays.value,
            })
 
            alertSuccess.value = response.data.insert;
            alertError.value = false;

            // if(response.data.insert){
            //     nom.value = ""
            //     prenom.value = ""
            //     email.value = ""
            //     telephone.value = ""
            //     naissance.value = ""
            //     adresse.value = ""
            //     codepostal.value = ""
            //     pays.value = ""
            // }
        }catch(e){
            alertSuccess.value = false;
            alertError.value = e.response.data.message;    
        } 
    }



    return {
        getAllClients,
        allClients,
        alert, 
        detailClient,
        isValidClientIdOnDetailPage,
        getDetailClient,
        DetailClient,
        loading,
        introuvable,
        autorization,
        addClientBtn,
        nom,
        prenom,
        email,
        telephone,
        naissance,
        adresse,
        codepostal,
        pays,
        alertSuccess,
        alertError,
        success,
        hassCheck
    }
})