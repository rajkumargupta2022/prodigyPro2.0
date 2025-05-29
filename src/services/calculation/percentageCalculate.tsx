export const getPercentageValue = (total:number,part:number):string=>{
        let result:number = (part/total)*100
        return result.toFixed(2)
  }