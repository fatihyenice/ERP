import { defineStore } from "pinia";
import { axiosconfig } from "../axios/axios-config";
import { ref } from "vue";
import { useRouter } from "vue-router"; 

export const client = defineStore('client', () => {

    const allClients = ref(null);
    const alert = ref(null); 
    const router = useRouter();
    const introuvable = ref(false); 
    const DetailClient = ref(false);
    const loading = ref(true);

    const autorization = ref(null)
    
    const getAllClients = async() => {
        try{
            const response = await axiosconfig.get('clients/getAllClient')
            
            allClients.value = response.data
        }catch(e){ 
            console.log(e)
            autorization.value = e.response.data.unauthorized
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
            autorization.value = e.response.data.unauthorized
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
        autorization
    }
})