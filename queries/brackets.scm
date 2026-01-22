; Bracket matching for Dataform SQLX files

; Config blocks
(config_block "{" @open)
(config_block "}" @close)

; JS blocks
(js_block "{" @open)
(js_block "}" @close)

; Pre-operations blocks
(pre_operations_block "{" @open)
(pre_operations_block "}" @close)

; Post-operations blocks
(post_operations_block "{" @open)
(post_operations_block "}" @close)

; Interpolations
(interpolation "${" @open)
(interpolation "}" @close)
