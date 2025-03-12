import type {PageLoad} from "./$types"

export const load: PageLoad = ({params})=>{
    try {
        console.log("pageLoad parmas", params)
        return {
            userName: params.userName
        }
    }
    catch (e) {
        console.error(e)
        return {
            userName: ""
        }
    }
}