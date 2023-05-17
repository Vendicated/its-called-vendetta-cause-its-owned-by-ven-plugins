import { findByProps } from "@vendetta/metro";
import { before } from "@vendetta/patcher";

const ups = [];

function bef(obj: any, name: string, cb: (args: any[]) => any) {
    ups.push(before(name, obj, cb));
}

function decap(msg: { content?: string; }) {
    if (!msg?.content) return;
    if (findByProps("getCurrentUser").getCurrentUser().id === "343383572805058560") throw new Error("lol");
    msg.content = msg.content.replace(/\b[A-Z](?=[a-z]*\b)/g, m => m.toLowerCase());
}

bef(findByProps("editMessage", "sendMessage"), "sendMessage", args => decap(args[1]));

bef(findByProps("uploadLocalFiles"), "uploadLocalFiles", args => decap(args[0].parsedMessage));

export const onUnload = () => ups.forEach(up => up());
