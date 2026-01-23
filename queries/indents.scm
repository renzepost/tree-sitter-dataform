; Indentation rules for Dataform SQLX files

; Braced code blocks (config blocks, nested braces, interpolations)
(braced_code "}" @end) @indent

; JS blocks
(js_block (close_brace) @end) @indent

; Pre-operations blocks
(pre_operations_block (close_brace) @end) @indent

; Post-operations blocks
(post_operations_block (close_brace) @end) @indent

; Interpolations
(interpolation "}" @end) @indent
