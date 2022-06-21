#!/usr/local/bin/ic-repl -r ic
// assume we already installed the greet canister
import greet = "rrkah-fqaaa-aaaaa-aaaaq-cai";

call greet.install_code(principal "qaa6y-5yaaa-aaaaa-aaafa-cai", file "icp_first_lesson.wasm");
