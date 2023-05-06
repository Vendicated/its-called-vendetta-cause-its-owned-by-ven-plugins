import { findByName } from "@vendetta/metro";
import { ReactNative } from "@vendetta/metro/common";
import { after, before } from "@vendetta/patcher";

// explode commands & threads
const up = after("default", findByName("MediaKeyboardHeader", false), (_, res) => {
    res.props.children.splice(-2);
});

/* explode
after("render", ReactNative.ScrollView, (_, res) => {
    console.log(res.props.accessibilityLabel);
    if (res.props.accessibilityLabel !== "Media Selector") return;

    res.props.style.height = 1200;
    res.props.chunkBase = 1200;
});
*/

export const onUnload = () => up();
