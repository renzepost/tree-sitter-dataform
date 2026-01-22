; Indentation rules for Dataform SQLX files
; Note: Braces are anonymous tokens, so we match parent nodes instead

; Indent inside config blocks
(config_block) @indent

; Indent inside js blocks
(js_block) @indent

; Indent inside pre_operations blocks
(pre_operations_block) @indent

; Indent inside post_operations blocks
(post_operations_block) @indent

; Indent inside interpolations
(interpolation) @indent
