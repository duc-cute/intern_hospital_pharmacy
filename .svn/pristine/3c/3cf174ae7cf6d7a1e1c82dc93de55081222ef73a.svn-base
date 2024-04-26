import axios from "axios";
import ConstantList from "../../../appConfig";

const PATH = `${ConstantList.API_ENPOINT}/api/administrative-unit`;

class Service {

    async getRootUnit(){
        const url = `${PATH}/getRootUnit`;
    
        return axios.post(url, {
            pageIndex: 1,
            pageSize: 200,
        });
    }

    async getAllChildByParentId(id){
        const url = `${PATH}/getAllChildByParentId/${id}`;

        return axios.get(url);
    }

    async getAllByLevel(level){
        const url = `${PATH}/getAllByLevel/${level}`;

        return axios.get(url);
    }
}

export default new Service();