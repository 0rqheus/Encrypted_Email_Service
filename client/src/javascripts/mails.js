import SearchBar from "../components/partials/Search";
import PaginationMenu from "../components/partials/Pagination";

export default {
    name: "Mails",
    data() {
        return {
            mails: [],

            entitiesAmount: 0,
            search: "",
            message: "",

            hasResults: true
        };
    },
    watch: {
        mails: function () {
            
            if (this.mails.length === 0) {
                this.message = "No results";
                this.hasResults = false;
            } else {
                this.message = "";
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