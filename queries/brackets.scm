; Bracket matching for Dataform SQLX files

; Braced code blocks (handles nested braces in config, interpolations, etc.)
(braced_code "{" @open "}" @close)

; JS blocks
(js_block "{" @open "}" @close)

; Pre-operations blocks
(pre_operations_block "{" @open "}" @close)

; Post-operations blocks
(post_operations_block "{" @open "}" @close)

; Interpolations
(interpolation "${" @open "}" @close)
