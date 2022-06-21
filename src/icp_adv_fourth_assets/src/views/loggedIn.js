import { icp_adv_fourth } from "../../../declarations/icp_adv_fourth";
import { ActorSubclass } from "@dfinity/agent";
import { AuthClient } from "@dfinity/auth-client";
import { html, render } from "lit-html";
import { renderIndex } from ".";
// import { _SERVICE } from "../../../declarations/whoami/whoami.did";

const content = () => html`<section class="container">

    <h1>Internet Identity Client</h1>
    <h2>You are authenticated!</h2>
    <div>
        <label>Your Identity : </label>
        <label id="whoami"></label>
        <button id="logout" style="float:right">log out</button>
    </div>
    ------------------------------------------------------------------
    <div>
        <H3>Team Member List:</H3>
        <section id="members"></section>
        <!--<button id="refresh_canister">refresh canisters</button>-->
    </div>
    ------------------------------------------------------------------
    <div>
        <p>
            <H3>Canister List:</H3>
            <button id="refresh_canister" style="float:right">refresh canisters</button>
        </p>
        <section id="canisters"></section>
    </div>
    ------------------------------------------------------------------
    <div>
        <p>
            <H3>Proposal List:</H3>
            <button id="refresh_proposal" style="float:right">refresh proposals</button>
        </p>
        <section id="proposals"></section>
    </div>
</section>`;

export const renderLoggedIn = (actor, authClient) => {
    render(content(), document.getElementById("pageContent"));

    //载入调用者identity
    async function load_identity() {
        try {
            const response = await actor.whoami();
            console.log("identity :" + response);
            document.getElementById("whoami").innerHTML = response.toString();
        } catch (error) {
            console.error(error);
        };
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
        var table = document.createElement("table");
        table.border = 1;
        add_tr("proposal_id", proposals[i]["proposal_id"], table);
        add_tr("proposal_content", proposals[i]["proposal_content"], table);
        add_tr("proposal_maker", proposals[i]["proposal_maker"], table);
        add_tr("proposal_approvers", proposals[i]["proposal_approvers"], table);
        add_tr("proposal_completed", proposals[i]["proposal_completed"], table);
        add_tr("proposal_total", proposals[i]["proposal_total"], table);
        add_tr("proposal_exe_method", Object.keys(proposals[i]["proposal_exe_method"])[0], table);
        add_tr("proposal_exe_target", proposals[i]["proposal_exe_target"], table);
        add_tr("proposal_wasm_hash", proposals[i]["proposal_wasm_hash"].join(""), table);
        proposals_section.appendChild(table);
    }
};

function add_tr(k, v, t){
    let tr = document.createElement("tr");
    let th = document.createElement("th");
    let td = document.createElement("td");
    th.innerText = k;
    td.innerText = v;
    tr.appendChild(th);
    tr.appendChild(td);
    t.appendChild(tr);
};
// 载入canister列表
async function load_canisters() {
    let sec_canister = document.getElementById("canisters");
    var canisters = await icp_adv_fourth.get_canisters();
    console.log(canisters);
    sec_canister.replaceChildren([]);
    for (var i = 0; i< canisters.length; i++) { 
        let can = document.createElement("p");
        can.innerText = canisters[i].canister 
                          + " : " + canisters[i].beRestricted;
        sec_canister.appendChild(can);
    }
}

// 载入团队成员列表
async function load_members() {
    let sec_members = document.getElementById("members");
    sec_members.style.fontSize = 5;
    var members = await icp_adv_fourth.allMembers();
    console.log(members);
    sec_members.replaceChildren([]);
    for (var i = 0; i< members.length; i++) { 
        let member = document.createElement("p");
        member.innerText = members[i];
        member.fontSize = 4;
        sec_members.appendChild(member);
    }
}
  
  function load() { 
    console.log("windows load");
    let btn_refresh_proposal = document.getElementById("refresh_proposal");
    btn_refresh_proposal.onclick = load_proposals;
    let btn_refresh_canister = document.getElementById("refresh_canister");
    btn_refresh_canister.onclick = load_canisters;
  
    load_identity();
    load_members();
    load_canisters();
    load_proposals();
  }
  
  window.onload = load;
};