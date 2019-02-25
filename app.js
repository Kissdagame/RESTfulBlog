//imported dependencies  for project 
const express = require("express"),
    app = express(),
    mongoose = require("mongoose"),
    bodyParser = require("body-parser"),
    methodOverride = require("method-override");

// App Config
//connects to the mongodb server 
mongoose.connect("mongodb://localhost/restful_blog_app", { useNewUrlParser: true });
//telling express to use body-parser
app.use(bodyParser.urlencoded({ extended: true }));
// allows ejs file to work without needing the file ext
app.set("view engine", "ejs");

app.use(express.static("public"));
//allows the app to use the methodOverride
app.use(methodOverride("_method"));

// Mongoose/Model config
const blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: { type: Date, default: Date.now }
});

const Blog = mongoose.model("Blog", blogSchema);

// RESTFUL Routes
app.get("/", (req, res) => {
    res.redirect("/blogs");
});

// index route
app.get("/blogs", (req, res) => {
    Blog.find({}, (err, blogs) => {
        if (err) {
            console.log("ERROR");
        } else {
            res.render("index", { blogs: blogs });
        }
    });
});

// New Route
app.get("/blogs/new", (req, res) => {
    res.render("new");
});

// Create Route
app.post("/blogs", (req, res) => {
    // Create Blogs
    Blog.create(req.body.blog, (err, newBlog) => {
        if (err) {
            res.render("new");
        } else {
            // Redirect to index
            res.redirect("/blogs");
        }
    });

});

// Show Route
app.get("/blogs/:id", (req, res) => {
    Blog.findById(req.params.id, (err, foundBlog) => {
        if (err) {
            res.redirect("/blogs");
        } else {
            res.render("show", { blog: foundBlog });
        }
    });
});

// EDIT Route
app.get("/blogs/:id/edit", (req, res) => {
    Blog.findById(req.params.id, (err, foundBlog) => {
        if (err) {
            res.redirect("/blogs");
        } else {
            res.render("edit", { blog: foundBlog });
        }
    });
});

// Update Route
app.put("/blogs/:id", (req, res) => {
    Blog.findByIdAndUpdate(req.params.id, req.body.blog, (err, updatedBlog) => {
        if (err) {
            res.redirect("/blogs");
        } else {
            res.redirect("/blogs/" + req.params.id);
        }
    });
});


//starts sever for the blog app
app.listen(3000, () => {
    console.log("Blog app sever started");
});