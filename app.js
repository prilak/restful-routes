var express = require("express"),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    app = express();
//app config
mongoose.connect("mongodb://localhost/restful_blog_app");
app.set("view engine", "ejs");
app.use(express.static("public"));
//mongoose/model config
var blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: {type: Date, default: Date.now}
});
var Blog = mongoose.model("Blog", blogSchema);
// Blog.create({
//     title: "filler",
//     image: "filler",
//     body: "what do you know, a filler"
// });
app.get("/", function(req, res) {
    res.redirect("/blogs");
});
//restful apps
//index
app.get("/blogs", function(req, res){
    Blog.find({}, function(err, blogs){
        if(err){
            console.log("error!");
        } else {
            res.render("index", {blogs: blogs});     
        }
    });
});

app.listen(process.env.PORT, process.env.IP, function(){
	console.log("server is running");
});