const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");
const cors = require("cors");
const app = express();

app.use(cors());
// try getting the author
const getIEEEBlogs = async () => {
    try {
        let ieeeBlogs = [];
        const response = await axios.get("https://ieee.nitk.ac.in/blog/");
        const $ = cheerio.load(response.data);
        // https://ieee.nitk.ac.in/
        const cards = [...$('.card')];
        for (let i = 0; i < 5; i++) {
            cards[i].children.forEach(child => {
                if (child.name && child.name === "article") {
                    let link = "", title = "", body = "";
                    child.children.forEach((c) => {
                        if (c.name && c.name === "h2") {
                            link = "https://ieee.nitk.ac.in/"+c.children[1].attribs.href;
                            title = c.children[1].children[0].data;
                        }

                        if (c.name && c.name === "p" && !c.attribs?.class) {
                            body = c.children[0].data.trim();
                        }
                    })
                    const newBlog = {
                        from: "IEEE",
                        link,
                        title,
                        body
                    }
                    ieeeBlogs.push(newBlog);
                }
            });
        }

        return ieeeBlogs;

    } catch (e) {
        console.log(e);
        throw Error();
    }
}

// get author
const getIRISBlogs = async () => {
    try {
        let irisBlogs = [];

        const response = await axios.get("https://blog.iris.nitk.ac.in/");
        const $ = cheerio.load(response.data);

        const posts = [...$(".post")];
        // console.log(posts[0].children[9].children[1].children[0].data); // body
        // console.log(posts[0].children[1].attribs.href); // link
        // console.log(posts[0].children[6].children[1].children[0].children[0].data);// title

        for (let i = 0; i < 6; i++) {
            if (posts[i].children[1].attribs.href) {
                const newPost = {
                    from: "IRIS",
                    title: posts[i].children[6].children[1].children[0].children[0].data,
                    link: posts[i].children[1].attribs.href,
                    body: posts[i].children[9].children[1].children[0].data,
                };

                irisBlogs.push(newPost);
            }
        }

        return irisBlogs;
    } catch (e) {
        throw Error();
    }
}

app.get('/api/blogs/', async (req, res) => {
    try {
        const ieeeBlogs = await getIEEEBlogs();
        const irisBlogs = await getIRISBlogs();

        const blogs = [...ieeeBlogs, ...irisBlogs];
        res.status(200).json(blogs);
    } catch (e) {
        console.log(e);
        res.status(400).json({
            message: "Could not fetch blogs. Please try again"
        });
    }
});

app.listen(5000, () => {
    console.log("Server is running on PORT 3000");
})