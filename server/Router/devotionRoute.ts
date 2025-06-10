import { getSubscriberByEmail, resubscribe, subscribeDevotion, unsubscribeDevotion } from "../Controlers/devotionController";
import { Router } from 'express';
import requireAuth from "../middleware/authmiddleware";


const devotionRoute = Router();

devotionRoute.route('/subscribe').post(subscribeDevotion);
devotionRoute.route('/unsubscribe').post(unsubscribeDevotion);
devotionRoute.get("/getOneSubscriber/:email", requireAuth, getSubscriberByEmail);
devotionRoute.route("/resubscription").post(resubscribe);


export default devotionRoute;