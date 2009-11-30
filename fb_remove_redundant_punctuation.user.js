// Based on http://userscripts.org/scripts/show/53038

// ==UserScript==
// @name          Remove Redundant Punctuation from Facebook
// @namespace     http://userscripts.org/users/83966
// @description   Reduces redundant punctuation to a single instance. Facebook version
// @include       http://*.facebook.com/*
// @include       https://*.facebook.com/*
// @include       http://*.fbcdn.net/*
// @version       0.6 - Added some conditionals, and removed some matches to (hopefully) cut down on processing
// ==/UserScript==

document.addEventListener("DOMNodeInserted", documentChanged, false);

function documentChanged(event) {
  removeRedundant();
}

function removeRedundant(){
  var replacements, regex, key, textNodes, node, nodeData;
  replacements = {"!+":"!","\\?+":"?","[\.]{4,}": "...",};

  regex = {};
  for (key in replacements) {
    regex[key] = new RegExp(key, 'g');
  } 

textNodes = document.evaluate("//div[@id='home_stream']//text() | //div[@id='feedwall_with_composer']//text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
for (var i = 0; i < textNodes.snapshotLength; i++) {
  node = textNodes.snapshotItem(i);
  if (node.parentNode.tagName != "STYLE" && node.parentNode.tagName != "TEXTAREA" && node.parentNode.tagName != "SCRIPT"){
      if (node.data.match(/!{2,}|\?{2,}|\.{4,}/) {
        nodeData = node.data;
        for (key in replacements) {
          nodeData = nodeData.replace(regex[key], replacements[key]);
        }
        node.data = nodeData;
      }
    }
  }
};