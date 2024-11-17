export const floorLimit = (limit:number)=>{
    if(limit >= 50) return 50
    if(limit >= 30) return 30
    return 10
}