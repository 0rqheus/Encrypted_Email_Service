import router from "../router/index.js";

export default {
    name: "Update",
    data() {
        return {
            currUser: {}
        };
    },
    created: function () {
        const id = this.$route.params.id;
        const jwt = localStorage.getItem("jwt");

        fetch(`/api/v1/users/${id}`, {
            headers: { Authorization: `Bearer ${jwt}` }
        })
            .then(response => response.json())
            .then(result => (this.currUser = result))
            .catch(console.error);
    },
    methods: {
        update: function (event) {
            event.preventDefault();

            const jwt = localStorage.getItem("jwt");

            fetch(`/api/v1/users/${this.$route.params.id}`, {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${jwt}`
                },
                body: new FormData(event.target)
            })
                .then(response => response.json())
                .then(() => router.push(`/user/${this.$route.params.id}`))
                .catch(console.error);
        }
    }
};