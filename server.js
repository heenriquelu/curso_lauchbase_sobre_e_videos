const express = require('express')
const nunjucks = require('nunjucks')

const server = express()
const videos = require("./data")

server.use(express.static('public'))

server.set("view engine", "njk")

nunjucks.configure("views", {
  express: server,
  autoescape: false,
  noCache: true
})

server.get("/", function (req, res) {
  const about = {
    avatar_url: "/images/perfil.jpg",
    name: "Luiz Henrique",
    role: "Desenvolvedor Web",
    description: 'Programador full-stack focado em soluções web. Sócio fundador <a href="http://lhinfoweb.com" target="_blank">LH Info Web',
    links: [
      { name: "Github", url: "https://github.com/heenriquelu" },
      { name: "Email", url: "mailto:contato@lhinfoweb.com" },
      { name: "Linkedin", url: "https://www.linkedin.com/in/luiz-henrique-miranda-malaquias-391b6954/" },
    ]
  }

  return res.render("about", { about })
})

server.get("/portfolio", function (req, res) {
  return res.render("portfolio", { items: videos })
})

server.get("/video", function (req, res) {
  const id = req.query.id

  const video = videos.find(function (video) {
    return video.id == id
  })

  if (!video) {
    return res.send("Video not found!")
  }

  return res.render("video", { item: video })
})

server.use(function (req, res) {
  res.status(404).render("not-found")
})

server.listen(5000, function () {
  console.log("server is running")
})
