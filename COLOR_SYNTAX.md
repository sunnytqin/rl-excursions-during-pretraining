# Notion Color Syntax for Markdown

This framework supports Notion's default text colors using a simple inline syntax.

## Syntax

```markdown
::color[your text here]::
```

## Available Colors

The following colors match Notion's default color palette:

| Color Name | Example Syntax | Preview Color |
|------------|----------------|---------------|
| `gray` | `::gray[灰色文字]::` | #9B9A97 |
| `brown` | `::brown[棕色文字]::` | #64473A |
| `orange` | `::orange[橙色文字]::` | #D9730D |
| `yellow` | `::yellow[黄色文字]::` | #DFAB01 |
| `green` | `::green[绿色文字]::` | #0F7B6C |
| `blue` | `::blue[蓝色文字]::` | #0B6E99 |
| `purple` | `::purple[紫色文字]::` | #6940A5 |
| `pink` | `::pink[粉色文字]::` | #AD1A72 |
| `red` | `::red[红色文字]::` | #E03E3D |

## Usage Examples

### Basic Usage

```markdown
这是 ::blue[蓝色文字]:: 在句子中。
```

### With Markdown Formatting

You can combine colors with bold, italic, or other Markdown formatting:

```markdown
::red[***This is bold, italic, and red***]::
::blue[**This is bold and blue**]::
::green[*This is italic and green*]::
```

### Multiple Colors in One Line

```markdown
::red[Important:]:: Please note that ::blue[the parameter $n$]:: should be ::green[greater than zero]::.
```

### In Lists

```markdown
1. ::blue[***the objective given by the expected reward behaves non-smoothly***]::
2. ::blue[***the data distribution itself depends on the policy being optimized***]::
```

## Implementation Details

- Colors are rendered as inline `<span>` elements with inline styles
- The syntax is processed by a custom Marked.js extension
- Colors are consistent with Notion's default palette
- Works seamlessly with other Markdown syntax (bold, italic, links, math, etc.)

## Tips

- Use colors sparingly for emphasis
- Prefer `blue`, `red`, or `green` for highlighting key points
- Combine with bold (`**`) for stronger emphasis
- The syntax works anywhere inline Markdown is supported
