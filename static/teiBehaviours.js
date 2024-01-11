export let teiBehaviours = {
    "tei": {
        "note": [
            ["[type=gloss]",
                function (elt) {
                    if (!this.noteIndex) {
                        this["noteIndex"] = 1;
                    } else {
                        this.noteIndex++;
                    }
                    let id = "note" + this.noteIndex;
                    let link = document.createElement("a");
                    link.setAttribute("id", "src" + id);
                    link.setAttribute("href", "#" + id);
                    link.innerHTML = this.noteIndex;
                    let content = document.createElement("sup");
                    content.appendChild(link);
                    let notes = this.dom.querySelector("ol.notes");
                    if (!notes) {
                        notes = document.createElement("ol");
                        notes.setAttribute("class", "notes");
                        this.dom.appendChild(notes);
                    }
                    let note = document.createElement("li");
                    note.id = id;
                    note.innerHTML = "<a href=\"#src" + id + "\">^</a> " + elt.innerHTML
                    notes.appendChild(note);
                    return content;
                }
            ]
        ],
        "ptr": function (elt) {
            if (elt.getAttribute('target') === '#') {
                console.log('Ignoring empty ptrs...')
            } else {
                var link = document.createElement('a');
                link.href = elt.getAttribute('target');
                link.innerHTML = '>';
                return link
            }
        },
        "ref": function (elt) {
            if (elt.getAttribute('target') === '#') {
                console.log('Ignoring empty refs...')
            } else {
                var link = document.createElement('a');
                link.href = elt.getAttribute('target');
                link.innerHTML = elt.innerHTML;
                return link
            }
        },
        "graphic": function (elt) {
            if (elt.getAttribute('url') === '#') {
                console.log('Ignoring non-existent graphics...')
            }
        },
        "pb": function (elt) {
            var sig = document.createElement('p');
            sig.innerHTML = elt.getAttribute('n');
            sig.classList.add('signature')
            return sig
        },
        "app": function (elt) {
            // populate children with subtype
            for (const child of elt.children) {
                child.classList.add(`var-${elt.getAttribute('subtype')}`)
            }
        },
        "rdg": function (elt) {
            if (elt.hasAttribute('data-empty')) {
                elt.innerHTML = '[Does not exist in 1609]'
            }
        },
        "lem": function (elt) {
            if (elt.hasAttribute('data-empty')) {
                elt.innerHTML = '[+1609]'
            }
        },
        "fw": [
            ["[type=horizontalRule]", function (elt) {
                return document.createElement('hr')
            }]
        ],
        "ab": function (elt) {
            //  creates a custom element
            let event = new CustomEvent('drawBox', {detail: {text: 'this has been sent from the element!', content: elt.innerHTML}})
            elt.onmouseenter = function () {
                dispatchEvent(event)
            }
        }
    }
}