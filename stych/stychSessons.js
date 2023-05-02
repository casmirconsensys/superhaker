const sytch = require('stych')

const client = new sytch.client ({
    project_id: "PROJECT_ID",
    secret: "SECRET",
    env: sytch.env.production,
});

//Replace w/Token from Request
const token = "SeiGwd..."

client.magicLinks.authenticate(token, {seesion_duration_minutes: 43200}).then(magicLinkAuthRep=>{
    console.log(magicLinkAuthResp)
})
.catch(err=>{
    console.log(err)
});

client.sessions.authenticate(sessionToken "mZay...").then(sessionAuthResp=>{consoleAuthResp}).catch(err => {console.log(err)});
