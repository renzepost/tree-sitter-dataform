; Bracket matching for Dataform SQLX files

; Braced code blocks (handles nested braces in interpolations, etc.)
(braced_code "{" @open "}" @close)

; Config blocks (braces are inside config_content)
(config_content (open_brace) @open (close_brace) @close)

; JS blocks
(js_block (open_brace) @open (close_brace) @close)

; Pre-operations blocks
(pre_operations_block (open_brace) @open (close_brace) @close)

; Post-operations blocks
(post_operations_block (open_brace) @open (close_brace) @close)

; Interpolations
(interpolation "${" @open "}" @close)
