import { Client, Invite } from "discord.js";
import { db } from "../../../db";

export = async (client: Client, invite: Invite) => {
	if (!invite.inviterId || !invite.guild) return;

	try {
		var inviteCounts = await db.inviteCounts.findUnique({
			where: {
				userId_guildId: {
					userId: invite.inviterId,
					guildId: invite.guild.id
				}
			}
		});
	} catch (e) {
		console.error(e);
		return;
	}

	if (!inviteCounts) {
		try {
			inviteCounts = await db.inviteCounts.create({
				data: { guildId: invite.guild.id, userId: invite.inviterId }
			});
		} catch (e) {
			console.error(e);
			return;
		}
	}

	await db.inviteCode.create({
		data: {
			code: invite.code,
			guildId: invite.guild.id,
			userId: invite.inviterId,
			counterId: inviteCounts.id,
			expires: invite.expiresAt
		}
	});
};
