import { icp_adv_fourth } from "../../declarations/icp_adv_fourth";
import { Actor, HttpAgent } from "@dfinity/agent";
import { AuthClient } from "@dfinity/auth-client";
import { renderIndex } from "./views";

const init = async () => {
    const authClient = await AuthClient.create();
    if (await authClient.isAuthenticated()) {
        handleAuthenticated(authClient);
    }
    await renderIndex();
    const loginButton = document.getElementById("loginButton");
    console.log(loginButton);
    loginButton.onclick = async () => {
        await authClient.login({
            onSuccess: async () => {
                handleAuthenticated(authClient);
            },
        });
    };
};

async function handleAuthenticated(authClient) {
    const identity = await authClient.getIdentity();
    const agent = new HttpAgent({ identity });
    console.log(process.env.CANISTER_ID);
    const whoami_actor = Actor.createActor<_SERVICE>(idlFactory, {
      agent,
      canisterId: process.env.CANISTER_ID,
    });
    renderLoggedIn(whoami_actor, authClient);
}

init();