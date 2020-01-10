import router from "../router/index.js";

export default {
  name: "Update",
  data() {
    return {
      currUser: {}
    };
  },
  created: function() {
    let id = this.$route.params.id;
    let jwt = localStorage.getItem("jwt");

    fetch(`/api/v1/users/${id}`, {
      headers: { Authorization: `Bearer ${jwt}` }
    })
      .then(response => response.json())
      .then(result => (this.currUser = result))
      .catch(err => console.log(err));
  },
  methods: {
    update: function(e) {
      e.preventDefault();

      let jwt = localStorage.getItem("jwt");

      fetch(`/api/v1/users/${this.$route.params.id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${jwt}`
        },
        body: new FormData(e.target)
      })
        .then(response => response.json())
        .then(() => router.push(`/user/${this.$route.params.id}`))
        .catch(err => console.log(err));
    }
  }
};