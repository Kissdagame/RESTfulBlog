//imported dependencies  for project 
const express = require("express"),
    app = express(),
    mongoose = require("mongoose"),
    bodyParser = require("body-parser");

// App Config
//connects to the mongodb server 
mongoose.connect("mongodb://localhost/restful_blog_app", { useNewUrlParser: true });
//telling express to use body-parser
app.use(bodyParser.urlencoded({ extended: true }));
// allows ejs file to work without needing the file ext
app.set("view engine", "ejs");
app.use(express.static("public"));

// Mongoose/Model config
const blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    create: { type: Date, default: Date.now }
});

const Blog = mongoose.model("Blog", blogSchema);

// RESTFUL Routes
app.get("/", (req, res) => {
    res.render("/blogs");
});


app.get("/blogs", (req, res) => {
    Blog.find({}, (err, blogs) => {
        if (err) {
            console.log("ERROR");
        } else {
            res.render("index", { blogs: blogs });
        }
    });
});



//starts sever for the blog app
app.listen(3000, () => {
    console.log("Blog app sever started");
});