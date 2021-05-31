// an example to create a new mapping `ctrl-y`
//mapkey('<Ctrl-y>', 'Show me the money', function() {
//    Front.showPopup('a well-known phrase uttered by characters in the 1996 film Jerry Maguire (Escape to close).');
//});

// an example to replace `T` with `gt`, click `Default mappings` to see how `T` works.
//map("gt", "T");

// an example to remove mapkey `Ctrl-i`
//unmap("<Ctrl-i>");

// https://github.com/brookhong/Surfingkeys
// https://sspai.com/post/63692
// https://gist.github.com/hytor-yang/6e8cf7f3f45cc6ba598f0c20ea9fa383

// general
settings.showModeStatus = true;
settings.hintAlign = "left";

// map
mapkey("pu", "Open the clipboard's URL in the current tab", function () {
  navigator.clipboard.readText().then((text) => {
    if (text.startsWith("http://") || text.startsWith("https://")) {
      window.location = text;
    } else {
      window.location = text = "https://duckduckgo.com/?q=" + text;
    }
  });
});
mapkey("pl", "Open link from clipboard", function () {
  navigator.clipboard.readText().then((text) => {
    if (text.startsWith("http://") || text.startsWith("https://")) {
      tabOpenLink(text);
    } else {
      tabOpenLink("https://duckduckgo.com/?q=" + text);
    }
  });
});

// source: https://gist.github.com/Echostream/fe560aa30271172398cf432b7b281fd5
mapkey("gi", "Go to edit box", function () {
  var inputs = document.getElementsByTagName("input");
  var input = null;
  for (var i = 0; i < inputs.length; i++) {
    if (inputs[i].type == "text") {
      input = inputs[i];
      break;
    }
  }
  if (input) {
    input.click();
    input.focus();
  }
});

// web archive
mapkey("aw", "web archive", function () {
  javascript: void window.open("https://web.archive.org/save/" + location.href);
});

function copyUsingNavigatorClipboard(text) {
  navigator.clipboard.writeText(text);
  Front.showBanner("Copied: " + text);
}

mapkey("yu", "Copy current page's URL", function () {
  var text = document.location.href;
  // hack for lark
  if (USE_NAVIGATOR_CLIPBOARD_DOMAINS.includes(window.location.hostname)) {
    copyUsingNavigatorClipboard(text);
    return;
  }
  Clipboard.write(text);
});

// emacs capture
vmapkey("ec", "emacs org capture", function () {
  javascript: location.href =
    "org-protocol:///capture-html?template=w&url=" +
    encodeURIComponent(location.href) +
    "&title=" +
    encodeURIComponent(document.title || "[untitled page]") +
    "&body=" +
    encodeURIComponent(
      (function () {
        var html = "";
        if (typeof window.getSelection != "undefined") {
          var sel = window.getSelection();
          if (sel.rangeCount) {
            var container = document.createElement("div");
            for (var i = 0, len = sel.rangeCount; i < len; ++i) {
              container.appendChild(sel.getRangeAt(i).cloneContents());
            }
            html = container.innerHTML;
          }
        } else if (typeof document.selection != "undefined") {
          if (document.selection.type == "Text") {
            html = document.selection.createRange().htmlText;
          }
        }
        var relToAbs = function (href) {
          var a = document.createElement("a");
          a.href = href;
          var abs = a.protocol + "//" + a.host + a.pathname + a.search + a.hash;
          a.remove();
          return abs;
        };
        var elementTypes = [
          ["a", "href"],
          ["img", "src"],
        ];
        var div = document.createElement("div");
        div.innerHTML = html;
        elementTypes.map(function (elementType) {
          var elements = div.getElementsByTagName(elementType[0]);
          for (var i = 0; i < elements.length; i++) {
            elements[i].setAttribute(
              elementType[1],
              relToAbs(elements[i].getAttribute(elementType[1]))
            );
          }
        });
        return div.innerHTML;
      })()
    );
});

vmapkey("er", "emacs org roam capture", function () {
  javascript: location.href =
    "org-protocol://roam-ref?template=r&ref=" +
    encodeURIComponent(location.href) +
    "&title=" +
    encodeURIComponent(document.title) +
    "&body=" +
    encodeURIComponent(
      (function () {
        var html = "";
        var sel = window.getSelection();
        if (sel.rangeCount) {
          var container = document.createElement("div");
          for (var i = 0, len = sel.rangeCount; i < len; ++i) {
            container.appendChild(sel.getRangeAt(i).cloneContents());
          }
          html = container.innerHTML;
        }
        var dataDom = document.createElement("div");
        dataDom.innerHTML = html;
        ["p", "h1", "h2", "h3", "h4"].forEach(function (tag, idx) {
          dataDom.querySelectorAll(tag).forEach(function (item, index) {
            var content = item.innerHTML.trim();
            if (content.length > 0) {
              item.innerHTML = content + "&#13;&#10;";
            }
          });
        });
        return dataDom.innerText.trim();
      })()
    );
});

// omnibar
settings.omnibarPosition = "top";

mapkey("<Space>", "Choose a tab with omnibar", function () {
  Front.openOmnibar({ type: "Tabs" });
});

// Search Engine
addSearchAliasX("bs", "bing", "https://www.bing.com/search?q=", "s");

addSearchAliasX("zh", "zhihu", "https://www.zhihu.com/search?q=", "s");

addSearchAliasX(
  "wx",
  "weixin",
  "https://weixin.sogou.com/weixin?type=2&query=",
  "s"
);

