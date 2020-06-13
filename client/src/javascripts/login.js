import { cryptico } from "../../cryptico-master/cryptico.js";
import router from "../router/index.js";
import { store } from "../store";

export default {
    name: "Login",
    data() {
        return {
            password: "",
            showError: false
        };
    },
    methods: {

        login: function (event) {
            event.preventDefault();
            const target = event.target;

            if (target.checkValidity() === true) {
                const formData = new FormData(target);
                const bodyData = new URLSearchParams(formData);

                fetch("/auth/login", { method: "POST", body: bodyData })
                    .then(response => response.json())
                    .then(async authResult => {

                        if (!authResult.user) {

                            this.showError = true;
                            target.classList.remove("was-validated");

                        } else {

                            localStorage.setItem("jwt", authResult.token);

                            const passPhrase = await this.digestMessage(this.password);
                            const RSAkey = cryptico.generateRSAKey(passPhrase, 1024);
                            const pubKey = cryptico.publicKeyString(RSAkey);

                            localStorage.setItem("pass_phrase", passPhrase); // for RSAkey creation
                            localStorage.setItem("public_key", pubKey);

                            store.commit("setUser", authResult.user);
                            router.push("/");
                        }
                    })
                    .catch(console.error);
            }

            target.classList.add("was-validated");
        },

        digestMessage: async function (pass) {
            // encode as (utf-8) Uint8Array
            const msgUint8 = new TextEncoder().encode(pass);
            // hash the message
            const hashBuffer = await crypto.subtle.digest("SHA-256", msgUint8);
            // convert buffer to byte array
            const hashArray = Array.from(new Uint8Array(hashBuffer));
            // convert bytes to hex string
            const hashHex = hashArray.map(b => b.toString(16).padStart(2, "0")).join("");

            return hashHex;
        }
    }
};