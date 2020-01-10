import { cryptico } from "../../cryptico-master/cryptico.js";
import router from "../router/index.js";

export default {
  name: "Signup",
  data() {
    return {
      fullname: "",
      login: "",
      pass: "",
      confirmPass: ""
    };
  },
  methods: {
    signup: async function(e) {
        e.preventDefault();
      if (e.target.checkValidity() === true) {

        let passPhrase = await this.digestMessage(this.pass);
        const RSAkey = cryptico.generateRSAKey(passPhrase, 1024);
        const pubKey = cryptico.publicKeyString(RSAkey);

        fetch("/auth/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json;charset=utf-8"
          },
          body: JSON.stringify({
            login: this.login,
            fullname: this.fullname,
            password: this.pass,
            publicKey: pubKey
          })
        })
        .then(() => router.push("/login"))
        .catch(err => console.log(err));
      }
      e.target.classList.add("was-validated");
    },
    checkLogin: async function(e) {
      let response = await fetch(`/api/v1/isLoginFree/${this.login}`);
      let result = await response.json();

      if (result) {
        this.$refs.loginInvalidFeedback.innerText = "User already exist!";
        e.target.setCustomValidity("User already exist!");
      } else {
        e.target.setCustomValidity("");
      }
    },
    comparePasswords: function() {
      this.pass !== this.confirmPass
        ? this.$refs.confirmPass.setCustomValidity("Passwords must be equal!")
        : this.$refs.confirmPass.setCustomValidity("");
    },
    digestMessage: async function(pass) {
      const msgUint8 = new TextEncoder().encode(pass);
      const hashBuffer = await crypto.subtle.digest("SHA-256", msgUint8);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const hashHex = hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
      return hashHex;
    }
  }
};