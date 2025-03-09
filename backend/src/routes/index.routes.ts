import { db } from "../db/index.js";
import { Hono } from "hono";
import { urlsTable } from "../db/schema.js";
import { eq, sql } from "drizzle-orm";
import { isValidUrl } from "../lib/index.js";
import { nanoid } from "nanoid"

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

    const shortId = nanoid(6);
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

urlsRoute.get("/history/", async (c) => {
    const urls = await db.select({
        date: sql`strftime('%Y-%m-%d', createdAt)`,
        urls: sql.raw(`json_group_array(json_object(
            'id', id, 'shortId', shortId, 'longUrl', longUrl, 'shortUrl', shortUrl
        ))`).as("urls")
    })
    .from(urlsTable)
    .groupBy(sql`strftime('%Y-%m-%d', createdAt)`);

    return c.json(urls.map((row: any) => ({
        date: row.date,
        urls: JSON.parse(row.urls)
    })));
});

export default urlsRoute