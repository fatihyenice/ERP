import { axiosconfig } from "../axios/axios-config";

export const checkAccess = async(idCard) => {
    try {
        const response = await axiosconfig.post('clients/accessPageRenduFront', {
            themeId: idCard
        })
        
        return true;
    }catch(e){
        return false;
    }
}