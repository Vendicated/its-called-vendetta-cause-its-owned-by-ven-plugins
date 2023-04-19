import { findByNameAll, findByProps } from "@vendetta/metro";
import { url as URLOpener } from "@vendetta/metro/common";
import { after } from "@vendetta/patcher";

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
        visit(root);
    }
}

// WHY DOES DISCORD HAVE TWO OF THESE IM GONNA EXPLODE
for (const UserProfile of findByNameAll("BioText", false)) {
    const up = after("default", UserProfile, (args, res) => {
        if (!res?.props?.children) return;

        walkReactTree(res, node => {
            if (node.props?.accessibilityRole === "link") {
                const url = node.props.children?.[0];
                if (typeof url !== "string") return;

                node.props.onPress = () => {
                    URLOpener.openURL(url);
                    findByProps("hideActionSheet").hideActionSheet();
                };
            }
        });
    });
    ups.push(up);
}

export const onUnload = () => ups.forEach(up => up());
