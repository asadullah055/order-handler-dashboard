import { allNav } from './allNav'
export const getNavs = ()=>{
    const allNavs = []
    for(let i=0; i<allNav.length; i++){
        allNavs.push(allNav[i])
    }
    return allNavs
}

