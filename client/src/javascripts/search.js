export default {
    name: "SearchBar",
    props: ["entities", "type", "search"],
    data() {
        return {
            query: ""
        };
    },
    methods: {
        searching: function () {
            const jwt = localStorage.getItem("jwt");

            fetch(`/api/v1/${this.type}/?search=${this.query}`, {
                headers: { Authorization: `Bearer ${jwt}` }
            })
                .then(response => response.json())
                .then(result => {
                    this.$emit("update:entities", result);
                    this.$emit("update:search", this.query);
                })
                .catch(err => console.error("Error during mails fetch", err));
        }
    }
};