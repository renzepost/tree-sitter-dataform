; Indentation rules for Dataform SQLX files

; Braced code blocks (nested braces, interpolations)
(braced_code "}" @end) @indent

; Config blocks (braces are inside config_content)
(config_content (close_brace) @end) @indent

; JS blocks
(js_block (close_brace) @end) @indent

; Pre-operations blocks
(pre_operations_block (close_brace) @end) @indent

; Post-operations blocks
(post_operations_block (close_brace) @end) @indent

; Interpolations
(interpolation "}" @end) @indent
