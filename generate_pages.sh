#!/usr/bin/env bash

# 自动生成包含文件夹链接的 index.html 和 README.md
# Auto-generate index.html and README.md with folder links

BASEPATH=`dirname $(readlink -f ${BASH_SOURCE[0]})` && cd $BASEPATH

set -euo pipefail

# 默认配置
readonly BASE_URL_DEFAULT="https://xiechengqi.github.io/Claude-UI-Prompts"
readonly HTML_FILE="index.html"
readonly MD_FILE="README.md"
readonly SCRIPT_NAME="$(basename "$0")"

# 颜色定义
readonly COLOR_GREEN='\033[0;32m'
readonly COLOR_BLUE='\033[0;34m'
readonly COLOR_YELLOW='\033[1;33m'
readonly COLOR_RED='\033[0;31m'
readonly COLOR_RESET='\033[0m'

# 显示帮助信息
usage() {
  cat <<EOF
${COLOR_BLUE}用法:${COLOR_RESET} $SCRIPT_NAME [选项]

${COLOR_YELLOW}选项:${COLOR_RESET}
  -b, --base-url URL     覆盖默认的 GitHub Pages 基础 URL
                         Override default GitHub Pages base URL
  -o, --output-dir DIR   指定输出目录 (默认: 当前目录)
                         Specify output directory (default: current directory)
  -h, --help             显示此帮助信息
                         Show this help message
  -v, --verbose          详细输出模式
                         Verbose output mode

${COLOR_GREEN}示例:${COLOR_RESET}
  $SCRIPT_NAME
  $SCRIPT_NAME --base-url https://username.github.io/repo
  $SCRIPT_NAME -o ./docs --verbose

EOF
}

# 日志函数
log_info() {
  echo -e "${COLOR_BLUE}[INFO]${COLOR_RESET} $1"
}

log_warn() {
  echo -e "${COLOR_YELLOW}[WARN]${COLOR_RESET} $1"
}

log_error() {
  echo -e "${COLOR_RED}[ERROR]${COLOR_RESET} $1" >&2
}

log_success() {
  echo -e "${COLOR_GREEN}[SUCCESS]${COLOR_RESET} $1"
}

# 初始化变量
BASE_URL="$BASE_URL_DEFAULT"
OUTPUT_DIR="."
VERBOSE=false

# 解析命令行参数
while [[ $# -gt 0 ]]; do
  case "$1" in
    -b|--base-url)
      if [[ $# -lt 2 ]]; then
        log_error "--base-url 需要一个参数值"
        usage >&2
        exit 1
      fi
      BASE_URL="$2"
      shift 2
      ;;
    -o|--output-dir)
      if [[ $# -lt 2 ]]; then
        log_error "--output-dir 需要一个参数值"
        usage >&2
        exit 1
      fi
      OUTPUT_DIR="$2"
      shift 2
      ;;
    -v|--verbose)
      VERBOSE=true
      shift
      ;;
    -h|--help)
      usage
      exit 0
      ;;
    *)
      log_error "未知选项: $1"
      usage >&2
      exit 1
      ;;
  esac
done

# 验证和清理基础URL
if [[ -z "$BASE_URL" ]]; then
  log_error "基础URL不能为空"
  exit 1
fi

# 移除末尾的斜杠
BASE_URL="${BASE_URL%/}"

# 创建输出目录
mkdir -p "$OUTPUT_DIR"

# 验证输出目录是否存在且可写
if [[ ! -d "$OUTPUT_DIR" ]] || [[ ! -w "$OUTPUT_DIR" ]]; then
  log_error "输出目录不可写: $OUTPUT_DIR"
  exit 1
fi

# 扫描文件夹 (排除隐藏文件夹和特殊文件夹)
scan_folders() {
  local folders=()

  if [[ "$VERBOSE" == true ]]; then
    log_info "正在扫描当前目录下的文件夹..."
  fi

  # 使用跨平台的方式获取文件夹
  while IFS= read -r folder; do
    folder_name=$(basename "$folder")

    # 跳过特殊文件夹和输出目录
    case "$folder_name" in
      .git|.github|node_modules|.vscode|.idea|dist|build)
        if [[ "$VERBOSE" == true ]]; then
          log_info "跳过系统文件夹: $folder_name"
        fi
        continue
        ;;
    esac

    # 跳过输出目录（如果它在项目内）
    if [[ "$folder_name" == "$(basename "$OUTPUT_DIR")" ]]; then
      if [[ "$VERBOSE" == true ]]; then
        log_info "跳过输出目录: $folder_name"
      fi
      continue
    fi

    folders+=("$folder_name")

    if [[ "$VERBOSE" == true ]]; then
      log_info "发现文件夹: $folder_name"
    fi

  done < <(find . -maxdepth 1 -mindepth 1 -type d -not -name '.*' -exec basename {} \; | sort)

  # 使用mapfile安全地返回结果
  printf '%s\n' "${folders[@]}"
}

