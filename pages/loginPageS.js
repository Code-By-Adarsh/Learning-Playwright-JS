class LoginPage{
    /**
     * @param {import('@playwright/test').Page} page
    */
    constructor(page){
        this.page = page
        this.usernameField = page.getByRole('textbox',{name:'Username'})
        this.passwordField = page.getByRole('textbox',{name:'Password'})
        this.loginButton = page.getByRole('button',{name:'Login'})
    }

    async goTo(){
        this.page.goto('https://www.saucedemo.com/')
    }

    async login(username){
        await this.usernameField.fill(username)
        await this.passwordField.fill('secret_sauce')
        await this.loginButton.click()
    }
}

module.exports = {LoginPage}