class LoginPage{
    /**
     * @param {import('@playwright/test').Page} page
    */
    constructor(page){
        this.page = page
        this.emailField = page.getByRole('textbox',{name:'Email'})
        this.passwordField = page.getByRole('textbox',{name:'Password'})
        this.signInButton = page.getByRole('button',{name:'Sign in'})
    }

    async goTo(){
        await this.page.goto('https://binaryville.com/account/')
    }

    async login(email,password){
        await this.emailField.fill(email)
        await this.passwordField.fill(password)
        await this.signInButton.click()
    }
}

module.exports = {LoginPage}