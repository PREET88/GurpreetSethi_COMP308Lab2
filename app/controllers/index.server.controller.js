exports.render = function (request, response) {

    response.render('index', { title: 'Index' });
}
exports.renderSignup = function (req, res) {
    res.render('signup', {
        title: 'Add User'
    });
};