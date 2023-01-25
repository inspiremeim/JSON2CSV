const express = require("express");
const app = express();

const request = require("request");

const csvWriterObject = require("csv-writer").createObjectCsvWriter;
const csvWriter = csvWriterObject({
    path: "./JSON2CSV.csv",
    header: ['userId', 'id', 'title', 'body'].map((item) => ({ id: item, title: item }))
});

app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
    let url = "https://jsonplaceholder.typicode.com/posts";

    request(url, (err, response, body) => {
        if (err) {
            res.send("Error occured");
        }
        else {
            //console.log(JSON.parse(body));
            try {
                WriteJson2CSV(body);
                res.send("Write Successfully");
            } catch (error) {
                console.log("Error occured");
            }
        }
    });
});

async function WriteJson2CSV(JsonData) {
    await csvWriter.writeRecords(JSON.parse(JsonData));
}

app.listen(8080, () => {
    console.log("JSON2CSV is listening on port 8080!");
});