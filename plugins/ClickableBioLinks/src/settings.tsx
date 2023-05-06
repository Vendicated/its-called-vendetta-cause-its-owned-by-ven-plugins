import { storage } from "@vendetta/plugin";
import { useProxy } from "@vendetta/storage";
import { Forms } from "@vendetta/ui/components";

export default function Settings() {
    useProxy(storage);

    return (
        <Forms.FormSwitchRow
            label="Dismiss ActionSheet"
            subLabel="Close the profile when clicking a link"
            value={storage.dismiss ?? true}
            onValueChange={v => storage.dismiss = v}
            note=""
        />
    );
}
