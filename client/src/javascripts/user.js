import router from "../router/index.js";
import { store } from "../store";

export default {
  name: "User",
  data() {
    return {
      id: this.$route.params.id,
      chosenUser: {}
    };
  },
  created: function () {
    this.fetchUser();
  },
  watch: {
    $route(to, from) {
      this.fetchUser();
    }
  },
  methods: {
    showDeleteModal: function () {
      this.$bvModal
        .msgBoxConfirm("Are you sure you want to delete your account?")
        .then(value => {
          if (value) this.deleteUser();
        })
        .catch(err => console.log(err));
    },
    deleteUser: function () {
      let jwt = localStorage.getItem("jwt");

      fetch(`/api/v1/users/${store.state.user._id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${jwt}`
        }
      })
        .then(() => {
          store.commit("setUser", {});
          localStorage.removeItem("jwt");
          localStorage.removeItem("pass_phrase");
          localStorage.removeItem("public_key");
          router.push("/");
        })
        .catch(err => console.log(err));
    },
    switchRole: function () {
      let jwt = localStorage.getItem("jwt");

      fetch(`/api/v1/users/change_role/${this.$route.params.id}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${jwt}`
        }
      })
        .then(response => response.json())
        .then(result => (this.chosenUser.role = result.role))
        .catch(err => console.log(err));
    },
    fetchUser() {
      let id = this.$route.params.id;
      let jwt = localStorage.getItem("jwt");

      let path =
        store.state.user._id === id ? "/api/v1/me" : `/api/v1/users/${id}`;
      fetch(path, {
        headers: { Authorization: `Bearer ${jwt}` }
      })
        .then(response => response.json())
        .then(result => {
          this.chosenUser = result;
        })
        .catch(err => console.log(err));
    }
  }
};