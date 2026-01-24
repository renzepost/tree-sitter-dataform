module.exports = grammar({
  name: "dataform",

  extras: ($) => [/\s/, $.comment],

  rules: {
    source_file: ($) =>
      repeat(
        choice(
          $.config_block,
          $.js_block,
          $.pre_operations_block,
          $.post_operations_block,
          $.statement,
        ),
      ),

    // Config block: config { ... } containing JavaScript object literal
    config_block: ($) =>
      seq(
        "config",
        alias("{", $.open_brace),
        optional($.config_content),
        alias("}", $.close_brace),
      ),

    // Content inside config block - captured as raw text for JS injection
    config_content: ($) => alias($._config_content_raw, "config_content"),

    // Raw content matching for config blocks - captures text for JS injection
    // Uses inline string patterns instead of $.string to avoid creating child nodes
    _config_content_raw: ($) =>
      repeat1(choice(/[^{}"'`]+/, $._config_braced, $._config_string)),

    _config_braced: ($) =>
      seq(
        "{",
        repeat(choice(/[^{}"'`]+/, $._config_braced, $._config_string)),
        "}",
      ),

    // Hidden string patterns for config content (no named nodes created)
    _config_string: ($) =>
      choice(/"([^"\\]|\\.)*"/, /'([^'\\]|\\.)*'/, /`([^`\\]|\\.)*`/),

    // JS block: js { ... }
    js_block: ($) =>
      seq(
        "js",
        alias("{", $.open_brace),
        optional($.js_content),
        alias("}", $.close_brace),
      ),

    // Content inside js block - captured as raw text for injection
    js_content: ($) => alias($._js_content_raw, "js_content"),

    _js_content_raw: ($) => repeat1(choice(/[^{}]+/, $._js_braced)),

    _js_braced: ($) => seq("{", repeat(choice(/[^{}]+/, $._js_braced)), "}"),

    // Pre-operations block: pre_operations { ... } containing SQL
    pre_operations_block: ($) =>
      seq(
        "pre_operations",
        alias("{", $.open_brace),
        repeat($.statement),
        alias("}", $.close_brace),
      ),

    // Post-operations block: post_operations { ... } containing SQL
    post_operations_block: ($) =>
      seq(
        "post_operations",
        alias("{", $.open_brace),
        repeat($.statement),
        alias("}", $.close_brace),
      ),

    // Generic block matching { ... } for config/js bodies
    braced_code: ($) =>
      seq(
        "{",
        repeat(choice(/[^{}"'`]+/, $.braced_code, $.string, $.comment)),
        "}",
      ),

    // SQL Statements and components
    // We treat the rest of the file as a stream of SQL-ish tokens and interpolations
    statement: ($) =>
      choice($.identifier, $.string, $.number, $.symbol, $.interpolation),

    identifier: ($) => /[a-zA-Z_][a-zA-Z0-9_]*/,

    number: ($) => /\d+(\.\d+)?/,

    // Symbols common in SQL
    symbol: ($) => /[.,;()=<>+\-*/!\[\]]/,

    // Named brace tokens for bracket matching
    open_brace: ($) => "{",
    close_brace: ($) => "}",

    // Dataform interpolation ${ ... }
    interpolation: ($) =>
      seq(
        "${",
        repeat(choice(/[^{}"'`}]+/, $.braced_code, $.string, $.comment)),
        "}",
      ),

    string: ($) =>
      choice(
        seq('"', repeat(choice(/[^"\\]/, seq("\\", /./))), '"'),
        seq("'", repeat(choice(/[^'\\]/, seq("\\", /./))), "'"),
        seq("`", repeat(choice(/[^`\\]/, seq("\\", /./))), "`"),
      ),

    comment: ($) =>
      token(
        choice(
          seq("--", /.*/),
          seq("//", /.*/),
          seq("/*", /[^*]*\*+([^/*][^*]*\*+)*/, "/"),
        ),
      ),
  },
});
