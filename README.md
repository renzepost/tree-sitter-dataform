# tree-sitter-dataform

> This project was AI-generated and is experimental.

An experimental [tree-sitter](https://tree-sitter.github.io/tree-sitter/) grammar for [Dataform](https://cloud.google.com/dataform/) SQLX files.

## Features

- Parses Dataform block structure: `config`, `js`, `pre_operations`, `post_operations`
- Handles `${ }` interpolations within SQL
- Syntax highlighting for BigQuery SQL keywords, types, and functions
- Optional JavaScript injection for `js` blocks (requires `tree-sitter-javascript`)

## Installation

Clone the repository and build:

```bash
git clone https://github.com/renzepost/tree-sitter-dataform.git
cd tree-sitter-dataform
npm install
npx tree-sitter generate
```

## Usage

### Syntax Highlighting

```bash
tree-sitter highlight example.sqlx
```

### JavaScript Block Highlighting

For full JavaScript syntax highlighting inside `js { }` blocks, install `tree-sitter-javascript` in one of your parser directories:

```bash
cd ~/tree-sitter-config  # or another directory in your tree-sitter config
git clone https://github.com/tree-sitter/tree-sitter-javascript.git
```

Without `tree-sitter-javascript`, JS blocks will still parse correctly but won't have syntax highlighting.

## Supported Syntax

### Dataform Blocks

```sqlx
config {
  type: "table",
  name: "my_table"
}

js {
  const columns = ["a", "b", "c"];
}

pre_operations {
  DECLARE x INT64 DEFAULT 1;
}

SELECT * FROM ${ref("source")}

post_operations {
  GRANT SELECT ON TABLE ${self()} TO "group:analysts@example.com"
}
```

### Interpolations

All Dataform interpolations are supported:

- `${ref("dataset", "table")}`
- `${resolve("dataset", "table")}`
- `${self()}`
- `${name()}`
- `${when(incremental(), "...", "...")}`
- `${dataform.projectConfig.vars.myVar}`

## To-do

- [ ] Inject `tree-sitter-sql-bigquery` for SQL statements instead of regex-based keyword highlighting
  - Would provide full SQL syntax highlighting
  - Challenge: handling `${...}` interpolations gracefully
  - Alternative: incorporate the full SQL grammar with interpolation support

## License

MIT
