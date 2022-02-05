import expVid from '../../assets/images/activity/FCSexplainervideo.mov'
import media1 from '../../assets/images/activity/media1.jpeg'
import media2 from '../../assets/images/activity/media2.jpeg'
import media3 from '../../assets/images/activity/media3.jpeg'
import avatar1 from '../../assets/images/activity/0.jpg'
import avatar2 from '../../assets/images/activity/1.jpg'
export const posts = [
    {
        StatusID:1,
        media: [{type:'video', src: expVid}],
        StatusText:'Hi! Do you want to posts like this from your care agency? Subscribe the App now',
        CreatedOn: new Date().toString(),
        UserName:'Jane Doe',
        UserPic: avatar1,
        RoleName: 'Careprovider',
        Comments: []
    },
    {
        StatusID:2,
        media: [{type:'image', src:media1}, 
        {type:'image', src:media2}, 
        {type:'image', src:media3},],
        StatusText:'Sharing photos and videos keeps loved ones connected. A video proof of visits and care provided gives families peace of mind',
        CreatedOn: new Date().toString(),
        UserName:'Jane Doe',
        UserPic: avatar1,
        RoleName: 'Careprovider',
        Comments: [
            {
                Id:1,
                UserName:'Jonathan McCoy',
                CommentText:"Good to see mom's photo. What time did you visit her?"
            },
            {
                Id:2,
                UserName:'John Doe',
                CommentText:'At 11:00am. I was with her for two hours'
            }
        ]
    }
]

export const approvePost = [
    {
        StatusID:1,
        media: [{type:'image', src:media1}, 
        {type:'image', src:media2}, 
        {type:'image', src:media3},],
        StatusText:"Photos from yesterday's visit",
        CreatedOn: new Date().toString(),
        UserName:'Chris Young',
        UserPic: avatar2,
        RoleName: 'Careprovider',
    }
]