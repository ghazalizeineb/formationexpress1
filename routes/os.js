var express = require("express");
var router = express.Router();
const osController = require("../Controllers/osController");
/* GET home page. */
router.get("/os",osController.getOSInformations)

router.get("/osCpus",osController.getosCpus)

router.get("/osCpusById/:id",osController.getosCpusByID)  //os/osCpusById


module.exports = router;
