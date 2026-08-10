import {test as base} from '@playwright/test'

let counter = 0

const test = base.extend({
    counterFixture : [async({}, use)=>{
        counter++
        await use(counter)
    },
    {scope:'test'}
]
})

//scope=worker and --workers=1 --> 1,1,1
//scope=worker and nothing --> 1,1,1
//scope=test and workers=1 --> 1,2,3
//scope=test and nothing --> 1,1,1

test("Test 1",async({counterFixture})=>{
    console.log(`Test 1 counter: ${counter}`)
})

test("Test 2",async({counterFixture})=>{
    console.log(`Test 2 counter: ${counter}`)
})

test("Test 3",async({counterFixture})=>{
    console.log(`Test 3 counter: ${counter}`)
})