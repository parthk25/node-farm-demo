const http = require('http')
const { readFileSync } = require('fs')
const url = require('url')
const server = http.createServer((req, res) => {

    const urldata = url.parse(req.url, true)    
    const pathname = urldata.pathname

    const data = readFileSync('./data.json', 'utf-8')
    const jsonConvert = JSON.parse(data)

    if (pathname == "/") {
        let store = ""
        let org = ""
        for (i = 0; i < jsonConvert.length; i++) {
            if (jsonConvert[i].organic == true) {
                org = "organic!"
            } else {
                org = ""
            }
            const data1 = readFileSync('./farm.html', 'utf-8')
            store = store + data1.replace('<%%emoji%%>', jsonConvert[i].image).replace('<%%name%%>', jsonConvert[i].productName).replace('<%%qual%%>', org).replace('<%%qua%%>', jsonConvert[i].quantity).replace('<%%rate%%>', jsonConvert[i].price)
                .replace("<%%id%%>", i)
        }
        const data2 = readFileSync('./overview.html', 'utf-8')
            .replace('<%%farm%%>', store)

        res.write(data2)
    } else if (pathname == "/product") {

        let index = urldata.query.id

        if (index < jsonConvert.length) {
            store2 = readFileSync('./product.html', 'utf-8')
            .replace('<%%img1%%>', jsonConvert[index].image)
            .replace('<%%img2%%>', jsonConvert[index].image)
            .replace('<%%img3%%>', jsonConvert[index].image)
            .replace('<%%img4%%>', jsonConvert[index].image)
            .replace('<%%img5%%>', jsonConvert[index].image)
            .replace('<%%img6%%>', jsonConvert[index].image)
            .replace('<%%img7%%>', jsonConvert[index].image)
            .replace('<%%img8%%>', jsonConvert[index].image)
            .replace('<%%img9%%>', jsonConvert[index].image)
            .replace('<%%name%%>', jsonConvert[index].productName)
            .replace('<%%from%%>', jsonConvert[index].from)
            .replace('<%%nut%%>', jsonConvert[index].nutrients)
            .replace('<%%qua%%>', jsonConvert[index].quantity)
            .replace('<%%price%%>', jsonConvert[index].price)
            .replace('<%%price%%>', jsonConvert[index].price)
            .replace('<%%desc%%>', jsonConvert[index].description)
            res.write(store2)
        } else {    
            res.write("ERROR 404")
        }
    }

    res.end()
})
server.listen(3000)