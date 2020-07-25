import React, { useRef, useState, useEffect } from 'react';
import Loading from './Loading'
import CarouselImage from './CarouseImage'
//  import 'bootstrap/dist/css/bootstrap.min.css';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams
  } from "react-router-dom";
// import { CarouselImage } from 'react-bootstrap';
  

const ImageView  = ({src,offShow,log,id,uid,name,url}) =>{
    const [comments, setComment] = useState([])
    const [loaded, setLoad] = useState(false)
    const [text, setText] = useState('')
    const [userId, setUid] = useState(null)
    const messagesEndRef = useRef(null)
    // const [val, setVal] = useState('')

    const scrollToBottom = () => {
        console.log("gọi nè");
        console.log(messagesEndRef);
        messagesEndRef.current.scrollIntoView({ behavior: "instant" })
    }

    let index = 0;
    const getComments = async () =>{
        console.log("in");
        const response =  await fetch(`http://localhost:3000/info/${uid}`)
        const result = await response.json();
        setUid(result._id)
        const res = await fetch(`http://localhost:3000/api/${id}/cmts`)
        const comments = await res.json();
        setComment(comments)
        setLoad(true)
        scrollToBottom()
    }
    const handleChange = (e)=> {
        setText(e.target.value)
      //  console.log(e.target.value);
    }
    const handleClick = async (e) =>{
        console.log(id);
        fetch('http://localhost:3000/auto',{
            method: 'POST',
            headers:{
                'Content-Type' : 'application/json'
            },
            body:JSON.stringify({
                "lid":id,
                "uid":userId,
                "title":text,
                "body":"thisisbody"
            })
        })
        .then(res => res.json())
        .then(result =>{
            if(result.done){
             // setLoad(false)
                const body = "nothing"
                const lid = id
                let uid = {
                    name:name,
                    image:url
                }
                const title =text;
                const stringified = JSON.stringify({
                    lid,uid,title,body
                })
                comments.push(JSON.parse(stringified))
                //setComment(comments)
             scrollToBottom()
            //  setLoad(true)
            //    getComments();
                setText('')
            }else{
                alert("An error occured!")
            }
        })
      //  console.log(index);
        
    }
    const ts = () =>{
        console.log("hihi");
    }
    useEffect(()=>{
        scrollToBottom()
        getComments();
        console.log("hic hiic");

        // setComment(cmt)
    },[])
    const styleDiv = {
        width:'100%',
        height:'100%',
        zIndex:'100',
        backgroundColor: 'rgb(0,0,0)', /* Fallback color */
        backgroundColor: 'rgba(0,0,0,0.4)', /* Black w/ opacity */
        position:'relative',
        
    }
    return (
        
        <div style={styleDiv} >
            {/* {console.log("rerender")} */}
           <div style={{
               width:'700px',
               minHeight:'550px',
               position:'absolute',
               marginLeft:'30%',
               marginTop:'100px',
               transform:'translate(-30%,0)',
               opacity:'1',
               
            }}>
                {/* <img src={src} width={700} height={500}  /> */}
            <CarouselImage  images={src} />
               
           </div>
           <div
            style={{
                width:'350px',
                height:'610px',
                position:'absolute',
                marginLeft:'65%',
                marginTop:'50px',
                // transform:'translate(-50%,0)',
                opacity:'1',
                borderRadius : '4px',
                backgroundColor:'#FFF',
                boxShadow:'0 1px 2px rgba(0,0,0,.1)',
                padding:'15px 20px',
                zIndex:'1000'

            }}>
                <Router>
                    <Link to="/">
                        <div style={{
                            position: 'absolute',
                            right: '10px',
                            top: '0px',
                            // fontSize:'18px',
                            padding: '5px 5px',
                            cursor: 'pointer'
                        }}
                        onClick={() => offShow(false)}
                        >
                            <svg height="12px" viewBox="0 0 365.696 365.696" width="12px" xmlns="http://www.w3.org/2000/svg"><path d="m243.1875 182.859375 113.132812-113.132813c12.5-12.5 12.5-32.765624 0-45.246093l-15.082031-15.082031c-12.503906-12.503907-32.769531-12.503907-45.25 0l-113.128906 113.128906-113.132813-113.152344c-12.5-12.5-32.765624-12.5-45.246093 0l-15.105469 15.082031c-12.5 12.503907-12.5 32.769531 0 45.25l113.152344 113.152344-113.128906 113.128906c-12.503907 12.503907-12.503907 32.769531 0 45.25l15.082031 15.082031c12.5 12.5 32.765625 12.5 45.246093 0l113.132813-113.132812 113.128906 113.132812c12.503907 12.5 32.769531 12.5 45.25 0l15.082031-15.082031c12.5-12.503906 12.5-32.769531 0-45.25zm0 0" /></svg>
                        </div>
                    </Link>
                </Router>
                <h3 style={{
                    fontSize:'19px'
                }}>{log.title.toUpperCase()}</h3>
                <p
                    style={{
                        marginTop:'0',
                        marginBottom:'0',
                        fontWeight:'bold',
                        fontSize:'17px'
                        
                    }}
                >
                 {log.comments}
                </p>
                <p
                    style={{
                        marginTop:'0',
                        marginBottom:'20px',
                        fontWeight:'bold',
                        fontSize:'14px'
                    }}
                >
                   Author: {log.author}
                </p>
              
                <p
                    style={{
                       margin:'0',
                       fontSize:'13px'
                    }}
                >
                   Comments({comments.length})
                </p>
               
                 <div className="comments" 
              
                    style={{
                        marginLeft:'15px',
                        height:'400px',
                        overflow:'scroll'
                    }}  
                    >
                   { loaded ?
                        comments.map((cmt,index) =>(
                            <React.Fragment key={index}>
                            
                            <p className="cmt-row">
                                    <img src={cmt.uid.image} style={{
                                        display:'absolute',
                                        marginTop:'auto',
                                        width: '25px',
                                        height: '25px',
                                        borderRadius: '50%',
                                        marginRight:'5px'
                                    }} />
                                   <span><strong style={{marginRight:'5px'}}>{cmt.uid.name}: </strong></span>{cmt.title}</p>
                            </React.Fragment>
                        ))
                        
                    : <Loading/>}
                    <div 
                        // style={{
                        //     fontSize:'10px',
                        //     marginLeft:'50%',
                        //     transform:'translate(-45%,0)',
                        //     bottom:'20px',
                        //     cursor:'pointer'
                        // }}
                        // onClick={()=>console.log('clicked loadmore')}
                        ref={messagesEndRef} ></div> 
                    
                        {
                        
                        uid &&
                        <>
                         <textarea
                                style={{
                                    width: '95%',
                                    height: '35px',
                                    fontSize:'14px'
                                  
                                }}
                                placeholder="enter some your review.."
                                type="text"
                                rows="5"
                                value={text}
                                onChange={(e) => handleChange(e)}
                            />
                            
                         
                            <button
                                style={{
                                    backgroundColor: '#333',
                                    border: '1px solid black',
                                    borderRadius: '2px',
                                    fontSize:'14px',
                                    color:'white',
                                    marginBottom:'40px'


                                }}
                                onClick={() => handleClick()}
                            >
                                Share your review
                            </button>
                            </>
                    }
                </div> 
                     
           </div>
        </div>
    )
}

export default ImageView;