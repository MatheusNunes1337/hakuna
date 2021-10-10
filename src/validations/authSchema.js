const yup = require('yup')

const loginSchema = yup.object({
    username: yup.string().required().min(6).max(12).strict(),
    password: yup.string().required().min(6).max(12).strict()
})

export default loginSchema