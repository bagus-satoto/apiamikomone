import got from "got/dist/source";
import { UserAgent } from "../typings/Headers";

const request = got.extend({
    headers: {
        'user-agent': UserAgent
    }
})


export default request