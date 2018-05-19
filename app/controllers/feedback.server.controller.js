const feedback = require('mongoose').model('Feedback');
const User = require('mongoose').model('User');

exports.create = function (req, res) {

    var user = new feedback(req.body);

    user.save(err => {
        if (err) {
            // Call the next middleware with an error message
            return next(err);
        } else {
            req.user = user;
            //parse it to a JSON object
            var jsonUser = JSON.parse(JSON.stringify(user));
            console.log(jsonUser.feedback)
            res.render('thankyou', {
                title: 'Thank You',
                fullName: user.fullName,
                feedback: jsonUser.feedback
            });
        }
    });
};

exports.read = function (req, res) {
    // Use the 'response' object to send a JSON response
    res.json(req.user);
};

exports.list = function (req, res) {
    var session = req.session;
    var email = session.email;
    console.log(uemail);
    if (email === "admin@feedback.com") {
        User.findOne({
            email: 'admin@feedback.com'
        }, (err, user) => {
            if (err) {
                // Call the next middleware with an error message
                return next(err);
            } else {
                // Set the 'req.user' property
                feedback.find({}, (err, feedbacks) => {
                    if (err) {
                        // Call the next middleware with an error message
                        return next(err);
                    } else {
                        // Use the 'response' object to send a JSON response
                        res.render('viewcustomerfeedback', {
                            title: 'List All Users',
                            feedbacks: feedbacks
                        });
                    }
                });
            }

        });
    }
    else {
        res.render('index', { title: 'Login' });
    }
};