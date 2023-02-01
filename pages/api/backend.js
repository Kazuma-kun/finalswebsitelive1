const mysql = require("mysql2")

// POST request ( adding data to database)
export default async function handler(req, res) {
    if (req.method === "POST") {
        const { firstname ,lastname, email, phonenumber, address, choices, reason} = req?.body;

        console.log("Req Payload: ", req.body);


        const dbconnection = mysql.createConnection({
            host: "localhost" ,
            user: "root",
            password: "1234",
            database: "webapp1",
        });
        const sqlInsert = "INSERT INTO finalswebsitealpha (firstname, lastname, email, phonenumber, address, choices, reason) VALUES (?, ?, ?, ?, ?, ?, ?)";
        dbconnection.query(sqlInsert, [firstname ,lastname, email, phonenumber, address, choices, reason], (err) => {
                            console.log(err);});
                            return res.end();
}}