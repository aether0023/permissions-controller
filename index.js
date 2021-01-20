const protectorClient = require("./Client");
const { TOKEN, VOICE_CHANNEL, BOT_ROLES, SERVER_ID } = require("./configurations.json").DEFAULTS;
const { ALWAYS_CHECK, PERMISSIONS_CHECK_ON_ROLEUPDATE } = require("./configurations.json").SETTINGS; 
const client = new protectorClient(TOKEN);

client.on("ready", async () => {
    client.user.setPresence({ activity: { name: "Aetherxrd", type: "WATCHING" }, status: "dnd" });
    if (client.channels.cache.has(VOICE_CHANNEL)) client.channels.cache.get(VOICE_CHANNEL).join().catch();
    setInterval(async () => {
        if (ALWAYS_CHECK === false) return;
        else checkPermissions(); 
    }, 30000);
});

client.on("roleUpdate", async (oldRole, newRole) => {
    let array = BOT_ROLES || [];
    if (array.some(x => x.includes(oldRole.id))) {
       let fetchProcess = await array.find(x => x === oldRole.id);
       let changedRole = oldRole.guild.roles.cache.get(fetchProcess);
       if (!changedRole.editable) return;
       else changedRole.setPermissions(8);
    };
});

async function checkPermissions() {
    let Guild = client.guilds.cache.get(SERVER_ID);
    BOT_ROLES.forEach(async (value, index) => {
        setTimeout(async () => {
            if (PERMISSIONS_CHECK_ON_ROLEUPDATE === false) return;
            let rol = Guild.roles.cache.get(value);
            if (!rol || !rol.editable) return;
            else rol.setPermissions(8);
        }, index*1750);
    });
};

client.login(client.token).then(console.log("Bot başarılı bir şekilde aktif edildi.")).catch(e => console.error(e));