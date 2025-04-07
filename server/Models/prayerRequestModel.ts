import mongoose, { model } from 'mongoose'

interface IPrayerRequest{
    name?: string;
    prayerRequest: string;
    date: Date;
}



export const prayerSchema = new mongoose.Schema<IPrayerRequest>({
    name:{
        type: String,
    },
    prayerRequest:{
        type: String,
        required: true
    },
    date:{
        type: Date,
        default: Date.now
    }
},{timestamps: true});


//  model
export const prayerModel = model("PrayerRequest",prayerSchema)