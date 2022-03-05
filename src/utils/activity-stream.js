import expVid from '../../assets/images/activity/FCSexplainervideo.mov'
import media1 from '../../assets/images/activity/media1.jpeg'
import media2 from '../../assets/images/activity/media2.jpeg'
import media3 from '../../assets/images/activity/media3.jpeg'
import avatar1 from '../../assets/images/activity/0.jpg'
import avatar2 from '../../assets/images/activity/1.jpg'
export const posts = [
    {
        StatusID:1,
        Media:1,
        blobNames: [{type:'video', src: expVid}],
        StatusText:'Hi! Do you want to see posts like this from your care agency? Subscribe to the App now.',
        CreatedOn: new Date().toString(),
        UserName:'Jane Doe',
        UserPic: avatar1,
        RoleName: 'Careprovider',
        StatusUserByID:1,
        Comments: []
    },
    {
        StatusID:2,
        Media:3,
        blobNames: [{type:'image', src:media1}, 
        {type:'image', src:media2}, 
        {type:'image', src:media3},],
        StatusText:'Sharing photos and videos keep loved ones connected. A video proof of visits and care provided give families peace of mind.',
        CreatedOn: new Date().toString(),
        UserName:'Jane Doe',
        UserPic: avatar1,
        RoleName: 'Careprovider',
        StatusUserByID:2,
        Comments: [
            {
                CommentID:1,
                FirstName:'Jonathan',
                LastName:'McCoy',
                CommentText:"Good to see mom's photo. What time did you visit her?"
            },
            {
                CommentID:2,
                FirstName:'John',
                LastName:'Doe',
                CommentText:'At 11:00am. I was with her for two hours.'
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