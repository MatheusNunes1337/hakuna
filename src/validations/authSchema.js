const yup = require('yup')

const loginSchema = yup.object({
    username: yup.string().required().min(6).max(12).strict(),
    password: yup.string().required().min(6).max(12).strict()
})

const registerSchema = yup.object({
    username: yup.string().required().min(6).max(12).strict(),
    email: yup.string().required().max(60).strict(),
    password: yup.string().required().min(6).max(12).strict(),
    type: yup.string().required().strict(),
    area: yup.string().when('type', (type, schema) => {
        if(type !== 'teacher'){
            return schema;
        } else{
            return schema.required();
        }
    })
})

export {loginSchema, registerSchema }