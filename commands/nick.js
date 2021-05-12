const { MessageEmbed } = require('discord.js');
const { embedColor } = require('../config.json');

module.exports = {
    name: 'nick',
    description: 'Change user\'s nickname',
    usage: 'nick {@user} {nickname}',
    cooldown: '10',
    guildOnly: true,
    execute (message, args) {
		if (!message.member.hasPermission('MANAGE_NICKNAMES')) return message.channel.send('Error: You have no permission to use this command.');
			const user = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
            const users = message.mentions.users.first();
                if (user.hasPermission('MANAGE_NICKNAMES')) return message.channel.send('Error: This user\'s nickname cannot be changed.');

            const nickname = args.join(' ').slice(22);
                if (!nickname) return message.channel.send('Error: Please provide a valid username.');

            const embed = new MessageEmbed()
                .setTitle('Nickname')
                .setDescription(`**${users.username}**'s nickname successfully changed to **${nickname}**`)
                .setTimestamp()
                .setColor(embedColor);

            message.channel.send(embed).then(user.setNickname(nickname));
        }
    };