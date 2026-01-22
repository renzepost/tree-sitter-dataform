; Inject JavaScript into js block content
((js_content) @injection.content
 (#set! injection.language "javascript")
 (#set! injection.include-children))
