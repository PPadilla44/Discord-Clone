const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

UserSchema.pre('save', function(next) {
    bcrypt.hash(this.password, 10)
        .then(hash => {
        this.password = hash;
        next();
    });
});

const UserSchema = new mongoose.Schema({
    firstName: { 
	type: String,
	required : [true, "first name is required!"],
	minlength: [3, "first name must be at least 3 characters long"]
    },
    lastName: { 
        type: String,
        required : [true, "last name is required!"],
        minlength: [3, "last name must be at least 3 characters long"]
        },
	email: { 
		type: String,
		required : [true, "email is required!"],
	},
    validate: {
        validator: val => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val),
        message: "Please enter a valid email"
    },
}, { timestamps: true });

// add this after UserSchema is defined
UserSchema.virtual('confirmPassword')
    .get( () => this._confirmPassword )
    .set( value => this._confirmPassword = value );

UserSchema.pre('validate', function(next) {
    if (this.password !== this.confirmPassword) {
        this.invalidate('confirmPassword', 'Password must match confirm password');
    }
    next();
});

module.exports.User = mongoose.model('User', UserSchema);
