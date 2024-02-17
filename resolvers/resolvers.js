const User = require('../models/UserModel'); // Adjusted to UserModel as per provided code
const Employee = require('../models/EmployeeModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Generating jwt token
const generateToken = (user) => {
    return jwt.sign({
        id: user.id,
        username: user.username,
        email: user.email,
    }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

const resolvers = {
    Query: {
        //login function
        async login(_, { credentials }) {
            const { username, email, password } = credentials;
            const userQuery = username ? { username } : { email };
            const user = await User.findOne(userQuery);

            if (!user || !(await bcrypt.compare(password, user.password))) {
                throw new Error('Invalid credentials');
            }

            const token = generateToken(user);
            return { ...user.toObject(), token };
        },
        //get all employees
        async getAllEmployees() {
            return await Employee.find({});
        },
        //search employee by id
        async searchEmployeeById(_, { id }) {
            return await Employee.findById(id);
        },
    },
    Mutation: {
        //signup function to creat user
        async signup(_, { input }) {
            const { username, email, password } = input;
            const hashedPassword = await bcrypt.hash(password, 12);
            const newUser = new User({
                username,
                email,
                password: hashedPassword,
            });

            const result = await newUser.save();
            const token = generateToken(result);
            return { ...result.toObject(), token };
        },

        //add new employee
        async addNewEmployee(_, { input }) {
            const newEmployee = new Employee(input);
            return await newEmployee.save();
        },
        //update employee info
        async updateEmployeeInfo(_, { id, input }) {
            return await Employee.findByIdAndUpdate(id, input, { new: true });
        },
        async deleteEmployee(_, { id }) {
            await Employee.findByIdAndDelete(id);
            return "Employee deleted successfully";
        },
    },
};

module.exports = resolvers;
