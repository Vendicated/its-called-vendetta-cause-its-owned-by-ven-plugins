import { findByProps } from "@vendetta/metro";
import { before } from "@vendetta/patcher";
import { decap } from "./decap";

const ups = [];

function bef(obj: any, name: string, cb: (args: any[]) => any) {
    ups.push(before(name, obj, cb));
}

const doDecap = (msg?: { content?: string }) => msg?.content && (msg.content = decap(msg.content));

bef(findByProps("editMessage", "sendMessage"), "sendMessage", args => doDecap(args[1]));

bef(findByProps("uploadLocalFiles"), "uploadLocalFiles", args => doDecap(args[0].parsedMessage));

export const onUnload = () => ups.forEach(up => up());
