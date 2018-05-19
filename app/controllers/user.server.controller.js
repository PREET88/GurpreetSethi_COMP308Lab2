const User = require('mongoose').model('User');
const Feedback = require('mongoose').model('Feedback');

exports.create = function (req, res, next) {
    var user = new User(req.body);
    console.log("email: " + req.body.email);
    // Use the 'User' instance's 'save' method to save a new user document
    user.save(function (err) {
        if (err) {
            // Call the next middleware with an error message
            return next(err);
        } else {
            // Use the 'response' object to send a JSON response
            res.json(user);

        }
    });
};

exports.read = function (req, res) {
    res.json(req.user);
};

exports.userByUsername = function (req, res, next) {
    var email = req.body.email;
    var session = req.session;
    var password = req.body.password;
    console.log("user.server.controller email: " + email);
    User.findOne({
        email: email, //finding a document by username
        password: password
    }, (err, user) => {
        if (err) {
            // Call the next middleware with an error message
            return next(err);
        } else {
            // Set the 'req.user' property
            req.user = user;
            //parse it to a JSON object
            var jsonUser = JSON.parse(JSON.stringify(user));
            session.email = jsonUser.email;
            console.log(jsonUser);

            //display feedback page
            res.render('feedback', {
                title: 'User Feedback',
                firstName: jsonUser.firstName,
                lastName: jsonUser.lastName,
                email: jsonUser.email,
                favouriteSport: jsonUser.favouriteSport,
                skill: jsonUser.skill,
            });

            // Call the next middleware
            next();
        }
    });
};