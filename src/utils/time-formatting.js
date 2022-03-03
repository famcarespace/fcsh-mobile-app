export const convertToMins = (timestamp) => {
    var currDate = new Date()
    var diff = (currDate-new Date(timestamp))/86400000
    if (diff>=1) return `${Math.round(diff)} days ago`
    else{
        diff = Math.round((currDate-new Date(timestamp))/3600000)
        if(diff>=1) return `${diff} hrs ago`
        else {
            diff= Math.round(((((currDate-new Date(timestamp))%86400000)%3600000)/60000))
            switch(diff){
                case 0: return 'now'
                case 1: return '1 min ago'
                default: return `${diff} mins ago`
            }
        }
    }
}