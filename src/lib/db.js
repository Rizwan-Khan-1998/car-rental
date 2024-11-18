import mongoose from 'mongoose'


const MONGODB_URI = process.env.MONGODB_URI

export const connect = async () =>  {
    const connectionState =  mongoose.connection.readyState

    if(connectionState === 1 || connectionState === 2 ) {
        console.log('already connected');
        return
    }

    try {
        mongoose.connect(MONGODB_URI, {
            dbName: "rental-car",
            bufferCommands: true
        })
        console.log('connected');
    } catch (error) {
        
    }
    
}