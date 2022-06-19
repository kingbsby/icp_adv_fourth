import type { Principal } from '@dfinity/principal';
export type ExecuteMethod = { 'delMember' : null } |
  { 'addMember' : null };
export type List = [] | [[Principal, List]];
export interface Proposal {
  'proposal_exe_method' : ExecuteMethod,
  'proposal_approvers' : List,
  'proposal_maker' : Principal,
  'proposal_total' : bigint,
  'proposal_completed' : boolean,
  'proposal_id' : bigint,
  'proposal_content' : string,
}
export interface anon_class_12_1 {
  'add_proposal' : (arg_0: string, arg_1: ExecuteMethod) => Promise<Proposal>,
  'create_canister' : () => Promise<canister_id>,
  'delete_canister' : (arg_0: canister_id) => Promise<undefined>,
  'get_proposals' : () => Promise<Array<Proposal>>,
  'install_code' : (arg_0: canister_id, arg_1: wasm_module) => Promise<
      undefined
    >,
  'start_canister' : (arg_0: canister_id) => Promise<undefined>,
  'stop_canister' : (arg_0: canister_id) => Promise<undefined>,
  'vote' : (arg_0: bigint) => Promise<undefined>,
}
export type canister_id = Principal;
export type wasm_module = Array<number>;
export interface _SERVICE extends anon_class_12_1 {}
