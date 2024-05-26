import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import usePlayer from "../hooks/usePlayer";
import { TMDB_CDN_URL } from "../services/tmdb";
import { PAGE } from "../router/routes";
import { useEffect,useState } from "react";
import { setPlayer } from "../stores/playerSlice";
import Spinner from '../components/Spinner';
import io from "socket.io-client"
import {nanoid} from "nanoid";
const socket=io.connect("http://localhost:5000");
const userName=nanoid(4);
const Watch = () => {
  const [message,setMessage]=useState('')
  const [chat,setChat]=useState([]);

  const { contentId } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    return () => {
      dispatch(setPlayer({ playerState: 'playing', playerData: null }))
    }
  }, [])

  usePlayer('movie', 'playing', contentId);

  const videoInfo = useSelector((store) => store?.player?.playing?.info)
  const videos = useSelector((store) => store?.player?.playing?.videos)

  const sendChat=(e)=>{
    e.preventDefault()
    socket.emit("chat",{message,userName})
    setMessage('');
  }
  useEffect(()=>{
    socket.on("chat",(payload)=>{
      setChat([...chat,payload])
    })
  })

  if (!videoInfo && !videos) return <Spinner />;
  const { original_title, backdrop_path } = videoInfo;

  if (videos?.results?.length <= 0) return <VideoNotFound data={{ original_title, backdrop_path }} />;

  const { key } = videos.results[0];
  if (!key) return;
    

  return (
    <>
    <div className="h-screen w-screen">
      <iframe className="h-[416px] md:h-[calc(100%-0px)] w-full pt-[118px] md:pt-[70px]"
        src={`https://www.youtube.com/embed/${key}?autoplay=1&mute=0&controls=1&showinfo=0&rel=0&iv_load_policy=3&modestbranding=0`}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen>
      </iframe>
      {/* <header className="App-header w-screen mt-12">
          <h1>Chatty App</h1>
         
                   {chat.map((payload,index)=>{
                   return(
                  <p key={index}>{payload.message}:<span>id:{payload.userName}</span></p>
                   )
                   }
                   )}
                  <form onSubmit={sendChat}>
                    <input type="text" name='chat'
                     placeholder='send text'
                     value={message}
                     onChange={(e)=>{
                      setMessage(e.target.value)
                     }}
                    />
                  <button type='submit'>Send</button>
                   </form>
               </header>  */}
    </div>
       
    </>
  )
}

const VideoNotFound = ({ data }) => {
  const { backdrop_path, original_title, message } = data;
  return (
    <div className='w-screen h-screen'>
      <div className='w-full h-full'>
        <img src={`${TMDB_CDN_URL}/w500${backdrop_path}`} alt={original_title} className='w-full h-full object-cover' />
      </div>
      <div className='absolute w-full h-full bg-black/70 top-0 bottom-0 left-0 right-0 flex flex-col justify-center items-center'>
        <h1 className='text-white text-5xl text-bold mb-5'>{original_title}</h1>
        <p className=' text-gray-300 text-2xl mb-4'>Video not available for <b>{original_title}</b></p>
        <Link to={PAGE.BROWSE} className="bg-red-primary px-12 py-3 text-white rounded flex items-center gap-3">
          <span className="icon-fill text-[36px]">west</span>
          <span>Home Page</span>
        </Link>
      </div>
    </div>
  )
}

export default Watch;
