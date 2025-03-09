import { db } from "../db/index.js";
import { Hono } from "hono";
import { urlsTable } from "../db/schema.js";
import { eq } from "drizzle-orm";
import { isValidUrl } from "../lib/index.js";

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
    const { longUrl } = await c.req.json();
    if (!isValidUrl(longUrl)) return c.json({error: "You need to provide a valid url."}, 400)

    const shortId = crypto.randomUUID();
    const shortUrl = `${process.env.BASE_URL || "http://localhost:3000"}/${shortId}`;

    const [newUrl] = await db.insert(urlsTable).values({ longUrl, shortId, shortUrl }).returning();

    return c.json(newUrl);
});

urlsRoute.get("/:shortId", async (c) => {
    const shortId = c.req.param("shortId")
    const url = await db.query.urlsTable.findFirst({
        where: eq(urlsTable.shortId, shortId)
    })

    if (!!url) return c.redirect(url.longUrl)
    return c.json({error: "URL not found"}, 404)
    
})
export default urlsRoute