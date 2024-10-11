import { Client, Invite } from "discord.js";
import { db } from "../../../db";

export = async (client: Client, invite: Invite) => {
	if (!invite.inviterId || !invite.guild) return;

	try {
		var inviteCodes = await db.inviteCode.findMany({
			where: {
				guildId: invite.guild.id
			}
		});
	} catch (e) {
		console.error(e);
		return;
	}
	if (!inviteCodes || inviteCodes.length < 1) return;

	// update expired list

	// check differnece in invite code uses to find user

	// update prisma invite counts
};
