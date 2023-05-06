import { findByNameAll, findByProps } from "@vendetta/metro";
import { url as URLOpener } from "@vendetta/metro/common";
import { after } from "@vendetta/patcher";
import { storage } from "@vendetta/plugin";

const ActionShitter = findByProps("hideActionSheet");
const ups = [];

function walkReactTree(root: any, visit: (node: any) => void) {
    if (!root) return;

    visit(root);
    if (!root?.props?.children) return;

    if (Array.isArray(root.props.children)) {
        for (const child of root.props.children) {
            walkReactTree(child, visit);
        }
    } else {
        walkReactTree(root.props.children, visit);
    }
}

// WHY DOES DISCORD HAVE TWO OF THESE IM GONNA EXPLODE
for (const BioText of findByNameAll("BioText", false)) {
    const up = after("default", BioText, (_, res) => {
        if (!res?.props?.children) return;

        walkReactTree(res, node => {
            if (node.props?.accessibilityRole === "link") {
                const url = node.props.children?.[0];
                if (typeof url !== "string") return;

                node.props.onPress = () => {
                    URLOpener.openURL(url);
                    if (storage.dismiss !== false)
                        ActionShitter.hideActionSheet();
                };
            }
        });
    });

    ups.push(up);
}

export const onUnload = () => ups.forEach(up => up());

export { default as settings } from "./settings";
