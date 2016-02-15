(() => {
    "use strict";

    let express = require("express");
    let path = require("path");
    let app = express();
    // let log = require("morgan");

    let port = process.env.port || 9999;

    app.get("/", (req, res) => {
        res.sendFile(path.join(__dirname + "/wwwroot/index.html"));
    });

    app.use("/node_modules", express.static(__dirname + "/node_modules"));

    app.listen(port, () => {
        console.log(`Listening on http://localhost:${port}`);
    });

})();