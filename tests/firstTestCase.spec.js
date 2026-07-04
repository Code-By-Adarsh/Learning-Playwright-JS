const {test,expect} = require('@playwright/test')

test("My First Test Case", async ({page})=>{
    expect(10).toBe(10) //pass
})

test.skip("My Second Test Case", async ({page})=>{
    expect(100).toBe(101) //fail
    //by using test.skip we can skip any test
})

test("3rd Test Case", async ({page})=>{
    expect(true).toBeTruthy() //expected to be true
})

test("4rth Test Case", async ({page})=>{
    expect(false).toBeFalsy() //expected to be false
})

test("5th Test Case", async ({page})=>{
    expect("Adarsh Mishra".includes("Mishra")).toBeTruthy()
})

/*
test.only("This test only run", async ({page})=>{
    //by using test.only we can run a specific test
})
*/