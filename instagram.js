const puppeteer = require('puppeteer');

const url='https://instagram.com/'

const instagram = {
    browser: null,
    page:null,

    initialize: async()=>{
        instagram.browser=await puppeteer.launch({headless:false});
        instagram.page = await instagram.browser.newPage();  
        //await instagram.page.goto(url,{waitUntil:"networkidle2"});      
    },
    login : async(username,password,account)=>{
        await instagram.page.goto(url,{waitUntil:"networkidle2"});

        //await instagram.page.waitForNavigation({waitUntil:"networkidle2"});

        await instagram.page.waitFor(2000);
        await instagram.page.type('input[name="username"]',username,{delay:50});
        await instagram.page.type('input[name="password"]',password,{delay:50});

        let loginButton=await instagram.page.$x('//button[contains(.,"Log In")]');
        await loginButton[0].click();

        await instagram.page.waitForNavigation({waitUntil:"networkidle2"});

        let notnow=await instagram.page.$x('//button[contains(.,"Not Now")]');
        await notnow[0].click();

        await instagram.page.goto(url.concat(account),{waitUntil:"networkidle2"});
    },
    likeprocess: async(nposts)=>{
        let posts=await instagram.page.$$('article>div img[decoding="auto"]');
        for(let i=0;i<nposts;i++){
            let post=posts[i];
            await post.click();
            await instagram.page.waitFor(5000);
          let isLikable = await instagram.page.$('button [aria-label="Like"]');
            if(isLikable){
                await instagram.page.click('button [aria-label="Like"]');
            }
             
            await instagram.page.click('button [aria-label="Close"]');
        }
    }
}
module.exports= instagram;