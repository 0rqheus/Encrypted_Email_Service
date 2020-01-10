import { cryptico } from "../../cryptico-master/cryptico.js";
import router from "../router/index.js";
import { store } from '../store';

export default {
  name: "Login",
  data() {
    return {
      password: "",
      showError: false
    };
  },
  methods: {
    login: function (e) {
      e.preventDefault();

      if (e.target.checkValidity() === true) {
        const formData = new FormData(e.target);
        const bodyData = new URLSearchParams(formData);

        fetch("/auth/login", { method: "POST", body: bodyData })
          .then(response => response.json())
          .then(async authResult => {
            if (!authResult.user) {
              this.showError = true;
              e.target.classList.remove("was-validated");
            } else {
              localStorage.setItem("jwt", authResult.token);

              let passPhrase = await this.digestMessage(this.password);
              const RSAkey = cryptico.generateRSAKey(passPhrase, 1024);
              const pubKey = cryptico.publicKeyString(RSAkey);

              localStorage.setItem("pass_phrase", passPhrase); // for create RSAkey
              localStorage.setItem("public_key", pubKey); // for encrypt own variant of message

              store.commit("setUser", authResult.user);
              router.push("/");
            }
          })
          .catch(console.error);
      }

      e.target.classList.add("was-validated");
    },
    digestMessage: async function (pass) {
      const msgUint8 = new TextEncoder().encode(pass); // encode as (utf-8) Uint8Array
      const hashBuffer = await crypto.subtle.digest("SHA-256", msgUint8); // hash the message
      const hashArray = Array.from(new Uint8Array(hashBuffer)); // convert buffer to byte array
      const hashHex = hashArray.map(b => b.toString(16).padStart(2, "0")).join(""); // convert bytes to hex string
      return hashHex;
    }
  }
};