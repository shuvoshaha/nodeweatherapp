'use-strict'

const fs = require("fs");
const http = require("http");
const requests = require("requests");

const homepage = fs.readFileSync("index.html")

http.createServer((req, res) =>{
if(req.url == '/'){
    requests("https://api.openweathermap.org/data/2.5/weather?q=joypurhat&appid=afa6a92c9ae3e721d26bad39b3de05c2")
    .on("data", function(chunk){
        const objData = JSON.parse(chunk);
        const arr = [objData]
        console.log(arr[0].main)
        fs.writeFile("weather.txt", chunk, (err) =>{
            if(err) throw err;
            console.log("File updated")
        })
        
        
    })
    .on("end", (err) =>{
       console.log(err)
    })
     
} 
else{
    res.writeHead(404, { 'Content-Type': 'text/html' })
    res.write("<h3>404! not found</h3>");
}
}).listen(8000)