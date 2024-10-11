import { Client, Invite } from "discord.js";
import { db } from "../../../db";

export = async (client: Client, invite: Invite) => {
	if (!invite.inviterId || !invite.guild) return;

	await db.inviteCode.delete({ where: { code: invite.code } });
};
