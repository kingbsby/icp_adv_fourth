#!/usr/local/bin/ic-repl
function deploy(wasm) {
  let id = call ic.provisional_create_canister_with_cycles(record { settings = null; amount = null });
  call ic.install_code(
    record {
      arg = encode ();
      wasm_module = wasm;
      mode = variant { install };
      canister_id = id.canister_id;
    },
  );
  id
};

identity alice;
let id = deploy(file "greet.wasm");
let status = call ic.canister_status(id);
assert status.settings ~= record { controllers = vec { alice } };
assert status.module_hash? == blob "...";
let canister = id.canister_id;
call canister.greet("test");
