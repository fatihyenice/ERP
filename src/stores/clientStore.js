import { defineStore } from "pinia";
import { axiosconfig } from "../axios/axios-config";
import { ref } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";

export const client = defineStore('client', () => {

    const allClients = ref(null);
    const alert = ref(null);
    const autorisations = ref(true);
    const router = useRouter();
    const introuvable = ref(false);

    // Détail clients
    const DetailClient = ref(false);
    const loading = ref(true);
    
    const getAllClients = async() => {
        try{
            const response = await axiosconfig.get('clients/getAllClient')
            if(response.data.unhautorized){
                autorisations.value = false;
            }else{
                allClients.value = response.data;
                autorisations.value = true;
            }
        }catch(e){
            alert.value = "Impossible de récupérer les clients !";
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

    return {
        getAllClients,
        allClients,
        alert,
        autorisations,
        detailClient,
        isValidClientIdOnDetailPage,
        getDetailClient,
        DetailClient,
        loading,
        introuvable
    }
})