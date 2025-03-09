import { db } from "../db/index.js";
import { Hono } from "hono";
import { urlsTable } from "../db/schema.js";
import { eq } from "drizzle-orm";

const urlsRoute = new Hono();

urlsRoute.get("/", async (c) => {
    const allUrls = await db.query.urlsTable.findMany()

    return c.json(allUrls)
})

// urlsRoute.get("/:id", async (c) => {
//     console.log("LA")
//     const {id} = c.req.param()
//     const url = await db.query.urlsTable.findFirst({
//         where: eq(urlsTable.id, Number(id))
//     })

//     return c.json(url)
// })

urlsRoute.post("/", async (c) => {
    const {longUrl} = await c.req.json();
    const shortId = crypto.randomUUID()
    const shortUrl = `${process.env.BASE_URL || "http://localhost:3000"}/${shortId}`
    const data = {longUrl, shortId, shortUrl}
    const newUrl = await db.insert(urlsTable).values(data)

    return c.json(newUrl)
})

urlsRoute.get("/:shortId", async (c) => {
    const shortId = c.req.param("shortId")
    const url = await db.query.urlsTable.findFirst({
        where: eq(urlsTable.shortId, shortId)
    })

    if (!!url) return c.redirect(url.longUrl)
    return c.json({error: "URL not found"}, 404)
    
})
export default urlsRoute