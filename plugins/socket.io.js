import io from 'socket.io-client'
const socket = io('127.0.0.1:3000',
  {
    // query: {
    //   session_id: 'id_Ka0guSExzGWBq65fAVZkAVTeED0fm'
    // }
  }
);
// const socket = io(process.env.WS_URL)

export default socket