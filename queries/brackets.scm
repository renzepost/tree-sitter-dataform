; Bracket matching for Dataform SQLX files

; Config blocks
(config_block "{" @open "}" @close)

; JS blocks
(js_block "{" @open "}" @close)

; Pre-operations blocks
(pre_operations_block "{" @open "}" @close)

; Post-operations blocks
(post_operations_block "{" @open "}" @close)

; Interpolations
(interpolation "${" @open "}" @close)
