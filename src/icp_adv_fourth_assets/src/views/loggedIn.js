import { ActorSubclass } from "@dfinity/agent";
import { AuthClient } from "@dfinity/auth-client";
import { html, render } from "lit-html";
import { renderIndex } from ".";
import { _SERVICE } from "../../../declarations/whoami/whoami.did";

const content = () => html`<div class="container">
  <style>
    #whoami {
      border: 1px solid #1a1a1a;
      margin-bottom: 1rem;
    }
  </style>
  <h1>Internet Identity Client</h1>
  <h2>You are authenticated!</h2>
  <p>To see how a canister views you, click this button!</p>
  <button type="button" id="whoamiButton" class="primary">Who am I?</button>
  <input type="text" readonly id="whoami" placeholder="your Identity" />
  <button id="logout">log out</button>

    <div style="float:left">
        Proposal List:
        <section id="proposals"></section>
        <button id="refresh">refresh proposals</button>
    </div>
</div>`;

export const renderLoggedIn = (actor, authClient) => {
  render(content(), document.getElementById("pageContent"));

  document.getElementById("whoamiButton").onclick = async () => {
    try {
      const response = await actor.whoami();
      console.log(response);
      document.getElementById("whoami").value = response.toString();
    } catch (error) {
      console.error(error);
    }
  };

  document.getElementById("logout").onclick = async () => {
    await authClient.logout();
    renderIndex();
  };

  // 载入提案列表
async function load_proposals() {
    let proposals_section = document.getElementById("proposals");
    var proposals = await icp_adv_fourth.get_proposals();
    console.log(proposals);
    proposals_section.replaceChildren([]);
    for (var i = 0; i< proposals.length; i++) { 
      let proposal = document.createElement("p");
      proposal.innerText = proposals[i].proposal_id 
                          + " : " + proposals[i].proposal_content 
                          + " : " + proposals[i].proposal_maker
                          + " : " + proposals[i].proposal_completed;
      proposals_section.appendChild(proposal)
    }
  }
  
  function load() { 
    let refresh_button = document.getElementById("refresh");
    refresh_button.onclick = load_proposals;
  
    load_proposals();
  }
  
  window.onload = load;
};