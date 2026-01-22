package tree_sitter_dataform_test

import (
	"testing"

	tree_sitter "github.com/smacker/go-tree-sitter"
	"github.com/renzepost/tree-sitter-dataform"
)

func TestCanLoadGrammar(t *testing.T) {
	language := tree_sitter.NewLanguage(tree_sitter_dataform.Language())
	if language == nil {
		t.Errorf("Error loading Dataform grammar")
	}
}
