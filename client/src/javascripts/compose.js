import { cryptico } from "../../cryptico-master/cryptico.js";
import router from "../router/index.js";

export default {
    name: "Compose",
    data() {
        return {
            receiver: "",
            text: "",
            attachments: [],
            showError: false
        };
    },
    methods: {
        
        send: async function (event) {
            event.preventDefault();

            if (event.target.checkValidity() === true) {

                const jwt = localStorage.getItem("jwt");

                if (!this.text && this.attachments.length === 0) {
                    this.showError = true;
                    event.target.classList.remove("was-validated");
                    return;
                }

                this.createForReceiver(event, jwt);
                this.createForSender(event, jwt);
            }

            event.target.classList.add("was-validated");
        },

        createForReceiver(event, jwt) {
            fetch(`/api/v1/users/public_key/${this.receiver}`, { headers: { Authorization: `Bearer ${jwt}` } })
                .then(response => response.json())
                .then(result => result.pk)
                .then(receiverPubKey => {
                    if (receiverPubKey) {

                        const formData = new FormData(event.target);
                        const encryptedText = cryptico.encrypt(this.text, receiverPubKey).cipher;
                        formData.set("text", encryptedText);

                        fetch("/api/v1/mails/?isSender=0", {
                            method: "POST",
                            headers: { Authorization: `Bearer ${jwt}` },
                            body: formData
                        });
                    }
                })
                .catch(console.error);
        },

        createForSender(event, jwt) {
            const formData = new FormData(event.target);
            const pubKey = localStorage.getItem("public_key");
            const encryptedText = cryptico.encrypt(this.text, pubKey).cipher;
            formData.set("text", encryptedText);

            fetch("/api/v1/mails/?isSender=1", {
                method: "POST",
                headers: { Authorization: `Bearer ${jwt}` },
                body: formData
            })
                .then(res => res.json())
                .then(() => router.push("/mails"))
                .catch(console.error);
        },

        formatNames(files) {

            if (files.length === 1)
                return files[0].name;
            else
                return `${files.length} files selected`;
        }
    }
};