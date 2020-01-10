import router from "../router/index.js";
import { store } from "../store";

export default {
  name: "Header",
  methods: {
    logout: function() {
      store.commit("setUser", {});
      localStorage.removeItem("jwt");
      localStorage.removeItem("pass_phrase");
      localStorage.removeItem("public_key");
      router.push("/");
    },
    toggleMenu: function() {
      this.$root.$emit('bv::toggle::collapse', 'mobile-menu');
    }
  }
};