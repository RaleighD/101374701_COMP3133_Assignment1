const User = require('../models/UserModel'); // Adjusted to UserModel as per provided code
const Employee = require('../models/EmployeeModel');
require('dotenv').config();

// // Generating jwt token
// const generateToken = (user) => {
//     return jwt.sign({
//         id: user.id,
//         username: user.username,
//         email: user.email,
//     }, process.env.JWT_SECRET, { expiresIn: '1h' });
// };

const resolvers = {
    Query: {
        //login function
        async login(_, { credentials }) {
            const { username, email, password } = credentials;
            const user = username
                ? await User.findOne({ username })
                : await User.findOne({ email });

            if (!user || user.password !== password) {
                throw new Error('Invalid credentials');
            }
            return user.toObject();
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
        //signup function
        async signup(_, { input }) {
            const { username, email, password } = input;

            // Directly use the provided password
            const newUser = new User({
                username,
                email,
                password,
            });

            const result = await newUser.save();

            return result.toObject();
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
