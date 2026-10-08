import sanitizeHtml from "sanitize-html";

/**
 * Lọc HTML bài viết lấy từ API trước khi render bằng dangerouslySetInnerHTML.
 * Dùng allowlist: chỉ giữ thẻ/thuộc tính nội dung bài viết thông thường, loại script, iframe, sự kiện on*, style
 * và các scheme nguy hiểm (javascript:, data:). Chỉ chạy phía server (xem data/news-api.ts).
 */
const ALLOWED_TAGS = [
  "p", "br", "hr", "span", "div",
  "h1", "h2", "h3", "h4", "h5", "h6",
  "strong", "b", "em", "i", "u", "s", "sub", "sup", "mark",
  "ul", "ol", "li", "blockquote", "pre", "code",
  "a", "img", "figure", "figcaption",
  "table", "thead", "tbody", "tfoot", "tr", "th", "td",
];

const ALLOWED_SCHEMES = ["http", "https", "mailto", "tel"];

export function sanitizeArticleHtml(html: string): string {
  return sanitizeHtml(html, {
    allowedTags: ALLOWED_TAGS,
    allowedAttributes: {
      "*": ["class"],
      a: ["href", "target", "rel"],
      img: ["src", "alt", "width", "height"],
      th: ["colspan", "rowspan"],
      td: ["colspan", "rowspan"],
    },
    allowedSchemes: ALLOWED_SCHEMES,
    allowedSchemesByTag: { img: ["http", "https"] },
    allowProtocolRelative: false,
    transformTags: {
      a: (tagName, attribs) => ({
        tagName,
        attribs: attribs.target === "_blank" ? { ...attribs, rel: "noopener noreferrer" } : attribs,
      }),
    },
  });
}
