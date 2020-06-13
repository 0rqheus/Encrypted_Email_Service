import { cryptico } from "../../cryptico-master/cryptico.js";
import router from "../router/index.js";

export default {
    name: "Mail",
    data() {
        return {
            mail: {}
        };
    },
    created: function () {
        const id = this.$route.params.id;
        const jwt = localStorage.getItem("jwt");

        fetch(`/api/v1/mails/${id}`, {
            headers: { Authorization: `Bearer ${jwt}` }
        })
            .then(response => response.json())
            .then(result => {
                this.mail = result;
                this.decryptMailText();

                if (result.labels.unread)
                    this.labelUpdate("unread");
            })
            .catch(console.error);
    },
    methods: {

        labelUpdate: function (labelName) {
            const jwt = localStorage.getItem("jwt");

            fetch(`/api/v1/mails/${this.mail._id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json;charset=utf-8",
                    Authorization: `Bearer ${jwt}`
                },
                body: JSON.stringify({ labelName: labelName })
            })
                .then(res => res.json())
                .then(res => {
                    this.mail.labels[labelName] = res.labels[labelName];
                })
                .catch(console.error);
        },

        showDeleteModal: function () {
            this.$bvModal.msgBoxConfirm("Are you sure you want to delete this mail?")
                .then(value => {
                    if (value) this.deleteMail();
                })
                .catch(console.error);
        },

        deleteMail: function () {
            const jwt = localStorage.getItem("jwt");

            fetch(`/api/v1/mails/${this.mail._id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${jwt}`
                }
            })
                .then(() => router.push("/mails"))
                .catch(console.error);
        },
        
        decryptMailText: function () {
            const pass = localStorage.getItem("pass_phrase");
            const RSAkey = cryptico.generateRSAKey(pass, 1024);
            this.mail.text = cryptico.decrypt(this.mail.text, RSAkey).plaintext;
        }
    }
};