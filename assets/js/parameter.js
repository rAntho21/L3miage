import {addStats} from "./profil.js";

window.onload = () => {
    let daltonismeCheckBox = document.getElementById("daltonisme");
    daltonismeCheckBox.addEventListener("change", () => {
        localStorage.setItem("daltonisme", daltonismeCheckBox.checked);
        if(daltonismeCheckBox.checked) {
            document.body.classList.add("daltonisme");
        } else {
            document.body.classList.remove("daltonisme");
        }
    });
    daltonismeCheckBox.checked = isDaltonisme === "true";

    document.getElementById("activationKeyButton").addEventListener("click", () => {
        const keyEntered = document.getElementById("activationKey").value;

        switch (keyEntered) {
            case 'BJDCJDPQJBEPFSGCCJEJPQJ':
                addStats(0, 250);
                console.log("La clé BJDCJDPQJBEPFSGCCJEJPQJ a été activée.");
                break;
            case 'xp!':
                addStats(4967, 0);
                console.log("La clé xp! a été activée.");
                break;
            default:
                console.log("Mauvaise clé entrée.");
                break;
        }
    });
}