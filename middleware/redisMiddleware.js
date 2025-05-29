import redisClient from "./redis.js";

const cache = (keyGenerator)=> async (req, res, next)=>{
  const key = keyGenerator(req)
  const isCached =await  redisClient.get(key)
  
  console.log(`Key ${key}`)
  console.log(`Cache ${isCached}`)
    if(isCached){
        return res.json(JSON.parse(isCached))
    }

    res.sendResponse = res.json;
    res.json = (body) => {
    redisClient.setEx(key, 60, JSON.stringify(body));
    res.sendResponse(body);
  };
  next();
}

const clearCache = async (req, res, next)=>{
  console.log(`Clear Cache ${req.originalUrl}`)
await redisClient.del(req.originalUrl)
next()
}
export  {cache, clearCache}