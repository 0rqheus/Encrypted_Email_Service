import SearchBar from "../components/partials/Search";
import PaginationMenu from "../components/partials/Pagination";
import router from "../router/index.js";

export default {
    name: "Chat",
    data() {
        return {
            chatMails: [],

            entitiesAmount: 0,
            search: "",
            header: "",

            hasResults: true,
            type: `chats/${this.$route.params.id}`
        };
    },
    watch: {
        chatMails: function () {
            if (this.chatMails.messages.length === 0) {
                this.header = "No results";
                this.hasResults = false;
            } else {
                this.header = "";
                this.hasResults = true;
            }
        }
    },
    methods: {
        searching: function (query) {
            this.search = query;
        },

        showDeleteModal: function () {
            this.$bvModal.msgBoxConfirm("Are you sure you want to delete this Chat(this action will delete all messages in this chat)?")
                .then(value => {
                    if (value) this.deleteMail();
                })
                .catch(console.error);
        },
        
        deleteMail: function () {
            const jwt = localStorage.getItem("jwt");

            fetch(`/api/v1/chats/${this.$route.params.id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${jwt}`
                }
            })
                .then(() => router.push("/chats"))
                .catch(console.error);
        }
    },
    components: {
        SearchBar,
        PaginationMenu
    }
};