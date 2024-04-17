// This is a script used only for dev purposes: it uses the GH api to get a list of all the files in the repo and allows me to choose between them
import { Octokit } from "https://esm.sh/@octokit/core";

async function getListFiles() {
    const octokit = new Octokit();

    const result = await octokit.request('GET /repos/evolvinghands/EvolvingHandsNcl/contents/', {
        headers: {
            'Accept': 'application/vnd.github.object+json'
        }
    })
    return result.data.entries;
}

// gets a list of files from the GH repo
const repo = await getListFiles();

// For each file in the response creates a new option in the form
const defaultSelectedFile = document.getElementsByTagName('tei-converter')[0].getAttribute('path');
for (const file of repo) {
    
    let opt = document.createElement('option');
    opt.value = file.download_url;
    opt.innerHTML = file.name;
    if(opt.value === defaultSelectedFile) {
        opt.selected = true;
    }
    document.getElementById('fileNameSelect').appendChild(opt);
}

// adds event listener to intercept form submission
let fileSelectForm = document.getElementById('fileSelectForm');

fileSelectForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // on form submission, removes pre-existent tei-converter element, and creates a new one with the new selecte file

    let selectedFile = document.getElementById('fileNameSelect').value;

    const teiContainer = document.getElementById('teiContainer');

    teiContainer.remove()

    let newTeiConverter = document.createElement('tei-converter');
    newTeiConverter.setAttribute('path', selectedFile);
    newTeiConverter.setAttribute('configPath', "dist/TeiConverter/TeiConverter.config.json");

    const newTeiContainer = document.createElement('div');
    newTeiContainer.setAttribute('style', 'width: 85%; margin-right: auto; margin-left: auto;');
    newTeiContainer.setAttribute('id', 'teiContainer')

    newTeiContainer.appendChild(newTeiConverter);

    document.querySelector('body').appendChild(newTeiContainer);
});

let seeXMLButton = document.getElementById('see-xml');

seeXMLButton.addEventListener('click', (e) => {
    e.preventDefault();
    window.open(document.getElementById('fileNameSelect').value)
})