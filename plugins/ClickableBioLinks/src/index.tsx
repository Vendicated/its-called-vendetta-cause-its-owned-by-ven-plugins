import { findByNameAll, findByProps } from "@vendetta/metro";
import { ReactNative, url as URLOpener, clipboard } from "@vendetta/metro/common";
import { after } from "@vendetta/patcher";
import { storage } from "@vendetta/plugin";
import { getAssetIDByName } from "@vendetta/ui/assets";
import { showToast } from "@vendetta/ui/toasts";

function lazy<T>(fn: () => T) {
    let v: T;
    return () => (v ??= fn());
}

const findActionShitter = lazy(() => findByProps("hideActionSheet"));
const findClipboardAsset = lazy(() => getAssetIDByName("ic_message_copy"));

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
    const up = after("default", BioText, ([props], res) => {
        if (!res?.props?.children) return;

        // make bio text selectable
        res.props.selectable = true;

        walkReactTree(res, node => {
            if (node.props?.accessibilityRole === "link") {
                const url = node.props.children?.[0];
                if (typeof url !== "string") return;

                node.props.onPress = () => {
                    URLOpener.openURL(url);
                    if (storage.dismiss !== false) findActionShitter().hideActionSheet();
                };
            }
        });

        return;
        // explode
        return (
            <ReactNative.Pressable
                onLongPress={() => {
                    clipboard.setString(props.bio);
                    showToast("Copied bio to clipboard", findClipboardAsset());
                }}
            >
                {res}
            </ReactNative.Pressable>
        );
    });

    ups.push(up);
}

export const onUnload = () => ups.forEach(up => up());

export { default as settings } from "./settings";
