document.addEventListener('DOMContentLoaded', function() {
    replaceToneTags();
});

function replaceToneTags() {
    const toneTags = {
        "/s": "/sarcasm",
        "/j": "/joking",
        "/hj": "/half-joking",
        "/srs": "/serious",
        "/lh": "/light-hearted",
        "/g": "/genuine",
        "/gen": "/genuine question",
        "/nsrs": "/not serious",
        "/pos": "/positive connotation",
        "/neg": "/negative connotation",
        "/neu": "/neutral",
        "/t": "/teasing",
        "/nm": "/not mad or upset",
        "/lu": "/a little upset",
        "/nbh": "/nobody here",
        "/rh": "/rhetorical question",
        "/c": "/copypasta",
        "/m": "/metaphorically",
        "/li": "/literally",
        "/hyp": "/hyperbole",
        "/p": "/platonic",
        "/r": "/romantic",
        "/sx": "/sexual intent",
        "/x": "/sexual intent",
        "/nsx": "/non-sexual intent",
        "/a": "/anger",
        "/aa": "/aggressive",
        "/ij": "/inside joke",
        "/f": "/fake",
        "/th": "/threat",
        "/cb": "/clickbait"
    };

    // Replace tone tags in text nodes
    replaceText(document.body, toneTags);

    // Monitor for changes in the document
    const observer = new MutationObserver(mutations => {
        mutations.forEach(mutation => {
            if (mutation.addedNodes && mutation.addedNodes.length > 0) {
                mutation.addedNodes.forEach(newNode => {
                    if (newNode.nodeType === 3) { // Node.TEXT_NODE
                        replaceText(newNode.parentNode, toneTags);
                    }
                });
            }
        });
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
}

function replaceText(element, toneTags) {
    for (const tag in toneTags) {
        const tagRegex = new RegExp(escapeRegExp(tag), 'gi');
        element.innerHTML = element.innerHTML.replace(tagRegex, `(${toneTags[tag]})`);
    }
}

function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
}

