const z = require('zod');

const feedBackBody = z.object({
    userName: z.string().min(1, { message: 'userName is empty or invalid'}),
    email: z.string().email({ message: 'Email is empty or invalid'}),
    category: z.string().optional(),
    feedback: z.string().min(1, { message: 'Feedback is empty or invalid'}),
}).strict();

module.exports = {
    feedBackBody,
}