export const idlFactory = ({ IDL }) => {
  const List = IDL.Rec();
  const ExecuteMethod = IDL.Variant({
    'delMember' : IDL.Null,
    'addMember' : IDL.Null,
  });
  List.fill(IDL.Opt(IDL.Tuple(IDL.Principal, List)));
  const Proposal = IDL.Record({
    'proposal_exe_method' : ExecuteMethod,
    'proposal_approvers' : List,
    'proposal_maker' : IDL.Principal,
    'proposal_total' : IDL.Nat,
    'proposal_completed' : IDL.Bool,
    'proposal_id' : IDL.Nat,
    'proposal_content' : IDL.Text,
  });
  const canister_id = IDL.Principal;
  const wasm_module = IDL.Vec(IDL.Nat8);
  const anon_class_12_1 = IDL.Service({
    'add_proposal' : IDL.Func([IDL.Text, ExecuteMethod], [Proposal], []),
    'create_canister' : IDL.Func([], [canister_id], []),
    'delete_canister' : IDL.Func([canister_id], [], []),
    'get_proposals' : IDL.Func([], [IDL.Vec(Proposal)], []),
    'install_code' : IDL.Func([canister_id, wasm_module], [], []),
    'start_canister' : IDL.Func([canister_id], [], []),
    'stop_canister' : IDL.Func([canister_id], [], []),
    'vote' : IDL.Func([IDL.Nat], [], []),
  });
  return anon_class_12_1;
};
export const init = ({ IDL }) => { return []; };
