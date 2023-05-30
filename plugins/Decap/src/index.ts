import { findByProps } from "@vendetta/metro";
import { decap } from "./decap";
import { before, unpatchAll } from "~/shared/vendetta-wrappers";

function doDecap(msg?: { content?: string }) {
    if (msg?.content) {
        msg.content = decap(msg.content);
    }
}

before("sendMessage", findByProps("editMessage", "sendMessage"), args => void doDecap(args[1]));

before("uploadLocalFiles", findByProps("uploadLocalFiles"), args => void doDecap(args[0].parsedMessage));

export const onUnload = () => unpatchAll();
