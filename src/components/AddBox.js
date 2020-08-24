import React, { useState} from 'react';
import img  from '../images/refresh.png'

const AddBox = ({reload,logged,name}) =>{
   // console.log(lng);
    const [title, setTitle] = useState("");
    const [latitude, setlatitude] = useState("");
    const [longitude, setlongitude] = useState("");
    const [comments, setcomments] = useState("");
    const [visitDate, setvisitDate] = useState("");
    const [image, setimage] = useState("");
    const [loading, setLoad] = useState(false)

    const style = {
        position:'absolute',
        width:'330px',
        height:'370px',
        margin:'50px 50px',
        backgroundColor:'#FFF',
        boxShadow:'0 1px 2px rgba(0,0,0,.1)',
        borderRadius:'3px',
        textAlign:'cEnter',
        paddingTop:'5px'
    }
    const handleChange = (e) =>{
        //setValue(e.target.value)
    }
    const handleAdd = () =>{
        if(title.length == 0 || latitude.length==0 || longitude.length==0 || comments.length ==0|| visitDate.length ==0 )
            return alert('Fill out this fields')
        setLoad(true)
        fetch('http://localhost:3000/addlogs',{
            method: 'post',
            headers:{
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({
                "id":new Date().getTime(),
                "title":title,
                "latitude":latitude,
                "longitude":longitude,
                "comments" :comments,
                "author":name,
                "visitDate":visitDate,
                "image":image
             })
        })
        .then(res => res.json())
        .then(result =>{
            if(result.done){
                console.log("successfully");
                reload();
                setLoad(false)
            }else{
                alert("An error occured!")
            }
        })
    }
    return (
       logged ? <div style= {style}>
            <h3>Dedicate your experience to people</h3>
            <input type="text" placeholder="Enter title" style={{
                                width:'90%',
                                height:'35px',
                                marginBottom:'10px'
                            }} onChange ={(e)=>setTitle(e.target.value)}  />
            <input type="text" placeholder="Enter latitude" style={{
                                width:'40%',
                                height:'35px',
                                marginBottom:'10px',
                                marginRight:'30px'
                            }} onChange ={(e)=>setlatitude(e.target.value)} />
            <input type="text" placeholder="Enter longtiude" style={{
                                width:'40%',
                                height:'35px',
                                marginBottom:'10px'
                            }} onChange ={(e)=>setlongitude(e.target.value) }/>
            <input type="text" placeholder="Enter comments" style={{
                                width:'90%',
                                height:'35px',
                                marginBottom:'10px'
                            }} onChange ={(e)=>setcomments(e.target.value) }/>
            {/* <input type="text" placeholder="enter author" style={{
                                width:'90%',
                                height:'35px',
                                marginBottom:'10px'
                            }} onChange ={(e)=>setauthor(e.target.value)} 
                            value={name}/> */}
            <input type="text" placeholder="Enter visitdate" style={{
                                width:'45%',
                                height:'35px',
                                marginBottom:'10px',
                                transform:'translate(-50%,0)'
                            }} onChange ={(e)=>setvisitDate(e.target.value)} />
            <input type="text" placeholder="Enter image link" style={{
                                width:'90%',
                                height:'35px',
                                marginBottom:'10px'
                            }} onChange ={(e)=>setimage(e.target.value) }/>
            {/* <input id="f02" placeholder="Enter image" style={{
                                width:'70%',
                                height:'35px',
                                marginBottom:'10px',
                                display:'none'
                            }} type="file" placeholder="Add profile picture" multiple/>
            <label placeholder="Enter image" style={{
                                width:'70%',
                                height:'35px',
                                marginBottom:'10px',
                                padding:'5px 15px',
                                borderRadius:'2px',
                                border:'1px solid grey',
                                fontSize:'15px'
                            }} for="f02">Upload images to share</label> */}
           
            { !loading ?
                <button type="submit"
                    style={{
                        padding: '5px 50px',
                        marginTop: '5px',
                        backgroundColor: '#333',
                        border: '1px solid black',
                        borderRadius: '2px',
                        color:'white'
                    }}
                    onClick={() => handleAdd()}

                >Mark it</button> 
                : 
                <button
                    style={{
                        padding: '5px 50px',
                        marginTop: '5px',
                        backgroundColor: 'white',
                        border: '1px solid black',
                        borderRadius: '2px',
                        color:'#4267b2'

                    }}

                >
                    <img className="loader" src={img} width={25} height={25} />
                </button> 
            }

        </div> : 
        <div style={{
                position: 'absolute',
                width: '330px',
                padding: '5px 10px',
                // height:'35px',
                lineHeight: '25px',
                borderRadius: '3px',
                margin: '50px 50px',
                backgroundColor: '#FFF',
                boxShadow: '0 1px 2px rgba(0,0,0,.1)',
                borderRadius: '3px',
                textAlign: 'cEnter',
                paddingTop: '5px'
        }}>
        < a style={{textDecoration:'none',color:'#4267b2'}}
          href='http://localhost:3000/auth/facebook'
        >Login to share your amazing places</a>
      </div>
    )
}
export default AddBox;