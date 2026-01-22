; Indentation rules for Dataform SQLX files

; Indent inside config blocks
(config_block
  "{" @indent
  "}" @dedent)

; Indent inside js blocks
(js_block
  "{" @indent
  "}" @dedent)

; Indent inside pre_operations blocks
(pre_operations_block
  "{" @indent
  "}" @dedent)

; Indent inside post_operations blocks
(post_operations_block
  "{" @indent
  "}" @dedent)

; Indent inside interpolations
(interpolation
  "${" @indent
  "}" @dedent)
