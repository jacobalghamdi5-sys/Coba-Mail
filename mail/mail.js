/**
 * ⚡ CMAIL CORE FUNCTIONAL TRANSMISSION PROCESSING MODULE
 */
let currentFolderScope = "inbox";
let activeMailId = 1;

let mailDatabase = {
    inbox: [
        { id: 1, sender: "assistant@cobare-re.com", subject: "Cmail Infrastructure Active", body: "Hello User,\n\nYour centralized digital identity configuration token is successfully linked with your multi-language repository framework.\n\nAll 25 backend module compilation pipelines are executing with zero runtime errors using the clean Open Sans typography engine.\n\nBest regards,\nCmail Automation Node Core" },
        { id: 2, sender: "security@coba-auth.net", subject: "Local Storage Database Synced", body: "System Confirmation Alert:\nYour credential files have been securely isolated inside the enclave data layer strings matrix check values." }
    ],
    sent: [],
    spam: [
        { id: 3, sender: "win-prizes@spam-links.biz", subject: "!!! EARN UNLIMITED REWARDS OR ROBUX !!!", body: "CLICK THIS LINK IMMEDIATELY TO HARVEST GEMS INSTANTLY WITH NO LOGIN AT ALL!!!" }
    ]
};

document.addEventListener("DOMContentLoaded", () => {
    let user = localStorage.getItem("cobaActiveUser") || "Jacob";
    let badge = document.getElementById("userBadgeIcon");
    if(badge) badge.innerText = user.charAt(0).toUpperCase();
    renderEmailStreamGrid();
});

function switchActiveFolder(folderName) {
    currentFolderScope = folderName;
    document.querySelectorAll('.folder-item-row').forEach(el => el.classList.remove('active'));
    
    if(folderName === 'inbox') document.getElementById("f-inbox").classList.add("active");
    if(folderName === 'sent') document.getElementById("f-sent").classList.add("active");
    if(folderName === 'spam') document.getElementById("f-spam").classList.add("active");

    closeComposeFormView();
    renderEmailStreamGrid();
}

function renderEmailStreamGrid() {
    let container = document.getElementById("emailListContainer");
    if(!container) return;
    container.innerHTML = "";
    
    let emailList = mailDatabase[currentFolderScope] || [];

    emailList.forEach(mail => {
        let div = document.createElement("div");
        div.className = "email-row-widget" + (mail.id === activeMailId ? " active" : "");
        div.onclick = () => loadTargetMessageContext(mail.id);
        
        let bodySnippet = mail.body.substring(0, 45) + "...";
        div.innerHTML = `
            <div class="row-meta-sender">${mail.sender}</div>
            <div class="row-meta-subject">${mail.subject}</div>
            <div class="row-meta-snippet">${bodySnippet}</div>
        `;
        container.appendChild(div);
    });

    document.getElementById("inboxBadge").innerText = mailDatabase.inbox.length;
    document.getElementById("spamBadge").innerText = mailDatabase.spam.length;

    if(emailList.length > 0) {
        loadTargetMessageContext(emailList.id);
    } else {
        document.getElementById("txtSubject").innerText = "No Conversations";
        document.getElementById("txtSender").innerText = "";
        document.getElementById("txtBody").innerText = "This folder category segment contains no structural message items.";
    }
}

function loadTargetMessageContext(id) {
    activeMailId = id;
    let mail = mailDatabase[currentFolderScope].find(m => m.id === id);
    if(!mail) return;

    document.querySelectorAll('.email-row-widget').forEach(el => el.classList.remove('active'));
    let currentWidget = document.querySelector(`.email-row-widget:nth-child(${mailDatabase[currentFolderScope].indexOf(mail) + 1})`);
    if(currentWidget) currentWidget.classList.add('active');

    document.getElementById("txtSubject").innerText = mail.subject;
    document.getElementById("txtSender").innerText = (currentFolderScope === "sent" ? "To: " : "From: ") + mail.sender;
    document.getElementById("txtBody").innerText = mail.body;
}

function openComposeFormView() {
    document.getElementById("readingWorkspacePane").style.display = "none";
    document.getElementById("composeWorkspacePane").style.display = "flex";
}

// Global scope hooks for HTML integration mappings
window.openComposeFormView = openComposeFormView;
window.switchActiveFolder = switchActiveFolder;

function closeComposeFormView() {
    document.getElementById("composeWorkspacePane").style.display = "none";
    document.getElementById("readingWorkspacePane").style.display = "flex";
}
window.closeComposeFormView = closeComposeFormView;

function emitCompiledMail() {
    let to = document.getElementById("formTo").value.trim();
    let sub = document.getElementById("formSubject").value.trim();
    let body = document.getElementById("formBody").value.trim();
    if(!to || !sub) return;

    mailDatabase.sent.unshift({ id: Date.now(), sender: to, subject: sub, body: body });
    document.getElementById("formTo").value = "";
    document.getElementById("formSubject").value = "";
    document.getElementById("formBody").value = "";
    
    switchActiveFolder('sent');
}
window.emitCompiledMail = emitCompiledMail;

function deleteCurrentEmail() {
    let index = mailDatabase[currentFolderScope].findIndex(m => m.id === activeMailId);
    if(index !== -1) {
        mailDatabase[currentFolderScope].splice(index, 1);
        alert("Message dropped successfully from active directories!");
        renderEmailStreamGrid();
    }
}
window.deleteCurrentEmail = deleteCurrentEmail;