addSearchAliasX(
  "bl",
  "bilibili search",
  "https://search.bilibili.com/all?keyword=",
  "s"
);

addSearchAliasX(
  "we",
  "wikipedia-en",
  "http://en.wikipedia.org/wiki/Special:Search?search=",
  "s"
);

addSearchAliasX(
  "ks",
  "kindle",
  "http://www.amazon.cn/s/ref=nb_sb_noss?field-keywords=",
  "s"
);
addSearchAliasX("db", "douban", "http://www.douban.com/search?q=", "s");
addSearchAliasX("gr", "goodreads", "https://www.goodreads.com/search?q=", "s");
addSearchAliasX(
  "lg",
  "Libraty Genesis",
  "https://libgen.is/search.php?req=",
  "s"
);

addSearchAliasX("cs", "grep.app", "https://grep.app/search?q=", "s");
addSearchAliasX(
  "gh",
  "github",
  "https://github.com/search?ref=opensearch&q=",
  "s"
);

addSearchAliasX("ec", "emacs china", "https://emacs-china.org/search?q=", "s");

// unmap
if (window.location.origin === "https://mail.google.com") {
  unmap("j");
  unmap("k");
  unmap("x");
  unmap("c");
  unmap("r");
  unmap("m");
}

// Theme
settings.theme = `
.sk_theme input {
    font-family: "Fira Code";
}
// .sk_theme .url {
//     font-size: 8px;
// }
#sk_omnibarSearchResult li div.url {
    font-weight: normal;
}
.sk_theme .omnibar_timestamp {
    // font-size: 9px;
    font-weight: bold;
}
// #sk_omnibarSearchArea input {
//     font-size: 10px;
// }
.sk_theme .omnibar_visitcount {
    // font-size: 9px;
    font-weight: bold;
}
body {
    font-family: "Fira Code", Consolas, "Liberation Mono", Menlo, Courier, monospace;
    // font-size: 10px;
}
kbd {
    font: 11px "Fira Code", Consolas, "Liberation Mono", Menlo, Courier, monospace;
}
// #sk_omnibarSearchArea .prompt, #sk_omnibarSearchArea .resultPage {
//     font-size: 10px;
// }
.sk_theme {
    background: #282a36;
    color: #f8f8f2;
}
.sk_theme tbody {
    color: #ff5555;
}
.sk_theme input {
    color: #ffb86c;
}
.sk_theme .url {
    color: #6272a4;
}
#sk_omnibarSearchResult>ul>li {
    background: #282a36;
}
#sk_omnibarSearchResult ul li:nth-child(odd) {
    background: #282a36;
}
.sk_theme #sk_omnibarSearchResult ul li:nth-child(odd) {
    background: #282a36;
}
.sk_theme .annotation {
    color: #6272a4;
}
.sk_theme .focused {
    background: #44475a !important;
}
.sk_theme kbd {
    background: #f8f8f2;
    color: #44475a;
}
.sk_theme .frame {
    background: #8178DE9E;
}
.sk_theme .omnibar_highlight {
    color: #8be9fd;
}
.sk_theme .omnibar_folder {
    color: #ff79c6;
}
.sk_theme .omnibar_timestamp {
    color: #bd93f9;
}
.sk_theme .omnibar_visitcount {
    color: #f1fa8c;
}

.sk_theme .prompt, .sk_theme .resultPage {
    color: #50fa7b;
}
.sk_theme .feature_name {
    color: #ff5555;
}
.sk_omnibar_middle #sk_omnibarSearchArea {
    border-bottom: 1px solid #282a36;
}
#sk_status {
    border: 1px solid #282a36;
}
#sk_richKeystroke {
    background: #282a36;
    box-shadow: 0px 2px 10px rgba(40, 42, 54, 0.8);
}
#sk_richKeystroke kbd>.candidates {
    color: #ff5555;
}
#sk_keystroke {
    background-color: #282a36;
    color: #f8f8f2;
}
kbd {
    border: solid 1px #f8f8f2;
    border-bottom-color: #f8f8f2;
    box-shadow: inset 0 -1px 0 #f8f8f2;
}
#sk_frame {
    border: 4px solid #ff5555;
    background: #8178DE9E;
    box-shadow: 0px 0px 10px #DA3C0DCC;
}
#sk_banner {
    border: 1px solid #282a36;
    background: rgb(68, 71, 90);
}
div.sk_tabs_bg {
    background: #f8f8f2;
}
div.sk_tab {
    background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,#6272a4), color-stop(100%,#44475a));
}
div.sk_tab_title {
    color: #f8f8f2;
}
div.sk_tab_url {
    color: #8be9fd;
}
div.sk_tab_hint {
    background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,#f1fa8c), color-stop(100%,#ffb86c));
    color: #282a36;
    border: solid 1px #282a36;
}
#sk_bubble {
    border: 1px solid #f8f8f2;
    color: #282a36;
    background-color: #f8f8f2;
}
#sk_bubble * {
    color: #282a36 !important;
}
div.sk_arrow[dir=down]>div:nth-of-type(1) {
    border-top: 12px solid #f8f8f2;
}
div.sk_arrow[dir=up]>div:nth-of-type(1) {
    border-bottom: 12px solid #f8f8f2;
}
div.sk_arrow[dir=down]>div:nth-of-type(2) {
    border-top: 10px solid #f8f8f2;
}
div.sk_arrow[dir=up]>div:nth-of-type(2) {
    border-bottom: 10px solid #f8f8f2;
}
#sk_omnibar {
    width: 60%;
    left: 20%;
}
}`;
