import { getOneSubscriber, resubscribe, subscribeDevotion, unsubscribeDevotion } from "../Controlers/devotionController";
import { Router } from 'express';


const devotionRoute = Router();

devotionRoute.route('/subscribe').post(subscribeDevotion);
devotionRoute.route('/unsubscribe').post(unsubscribeDevotion);
devotionRoute.route("/getOneSubscriber/:id").get(getOneSubscriber);
devotionRoute.route("/resubscription").post(resubscribe);


export default devotionRoute;