import SearchBar from "../components/partials/Search";
import PaginationMenu from "../components/partials/Pagination";
import { store } from "../store";

export default {
    name: "Chats",
    data() {
        return {
            chats: [],

            entitiesAmount: 0,
            search: "",
            header: "",

            hasResults: true,
            userLogin: store.state.user.login
        };
    },
    watch: {
        chats: function () {
            if (this.chats.length === 0) {

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
        }
    },

    components: {
        SearchBar,
        PaginationMenu
    }
};