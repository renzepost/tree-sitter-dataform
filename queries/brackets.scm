; Bracket matching for Dataform SQLX files

; Braced code blocks (handles nested braces in config, interpolations, etc.)
(braced_code "{" @open "}" @close)

; JS blocks
(js_block (open_brace) @open (close_brace) @close)

; Pre-operations blocks
(pre_operations_block (open_brace) @open (close_brace) @close)

; Post-operations blocks
(post_operations_block (open_brace) @open (close_brace) @close)

; Interpolations
(interpolation "${" @open "}" @close)
