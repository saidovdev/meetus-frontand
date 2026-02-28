import { io } from "socket.io-client";

export const socket=io('http://localhost:1747',{
    withCredentials:true
})