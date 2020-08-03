const ig=require('./instagram');

(async()=>{

  await ig.initialize();
  await ig.login('to_chat_with_you_','9000909138n','shraddhakapoor');
  await ig.likeprocess(5)
  debugger;
})()