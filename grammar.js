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
    config_block: ($) => seq("config", $._braced_code),

    // JS block: js { ... }
    js_block: ($) => seq("js", "{", optional($.js_content), "}"),

    // Content inside js block - captured as raw text for injection
    js_content: ($) => alias($._js_content_raw, "js_content"),

    _js_content_raw: ($) => repeat1(choice(/[^{}]+/, $._js_braced)),

    _js_braced: ($) => seq("{", repeat(choice(/[^{}]+/, $._js_braced)), "}"),

    // Pre-operations block: pre_operations { ... } containing SQL
    pre_operations_block: ($) =>
      seq("pre_operations", "{", repeat($.statement), "}"),

    // Post-operations block: post_operations { ... } containing SQL
    post_operations_block: ($) =>
      seq("post_operations", "{", repeat($.statement), "}"),

    // Generic block matching { ... } for config/js bodies
    _braced_code: ($) =>
      seq(
        "{",
        repeat(choice(/[^{}"'`]+/, $._braced_code, $.string, $.comment)),
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

    // Dataform interpolation ${ ... }
    interpolation: ($) =>
      seq(
        "${",
        repeat(choice(/[^{}"'`}]+/, $._braced_code, $.string, $.comment)),
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
