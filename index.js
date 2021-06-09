'use-strict'

const fs = require("fs");
const http = require("http");
const requests = require("requests");

const homepage = fs.readFileSync("index.html", "utf-8");

const repData = (tempVal, orgVal) =>{
  let tempareture = tempVal.replace("{%temp%}", orgVal.main.temp);
  tempareture = tempareture.replace("{%temp_max%}", orgVal.main.temp_max)
  tempareture = tempareture.replace("{%temp_min%}", orgVal.main.temp_min)
  tempareture = tempareture.replace("{%location%}", orgVal.name)
  tempareture = tempareture.replace("{%country%}", orgVal.sys.country)

  return tempareture;
}

http.createServer((req, res) =>{
if(req.url == '/'){
    requests("https://api.openweathermap.org/data/2.5/weather?q=bogra&units=metric&appid=afa6a92c9ae3e721d26bad39b3de05c2")
    .on("data", function(chunk){
        const objData = JSON.parse(chunk);
        const arrData = [objData]
        // console.log(arr[0].main)
        // fs.writeFile("weather.txt", chunk, (err) =>{
        //     if(err) throw err;
        //     console.log("File updated")
        // })
       const realData =  arrData.map((val) => repData(homepage, val) ).join("")
       res.write(realData)
  
    })
    .on("end", (err) =>{
        res.end()
    })
     
} 
else{
    res.writeHead(404, { 'Content-Type': 'text/html' })
    res.write("<h3>404! not found</h3>");
}
}).listen(8000)