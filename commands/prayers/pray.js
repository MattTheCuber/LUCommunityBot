const { MessageEmbed, MessageButton, MessageActionRow } = require('discord.js');
const https = require('https');

//get a request
async function getRequest(offset = 0){
	
	return new Promise(resolve=>{
		const pageOpt = {
			hostname: 'www.liberty.edu',
			port: 443,
			path: '/is-prayer-api/GET_PUBLIC_REQUESTS?size=1&offset=' + offset,
			method: 'GET'
		}
		const pReq = https.request(pageOpt, res=>{
			let data = '';
			res.on('data', d=>{
				data += d;
			});
			res.on('end', ()=>{
				resolve(JSON.parse(data));
			});
		})
		pReq.end()
	});
}

async function run(client, interaction) {
	
	const row = new MessageActionRow()
		.addComponents(new MessageButton()
			.setCustomId('last')
			.setLabel('Previous')
			.setStyle('SECONDARY'))
		.addComponents(new MessageButton()
			.setCustomId('next')
			.setLabel("Next")
			.setStyle("SUCCESS"))
		.addComponents(new MessageButton()
			.setURL("https://www.liberty.edu/prayer-request/")
			.setLabel("Visit Site")
			.setStyle("LINK"))
	
	await interaction.reply({content:"Fetching prayer request..."});
	
	let offset = 0;
	
	async function nextRequest(interaction){
		
		if(interaction.customId === 'next') offset++;
		if(interaction.customId === 'last') offset--;
		
		if(offset >= 0){
			const data = await getRequest(offset);
			const requestName = data.records[0].name, requestData = data.records[0].request;
			const update = new MessageEmbed()
				.setAuthor(requestName)
				.setDescription(requestData);
			await interaction.editReply({embeds:[update], components: [row], content:"From " + data.records[0].requestedDate});
		} else offset = 0;
		
		const message = await interaction.fetchReply();
	
		//buttons
		const filter = async (i) => {
			await i.deferUpdate().catch(console.error);
			return i.user.id === interaction.user.id;
		};

		const result = await message.awaitMessageComponent({ filter, time: 240000 })
			.then(nextRequest).catch((err) => {
				if (!err.toString().includes('reason: time')) console.log(err);
			});
	}
	
	await nextRequest(interaction);
}

module.exports = {
  name: 'pray',
  id: '883095123443986462',
  run,
};
