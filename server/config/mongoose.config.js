const mongoose = require('mongoose');
mongoose.set('runValidators', true);
//sets db being used "using crmdb"
mongoose.connect("mongodb://localhost/fakeassdiscord", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})
    .then(() => console.log("Established a connection to the database"))
    .catch(err => console.log("Something went wrong when connecting to the database", err));