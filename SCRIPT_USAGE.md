# generate_pages.sh 使用说明

这是一个自动生成项目索引页面的Shell脚本，可以根据当前项目下的文件夹自动生成美观的 `index.html` 和 `README.md` 文件。

## 功能特性

- 🚀 自动扫描项目文件夹
- 🎨 生成美观的响应式HTML页面
- 📝 生成Markdown格式的README文件
- 🔗 自动生成GitHub Pages链接
- 🛡️ 安全的HTML和Markdown转义
- 📱 移动端友好的响应式设计

## 基本用法

```bash
# 使用默认配置运行
./generate_pages.sh

# 显示帮助信息
./generate_pages.sh --help

# 详细输出模式
./generate_pages.sh --verbose
```

## 高级选项

### 自定义GitHub Pages URL

```bash
./generate_pages.sh --base-url "https://username.github.io/repo"
```

### 指定输出目录

```bash
./generate_pages.sh --output-dir ./docs
```

### 组合使用

```bash
./generate_pages.sh -b "https://myname.github.io/myproject" -o ./public -v
```

## 命令行参数

| 参数 | 简写 | 说明 | 示例 |
|------|------|------|------|
| `--base-url` | `-b` | 覆盖默认的GitHub Pages基础URL | `-b "https://user.github.io/repo"` |
| `--output-dir` | `-o` | 指定输出目录 | `-o ./docs` |
| `--verbose` | `-v` | 启用详细输出模式 | `-v` |
| `--help` | `-h` | 显示帮助信息 | `-h` |

## 默认配置

- **基础URL**: `https://xiechengqi.github.io/Claude-UI-Prompts`
- **输出目录**: 当前目录 (`.`)
- **输出文件**: `index.html` 和 `README.md`

## 自动排除的文件夹

脚本会自动跳过以下系统文件夹：
- `.git`, `.github`
- `node_modules`
- `.vscode`, `.idea`
- `dist`, `build`

## 文件夹描述

如果文件夹中包含 `README.md` 文件，脚本会：
1. 读取README的第一行作为项目描述
2. 自动清理标题格式（移除 `#` 前缀）
3. 限制描述长度在200字符以内

## 生成的文件

### index.html
- 响应式设计的现代化网页
- 网格布局的项目卡片
- 渐变背景和悬浮效果
- 移动端优化

### README.md
- Markdown格式的项目列表
- 自动生成的时间戳
- 清晰的使用说明

## 示例输出

运行脚本后，会看到类似以下的输出：

```
[INFO] 开始生成页面文件...
[INFO] 基础 URL: https://xiechengqi.github.io/Claude-UI-Prompts
[INFO] 输出目录: .
[INFO] 找到 3 个文件夹: Monochrome SaaS Terminal
[INFO] 正在生成 HTML 文件: ./index.html
[SUCCESS] HTML 文件生成完成: ./index.html
[INFO] 正在生成 Markdown 文件: ./README.md
[SUCCESS] Markdown 文件生成完成: ./README.md
[SUCCESS] 所有文件生成完成！
[INFO] 可以访问: https://xiechengqi.github.io/Claude-UI-Prompts/
```

## 安全特性

- 所有用户输入都经过HTML转义处理
- 支持特殊字符的文件夹名称
- 安全的文件读取操作
- 错误处理和日志记录

## 兼容性

- **Shell**: Bash 4.0+
- **平台**: Linux, macOS, Windows (WSL)
- **工具**: `find`, `sed`, `grep` (标准Unix工具)

## 故障排除

### 权限问题
```bash
chmod +x generate_pages.sh
```

### 找不到文件夹
确保在项目根目录运行脚本，并检查是否存在非隐藏的子文件夹。

### 生成的链接不正确
检查 `--base-url` 参数是否设置正确。

## 自动化建议

可以将脚本集成到CI/CD流程中：

```yaml
# GitHub Actions 示例
- name: Generate index pages
  run: ./generate_pages.sh --base-url "https://${{ github.repository_owner }}.github.io/${{ github.event.repository.name }}"

- name: Commit generated files
  run: |
    git add index.html README.md
    git commit -m "Auto-generate index pages"
```

## 自定义样式

HTML文件使用内联CSS，可以根据需要修改 `generate_html()` 函数中的样式代码。