function Login() {
    return (
        <>
            <div className="login__container">
                <form action="" className="login__form">
                    <h2 className="login__form__title">login</h2>
                    <label htmlFor="username" className="login__form__label">Username:</label>
                    <input type="text" className="login__form__input" />
                    <label htmlFor="username" className="login__form__label">Password:</label>
                    <input type="password" className="login__form__input" />
                    <button className="login__form__button">Login</button>
                </form>
            </div>
        </>
    )
}

export default Login