# HTML转义函数
html_escape() {
  local text="$1"
  # 转义HTML特殊字符
  sed -e 's/&/\&amp;/g' -e 's/</\&lt;/g' -e 's/>/\&gt;/g' -e 's/"/\&quot;/g' -e "s/'/\&#39;/g" <<< "$text"
}

# Markdown转义函数
markdown_escape() {
  local text="$1"
  # 转义Markdown特殊字符
  sed -e 's/\[\[/\\[/g' -e 's/\]\]/\\]/g' -e 's/`/\\`/g' <<< "$text"
}

# 获取文件夹的描述信息 (如果存在)
get_folder_description() {
  local folder="$1"
  local desc_file="$folder/README.md"

  if [[ -f "$desc_file" && -r "$desc_file" ]]; then
    # 安全地提取描述信息
    if first_line=$(head -n1 "$desc_file" 2>/dev/null); then
      # 清理和验证描述
      local cleaned_desc=$(echo "$first_line" | sed 's/^#\s*//' | sed 's/\[.*\]//g' | xargs)
      if [[ -n "$cleaned_desc" && "$cleaned_desc" != "$folder" && ${#cleaned_desc} -lt 200 ]]; then
        echo "$cleaned_desc"
      fi
    else
      log_warn "无法读取 $desc_file"
    fi
  fi
}

# 生成HTML文件
generate_html() {
  local folders=("$@")
  local html_path="$OUTPUT_DIR/$HTML_FILE"

  log_info "正在生成 HTML 文件: $html_path"

  # HTML头部
  cat > "$html_path" <<'EOF'
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Claude UI Prompts</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            padding: 2rem;
            color: #333;
        }

        .container {
            max-width: 1200px;
            margin: 0 auto;
        }

        header {
            text-align: center;
            margin-bottom: 3rem;
            color: white;
        }

        h1 {
            font-size: 3rem;
            font-weight: 700;
            margin-bottom: 1rem;
            text-shadow: 0 2px 4px rgba(0,0,0,0.3);
        }

        .subtitle {
            font-size: 1.25rem;
            opacity: 0.9;
            font-weight: 300;
        }

        .folder-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
            gap: 1.5rem;
            margin-bottom: 2rem;
        }

        .folder-card {
            background: rgba(255, 255, 255, 0.95);
            border-radius: 16px;
            padding: 2rem;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.2);
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            text-decoration: none;
            color: inherit;
            display: block;
            position: relative;
            overflow: hidden;
        }

        .folder-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 4px;
            background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
            transform: scaleX(0);
            transition: transform 0.3s ease;
        }

        .folder-card:hover {
            transform: translateY(-4px);
            box-shadow: 0 16px 48px rgba(0, 0, 0, 0.15);
        }

        .folder-card:hover::before {
            transform: scaleX(1);
        }

        .folder-icon {
            width: 48px;
            height: 48px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 1rem;
            font-size: 1.5rem;
        }

        .folder-name {
            font-size: 1.5rem;
            font-weight: 600;
            margin-bottom: 0.5rem;
            color: #2d3748;
        }

        .folder-description {
            color: #718096;
            line-height: 1.5;
            font-size: 0.95rem;
        }

        .folder-link {
            color: #667eea;
            font-size: 0.875rem;
            margin-top: 1rem;
            display: inline-flex;
            align-items: center;
            gap: 0.25rem;
            text-decoration: none;
        }

        .folder-link:hover {
            color: #764ba2;
        }

        footer {
            text-align: center;
            color: white;
            opacity: 0.8;
            margin-top: 3rem;
            font-size: 0.9rem;
        }

        @media (max-width: 768px) {
            body {
                padding: 1rem;
            }

            h1 {
                font-size: 2rem;
            }

            .folder-grid {
                grid-template-columns: 1fr;
                gap: 1rem;
            }

            .folder-card {
                padding: 1.5rem;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <header>
            <h1>Claude UI Prompts</h1>
            <p class="subtitle">精选的 UI 提示词集合，快速访问 GitHub Pages 预览</p>
        </header>

        <main>
            <div class="folder-grid">
EOF

  # 生成文件夹卡片
  for folder in "${folders[@]}"; do
    local description=$(get_folder_description "$folder")
    local folder_url="$BASE_URL/$folder/"

    # 转义HTML特殊字符
    local escaped_folder=$(html_escape "$folder")
    local escaped_description=$(html_escape "${description:-"点击查看 $folder 的详细信息"}")
    local escaped_url=$(html_escape "$folder_url")

    cat >> "$html_path" <<EOF
                <a href="$folder_url" class="folder-card">
                    <div class="folder-icon">📁</div>
                    <h2 class="folder-name">$escaped_folder</h2>
                    <p class="folder-description">$escaped_description</p>
                    <span class="folder-link">访问预览 →</span>
                </a>
EOF
  done

  # HTML尾部
  cat >> "$html_path" <<'EOF'
            </div>
        </main>

        <footer>
            <p>由 Claude 自动生成 • 基于 GitHub Pages 托管</p>
        </footer>
    </div>
</body>
</html>
EOF

  log_success "HTML 文件生成完成: $html_path"
}

# 生成Markdown文件
generate_markdown() {
  local folders=("$@")
  local md_path="$OUTPUT_DIR/$MD_FILE"

  log_info "正在生成 Markdown 文件: $md_path"

  # Markdown头部
  cat > "$md_path" <<EOF
# Claude UI Prompts

精选的 UI 提示词集合，每个项目都通过 GitHub Pages 进行部署，可直接在线预览。

## 📁 项目列表

EOF

  # 生成文件夹列表
  for folder in "${folders[@]}"; do
    local description=$(get_folder_description "$folder")
    local folder_url="$BASE_URL/$folder/"

    # 转义Markdown特殊字符
    local escaped_folder=$(markdown_escape "$folder")
    local escaped_description=$(markdown_escape "${description:-""}")

    if [[ -n "$description" ]]; then
      echo "- **[$escaped_folder]($folder_url)** - $escaped_description" >> "$md_path"
    else
      echo "- **[$escaped_folder]($folder_url)**" >> "$md_path"
    fi
  done

  # Markdown尾部
  cat >> "$md_path" <<EOF

## 🚀 快速开始

点击上方链接直接访问对应的项目预览页面。

## 📝 说明

此 README 由 \`generate_pages.sh\` 脚本自动生成，最后更新时间: $(date '+%Y-%m-%d %H:%M:%S')

---

*Generated with ❤️ by Claude*
EOF

  log_success "Markdown 文件生成完成: $md_path"
}

# 主函数
main() {

while :
do
  log_info "开始生成页面文件..."
  log_info "基础 URL: $BASE_URL"
  log_info "输出目录: $OUTPUT_DIR"

  # 使用mapfile安全地读取文件夹列表
  local folders=()
  mapfile -t folders < <(scan_folders)

  if [[ ${#folders[@]} -eq 0 ]]; then
    log_warn "未找到任何项目文件夹"
    exit 0
  fi

  log_info "找到 ${#folders[@]} 个文件夹: ${folders[*]}"

  # 生成文件
  generate_html "${folders[@]}"
  generate_markdown "${folders[@]}"

  log_success "所有文件生成完成！"
  log_info "可以访问: $BASE_URL/"
  log_info "sleep 10m ..."

  sleep 10m
done

}

# 运行主函数
main "$@"
