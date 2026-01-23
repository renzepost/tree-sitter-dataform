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

    // Config block: config { ... }
    config_block: ($) => seq("config", $.braced_code),

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
