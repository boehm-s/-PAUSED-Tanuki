// you can import your models here

function test1(req, res, next) {
    req.test = "un premier test est passé par là !\n";
    next();
}

function test2(req, res, next) {
    req.test += "Et un second par ici :) ...";
    res.json({test: req.test});
}

export default {test1, test2};
